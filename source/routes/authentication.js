const authenticationRouter = require("express").Router();
const {check} = require("express-validator")

const { SignupController } = require("../controllers/authentication");

authenticationRouter.get("/register", (req, res) => {
  res.render("pages/entrance/register");
});
authenticationRouter.post("/register",
  [
    check("fullName", "This username must me 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    check("email", "Email is not valid").isEmail().normalizeEmail(),
    check("password", "There must be a password").exists()
  ],
  SignupController.localSignUp);

authenticationRouter.get("/login", (req, res) => {
  res.render("pages/entrance/login");
});

module.exports = authenticationRouter;
