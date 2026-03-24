const API_URL = "https://corper-compass-backend-production.up.railway.app/api";

async function loadProfile() {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }

    const data = await response.json();

    // Insert into HTML
    document.getElementById("name").textContent = data.name;
    document.getElementById("email").textContent = data.email;
    document.getElementById("avatar").src = data.avatar;

  } catch (error) {
    console.error(error);
  }
}

// Run when page loads
loadProfile();