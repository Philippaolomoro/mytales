const mongoose = require("mongoose");
const dotenv = require("dotenv");

const isDevelopment = process.env.NODE_ENV === "development";

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useFindAndModify: false,
		});

		if (isDevelopment)
			console.info("Mongo is now connected to", process.env.MONGO_URI);
	} catch (error) {
		if (isDevelopment) console.error(error);
		process.exit(1);
	}
};

module.exports = connectDB;
