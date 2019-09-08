const Timer = require("../models/Timer");
const Code = require("../models/Code");
const Review = require("../models/Review");

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

let expirationDate = new Date(
  Date.now() + 6 * MINUTES + 5 * SECONDS
  //Date.now() + 30 * SECONDS
).getTime();
//.getTime();
console.log("expirationDate:", expirationDate);

//GOTOVA NAGRADNA IGRA JOŠ TRIBA KODOVE MAKNIT VLASNIKA ILI CILI KOD I REVIEW PONIŠTIT

Timer.destroy({ where: {} }).then(() => {
  Promise.all([
    Timer.create({
      expirationDate
    }),
    Code.update(
      {
        winner: false,
        activated: false,
        place: null,
        FK_userId: null
      },
      { where: {} }
    ),
    Review.destroy({ where: {} })
  ]);
});
