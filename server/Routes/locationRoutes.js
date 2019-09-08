const { Router } = require("express");
const { getAllLocations } = require("../Controllers/locationControllers");

const router = new Router();

router.get(
  "/locations",

  (req, res) => {
    getAllLocations()
      .then(locationsData => {
        let locations = [];
        for (let i = 0; i < locationsData.length; i++) {
          locations.push(locationsData[i].dataValues);
        }

        res.json({ locations });
      })
      .catch(error => console.log("erorr", error));
  }
);

module.exports = router;
