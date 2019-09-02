const User = require("../Models/User");
const Location = require("../Models/Location");
const Code = require("../Models/Code");
const Review = require("../Models/Review");
const Timer = require("../Models/Timer");
const bcrypt = require("bcrypt");
const BCRYPT_SALT_ROUNDS = 12;

const users = [
  {
    firstName: "Stipe",
    lastName: "Stipic",
    username: "stipe12",
    email: "stipe@stipe.com",
    password: "12345"
  },
  {
    firstName: "Mate",
    lastName: "Matic",
    username: "Mate12",
    email: "mate@mate.com",
    password: "12345"
  },
  {
    firstName: "Marko",
    lastName: "Markic",
    username: "marko12",
    email: "marko@marko.com",
    password: "12345"
  }
];

const locations = [
  {
    name: "Zadar",
    description: "Beautiful city",
    sign: "ZD",
    latitude: 44.1350575,
    longitude: 15.1788635,
    visited: false
  },
  {
    name: "Split",
    sign: "ST",
    description: "Beautiful city",
    latitude: 43.5160411,
    longitude: 16.4140639,
    visited: false
  },
  {
    name: "Sibenik",
    sign: "SI",
    description: "Beautiful city",
    latitude: 43.7416835,
    longitude: 15.8174061,
    visited: false
  }
];

const createTestLocations = () => {
  for (let i = 0; i < locations.length; i++) {
    Location.create({
      name: locations[i].name,
      description: locations[i].description,
      latitude: locations[i].latitude,
      longitude: locations[i].longitude,
      sign: locations[i].sign,
      visited: false
    });
  }
};

const createTestUsers = () => {
  for (let i = 0; i < users.length; i++) {
    bcrypt.hash(users[i].password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
      User.create({
        firstName: users[i].username,
        lastName: users[i].lastName,
        username: users[i].username,
        email: users[i].email,
        password: hashedPassword
      });
    });
  }
};

const createTestCodes = () => {
  Location.findAll()
    .then(res => {
      for (let i = 0; i < res.length; i++) {
        for (let j = 1; j <= 31; j++) {
          date = new Date(`August ${j}, 2019 15:00:00`).toLocaleDateString();

          let code = res[i].dataValues.sign + date;
          console.log("code:", code);
          Code.create({
            code,
            activated: false,
            date,
            location: res[i].dataValues.name,
            winner: false
          });
        }
      }
    })
    .catch(error => console.log("erorr: ", error));
};

const createTestReviews = () => {
  User.findAll({
    attributes: ["id", "username"]
  }).then(userIdsData => {
    let userIds = [];
    let usernames = [];
    let numberOfUsers = userIdsData.length;
    // console.log("us", userIdsData[0].dataValues);
    for (let i = 0; i < userIdsData.length; i++) {
      userIds.push(userIdsData[i].dataValues.id);
      usernames.push(userIdsData[i].dataValues.username);
    }
    // console.log("user ids", userIds);
    // console.log("user names", usernames);
    Code.findAll({
      attributes: ["code", "location", "date"],

      limit: 3 * numberOfUsers
    }).then(codesData => {
      let codes = [];
      let locations = [];
      let dates = [];
      //   console.log("codesdata: ", codesData.length);
      //   console.log("codesdata: ", codesData[0].dataValues);
      for (let i = 0; i < codesData.length; i++) {
        codes.push(codesData[i].dataValues.code);
        locations.push(codesData[i].dataValues.location);
        dates.push(codesData[i].dataValues.date);
      }
      //   console.log("codes", codes);
      //   console.log("locations", locations);
      //   console.log("dates", dates);
      console.log("EFORE", userIds);
      let newUserIds = [];
      let newUserUsernames = [];
      let j = 0;
      //newUserIds = 3 * userIds;
      for (let i = 0; i < codes.length; i++) {
        if (j === 6) {
          j = 0;
          newUserIds[i] = userIds[j];
          newUserUsernames[i] = usernames[j];
          j++;
        } else {
          newUserIds[i] = userIds[j];
          newUserUsernames[i] = usernames[j];

          j++;
        }
      }

      console.log("AFTER: ", newUserIds);
      console.log("AFTER: ", newUserUsernames);
      console.log("AFTER: ", newUserIds.length);
      console.log("AFTER: ", newUserUsernames.length);
      for (let i = 0; i < codes.length; i++) {
        Review.create({
          review: "Bas je bilo dobro",
          rate: 4,
          FK_user_review: newUserIds[i],
          username: newUserUsernames[i],
          location: locations[i],
          date: dates[i],
          code: codes[i]
        });
      }
    });
  });
};

//createTestReviews();

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

let expirationDate = new Date(Date.now() + 2 * MINUTES + 5 * SECONDS).getTime();

createTestTimer = () => {
  Timer.destroy({ where: {} }).then(() => {
    Promise.all([
      Timer.create({
        expirationDate
      }),
      Code.update(
        {
          winner: false
        },
        {
          where: {
            winner: true
          }
        }
      )
    ]);
  });
};

Promise.all([createTestUsers(), createTestLocations()])
  .then(() => {
    createTestCodes();
  })
  .then(() => {
    Promise.all([createTestReviews(), createTestTimer()]);
  });
