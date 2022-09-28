const Story = require("../models/story.model");

const isDevelopment = process.env.NODE_ENV === "development";
const StoryController = {
  create : async(req, res) => {
    try {
			req.body.user = req.user.id;
			await Story.create(req.body);
			res.redirect("/dashboard");
		} catch (err) {
      if (isDevelopment) console.error(err);
			res.render("error/serverError");
		}
  },

  viewAll: async(req, res) => {
    if(isDevelopment) console.log(req.user)
    try {
      const stories = await Story.find({ status: "public" })
				.populate("user")
				.sort({ createdAt: "desc" })
				.lean();

			res.render("stories/viewStories", { stories });
    } catch (err) {
      if (isDevelopment) console.error(err);
      res.render("error/serverError");
    }
  },

  // viewOne
  viewOne: async(req, res) => {
    try {
      const story = await Story.findById(req.params.id).populate('user').populate('googleuser');
      if (!story) {
        return res.render("error/notFound");
      }
      if(story.user._id != req.user.id && story.status == 'private'){
        res.render("error/notFound");
      } else {
        res.render("stories/singleStories", {
					story,
				});
      }
    } catch (err) {
      if (isDevelopment) console.error(err);
      res.render("error/serverError");
    }
  },
  // edit
  // Delete
}

module.exports = StoryController;