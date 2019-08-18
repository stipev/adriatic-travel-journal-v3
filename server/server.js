const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");
const app = express();
const PORT = 8000;
const ORIGIN_URL = "http://localhost:3000";

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
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(express.urlencoded({ extended: false }));
//app.use(passport.initialize());
app.listen(PORT, console.log(`listening on PORT: ${PORT}`));

module.exports = app;
