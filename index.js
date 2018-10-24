const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");
require("./models/User");
require("./models/Trip");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(passport.initialize());

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// parse application/json
app.use(bodyParser.json());

require("./routes/authLocal")(app);
require("./routes/tripRoute")(app);

if (process.env.NODE_ENV === "production") {
  //if we dont know any route try to look into client/build
  app.use(express.static("cli/build"));
  //if not find anything
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "cli", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
