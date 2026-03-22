import { loginUser } from "./api.js";

document.getElementById("loginForm").addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const result = await loginUser(email, password);

if(result.success){

localStorage.setItem("token", result.token);

window.location.href = "dashboard.html";

}else{

alert("Invalid login");

}

});