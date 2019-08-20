const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const ORIGIN_URL = "http://localhost:3000";
const PORT = 8000;

//var flash = require("connect-flash");
//var cookieParser = require("cookie-parser");
//var session = require("express-session");
//const passport = require("passport");

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", ORIGIN_URL);
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "POST,PATCH,PUT, GET, OPTIONS, DELETE"
//   );

//   next();
// });

app.use(cors({ origin: ORIGIN_URL }));

app.use(bodyParser.json());
//app.use(express.cookieParser("keyboard cat"));
//app.use(cookieParser());
//app.use(
//session({
//secret: "keyboard cat",
// resave: true,
//  saveUninitialized: true
//cookie: { secure: true }
//})
//);
//app.use(express.session({ cookie: { maxAge: 60000 } }));
//app.use(flash());
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: false }));
//app.use(passport.initialize());
app.listen(PORT, console.log(`listening on PORT: ${PORT}`));

module.exports = app;
