const morgan = require("morgan");
const Logger = require("../lib/logger");

const stream = {
  // Use the http severity
  write: (message) => Logger.http(message),
};

// Skip all the Morgan http log if the
// application is not running in development mode.
// only warning and error messages in production.
const skip = (req) => {
  // Ignore Socket.IO-related requests
  if (req.url.includes("socket.io")) {
    return true; // Skip logging for Socket.IO requests
  }

  const env = process.env.NODE_ENV || "development";
  return env !== "development";
};

// Build the morgan middleware
const morganMiddleware = morgan("tiny", {
  stream,
  skip,
});

module.exports = morganMiddleware;
