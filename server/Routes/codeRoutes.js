const { Router } = require("express");
const passport = require("passport");
const passportConf = require("../configuration/passport");
const { findAllUserCodes } = require("../Controllers/codeControllers");

const router = new Router();

router.post(
  "/code/all",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { userId } = req.body;
    findAllUserCodes(userId)
      .then(userCodes => {
        const { codes } = userCodes;
        res.json({ codes });
      })
      .catch(error => console.log("error: ", error));
  }
);

module.exports = router;
