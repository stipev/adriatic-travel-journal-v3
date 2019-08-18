const Sequelize = require("sequelize");
const sha256 = require("sha256");
const User = require("../Models/User");
const Op = Sequelize.Op;
const { Router } = require("express");
const router = new Router();
const SECRET = "secret";
const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
const passportConf = require("../passport");
const passport = require("passport");
// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

router.get(
  "/secret",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("sectet success!!!!!");
    res.json({ message: "SECRET authentication successfull" });
  }
);

module.exports = router;
