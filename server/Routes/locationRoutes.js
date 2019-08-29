const { Router } = require("express");
const passport = require("passport");
const passportConf = require("../configuration/passport");
const { getAllLocations } = require("../Controllers/locationControllers");

const router = new Router();

router.get(
  "/location/all",
  //passport.authenticate("jwt", { session: false }),

  (req, res) => {
    getAllLocations()
      .then(locationsData => {
        let locations = [];
        for (let i = 0; i < locationsData.length; i++) {
          //console.log("location: ", locationsData[i].dataValues);
          locations.push(locationsData[i].dataValues);
        }
        console.log("locations: ", locations);
        res.json({ locations });
      })
      .catch(error => console.log("erorr", error));
  }
);

module.exports = router;
