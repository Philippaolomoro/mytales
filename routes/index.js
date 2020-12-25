const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isGuest } = require("../middleware/auth");
const Story = require("../models/Story");
const User = require("../models/User");
const AuthController = require("../controllers/authController");
const { Router } = require("express");

// @desc landing page
router.get("/", (req, res) => {
	res.render("landingview", {
		layout: "landing",
	});
});

router.get("/login", isGuest, (req, res) => {
	res.render("login");
});

router.get("/register", isGuest, (req, res) => {
	res.render("register")
})

router.get("/dashboard", isLoggedIn, async (req, res) => {
	try {
		const stories = await Story.find({user: req.user.id}).lean()
		res.render("dashboard", {name: req.user.firstName, stories});
	} catch (error) {
		res.render("error/serverError")
	}
});

// @desc local registration and login
router.post("/local-signup", AuthController.localSignUp)


router.post(
	"/local-login",
	passport.authenticate("local", { failureRedirect: "/" }),
	function (req, res) {
		res.redirect("/dashboard");
	}
);


module.exports = router;
