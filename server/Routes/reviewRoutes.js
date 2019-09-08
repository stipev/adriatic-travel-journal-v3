const { Router } = require("express");
const router = new Router();
const passport = require("passport");
const passportConf = require("../configuration/passport");
const { getDateAndLocation } = require("../controllers/codeControllers");
const {
  addReview,
  getAllReviews,
  getUserReviews,
  deleteReview,
  updateReview
} = require("../controllers/reviewControllers");

router.patch(
  "/reviews",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { userId, code, review, rate } = req.body;
    updateReview(userId, review, rate, code)
      .then(resp => {
        resp[0] === 1
          ? res.json({ message: "Successfully updated review" })
          : res.json({ message: "Error while updating review" });
      })
      .catch(error => console.log("error: ", error));
  }
);

router.get(
  "/reviews",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    getAllReviews()
      .then(reviewsData => {
        let reviews = [];

        for (let i = 0; i < reviewsData.length; i++) {
          reviews.push(reviewsData[i].dataValues);
        }

        res.json({ reviews });
      })
      .catch(error => console.log("erorr: ", error));
  }
);

router.get(
  "/reviews/:userId",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let { userId } = req.params;
    userId = parseInt(userId);
    getUserReviews(userId)
      .then(userReviews => {
        res.json({ userReviews });
      })
      .catch(error => console.log("error: ", error));
  }
);

router.delete(
  "/reviews",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { code } = req.body;
    deleteReview(code)
      .then(() => res.json("Review successfully deleted!"))
      .catch(error => console.log("error: ", error));
  }
);

router.post(
  "/reviews",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let { code, userId, review, rate, username } = req.body;

    getDateAndLocation(code)
      .then(resp => {
        const { location } = resp.dataValues;
        const { date } = resp.dataValues;
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
