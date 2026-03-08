const mongoose = require("mongoose");

const SessionSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

loginTime:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Session",SessionSchema);