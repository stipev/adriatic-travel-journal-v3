const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../Models/Code");
const UserCode = require("../Models/UserCode");
const Review = require("../Models/Review");

const addReview = (userId, code, review, rate) => {
  return new Promise((resolve, reject) => {
    Code.findOne({
      where: {
        [Op.and]: [{ code }, { activated: false }]
      }
    })
      .then(code => {
        if (code) {
          const { id } = code.dataValues;

          Promise.all([
            UserCode.create({ FK_user_usercode: userId, FK_code_usercode: id }),
            Code.update(
              {
                activated: true
              },
              { where: { id } }
            ),
            Review.create({
              FK_user_review: userId,
              FK_code_review: id,
              review,
              rate
            })
          ]).then(aaa => {
            resolve("Review submited successfully!");
          });
        } else {
          resolve("Invalid code submited!");
        }
      })
      .catch(error => reject(error));
  });
};

module.exports = { addReview };
