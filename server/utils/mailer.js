async function sendSecurityAlert(email,message){

console.log("SECURITY ALERT");
console.log("To:",email);
console.log("Message:",message);

}

module.exports = { sendSecurityAlert };