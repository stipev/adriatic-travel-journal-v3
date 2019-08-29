const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const passportConf = require("../configuration/passport");
const { getDateAndLocation } = require("../Controllers/codeControllers");
const {
  addReview,
  getAllReviews,
  getUserReviews
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
  "/review/user",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { userId } = req.body;
    console.log("user id ", userId);
    console.log("req body", req.body);
    getUserReviews(userId)
      .then(userReviews => {
        //console.log("userReviewsRes", userReviewsRes);
        res.json({ userReviews });
      })
      .catch(error => console.log("error: ", error));
    // userId
  }
);

router.delete(
  "/review/user/delete",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { reviewId } = req.body;
    deleteReview(reviewId)
      .then()
      .catch();
  }
);

router.post(
  "/review/add",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let { code, userId, review, rate, username } = req.body;

    getDateAndLocation(code)
      .then(resp => {
        console.log("resp", resp);
        console.log("resp.dataValues", resp.dataValues);
        const { location } = resp.dataValues;
        const { date } = resp.dataValues;
        console.log("username:", username);
        addReview(userId, code, review, rate, location, date, username).then(
          message => {
            res.json({ message });
          }
        );
      })
      .catch();
  }
);

module.exports = router;
