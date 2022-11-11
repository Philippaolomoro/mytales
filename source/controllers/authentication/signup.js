const { validationResult } = require("express-validator");

const logger = require("../../utils/logger");
const User = require("../../models/user.model");

const SignupController = {
  localSignUp: async (req, res) => {
    const data = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render("pages/entrance/register", {
        alert
      });
      return;
    }

    try {
      const user = await User.findOne({ email: data.email });
      if (!user) {
        const newUser = new User({
          ...data,
          signupMode: "Local",
        });
        await newUser.save((err) => {
          if (err) {
            logger.error(err);
            res.render("error/500");
            return;
          }
          res.redirect("entrance/login");

          return;
        });
      } else {
        res.render("pages/entrance/register", {
          errorMessage: "emailExists",
        });
        return;
      }
    } catch (err) {
      logger.error(err);
      res.render("error/500");
    }
  },
};

module.exports = SignupController;
