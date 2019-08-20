const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const Sequelize = require("sequelize");

const { SECRET } = require("../secret/secret");
const User = require("../Models/User");

const Op = Sequelize.Op;

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      User.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }]
        }
      })
        .then(user => {
          if (!user) {
            return done(null, false);
          } else if (user) {
            req.body.id = user.dataValues.id;
            req.body.email = user.dataValues.email;
            req.body.username = user.dataValues.username;
            req.body.firstName = user.dataValues.firstName;
            req.body.lastName = user.dataValues.lastName;

            bcrypt
              .compare(req.body.password, user.dataValues.password)
              .then(isPasswordCorrect => {
                if (isPasswordCorrect) {
                  done(null, user);
                } else {
                  done(null, false);
                }
              });
          }
        })
        .catch(error => done(error, null));
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: SECRET
    },
    (payload, done) => {
      console.log("payload", payload);
      const user = User.findAll({
        where: {
          username: payload.username
        }
      })
        .then(() => {
          if (!user) {
            return done(null, false);
          } else if (user) {
            done(null, user);
          }
        })
        .catch(error => done(error, null));
    }
  )
);
