document.getElementById("form-section").addEventListener("submit", async function(e){

e.preventDefault();

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
const passwordError = document.getElementById("passwordError");
const confirmPassword = document.getElementById("confirmPassword").value;

if (password.length < 6 ) {
    passwordError.textContent = "Password must be at least six characters";
    document.getElementById("password").addEventListener("input", function(){
    passwordError.textContent = "";
    });
    return;
}

if (password !== confirmPassword ) {
    passwordError.textContent = "Passwords do not match";
    document.getElementById("confirmPassword").addEventListener("input", function(){
    passwordError.textContent = "";
    });
    return;
}




try{

const response = await fetch(
"https://corper-compass-backend-production.up.railway.app/api/auth/register",
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