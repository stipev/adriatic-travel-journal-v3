const passport = require("passport");
//const JwtStrategy = require("passport-jwt").Strategy;
//const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
//const JWT_SECRET = "secret";
const User = require("../models/User");
//const sha256 = require("sha256");

passport.use(
  new LocalStrategy((username, password, done) => {
    console.log("LOCAL STRATEGY");
    const user = User.findAll({
      where: {
        username
        //  password: sha256(password)
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
  })
);

// JSON WEB TOKENS STRATEGY
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//       secretOrKey: JWT_SECRET
//     },
//     //async
//     (payload, done) => {
//       console.log("payload", payload);
//       const user = User.findAll({
//         where: {
//           username: payload.username
//         }
//       })
//         .then(() => {
//           if (!user) {
//             return done(null, false);
//           } else if (user) {
//             done(null, user);
//           }
//         })
//         .catch(error => done(error, null));
//     }
//   )
// );

/*passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});*/
