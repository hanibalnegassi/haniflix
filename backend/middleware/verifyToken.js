const jwt = require("jsonwebtoken");
const User = require("../models/User");

function verify(req, res, next) {
  const authHeader = req.headers.token;
  const token = authHeader?.split(" ")?.[1] || req?.query?.token;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          // Handle expired token
          return res.status(401).json({ message: "Token has expired" });
        } else {
          // Handle other token errors
          return res.status(403).json({
            message: "Token is not valid!",
          });
        }
      }

      const userId = decoded.id;
      User.findById(userId)
        .then((user) => {
          if (!user || user.accessToken !== token) {
            //exclude admins from this check
            if (!user?.isAdmin) {
              // User logged in on another device
              return res.status(401).json({
                error: "User logged in on another device",
                errorName: "loggedElsewhere",
              });
            }
          }
          req.user = user;
          next();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({
            message: "Server error",
          });
        });
    });
  } else {
    return res.status(401).json({
      message: "You are not authenticated!",
    });
  }
}

module.exports = verify;
