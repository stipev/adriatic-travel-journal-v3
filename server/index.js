const db = require("./configuration/database");
const app = require("./configuration/server");

const userRoutes = require("./Routes/userRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const codeRoutes = require("./Routes/codeRoutes");
const locationRoutes = require("./Routes/locationRoutes");

app.use(userRoutes);
app.use(reviewRoutes);
app.use(codeRoutes);
app.use(locationRoutes);
