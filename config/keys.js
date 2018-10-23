//keys.js - production or dev environment ?
if (process.env.NODE_ENV === "production") {
  // production - return the prod set of keys
  module.exports = require("./prod");
} else {
  //dev - return the dev keys
  module.exports = require("./dev");
}
