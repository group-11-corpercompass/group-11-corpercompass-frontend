document.getElementById("form-section").addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

try{

const response = await fetch(
"https://corper-compass-backend-production.up.railway.app/api/register",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
name,
email,
password,
role:"corper"
})
}
);

const data = await response.json();

console.log(data);

if(response.ok){

// save login token
localStorage.setItem("token", data.token);

// redirect to dashboard
window.location.href = "dashboard.html";

}else{

alert(data.message || "Registration failed");

}

}catch(error){

console.error(error);
alert("Server error");

}

});