const mongoose = require("mongoose");

const ActivitySchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

sessionId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Session"
},

targetId:String,

action:String,

ip:String,

time:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Activity",ActivitySchema);