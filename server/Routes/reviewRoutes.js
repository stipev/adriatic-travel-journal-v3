const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const passportConf = require("../configuration/passport");

const { addReview } = require("../Controllers/reviewControllers");

router.post(
  "/review/add",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let { code, userId, review, rate } = req.body;
    addReview(userId, code, review, rate)
      .then(message => {
        res.json({ message });
      })
      .catch(error => console.log("error: ", error));
  }
);

module.exports = router;
