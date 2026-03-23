document.getElementById("loginForm").addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const error = document.getElementById("error");

try{

const response = await fetch(
"https://corper-compass-backend-production.up.railway.app/api/auth/login",
{
method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
email,
password
})
}
);

const data = await response.json();

console.log(data);

if(response.ok){

// save token
localStorage.setItem("token", data.token);

// save user info
localStorage.setItem("user", JSON.stringify(data));

// redirect to dashboard
window.location.href = "dashboard.html";

}else{

error.textContent = data.message || "Invalid email or password";

}

}catch(error){

console.error(error);
error.textContent = "Server error";

}

});