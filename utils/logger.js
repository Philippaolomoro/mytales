const winston = require("winston");
const { createLogger, format, transports } = require("winston");

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4,
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
  },
};

const level = () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  const isDevelopment = nodeEnv === "development";
  return isDevelopment ? "debug" : "warn";
};

winston.addColors(customLevels.colors);

const logger = createLogger({
  level: level(),
  levels: customLevels.levels,
  format: format.combine(
    format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss:ms",
    }),
    format.colorize({
      all: true,
    }),
    format.printf((info) => {
      return `${info.timestamp} ${info.level}: ${info.message}`;
    })
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
    new transports.File({
      filename: "logs/all.log",
    }),
  ],
});

module.exports = logger;
