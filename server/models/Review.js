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
  code: {
    type: Sequelize.STRING
  },
  review: {
    type: Sequelize.STRING
  },
  rate: {
    type: Sequelize.INTEGER
  },
  username: {
    type: Sequelize.STRING
  },
  location: {
    type: Sequelize.STRING
  },
  date: {
    type: Sequelize.STRING
  }
});

module.exports = Review;
