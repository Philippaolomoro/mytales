const morgan = require("morgan");
const logger = require("./logger.js");

const stream = {
  write: (message) => logger.http(message),
};

const skip = () => {
  const nodeEnv = process.env.NODE_ENV || "development";
  return nodeEnv !== "development";
};

const morganUtils = morgan(
  ":remote-addr :method :url :status :res[content-length] - :response-time ms",
  {
    stream,
    skip,
  }
);

module.exports = morganUtils;
