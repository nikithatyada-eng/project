const router = require("express").Router();

const Activity = require("../models/Activity");
const User = require("../models/User");
const Alert = require("../models/Alert");

const auth = require("../middleware/auth");

const { calculateRisk } = require("../utils/riskEngine");
const { generateCaptcha, generateOTP } = require("../utils/securityUtils");

router.post("/view/:target", auth, async (req,res)=>{

try{

/* log activity */

await Activity.create({

userId:req.user.id,
sessionId:req.user.sessionId,
targetId:req.params.target,
action:"profile_view",
ip:req.ip

});

/* calculate risk */

const risk = await calculateRisk(
req.user.id,
req.user.sessionId
);

const user = await User.findById(req.user.id);

/* OTP */

if(risk >= 30){

user.otp = generateOTP();

console.log("Generated OTP:",user.otp);

await user.save();

return res.json({
action:"OTP",
otp:user.otp,
risk
});

}

/* BLOCK */

if(risk >= 20){

user.blockedUntil = Date.now()+15*60*1000;

await user.save();

return res.json({
action:"BLOCKED",
risk
});

}

/* CAPTCHA */

if(risk >= 10){

user.captcha = generateCaptcha();

await user.save();

return res.json({
action:"CAPTCHA",
captcha:user.captcha,
risk
});

}

/* NORMAL */

res.json({
action:"NORMAL",
risk
});

}catch(err){

console.log(err);

res.status(500).json({error:"Server error"});

}

});

module.exports = router;