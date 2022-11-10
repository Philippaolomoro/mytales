const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
	displayName: {
		type: String,
	},
	fullName: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	image: {
		type: String,
	},
	signupMode:{
		type: String,
		enum: ["Google", "Local"],
		default: "Google"
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

UserSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(8);
    const passwordHash = await bcrypt.hashSync(this.password, salt);
    if (this.isNew || this.isModified("password")) {
      this.password = passwordHash;
      next();
    }
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = mongoose.model("User", UserSchema);
