document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("form-section");
const error = document.getElementById("error");

form.addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch("https://corper-compass-backend-production.up.railway.app/api/auth/register", {

method: "POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name: name,
email: email,
password: password
})

});

const data = await response.json();

if(data.success){

alert("Registration successful");

window.location.href = "dashboard.html";

}else{

error.textContent = data.message || "Registration failed";

}

}catch(err){

console.error(err);

error.textContent = "Server error";

}

});

});