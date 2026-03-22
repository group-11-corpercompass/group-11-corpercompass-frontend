const  signUpButton = document.getElementById('signUpButton');
const  logInForm = document.getElementById('logIn');
const  signUpForm = document.getElementById('signUp');
const logInButton = document.getElementById('logInButton');


signUpButton.addEventListener('click', ()=> {
    signUpForm.style.display="flex";
    logInForm.style.display="none";
})
logInButton.addEventListener('click', ()=> {
    signUpForm.style.display= "none";
    logInForm.style.display= "flex"
    
})


