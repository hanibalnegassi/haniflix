const ContinueWatchingList = require("../models/ContinueWatchingList");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware function to decode and verify the access token
const decodeAndVerifyToken = async (socket, next) => {
  const token = socket.handshake.headers.token;

  if (!token) {
    return next(new Error("Authorization token is missing"));
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.id);

    if (!user) {
      // User not found, do not authenticate
      return next(new Error("User not found"));
    }

    // Attach the user object to the socket for later use
    socket.user = user;

    // Continue with the connection
    next();
  } catch (error) {
    return next(new Error("Error decoding or verifying access token"));
  }
};

const checkLoginElsewhere = async (socket) => {
  const token = socket.handshake.headers.token;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return socket.emit("forceLogout", "User not found");
    }

    // Only check token mismatch if user exists
    if (token !== user.accessToken) {
      socket.emit("forceLogout", "Logged in from another location");
    }
  } catch (error) {
    console.error("Error checking login status:", error);
    socket.emit("forceLogout", "Invalid token or login issue");
  }
};

const setupSocket = (io) => {
  // Use the middleware in Socket.IO connection setup
  io.use((socket, next) => {
    // Decode and verify the access token
    decodeAndVerifyToken(socket, next);
  });

  io.on("connection", (socket) => {
    // Check if the user is logged in elsewhere once per connection
    checkLoginElsewhere(socket);

    socket.on("updateMovieProgress", async (data) => {
      const { movieId, watchedPercentage, userId } = data;

      try {
        // Avoid calling checkLoginElsewhere here, as it's already checked on connection
        if (watchedPercentage > 97) {
          // If watchedPercentage is above 97%, remove the entry
          const continueWatchingList = await ContinueWatchingList.findOne({
            user: userId,
          });

          if (continueWatchingList) {
            let newContent = [...continueWatchingList.content];
            newContent = newContent.filter((_movieId) => _movieId != movieId);

            continueWatchingList.content = newContent;
            await continueWatchingList.save();
          }
        } else {
          // Find or create the user's ContinueWatchingList document
          const continueWatchingList =
            await ContinueWatchingList.findOneAndUpdate(
              { user: userId },
              {
                $addToSet: { content: movieId },
                $set: { watchedPercentage, timestamp: Date.now() },
              },
              { upsert: true, new: true }
            );
        }
      } catch (error) {
        console.error("Error updating progress:", error);
      }
    });
    socket.on("disconnect", () => {
      socket.off("updateMovieProgress", handleUpdateMovieProgress);
    });
  });
};

module.exports = setupSocket;
