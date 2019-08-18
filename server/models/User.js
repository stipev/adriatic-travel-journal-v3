const Sequelize = require("sequelize");
const db = require("../database");

const User = db.define("user", {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  },
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;

// const Sequelize = require("sequelize");
// const db = require("../database");

// const User = db.define("user", {
//   username: {
//     type: Sequelize.STRING
//   },
//   password: {
//     type: Sequelize.STRING
//   },
//   mail: {
//     type: Sequelize.STRING
//   }
// });

// module.exports = User;
