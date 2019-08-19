const Sequelize = require("sequelize");
const db = require("../database");

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
  visited: {
    type: Sequelize.BOOLEAN
  }
});

module.exports = Location;
