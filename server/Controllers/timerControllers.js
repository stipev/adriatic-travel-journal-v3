const Timer = require("../models/Timer");
const sequelize = require("sequelize");
const getPrizeTimer = () => {
  return Timer.findAll({
    attributes: ["expirationDate", sequelize.fn("MIN", sequelize.col("id"))]
  });
};

module.exports = { getPrizeTimer };
