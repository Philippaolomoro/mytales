const authenticationRouter = require("express").Router();
const { validateSignup } = require("../middleware/validation");

const { SignupController } = require("../controllers/authentication");



authenticationRouter.get("/register", (req, res) => {
  res.render("pages/entrance/register");
});

authenticationRouter.post(
  "/register",
  validateSignup,
  SignupController.localSignUp
);

authenticationRouter.get("/login", (req, res) => {
  res.render("pages/entrance/login");
});

module.exports = authenticationRouter;
