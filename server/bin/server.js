const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
//const passport = require("passport");

//const connect = require("connect");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const passport = require("passport");

const server = express();
const ORIGIN_URL = "http://localhost:1234";
const PORT = 8000;

//server.use(cors({ origin: ORIGIN_URL, credentials: true }));
server.use(cors({ origin: ORIGIN_URL }));
server.use(bodyParser.json());

//server.use(cookieParser());
//server.use(
//  session({ secret: "test-secret", saveUninitialized: true, resave: true })
//);
//server.use(flash());
//server.use(passport.initialize());
server.listen(PORT, console.log(`Server listens on port: ${PORT}`));
// server.get("/route", (req, res) => {
//   req.flash("mymessage", "HELLLLLLOOOOOOUUUUU");
//   res.redirect("/here");
// });
// server.get("/here", (req, res) => {
//   res.json({ message: req.flash("mymessage") });
// });
//server.use(passport.session());
//server.use(express.session());
//server.use(connect());
//server.use(session());
module.exports = server;
