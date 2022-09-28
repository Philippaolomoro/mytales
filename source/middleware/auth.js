module.exports = {
	isLoggedIn: function (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect("/");
		}
	},

	isGuest: function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect("/dashboard");
		} else {
			return next();
		}
	},
};
