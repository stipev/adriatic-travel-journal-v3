const Sequelize = require("sequelize");
const db = require("../database");

const Code = db.define("code", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING
    //defaultValue: "AA"
  },

  activated: {
    type: Sequelize.BOOLEAN
    //defaultValue: false
  }
});

module.exports = Code;
