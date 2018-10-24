const passport = require("passport");
const mongoose = require("mongoose");
const Trip = mongoose.model("trips");
const jwt = require("jsonwebtoken");

module.exports = app => {
  app.post(
    "/api/createtrip",
    passport.authenticate("jwt"),
    async (req, res) => {
      const { title, city, exp, tips } = req.body;
      const trip = await new Trip({
        city,
        title,
        exp,
        tips,
        _user: req.user._id
      }).save();
      res.json({
        trip
      });
    }
  );

  app.get("/api/triplist", passport.authenticate("jwt"), async (req, res) => {
    const trip = await Trip.find({ _user: req.user._id });
    res.json({
      trip
    });
  });

  app.post(
    "/api/deletetrip",
    passport.authenticate("jwt"),
    async (req, res) => {
      const trip = await Trip.deleteOne({ _user: req.user._id });
      res.json("yes");
    }
  );
};
