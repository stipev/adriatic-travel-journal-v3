const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../Models/Code");
const UserCode = require("../Models/UserCode");

const findAllUserCodes = userId => {
  return new Promise((resolve, reject) => {
    let codesId = [];
    let userCodes = [];

    UserCode.findAll({
      attributes: ["FK_code_usercode"],
      where: {
        FK_user_usercode: userId
      }
    })
      .then(usercode => {
        for (let i = 0; i < usercode.length; i++) {
          codesId.push(usercode[i].dataValues.FK_code_usercode);
        }
        Code.findAll({
          where: {
            id: {
              [Op.in]: codesId
            }
          }
        }).then(code => {
          for (let i = 0; i < code.length; i++) {
            userCodes.push(code[i].dataValues.code);
          }
          resolve({ codes: userCodes });
        });
      })
      .catch(error => reject(error));
  });
};

module.exports = { findAllUserCodes };
