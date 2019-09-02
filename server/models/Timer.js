const Sequelize = require("sequelize");
const db = require("../configuration/database");

const Timer = db.define("timer", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  expirationDate: {
    type: Sequelize.STRING
  }
});

module.exports = Timer;
