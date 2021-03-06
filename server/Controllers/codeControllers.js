const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const Code = require("../models/Code");
const { getWinner } = require("./userControllers");

const getWinnerCodes = () => {
  return new Promise((resolve, reject) => {
    Code.findAll({
      attributes: [["FK_userId", "userId"], "code", "place"],
      where: {
        winner: true
      }
    }).then(codesData => {
      let winners = [];
      for (let i = 0; i < codesData.length; i++) {
        winners.push(codesData[i].dataValues);
      }
      Promise.all([
        getWinner(winners[0].userId),
        getWinner(winners[1].userId),
        getWinner(winners[2].userId)
      ])
        .then(winnersData => {
          for (let i = 0; i < winnersData.length; i++) {
            winners[i].username = winnersData[i].username;
            winners[i].firstName = winnersData[i].firstName;
            winners[i].lastName = winnersData[i].lastName;
          }
          resolve(winners);
        })
        .catch(error => reject(error));
    });
  });
};

const getPrizeWinners = () => {
  return Code.findAll({
    order: [Sequelize.fn("RAND")],
    limit: 3,
    attributes: [["FK_userId", "userId"], "code"],

    where: {
      activated: true
    }
  });
};

const setWinnerCode = (place, code) => {
  return Code.update(
    {
      winner: true,
      place
    },
    {
      where: {
        code
      }
    }
  );
};

const findActiveCodes = () => {
  return Code.findAll({
    attributes: [["id", "codeId"], "code"],
    where: {
      activated: true
    }
  });
};

const getDateAndLocation = code => {
  return Code.findOne({
    attributes: ["date", "location"],
    where: {
      code
    }
  });
};

const findAllUserCodes = userId => {
  let codes = [];

  return new Promise((resolve, reject) => {
    Code.findAll({
      attributes: ["id", "code", "location", "date"],
      where: {
        FK_userId: userId
      }
    })
      .then(userCodes => {
        for (let i = 0; i < userCodes.length; i++) {
          codes.push(userCodes[i].dataValues);
        }
        resolve({ codes });
      })
      .catch(error => reject(error));
  });
};

module.exports = {
  findAllUserCodes,
  findActiveCodes,
  getDateAndLocation,
  getPrizeWinners,
  setWinnerCode,
  getWinnerCodes
};
