const Sequelize = require("sequelize");
const db = require("../configuration/database");

const Code = db.define("code", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  code: {
    type: Sequelize.STRING
  },

  activated: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Code;
