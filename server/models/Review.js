const Sequelize = require("sequelize");
const db = require("../configuration/database");

const Review = db.define("review", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  FK_user_review: {
    type: Sequelize.INTEGER
  },

  FK_code_review: {
    type: Sequelize.INTEGER
  },
  review: {
    type: Sequelize.STRING
  },
  rate: {
    type: Sequelize.INTEGER
  }
});

module.exports = Review;
