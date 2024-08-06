const winston = require("winston");
const path = require("path");
//const moment = require("moment"); // For date formatting

const dailyRotate = require("winston-daily-rotate-file"); // Winston daily rotate transport

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

const level = () => {
  const env = process.env.NODE_ENV || "development";
  const isDevelopment = env === "development";
  return isDevelopment ? "debug" : "http";
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "blue",
  debug: "white",
};

winston.addColors(colors);

const consoleFormat = winston.format.combine(
  winston.format.colorize({ message: true, level: true }),
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`
  )
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.printf(
    (info) => `${info.timestamp} [${info.level}] ${info.message}`
  )
);

const logsDir = path.join(__dirname, "..", "logs"); // Adjust path as needed

const dailyRotateTransport = new dailyRotate({
  filename: path.join(logsDir, "app-%DATE%.log"), // Include date in filename
  datePattern: "YYYY-MM-DD", // Format of date in filename
  level: level(),
  levels,
  handleExceptions: true,
  format: fileFormat,
});

const transports = [
  new winston.transports.Console({
    level: level(),
    levels,
    handleExceptions: true,
    format: consoleFormat,
  }),
  dailyRotateTransport,
];

const Logger = winston.createLogger({
  level: level(),
  levels,
  // format: consoleFormat,
  format: winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  transports,
});

module.exports = Logger;
