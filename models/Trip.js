const mongoose = require("mongoose");
const { Schema } = mongoose;

const tripSchema = new Schema({
  city: String,
  title: String,
  exp: String,
  tips: String,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("trips", tripSchema);
