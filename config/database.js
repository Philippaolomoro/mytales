require("dotenv").config()
const mongoose = require("mongoose");
const logger = require("../utils/logger")

const mongoUri = process.env.MONGO_URI;
 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri);
    logger.debug("Database conected")
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
