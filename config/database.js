const mongoose = require("mongoose");
const dotenv = require("dotenv");

// const isDevelopment = process.env.NODE_ENV === "development";
 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database conected")

    // if (isDevelopment) console.info("Database is now connected");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
