const server = require("./bin/server");
const db = require("./bin/database");
//const signUpRoute = require("./routes/signUpRoute");

server.use(require("./routes/userRoute"));
