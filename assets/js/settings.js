// const emailToggle = document.getElementById("emailToggle");
// const cdsReminder = document.getElementById("CDS Reminder");
// const nyscUpdates = document.getElementById("NYSC Updates");

// emailToggle.addEventListener("change", function () {
//   if (emailToggle.checked) {
//     alert("Email notifications ON");
//   } else {
//     alert("Email notifications OFF");
//   }
// });

// cdsReminder.addEventListener("change", function () {
//   if (emailToggle.checked) {
//     alert("CDS Reminder ON");
//   } else {
//     alert("CDS Reminder OFF");
//   }
// });

// nyscUpdates.addEventListener("change", function () {
//   if (emailToggle.checked) {
//     alert("NYSC Updates ON");
//   } else {
//     alert("NYSC Updates OFF");
//   }
// });

// document.getElementById("change-password").addEventListener("click", function () {
//     window.location.href = "change-password.html";
//   });

// // // // // 

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("https://corper-compass-backend-production.up.railway.app/api/user/settings", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();

    // Populate toggles
    document.getElementById("emailToggle").checked = data.emailNotifications;
    document.getElementById("CDS Reminder").checked = data.cdsReminders;
    document.getElementById("NYSC Updates").checked = data.nyscUpdates;

  } catch (err) {
    console.error("Error loading settings:", err);
  }
});

document.getElementById("emailToggle").addEventListener("change", async (e) => {
  await updateSetting({ emailNotifications: e.target.checked });
});

// // change password
document.getElementById("change-password").addEventListener("click", () => {
  const oldPassword = prompt("Enter old password");
  const newPassword = prompt("Enter new password");

  fetch("https://corper-compass-backend-production.up.railway.app/api/user/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ oldPassword, newPassword })
  })
  .then(res => res.json())
  .then(data => alert("Password updated"))
  .catch(err => console.error(err));
});


// // UPDATE EMAIL
async function updateEmail() {
  const email = prompt("Enter new email");

  await fetch("https://corper-compass-backend-production.up.railway.app/api/user/settings", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ email })
  });

  alert("Email updated");
}


// // DELETE ACCOUNT
async function deleteAccount() {
  const confirmDelete = confirm("Are you sure?");
  if (!confirmDelete) return;

  await fetch("https://corper-compass-backend-production.up.railway.app/api/user", {
    method: "DELETE",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  });

  alert("Account deleted");
  window.location.href = "/login.html";
}