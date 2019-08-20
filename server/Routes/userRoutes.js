const { Router } = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportConf = require("../configuration/passport");
const { SECRET } = require("../secret/secret");
const { signUp } = require("../Controllers/userControllers");

const router = new Router();

signToken = (id, username, email, firstName, lastName) => {
  return jwt.sign(
    {
      id,
      username,
      email,
      firstName,
      lastName
    },
    SECRET
  );
};

router.post("/signup", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  signUp(firstName, lastName, username, email, password)
    .then(resp => {
      res.json(resp);
    })
    .catch(error => console.log("error :", error));
});

router.get("/signin", (req, res) => {
  res.json({ message: "Incorrect user data!", success: false });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    //failureFlash: true,
    failureRedirect: "/signin",
    session: false
  }),
  (req, res) => {
    const { id, username, email, firstName, lastName } = req.body;

    const token = signToken(id, username, email, firstName, lastName);

    res.json({ token, success: true });
  }
);

module.exports = router;
