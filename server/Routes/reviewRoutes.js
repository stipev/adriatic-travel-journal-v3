const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const passportConf = require("../configuration/passport");

const {
  addReview,
  getAllReviews
} = require("../Controllers/reviewControllers");

const { findActiveCodes } = require("../Controllers/codeControllers");

router.get(
  "/review/all",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    getAllReviews()
      .then(reviewsData => {
        let reviews = [];
        let codeIds = [];
        let userIds = [];
        for (let i = 0; i < reviewsData.length; i++) {
          reviews.push(reviewsData[i].dataValues);
          codeIds.push(reviewsData[i].dataValues.codeId);
          userIds.push(reviewsData[i].dataValues.userId);
        }
        findActiveCodes().then(activeCodesData => {
          for (let i = 0; i < reviewsData.length; i++) {
            console.log("kod: ", activeCodesData[i].dataValues);
            //codeIds.push(reviewsData[i].dataValues.codeId);
            //userIds.push(reviewsData[i].dataValues.userId);
          }
        });
        //console.log("reviews: ", reviews);
        // console.log("codeIds", codeIds);
        //console.log("userIds", userIds);

        res.json({ reviews });
      })
      .catch(error => console.log("erorr", error));
  }
);

router.post(
  "/review/add",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let { code, userId, review, rate } = req.body;
    addReview(userId, code, review, rate)
      .then(message => {
        res.json({ message });
      })
      .catch(error => console.log("error: ", error));
  }
);

module.exports = router;
