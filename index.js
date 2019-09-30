//const getGame = require("./getGame");
const express = require("express");
//const getGameCloud = require("./getGameCloud.js");
//const fuckAPK = require("./fuckAPKMODY");
//const getPage = require("./getpage");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbconfig = require("./db");
const mongoose = require("mongoose");
const app = express();
app.use(cors());

/* Parse the ndjson as text */
app.use(bodyParser.text({ type: "application/x-ndjson" }));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

mongoose.Promise = global.Promise;

// Require Route
require("./route/apk.route")(app);
//Connect DB
mongoose
  .connect(dbconfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(err => {
    console.log("Failed to connect DB", err);
    process.exit();
  });

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
app.get("/", (req, res) => {
  res.send("Hello ");
});
/* Sync Function
let abc = getPage.get;
abc().then(res => {
  console.log(res);
  getGame.game(res);
});
*/
