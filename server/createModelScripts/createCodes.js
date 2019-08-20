const Location = require("./Location");
const Code = require("./Code");

Location.findAll()
  .then(res => {
    for (let i = 0; i < res.length; i++) {
      //console.log("resss", res[i].dataValues.sign);
      for (let j = 1; j <= 31; j++) {
        let code =
          res[i].dataValues.sign +
          new Date(`August ${j}, 2018 15:00:00`).toLocaleDateString();
        console.log("code:", code);
        Code.create({ code, activated: false })
          .then()
          .catch();
      }
    }
  })
  .catch();

console.log("DATE", new Date("August 1, 2018 15:00:00").toLocaleDateString());
