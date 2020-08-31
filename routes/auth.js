const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc login auth
router.post(
	"/register",
	passport.authenticate("local-signup", { failureRedirect: "/register" }),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

// @desc auth with google
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc google auth callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

// @desc auth with facebook
router.get(
	"/facebook",
	passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

// @desc facebook auth callback
router.get(
	"/facebook/callback",
	passport.authenticate("facebook", { failureRedirect: "/" }),
	(req, res) => {
		res.redirect("/dashboard");
	}
);

// @desc
router.get("/logout", (req, res) => {
	req.logout();
	res.redirect("/");
});

module.exports = router;
