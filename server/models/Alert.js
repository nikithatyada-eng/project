const mongoose = require("mongoose");

const AlertSchema = new mongoose.Schema({

  userId: String,
  targetId: String,

  riskScore: Number,

  message: String,

  time: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Alert", AlertSchema);