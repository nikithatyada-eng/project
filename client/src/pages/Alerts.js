import { useEffect,useState } from "react";
import axios from "axios";

export default function Alerts(){

const [alerts,setAlerts] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/admin/alerts")
.then(res=>setAlerts(res.data));

},[]);

return(

<div style={{textAlign:"center"}}>

<h2>User Alerts</h2>

{alerts.map((a,i)=>(
<div key={i}>
Risk:{a.riskScore} → {a.message}
</div>
))}

</div>

);

}