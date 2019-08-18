const Sequelize = require("sequelize");
const User = require("../Models/User");
const Op = Sequelize.Op;
const { Router } = require("express");
const router = new Router();
const SECRET = "secret";
const jwt = require("jsonwebtoken");
const decode = require("jwt-decode");
const passport = require("passport");
const passportConf = require("../passport");
const { signUp } = require("./signup");

// const passport = require("passport");
// const passportConf = require("../passport");

// SELECT * FROM post WHERE authorId = 12 OR authorId = 13;

signToken = (username, id) => {
  return jwt.sign(
    {
      username,
      id
    },
    SECRET
  );
};

router.post("/signup", (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;
  signUp(firstName, lastName, username, email, password)
    .then(resp => {
      console.log("SENDING RESS.....");
      res.json(resp);
    })
    .catch(err => console.log("err mes:", err));
});

/*app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
*/

router.get("/signin", (req, res) => {
  res.json({ message: "failure" });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    failureRedirect: "/signin",

    session: false
  }),
  (req, res) => {
    console.log("req.body", req.body);
    const { username, id, password } = req.body;
    const token = signToken(username, id);
    //console.log("signed token: ", token);
    res.json({ token });
  }
);

//STARI LOG IN

// router.post("/login", (req, res) => {
//   //console.log("oce li ");
//   //console.log("req: ", req);
//   //console.log("req.body : ", req.body);
//   let { username, password } = req.body;
//   console.log("username: ", username);
//   password = sha256(password);
//   console.log("password", password);
//   console.log("password length", password.length);
//   //res.send(200);
//   console.log("username from req body:", username);
//   User.findAll({
//     where: {
//       [Op.and]: [{ username }, { password }]
//     }
//   })
//     .then(resp => {
//       const { username, id } = resp[0].dataValues;
//       //console.log("resp username", resp[0].dataValues.id);
//       let token = jwt.sign(
//         {
//           username,
//           id
//         },
//         SECRET
//       );
//       //res.send(decode(token));
//       let decodedToken = decode(token);
//       console.log("decoded token iat: ", decodedToken.iat);
//       res.send(token);
//       //res.send(resp);

//       //console.log("res: ", resp);
//     })
//     .catch();
// });

//STARI KOD TEST SEQUELIZE-A
// router.get("/one", (req, res) => {
//   User.findAll({
//     where: {
//       id: 94
//     }
//   })
//     .then(resp => {
//       res.send(resp);
//       console.log("res: ", resp);
//     })
//     .catch();
// });

module.exports = router;
