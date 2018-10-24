const _ = require("lodash");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
jwtOptions.secretOrKey = keys.jwtKey;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new JwtStrategy(jwtOptions, async (payload, next) => {
    console.log(payload);
    const user = await User.findOne({
      _id: payload._id,
      name: payload.name
    });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  })
);
