import { useState } from "react";
import axios from "axios";

export default function Login(){

const [username,setUsername] = useState("");
const [password,setPassword] = useState("");

const login = async () => {

try{

const res = await axios.post(
"http://localhost:5000/auth/login",
{username: username,
password: password}
);

localStorage.setItem("token",res.data.token);

window.location="/dashboard";

}catch(e){

alert("Login failed");

}

};

return(

<div style={{textAlign:"center",marginTop:"100px"}}>

<h2>Cyber Stalker Detection System</h2>

<input
placeholder="Username"
onChange={(e)=>setUsername(e.target.value)}
/>

<br/><br/>

<input
type="password"
placeholder="Password"
onChange={(e)=>setPassword(e.target.value)}
/>

<br/><br/>

<button onClick={login}>Login</button>

</div>

);

}