const User = require ("../models/user.model");
const GoogleUser = require("../models/GoogleUser")
const bcrypt = require("bcryptjs")

let PassportController = {
  passportLocal: async (req, email, password, done ) => {
		try {
			await User.findOne({ email: email }).then(async (user) => {
				if (!user) {
					return done(null, false, req.flash("loginMessage", "That user is not registered"));
				} else {
					const passwordIsValid = await bcrypt.compareSync(password, user.password)
					if (!passwordIsValid) {
						return done(
							null,
							false,
							req.flash("loginMessage", "Oops! Wrong password.")
						);
					} else {
						return done(null, user)
					}
				}
			}).catch(err => {
				console.error(err)
			})
		} catch (err) {
			return done({ message: err });
		}
  },

  passportGoogle: async(accessToken, refreshToken, profile, done) => {
		let newUser = {
			googleId: profile.id,
			displayName: profile.displayName,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			image: profile.photos[0].value,
		};
		try {
			let googleUser = await GoogleUser.findOne({ googleId: profile.id });

			if (googleUser) {
				done(null, googleUser);
			} else {
				user = await GoogleUser.create(newUser);
				done(null, user);
			}
		} catch (err) {
			if (isDevelopment) console.error(err);
			res.render("error/serverError")
		}
  }
}

module.exports = PassportController;
