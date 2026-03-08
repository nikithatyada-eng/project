import { useState } from "react";
import axios from "axios";

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
Title,
Tooltip,
Legend
);

export default function Dashboard(){

const [risk,setRisk] = useState(0);
const [views,setViews] = useState(0);

const [logs,setLogs] = useState([]);

const [captcha,setCaptcha] = useState("");
const [showCaptcha,setShowCaptcha] = useState(false);

const [otp,setOtp] = useState("");
const [showOTP,setShowOTP] = useState(false);

const [captchaInput,setCaptchaInput] = useState("");
const [otpInput,setOtpInput] = useState("");

/* VIEW PROFILE */

const viewUser = async(target)=>{

const res = await axios.post(
"http://localhost:5000/activity/view/"+target
);

setRisk(res.data.risk);
setViews(prev=>prev+1);

/* Add log */

const time = new Date().toLocaleTimeString();

setLogs(prev=>[
{
time:time,
target:target,
risk:res.data.risk
},
...prev
]);

/* CAPTCHA */

if(res.data.action==="CAPTCHA"){

setCaptcha(res.data.captcha);
setShowCaptcha(true);
setShowOTP(false);

}

/* BLOCK */

if(res.data.action==="BLOCKED"){

alert("⚠ Account temporarily blocked");

}

/* OTP */

if(res.data.action==="OTP"){

setOtp(res.data.otp);
setShowOTP(true);
setShowCaptcha(false);

}

};

/* CAPTCHA VERIFY */

const verifyCaptcha = ()=>{

if(captchaInput===captcha){

alert("Captcha Verified");

setShowCaptcha(false);

}else{

alert("Wrong captcha");

}

};

/* OTP VERIFY */

const verifyOTP = ()=>{

if(otpInput===otp){

alert("✅ OTP Verified Successfully");

setShowOTP(false);

}else{

alert("Invalid OTP");

}

};

/* Risk Chart */

const chartData = {

labels:["View Rate","Fixation","Session"],

datasets:[
{
label:"Risk Factors",
data:[
risk*0.4,
risk*0.3,
risk*0.3
],
backgroundColor:[
"#00e5ff",
"#ffea00",
"#ff1744"
]
}
]

};

return(

<div className="dashboard">

<h1>Cyber Stalker Detection System</h1>

<div className="metrics">

<div className="card">
<h3>Views</h3>
<h2>{views}</h2>
</div>

<div className="card">
<h3>Risk</h3>

<h2 style={{
color:risk>0.7?"red":risk>0.4?"orange":"lime"
}}>
{risk.toFixed(2)}
</h2>

</div>

</div>

<h2>Profiles</h2>

<button onClick={()=>viewUser("userA")}>
View User A
</button>

<button onClick={()=>viewUser("userB")}>
View User B
</button>

<button onClick={()=>viewUser("userC")}>
View User C
</button>

{/* CAPTCHA */}

{showCaptcha && (

<div className="captchaBox">

<h2>Captcha Verification</h2>

<div className="captchaText">
{captcha}
</div>

<input
placeholder="Enter captcha"
onChange={(e)=>setCaptchaInput(e.target.value)}
/>

<button onClick={verifyCaptcha}>
Verify
</button>

</div>

)}

{/* OTP */}

{showOTP && (

<div className="otpBox">

<h2>OTP Verification</h2>

<input
placeholder="Enter OTP"
onChange={(e)=>setOtpInput(e.target.value)}
/>

<button onClick={verifyOTP}>
Verify OTP
</button>

</div>

)}

<h2>Risk Analysis</h2>

<div className="chart">

<Bar data={chartData}/>

</div>

<h2>Security Logs</h2>

<div className="logs">

{logs.map((l,i)=>(

<div key={i} className="log">

[{l.time}] USER → PROFILE_VIEW → {l.target}

<br/>

Risk Score: {l.risk.toFixed(2)}

</div>

))}

</div>

</div>

);

}