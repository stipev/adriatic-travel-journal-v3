const Timer = require("../Models/Timer");
const sequelize = require("sequelize");
const getPrizeTimer = () => {
  return Timer.findAll({
    attributes: ["expirationDate", sequelize.fn("MIN", sequelize.col("id"))]
  });
};

// // Vehicle.findAll({
// //     `attributes: [
//         sequelize.fn('MAX', sequelize.col('id'))
//      ],
//      where: {
//        { 'vsr_id': 342 }
//      }
//    });

module.exports = { getPrizeTimer };
