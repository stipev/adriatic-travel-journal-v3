const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const JWT_SECRET = "secret";
const User = require("./Models/User");
const sha256 = require("sha256");
const Sequelize = require("sequelize");

const Op = Sequelize.Op;

passport.use(
  new LocalStrategy(
    //  { passReqToCallback: true },
    (
      //req,
      username,
      password,
      done
    ) => {
      console.log("LOCAL STRATEGY");
      User.findOne({
        where: {
          [Op.or]: [{ username }, { email: username }],
          password
          //  password: sha256(password)
        }
      })
        .then(user => {
          console.log("ah taj user koji uvik postoji: ", user);
          if (!user) {
            console.log("NEMA USERA");
            return done(
              null,
              false
              //req.flash("error", "NEMA GAAA")
            );
          } else if (user) {
            console.log("IMA USERA");
            done(null, user);
          }
        })
        .catch(error => done(error, null));
    }
  )
);

// JSON WEB TOKENS STRATEGY
passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader("authorization"),
      secretOrKey: JWT_SECRET
    },
    //async
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

/*passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});*/

// LOCAL STRATEGY
// passport.use(
//   new LocalStrategy(
//     {
//       usernameField: "email"
//     },
//     async (email, password, done) => {
//       try {
//         // Find the user given the email
//         const user = await User.findOne({ email });

//         // If not, handle it
//         if (!user) {
//           return done(null, false);
//         }

//         // Check if the password is correct
//         const isMatch = await user.isValidPassword(password);

//         // If not, handle it
//         if (!isMatch) {
//           return done(null, false);
//         }

//         // Otherwise, return the user
//         done(null, user);
//       } catch (error) {
//         done(error, false);
//       }
//     }
//   )
// );

/*passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      if (!user.verifyPassword(password)) { return done(null, false); }
      return done(null, user);
    });
  }
));

app.post('/login', 
  passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });
*/
