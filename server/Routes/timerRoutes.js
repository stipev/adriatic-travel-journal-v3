const { Router } = require("express");
const { getPrizeTimer } = require("../Controllers/timerControllers");

const router = new Router();

router.get("/timers", (req, res) => {
  getPrizeTimer()
    .then(prizeTimer => {
      const { expirationDate } = prizeTimer[0].dataValues;
      console.log("prizetimer:", expirationDate);
      res.json({ expirationDate });
    })
    .catch();
});

module.exports = router;
