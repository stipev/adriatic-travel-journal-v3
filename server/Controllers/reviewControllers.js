const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../Models/Code");
//const UserCode = require("../Models/UserCode");
const Review = require("../Models/Review");

const getUserReviews = userId => {
  return new Promise((resolve, reject) => {
    Review.findAll({
      attributes: ["id", "code", "location", "date", "review", "rate"],
      where: {
        FK_user_review: userId
      }
    })
      .then(reviews => {
        let userReviews = [];
        for (let i = 0; i < reviews.length; i++) {
          userReviews.push(reviews[i].dataValues);
        }
        //console.log("user reviews: ", userReviews);
        resolve(userReviews);
      })
      .catch(error => reject(error));
  });
};

const getAllReviews = () => {
  return Review.findAll({
    attributes: ["username", "location", "date", "review", "rate"]
  });
};

const addReview = (userId, code, review, rate, location, date, username) => {
  return new Promise((resolve, reject) => {
    Code.findOne({
      where: {
        [Op.and]: [{ code }, { activated: false }]
      }
    })
      .then(_code => {
        if (_code) {
          const { id } = _code.dataValues;

          Promise.all([
            //UserCode.create({ FK_user_usercode: userId, FK_code_usercode: id }),

            Code.update(
              {
                activated: true,
                FK_userId: userId
              },
              { where: { id } }
            ),
            Review.create({
              FK_user_review: userId,
              FK_code_review: id,
              code,
              review,
              rate,
              location,
              date,
              username
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

module.exports = { addReview, getAllReviews, getUserReviews };
