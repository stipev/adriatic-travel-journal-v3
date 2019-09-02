const Timer = require("../Models/Timer");

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

let expirationDate = new Date(
  // Date.now() + 10 * MINUTES + 60 * SECONDS
  Date.now() + 45 * SECONDS
).getTime();
//.getTime();
console.log("expirationDate:", expirationDate);

Timer.destroy({ where: {} }).then(() => {
  Timer.create({
    expirationDate
  });
});
