const authenticationRouter = require("express").Router()

const { SignupController } = require("../controllers/authentication")

authenticationRouter.get("/register", (req, res) => {
  res.render("pages/entrance/register", {
    errorMessage: "emailExists",
    errorMessage: "saveError"
  })
})
authenticationRouter.post("/register", SignupController.localSignUp,)

module.exports = authenticationRouter