const User = require("../Models/User");
const { Router } = require("express");
const router = new Router();
//RETURN ALL USERS
router.get("/", (req, res) => {
  User.findAll({
    attributes: ["id", "username", "password", "mail"]
  })
    .then(resp => {
      console.log("ima li nas");
      console.log("resp length:", resp.length);
      res.send(resp);
      //for(let i=0;i <resp.length)
    })
    .catch();
});

module.exports = router;
