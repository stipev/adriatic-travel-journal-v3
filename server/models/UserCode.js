const Sequelize = require("sequelize");
const db = require("../configuration/database");

const UserCode = db.define("usercode", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  FK_user_usercode: {
    type: Sequelize.INTEGER
  },

  FK_code_usercode: {
    type: Sequelize.INTEGER
  }
});

module.exports = UserCode;
