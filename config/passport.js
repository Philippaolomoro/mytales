const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

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
		new GoogleStrategy(
			{
				clientID: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				callbackURL: "https://my-tales.herokuapp.com/auth/google/callback",
			},
			async (accessToken, refreshToken, profile, done) => {
				let newUser = {
					"displayName": profile.displayName,
					"firstName": profile.givenName,
					"lastName": profile.familyName,
					"email": profile.emails[0].value,
					"image": profile.photos[0].value
				};
				try {
					let user = await User.findOne({ "email": profile.emails[0].value });

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
			},
			async (accessToken, refreshToken, req, res, profile, done) => {
				let newUser = {
					"id": profile.id,
					"displayName": profile.displayName,
					"firstName": profile.givenName,
					"lastName": profile.familyName,
					"email": profile.emails[0].value,
					"image": profile.photos 
				};
				try {
					let user = await User.findOne({ "id": profile.id});

					if (user) {
						done(null, user);
					} else {
						user = await User.create(newUser);
						done(null, user);
					}
				} catch (err) {
					if (isDevelopment) console.error(err);
					res.render("error/serverError")
				}
			}
		)
	);
};
