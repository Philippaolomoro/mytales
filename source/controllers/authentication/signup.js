const { validationResult } = require("express-validator");

const logger = require("../../utils/logger");
const User = require("../../models/user.model");

const SignupController = {
  localSignUp: async (req, res) => {
    const {fullName, email, password} = req.body;



    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const form = [{
        fullName: req.body.fullName,
        email: req.body.email,
        password: req.body.password,
      }];
      const alert = errors.array();
      res.render("pages/entrance/register", {
        alert: alert,
        form: form
      });
      return;
    }

    try {
      const user = await User.findOne({ email });
      if (!user) {
        const newUser = new User({
          email,
          password,
          fullName,
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
          "errorMessage" : "emailExists",
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
