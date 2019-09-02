const db = require("./configuration/database");
const app = require("./configuration/server");

const userRoutes = require("./Routes/userRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const codeRoutes = require("./Routes/codeRoutes");
const locationRoutes = require("./Routes/locationRoutes");

const SECONDS = 1000;
const MINUTES = SECONDS * 60;
const HOURS = MINUTES * 60;
const DAYS = HOURS * 24;

app.use(userRoutes);
app.use(reviewRoutes);
app.use(codeRoutes);
app.use(locationRoutes);
app.get("/prizeTimer", (req, res) => {
  //let prizeTimer = new Date(Date.now() + 30 * SECONDS + 10 * MINUTES).getTime();
  let prizeTimer = new Date(Date.now() + 30 * SECONDS).getTime();
  res.json({ prizeTimer });
});
