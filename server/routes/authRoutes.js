const router = require("express").Router();

const User = require("../models/User");
const Session = require("../models/Session");

const jwt = require("jsonwebtoken");

/* SIGNUP */

router.post("/signup", async (req,res)=>{

try{

const {username,email,password} = req.body;

const existing = await User.findOne({username});

if(existing){
return res.status(400).json({error:"User already exists"});
}

await User.create({
username,
email,
password
});

res.json({message:"Signup successful"});

}catch(err){

res.status(500).json({error:"Server error"});

}

});

/* LOGIN */

router.post("/login", async (req,res)=>{

try{

const {username,password} = req.body;

const user = await User.findOne({username});

if(!user){
return res.status(400).json({error:"User not found"});
}

if(password !== user.password){
return res.status(400).json({error:"Wrong password"});
}

/* create session */

const session = await Session.create({
userId:user._id
});

/* create token */

const token = jwt.sign(
{
id:user._id,
sessionId:session._id
},
"secret123"
);

res.json({token});

}catch(err){

res.status(500).json({error:"Server error"});

}

});

module.exports = router;