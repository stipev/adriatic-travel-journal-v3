const Location = require("../Models/Location");

const getAllLocations = () => {
  return Location.findAll();
};

module.exports = { getAllLocations };
