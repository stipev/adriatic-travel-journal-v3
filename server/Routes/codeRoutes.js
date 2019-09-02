const { Router } = require("express");
const passport = require("passport");
const passportConf = require("../configuration/passport");
const {
  findAllUserCodes,
  getPrizeWinners
} = require("../Controllers/codeControllers");

const router = new Router();

router.post(
  "/code/user",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { userId } = req.body;
    findAllUserCodes(userId)
      .then(codes => {
        //console.log("ŠTI IDE ", userCodes);
        //const { codes } = userCodes;
        res.json({ codes });
      })
      .catch(error => console.log("error: ", error));
  }
);
router.get(
  "/codes/active",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let codes = [];
    getPrizeWinners()
      .then(_codes => {
        for (let i = 0; i < _codes.length; i++) {
          codes.push(_codes[i].dataValues);
        }
        res.json({ codes });
      })
      .catch();
  }
);

module.exports = router;
