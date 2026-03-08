const Activity = require("../models/Activity");

async function calculateRisk(userId,sessionId){

const views = await Activity.countDocuments({
userId:userId,
sessionId:sessionId
});

/* risk factors */

let viewRate = views * 2;
let fixationScore = views * 1.5;
let sessionScore = views * 1;

/* final risk */

let risk = viewRate + fixationScore + sessionScore;

return risk;

}

module.exports = { calculateRisk };