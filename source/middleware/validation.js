const {body} = require("express-validator")

module.exports = {
  validateSignup: [
    body("fullName", "Name must be 3+ characters long")
      .exists()
      .isLength({ min: 3 }),
    body("email", "Email is an invalid value").isEmail().normalizeEmail(),
    body("password", "The password must be 5+ chars long")
      .not()
      .isIn(["123", "password", "god"])
      .withMessage("Do not use a common word as the password")
      .isLength({ min: 5 })
  ]
}