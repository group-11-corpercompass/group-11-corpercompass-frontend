const emailToggle = document.getElementById("emailToggle");
const cdsReminder = document.getElementById("CDS Reminder");
const nyscUpdates = document.getElementById("NYSC Updates");

emailToggle.addEventListener("change", function () {
  if (emailToggle.checked) {
    alert("Email notifications ON");
  } else {
    alert("Email notifications OFF");
  }
});

cdsReminder.addEventListener("change", function () {
  if (emailToggle.checked) {
    alert("CDS Reminder ON");
  } else {
    alert("CDS Reminder OFF");
  }
});

nyscUpdates.addEventListener("change", function () {
  if (emailToggle.checked) {
    alert("NYSC Updates ON");
  } else {
    alert("NYSC Updates OFF");
  }
});

document.getElementById("change-password").addEventListener("click", function () {
    window.location.href = "change-password.html";
  });
