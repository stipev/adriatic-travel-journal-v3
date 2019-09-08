const db = require("./configuration/database");
const app = require("./configuration/server");

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const codeRoutes = require("./routes/codeRoutes");
const locationRoutes = require("./routes/locationRoutes");
const timerRoutes = require("./routes/timerRoutes");

app.use(userRoutes);
app.use(reviewRoutes);
app.use(codeRoutes);
app.use(locationRoutes);
app.use(timerRoutes);
