const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");

module.exports = app => {
  //create a user
  app.post("/api/signup", async (req, res) => {
    const existingUser = await User.findOne({ name: req.body.name });
    if (!existingUser) {
      const user = await new User({
        name: req.body.name,
        password: req.body.password
      }).save();
      res.send({ user });
    }
    res.send("name");
  });

  app.get("/api/getUser", passport.authenticate("jwt"), async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });
    if (user) {
      res.send({ user });
    }
    res.send("name");
  });

  //log a user
  app.post("/api/signin", async (req, res) => {
    const existingUser = await User.findOne({ name: req.body.name });
    if (!existingUser) {
      res.send("user");
    }
    if (existingUser.password === req.body.password) {
      const token = jwt.sign(
        { _id: existingUser._id, name: existingUser.name },
        "chris"
      );
      res.json({ user: existingUser, token: token });
    }
    res.send("password");
  });

  //test route
  app.get("/secret", passport.authenticate("jwt"), (req, res) => {
    //res.send(req.isAuthenticated());
    res.json({
      message: "Success! You can not see this without a token",
      user: req.user
    });
  });

  //debug
  app.get(
    "/secretDebug",
    function(req, res, next) {
      next();
    },
    function(req, res) {
      res.json("debugging");
    }
  );
};
