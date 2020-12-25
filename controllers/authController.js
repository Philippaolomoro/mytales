
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const AuthController = {
  localSignUp: async (req, res) => {
    try {
      const { displayName, email, password, password2 } = req.body;
      const errors = [];
      const hashedPassword = bcrypt.hashSync(req.body.password, 8);
      if (process.env.NODE_ENV === "development") {
        console.log(
          " username " + displayName + " email :" + email + " pass:" + password
        );
      }
      if (!displayName || !email || !password || !password2) {
        errors.push({ message: "Please fill in all fields" });
      }
      if (password !== password2) {
        errors.push({ message: "Passwords don't match" });
      }
      if (password < 6) {
        errors.push({ message: "Password should be at least six characters" });
      }
      if (errors.length > 0) {
        res.render("/register", {
          errors: errors,
          displayName: displayName,
          email: email,
          password: password,
          password2: password2,
        });
      } else {
        await User.findOne({ email: email })
        .then(async (user) => {
          if (process.env.NODE_ENV === "development") {
            console.log(user);
          }
          if (user) {
            errors.push({ message: "email already exists" });
            res.render(res, errors, displayName, email, password, password2);
          } else {
            const newUser = {
              displayName: displayName,
              email: email,
              password: hashedPassword,
            };
            await User.create(newUser).then(value => {
              console.log(value);
              res.redirect("login");
            }).catch(err => {
              console.error(err)
            })
          }
        })
        .catch((err) => {
          console.error(err);
        });
      }
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = AuthController;

