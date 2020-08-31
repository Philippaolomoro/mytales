const mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");

const UserSchema = new mongoose.Schema({
	facebook: {
		id: String,
		accessToken: String,
		name: String,
		email: String,
		image: String
	},
	google: {
		id: String,
		accessToken: String,
		name: String,
		email: String,
		image: String,
	},
});

// encrypt password
UserSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model("User", UserSchema);
