const router = require("express").Router()

const authenticationRoute = require("./authentication")

router.get("/", (req, res) => {
  res.render("pages/index");
});

router.use("/auth", authenticationRoute)

module.exports = router