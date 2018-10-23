const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("./models/User");
require("./models/Trip");
require("./services/passport");

mongoose.connect("mongodb://chris:password1@ds151282.mlab.com:51282/connexion");

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

app.listen(5000, function() {
  console.log("Express running");
});
