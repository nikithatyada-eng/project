import { useEffect,useState } from "react";
import axios from "axios";

export default function Admin(){

const [alerts,setAlerts] = useState([]);

useEffect(()=>{

axios.get("http://localhost:5000/admin/alerts")
.then(res=>setAlerts(res.data));

},[]);

return(

<div style={{textAlign:"center"}}>

<h2>Security Alerts Dashboard</h2>

<table border="1" style={{margin:"auto"}}>

<thead>
<tr>
<th>User</th>
<th>Target</th>
<th>Risk Score</th>
<th>Message</th>
</tr>
</thead>

<tbody>

{alerts.map((a,i)=>(

<tr key={i}>

<td>{a.userId}</td>

<td>{a.targetId}</td>

<td>{a.riskScore}</td>

<td>{a.message}</td>

</tr>

))}

</tbody>

</table>

</div>

);

}