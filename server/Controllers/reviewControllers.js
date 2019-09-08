const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../models/Code");
const Review = require("../models/Review");

const updateReview = (userId, review, rate, code) => {
  return Review.update(
    {
      review,
      rate
    },
    {
      where: {
        [Op.and]: [{ code }, { FK_user_review: userId }]
      }
    }
  );
};

const deleteReview = code => {
  return Promise.all([
    Review.destroy({
      where: {
        code
      }
    }),
    Code.update(
      {
        FK_userId: null,
        activated: false
      },
      {
        where: {
          code
        }
      }
    )
  ]);
};

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
          ]).then(() => {
            resolve("Review submited successfully!");
          });
        } else {
          resolve("Invalid code submited!");
        }
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  addReview,
  getAllReviews,
  getUserReviews,
  deleteReview,
  updateReview
};
