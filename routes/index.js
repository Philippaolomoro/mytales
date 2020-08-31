const express = require("express");
const router = express.Router();
const { isLoggedIn, isGuest } = require("../middleware/auth");

// @desc landing page
router.get("/", (req, res) => {
	res.render("landingview", {
		layout: "landing",
	});
});

router.get("/register", isGuest, (req, res) => {
	res.render("register");
});

router.get("/login", isGuest, (req, res) => {
	res.render("login");
});

router.get("/dashboard", isLoggedIn, (req, res) => {
	res.render("dashboard");
});

module.exports = router;
