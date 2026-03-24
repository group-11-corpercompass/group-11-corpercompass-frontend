const BASE_URL = "https://corper-compass-backend-production.up.railway.app/api";

// REGISTER USER
export async function registerUser(userData) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Registration error:", error);
  }
}

// LOGIN USER
export async function loginUser(email, password) {
  try {
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Login error:", error);
  }
}

// FETCH CURRENT USER
export async function getUser(token) {
  try {
    const response = await fetch(`${BASE_URL}/api`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Fetch user error:", error);
  }
}
