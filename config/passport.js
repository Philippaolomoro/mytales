const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local");

const User = require("../models/User");
const PassportController = require("../controllers/passportController")

const isDevelopment = process.env.NODE_ENV === 'development'

module.exports = function (passport) {
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});

	passport.use(
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true
			}, 
			PassportController.passportLocal
	))

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/auth/google/callback",
			},
			PassportController.passportGoogle
		)
	);
};
