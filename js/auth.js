const api = require('./api');

async function login(email, password) {
  try {
    const data = await api.post('/auth/login', { email, password });
    api.setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

async function register(name, email, password) {
  try {
    const data = await api.post('/auth/register', { name, email, password });
    api.setToken(data.token);
    localStorage.setItem('user', JSON.stringify(data));
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

function logout() {
  api.removeToken();
  localStorage.removeItem('user');
  window.location.href = '/login.html';
}

function getCurrentUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

function initLogin() {
  const form = document.getElementById('login-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    const result = await login(email, password);
    if (result.success) {
      window.location.href = '/dashboard.html';
    } else {
      errorDiv.textContent = result.error;
    }
  });
}

function initRegister() {
  const form = document.getElementById('register-form');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-message');
    const result = await register(name, email, password);
    if (result.success) {
      window.location.href = '/dashboard.html';
    } else {
      errorDiv.textContent = result.error;
    }
  });
}

module.exports = {
  login,
  register,
  logout,
  getCurrentUser,
  initLogin,
  initRegister,
};
