const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../Models/Code");

const getPrizeWinners = () => {
  return Code.findAll({
    order: [Sequelize.fn("RAND")],
    limit: 3,
    attributes: [["FK_userId", "userId"], "code"],

    where: {
      activated: true
    }
  });
};

const findActiveCodes = () => {
  return Code.findAll({
    attributes: [["id", "codeId"], "code"],
    where: {
      activated: true
    }
  });
};

const getDateAndLocation = code => {
  return Code.findOne({
    attributes: ["date", "location"],
    where: {
      code
    }
  });
};

const findAllUserCodes = userId => {
  let codes = [];

  return new Promise((resolve, reject) => {
    Code.findAll({
      attributes: ["id", "code", "location", "date"],
      where: {
        FK_userId: userId
      }
    })
      .then(userCodes => {
        for (let i = 0; i < userCodes.length; i++) {
          codes.push(userCodes[i].dataValues);
        }
        resolve({ codes });
      })
      .catch(error => reject(error));
  });
};
// const findAllUserCodes = userId => {
//   return new Promise((resolve, reject) => {
//     let codesId = [];
//     let userCodes = [];

//     UserCode.findAll({
//       attributes: ["FK_code_usercode"],
//       where: {
//         FK_user_usercode: userId
//       }
//     })
//       .then(usercode => {
//         for (let i = 0; i < usercode.length; i++) {
//           codesId.push(usercode[i].dataValues.FK_code_usercode);
//         }
//         Code.findAll({
//           where: {
//             id: {
//               [Op.in]: codesId
//             }
//           }
//         }).then(code => {
//           for (let i = 0; i < code.length; i++) {
//             userCodes.push(code[i].dataValues.code);
//           }
//           resolve({ codes: userCodes });
//         });
//       })
//       .catch(error => reject(error));
//   });
// };

module.exports = {
  findAllUserCodes,
  findActiveCodes,
  getDateAndLocation,
  getPrizeWinners
};
