const logger = require("../../utils/logger");
const User = require("../../models/user.model");

const SignupController = {
  localSignUp: async (req, res) => {
    const data = req.body
    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        const newUser = new User({
          ...data,
          signupMode: "Local"
        });
        await newUser.save((err) => {
          if (err) {
            logger.error(err);
            res.render("error/500",);
            return
          }
          res.redirect("entrance/login");

          return
        });
      } else {
        res.render("pages/entrance/register", {
          errorMessage: "emailExists"
        })
      }
    } catch (err) {
      logger.error(err);
      res.render("error/500")
    }
  },
};

module.exports = SignupController;
