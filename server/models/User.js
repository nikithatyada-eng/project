const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  username: String,
  email: String,
  password: String,

  blockedUntil: Date,

  captcha: String,
  otp: String

});

module.exports = mongoose.model("User", UserSchema);