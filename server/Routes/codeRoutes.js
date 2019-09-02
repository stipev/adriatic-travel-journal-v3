const { Router } = require("express");
const passport = require("passport");
const passportConf = require("../configuration/passport");
const {
  findAllUserCodes,
  getPrizeWinners,
  setWinnerCode,
  getWinnerCodes
} = require("../Controllers/codeControllers");

const router = new Router();

router.post(
  "/code/user",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { userId } = req.body;
    findAllUserCodes(userId)
      .then(codes => {
        res.json({ codes });
      })
      .catch(error => console.log("error: ", error));
  }
);
router.patch(
  "/codes/active",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let codes = [];

    getPrizeWinners()
      .then(_codes => {
        for (let i = 0; i < _codes.length; i++) {
          codes.push(_codes[i].dataValues);
        }
        Promise.all([
          setWinnerCode(1, codes[0].code),
          setWinnerCode(2, codes[1].code),
          setWinnerCode(3, codes[2].code)
        ]).then(() => {
          res.json({ codes });
        });
      })
      .catch();
  }
);

router.get(
  "/codes/winner",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    getWinnerCodes().then(winners => {
      res.json({ winners });
    });
  }
);

module.exports = router;
