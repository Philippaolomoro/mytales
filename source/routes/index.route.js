const express = require("express");
const passport = require("passport");
const router = express.Router();
const { isLoggedIn, isGuest } = require("../middleware/auth");
const Story = require("../models/story.model");
const User = require("../models/user.model");
const AuthController = require("../controllers/authController");
const { Router } = require("express");

// @desc landing page


router.get("/dashboard", (req, res) => {
	res.render("layout/dashboard")
})

router.get("/login", isGuest, (req, res) => {
	res.render("login");
});

router.get("/register", (req, res) => {
	res.render("register")
})

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
