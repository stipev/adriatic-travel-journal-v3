const Location = require("../Models/Location");
const Code = require("../Models/Code");

Location.findAll()
  .then(res => {
    for (let i = 0; i < res.length; i++) {
      for (let j = 1; j <= 31; j++) {
        date = new Date(`August ${j}, 2018 15:00:00`).toLocaleDateString();

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
  .catch();

console.log("DATE", new Date("August 1, 2018 15:00:00").toLocaleDateString());
