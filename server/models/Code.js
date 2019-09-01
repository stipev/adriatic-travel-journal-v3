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
  },
  FK_userId: {
    type: Sequelize.INTEGER
    //jeli triba za foreign key
  },
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  },
  winner: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Code;
