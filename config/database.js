require("dotenv").config()
const mongoose = require("mongoose");

const mongoUri = process.env.MONGO_URI;
 
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUri);
    console.log("Database conected")
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
