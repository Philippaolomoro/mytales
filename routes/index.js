const express = require("express");
const router = express.Router();
const { isLoggedIn, isGuest } = require("../middleware/auth");
const Story = require("../models/Story")

// @desc landing page
router.get("/", (req, res) => {
	res.render("landingview", {
		layout: "landing",
	});
});

router.get("/login", isGuest, (req, res) => {
	res.render("login");
});

router.get("/dashboard", isLoggedIn, async (req, res) => {
	try {
		const stories = await Story.find({user: req.user.id}).lean()
		res.render("dashboard", {name: req.user.firstName, stories});
	} catch (error) {
		res.render("error/serverError")
	}
});


module.exports = router;
