const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middleware/auth");
const StoryController = require("../controllers/storiesController");


router.get("/add",isLoggedIn, (req, res) => {
	res.render("stories/addStories");
});

router.post("/", isLoggedIn, StoryController.create);

router.get("/", isLoggedIn, StoryController.viewAll);
router.get("/:id", isLoggedIn, StoryController.viewOne);

module.exports = router;
