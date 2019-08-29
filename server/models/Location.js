const Sequelize = require("sequelize");
const db = require("../configuration/database");

const Location = db.define("location", {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  latitude: {
    type: Sequelize.DOUBLE(11, 10)
  },
  longitude: {
    type: Sequelize.DECIMAL
  },
  sign: {
    type: Sequelize.STRING
  },
  visited: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Location;
