const Code = require("../Models/Code");
const Sequelize = require("sequelize");

Code.findAll({
  order: [Sequelize.fn("RAND")],
  limit: 3,
  where: {
    activated: true
  }
}).then(codes => {
  console.log("code", codes.length);
  for (let i = 0; i < codes.length; i++) {
    console.log("code:", codes[i].dataValues);
  }
});
