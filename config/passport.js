const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const dotenv = require("dotenv");

const mongoose = require("mongoose");
const User = require("../models/User");

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
		"register",
		new LocalStrategy(
			{
				usernameField: "email",
				passwordField: "password",
				passReqToCallback: true,
			},
			async (email, password, done) => {
				console.log(profile);
				let newUser = {
					"local.email": email,
					"local.password": newUser.generateHash(password),
					"local.username": username,
				};
				try {
					let user = await User.findOne({ "local.email": email });
					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						user.save();
						done(null, user);
					}
				} catch (err) {
					if (isDevelopment) console.error(err);
				}
			}
		)
	);

	passport.use(
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/auth/google/callback",
			},
			async (accessToken, refreshToken, profile, done) => {
				console.log(profile);
				let newUser = {
					"google.id": profile.id,
					"google.accessToken": accessToken,
					"google.name": profile.displayName,
					"google.email": profile.emails[0].value,
				};
				try {
					let user = await User.findOne({ "google.id": profile.id });

					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (err) {
					if (isDevelopment) console.error(err);
				}
			}
		)
	);

	passport.use(
		new FacebookStrategy(
			{
				clientID: process.env.FACEBOOK_CLIENT_ID,
				clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
				callbackURL: "http://localhost:5000/auth/facebook/callback",
				profileFields: ["id", "email", "name"],
			},
			async (accessToken, refreshToken, profile, done) => {
				console.log(profile);
				let newUser = {
					"facebook.id": profile.id,
					"facebook.accessToken": accessToken,
					"facebook.name": profile.displayName,
					"facebook.email": profile.emails[0].value,
				};
				try {
					let user = await User.findOne({ "facebook.id": profile.id });

					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (err) {
					if (isDevelopment) console.error(err);
				}
			}
		)
	);
};
