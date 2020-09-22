const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/auth");
const Story = require("../models/Story")

// @desc stories/add
router.get("/add",isLoggedIn, (req, res) => {
	res.render("stories/addStories");
});

// process add form
router.post("/", isLoggedIn, async(req, res) => {
	try {
		req.body.user = req.user.id
		await Story.create(req.body)
		res.redirect("/dashboard")
	} catch (err) {
		console.error(err)
		res.render("error/serverError")
	}
})

router.get("/", isLoggedIn, async(req, res) => {
	console.log(req.user)
	try {
		const stories = await Story.find({status: "public"}).populate("user").sort({createdAt: "desc"}).lean()

		res.render("stories/viewStories", {stories})
	} catch (err) {
		console.error(err)
		res.render("error/serverError")	
	}
})

module.exports = router;
