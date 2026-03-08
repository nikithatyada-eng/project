const router = require("express").Router();

const Alert = require("../models/Alert");

router.get("/alerts", async(req,res)=>{

const alerts =
await Alert.find()
.sort({time:-1});

res.json(alerts);

});

module.exports = router;