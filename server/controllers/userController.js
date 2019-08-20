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
const Code = require("../Models/Code");
const UserCode = require("../Models/UserCode");
const Review = require("../Models/Review");

signToken = (id, username, email, firstName, lastName) => {
  return jwt.sign(
    {
      id,
      username,
      email,
      firstName,
      lastName
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

router.get("/signin", (req, res) => {
  //  console.log("req.message", req.message);
  //console.log("FLASSSSSSHHHH2", req.body.message);
  res.json({ message: "Incorrect user data!", success: false });
});

router.post(
  "/signin",
  passport.authenticate("local", {
    //failureFlash: true,
    failureRedirect: "/signin",
    session: false
  }),
  (req, res) => {
    const { id, username, email, firstName, lastName } = req.body;

    const token = signToken(id, username, email, firstName, lastName);

    res.json({ token, success: true });
  }
);

router.post(
  "/code/all",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    const { userId } = req.body;
    console.log("userId: ", userId);
    let codesId = [];
    let userCodes = [];

    UserCode.findAll({
      attributes: ["FK_code_usercode"],
      where: {
        FK_user_usercode: userId
      }
    })
      .then(usercode => {
        for (let i = 0; i < usercode.length; i++) {
          //console.log("VALUEE:", resp[i].dataValues.FK_code_usercode);
          codesId.push(usercode[i].dataValues.FK_code_usercode);
        }
        console.log("svi id-evi: ", codesId);
        Code.findAll({
          where: {
            id: {
              [Op.in]: codesId
            }
          }
        }).then(code => {
          for (let i = 0; i < code.length; i++) {
            userCodes.push(code[i].dataValues.code);
          }
          res.json({ codes: userCodes });
        });
      })
      .catch();
  }
);

router.post(
  "/review/add",
  passport.authenticate("jwt", { session: false }),

  (req, res) => {
    let { code, userId, review, rate } = req.body;
    console.log("USER ID", userId);
    console.log("review i rate", review, rate);
    // console.log("POST CODE", code);
    Code.findOne({
      where: {
        [Op.and]: [{ code }, { activated: false }]
      }
    })
      .then(code => {
        if (code) {
          const { id } = code.dataValues;

          Promise.all([
            UserCode.create({ FK_user_usercode: userId, FK_code_usercode: id }),
            Code.update(
              {
                activated: true
              },
              { where: { id } }
            ),
            Review.create({
              FK_user_review: userId,
              FK_code_review: id,
              review,
              rate
            })
          ]).then(aaa => {
            console.log("PROMISE ALL !");
            res.json({ message: " Review submited successfully" });
          });
        } else {
          res.json({ message: "CODE ERROR" });
        }
      })
      .catch(err => console.log("erorr: ", err));
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
