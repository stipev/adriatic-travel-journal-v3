const Location = require("../models/Location");

const getAllLocations = () => {
  return Location.findAll();
};

module.exports = { getAllLocations };
