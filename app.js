let express = require("express");
let cors = require('cors')
let path = require("path");
let cookieParser = require("cookie-parser");
let logger = require("morgan");

let shiftsRouter = require("./routes/shifts");

let app = express();

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db successfully.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())


app.use("/shifts/", shiftsRouter);

module.exports = app;
