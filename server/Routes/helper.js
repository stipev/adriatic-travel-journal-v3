const Code = require("../Models/Code");
const Sequelize = require("sequelize");
//UPDATE  adriatictraveljournaldb.codes SET FK_userId=null AND activated=false WHERE id=279 ;

// Code.update(
//   {
//     FK_userId: null,
//     activated: false
//   },
//   {
//     where: {
//       activated: true
//     }
//   }
// );

// Code.findAll({
//   order: sequelize.random(),
//   limit: 3,
//   where: {
//     activated: true
//   }
// })
//   .then(res => console.log("res", res))
//   .catch(err => console.log("err", err));

// Code.findAll({ order: ["id"], limit: 1 }).then(code => {
//   console.log("code", code);
// });

Code.findAll({
  order: [Sequelize.fn("RAND")],
  limit: 3,
  where: {
    activated: true
  }
}).then(codes => {
  console.log("code", codes.length);
  for (let i = 0; i < codes.length; i++) {
    console.log("code:", codes[i].dataValues);
  }
});
