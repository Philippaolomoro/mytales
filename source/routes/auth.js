const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc auth with google
router.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] })
);

// @desc google auth callback
router.get(
	"/google/callback",
	passport.authenticate("google", { failureRedirect: "/login" }),
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
