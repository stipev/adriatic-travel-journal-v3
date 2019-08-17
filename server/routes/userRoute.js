const { Router } = require("express");
const { signUp } = require("../controllers/userController");
const passportC = require("../bin/passport");
const passport = require("passport");

//const passport = require("passport");
const router = new Router();

router.post("/signup", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  signUp(firstName, lastName, username, email, password)
    .then(resp => {
      console.log("SENDING RESS.....");
      res.json(resp);
    })
    .catch(err => console.log("err mes:", err));
  //console.log("req body", req.body);

  //res.send({ success: true });
});

router.post(
  "/signin",
  passport.authenticate("local", { failureRedirect: "/signin" }),
  (req, res) => {
    console.log("imalite");
  }
);

module.exports = router;
