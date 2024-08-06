const Logger = require("../lib/logger"); // Import your logger

const errorHandler = (err, req, res, next) => {
  // Log the error using your logger
  Logger.error(err.message, err);

  // Send a generic error response to the client
  res.status(500).send("Something went wrong!");
};

module.exports = errorHandler;
