const api = require('./api');
const { getCurrentUser } = require('./auth');

async function initProfile() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = '/login.html';
    return;
  }

  try {
    const profile = await api.get('/users/profile');
    document.getElementById('postedState').value = profile.postedState || '';
    document.getElementById('phone').value = profile.phone || '';
    document.getElementById('preferences').value = JSON.stringify(profile.preferences || {}, null, 2);
  } catch (error) {
    console.error('Failed to load profile:', error);
    document.getElementById('profile-message').textContent = 'Failed to load profile.';
  }

  const form = document.getElementById('profile-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const postedState = document.getElementById('postedState').value;
    const phone = document.getElementById('phone').value;
    let preferences;
    try {
      preferences = JSON.parse(document.getElementById('preferences').value);
    } catch {
      preferences = {};
    }
    try {
      await api.put('/users/profile', { postedState, phone, preferences });
      document.getElementById('profile-message').textContent = 'Profile updated successfully!';
      document.getElementById('profile-message').style.color = 'green';
    } catch (error) {
      document.getElementById('profile-message').textContent = error.message;
      document.getElementById('profile-message').style.color = 'red';
    }
  });
}

module.exports = { initProfile };
