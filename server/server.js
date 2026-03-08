const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth",
require("./routes/authRoutes"));

app.use("/activity",
require("./routes/activityRoutes"));

app.use("/admin",
require("./routes/adminRoutes"));

app.listen(5000,()=>{

console.log(
"Security server running on 5000"
);

});