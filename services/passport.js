const _ = require("lodash");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const passportJWT = require("passport-jwt");
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("Bearer");
jwtOptions.secretOrKey = "chris";

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

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1022161021889-5ic1e55udc7po4pgvltb843ia7l9ts5r.apps.googleusercontent.com",
      clientSecret: "WC0eHhCH9W7KM9Gx165viHp3",
      callbackURL: "http://localhost:5000/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        googleId: profile.id,
        name: profile.displayName
      }).save();
      done(null, user);
    }
  )
);
