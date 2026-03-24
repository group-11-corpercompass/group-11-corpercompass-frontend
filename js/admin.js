const api = require('./api');
const { getCurrentUser } = require('./auth');

let currentAreaId = null;
let currentLodgeId = null;
let currentCultureId = null;

async function initAdmin() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') {
    window.location.href = '/';
    return;
  }

  setupTabs();
  await loadAreas();
  await loadLodges();
  await loadCulturalContent();
  await loadUsers();
}

function setupTabs() {
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      document.getElementById(`${btn.dataset.tab}-tab`).classList.add('active');
    });
  });
}

async function loadAreas() {
  try {
    const areas = await api.get('/areas');
    const list = document.getElementById('areas-list').querySelector('ul');
    list.innerHTML = areas.map(area => `
      <li>
        ${area.name} (${area.state})
        <button class="btn btn-small edit-area" data-id="${area._id}">Edit</button>
        <button class="btn btn-small btn-danger delete-area" data-id="${area._id}">Delete</button>
      </li>
    `).join('');
    attachAreaButtons();
  } catch (error) {
    console.error('Failed to load areas:', error);
  }
}

function attachAreaButtons() {
  document.querySelectorAll('.edit-area').forEach(btn => {
    btn.addEventListener('click', () => editArea(btn.dataset.id));
  });
  document.querySelectorAll('.delete-area').forEach(btn => {
    btn.addEventListener('click', () => deleteArea(btn.dataset.id));
  });
}

async function editArea(id) {
  try {
    const areas = await api.get('/areas');
    const area = areas.find(a => a._id === id);
    if (!area) return;
    currentAreaId = area._id;
    document.getElementById('area-id').value = area._id;
    document.getElementById('area-name').value = area.name;
    document.getElementById('area-state').value = area.state;
    document.getElementById('area-rent-min').value = area.rentRange?.min || '';
    document.getElementById('area-rent-max').value = area.rentRange?.max || '';
    document.getElementById('area-transport').value = area.transportNotes || '';
    document.getElementById('area-safety').value = area.safetyNotes || '';
    document.getElementById('area-lifestyle').value = area.lifestyleNotes || '';
    document.getElementById('area-lat').value = area.location?.coordinates?.[1] || '';
    document.getElementById('area-lng').value = area.location?.coordinates?.[0] || '';
  } catch (error) {
    alert('Error loading area: ' + error.message);
  }
}

async function deleteArea(id) {
  if (!confirm('Are you sure?')) return;
  try {
    await api.delete(`/areas/${id}`);
    loadAreas();
    document.getElementById('area-form').reset();
    currentAreaId = null;
  } catch (error) {
    alert('Error deleting area: ' + error.message);
  }
}

document.getElementById('area-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('area-name').value,
    state: document.getElementById('area-state').value,
    rentRange: {
      min: parseInt(document.getElementById('area-rent-min').value) || undefined,
      max: parseInt(document.getElementById('area-rent-max').value) || undefined,
    },
    transportNotes: document.getElementById('area-transport').value,
    safetyNotes: document.getElementById('area-safety').value,
    lifestyleNotes: document.getElementById('area-lifestyle').value,
    location: null,
  };
  const lat = parseFloat(document.getElementById('area-lat').value);
  const lng = parseFloat(document.getElementById('area-lng').value);
  if (!isNaN(lat) && !isNaN(lng)) {
    data.location = { coordinates: [lng, lat] };
  }
  try {
    if (currentAreaId) {
      await api.put(`/areas/${currentAreaId}`, data);
    } else {
      await api.post('/areas', data);
    }
    loadAreas();
    document.getElementById('area-form').reset();
    currentAreaId = null;
  } catch (error) {
    alert('Error saving area: ' + error.message);
  }
});

async function loadLodges() {
  try {
    const lodges = await api.get('/lodges');
    const list = document.getElementById('lodges-list').querySelector('ul');
    list.innerHTML = lodges.map(lodge => `
      <li>
        ${lodge.name} (${lodge.area.name})
        <button class="btn btn-small edit-lodge" data-id="${lodge._id}">Edit</button>
        <button class="btn btn-small btn-danger delete-lodge" data-id="${lodge._id}">Delete</button>
      </li>
    `).join('');
    attachLodgeButtons();
  } catch (error) {
    console.error('Failed to load lodges:', error);
  }
}

function attachLodgeButtons() {
  document.querySelectorAll('.edit-lodge').forEach(btn => {
    btn.addEventListener('click', () => editLodge(btn.dataset.id));
  });
  document.querySelectorAll('.delete-lodge').forEach(btn => {
    btn.addEventListener('click', () => deleteLodge(btn.dataset.id));
  });
}

async function editLodge(id) {
  try {
    const lodges = await api.get('/lodges');
    const lodge = lodges.find(l => l._id === id);
    if (!lodge) return;
    currentLodgeId = lodge._id;
    document.getElementById('lodge-id').value = lodge._id;
    document.getElementById('lodge-name').value = lodge.name;
    document.getElementById('lodge-area-id').value = lodge.area._id;
    document.getElementById('lodge-price-min').value = lodge.priceRange?.min || '';
    document.getElementById('lodge-price-max').value = lodge.priceRange?.max || '';
    document.getElementById('lodge-contact').value = lodge.publicContact || '';
    document.getElementById('lodge-notes').value = lodge.notes || '';
    document.getElementById('lodge-lat').value = lodge.location?.coordinates?.[1] || '';
    document.getElementById('lodge-lng').value = lodge.location?.coordinates?.[0] || '';
    document.getElementById('lodge-active').checked = lodge.isActive;
  } catch (error) {
    alert('Error loading lodge: ' + error.message);
  }
}

async function deleteLodge(id) {
  if (!confirm('Are you sure?')) return;
  try {
    await api.delete(`/lodges/${id}`);
    loadLodges();
    document.getElementById('lodge-form').reset();
    currentLodgeId = null;
  } catch (error) {
    alert('Error deleting lodge: ' + error.message);
  }
}

document.getElementById('lodge-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    name: document.getElementById('lodge-name').value,
    area: document.getElementById('lodge-area-id').value,
    priceRange: {
      min: parseInt(document.getElementById('lodge-price-min').value) || undefined,
      max: parseInt(document.getElementById('lodge-price-max').value) || undefined,
    },
    publicContact: document.getElementById('lodge-contact').value,
    notes: document.getElementById('lodge-notes').value,
    isActive: document.getElementById('lodge-active').checked,
    location: null,
  };
  const lat = parseFloat(document.getElementById('lodge-lat').value);
  const lng = parseFloat(document.getElementById('lodge-lng').value);
  if (!isNaN(lat) && !isNaN(lng)) {
    data.location = { coordinates: [lng, lat] };
  }
  try {
    if (currentLodgeId) {
      await api.put(`/lodges/${currentLodgeId}`, data);
    } else {
      await api.post('/lodges', data);
    }
    loadLodges();
    document.getElementById('lodge-form').reset();
    currentLodgeId = null;
  } catch (error) {
    alert('Error saving lodge: ' + error.message);
  }
});

async function loadCulturalContent() {
  try {
    const content = await api.get('/culture');
    const list = document.getElementById('culture-list').querySelector('ul');
    list.innerHTML = content.map(item => `
      <li>
        ${item.title} (${item.category})
        <button class="btn btn-small edit-culture" data-id="${item._id}">Edit</button>
        <button class="btn btn-small btn-danger delete-culture" data-id="${item._id}">Delete</button>
      </li>
    `).join('');
    attachCultureButtons();
  } catch (error) {
    console.error('Failed to load cultural content:', error);
  }
}

function attachCultureButtons() {
  document.querySelectorAll('.edit-culture').forEach(btn => {
    btn.addEventListener('click', () => editCulture(btn.dataset.id));
  });
  document.querySelectorAll('.delete-culture').forEach(btn => {
    btn.addEventListener('click', () => deleteCulture(btn.dataset.id));
  });
}

async function editCulture(id) {
  try {
    const content = await api.get(`/culture/${id}`);
    if (!content) return;
    currentCultureId = content._id;
    document.getElementById('culture-id').value = content._id;
    document.getElementById('culture-title').value = content.title;
    document.getElementById('culture-category').value = content.category;
    document.getElementById('culture-state').value = content.state || '';
    document.getElementById('culture-content').value = content.content;
  } catch (error) {
    alert('Error loading cultural content: ' + error.message);
  }
}

async function deleteCulture(id) {
  if (!confirm('Are you sure?')) return;
  try {
    await api.delete(`/culture/${id}`);
    loadCulturalContent();
    document.getElementById('culture-content-form').reset();
    currentCultureId = null;
  } catch (error) {
    alert('Error deleting cultural content: ' + error.message);
  }
}

document.getElementById('culture-content-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = {
    title: document.getElementById('culture-title').value,
    category: document.getElementById('culture-category').value,
    state: document.getElementById('culture-state').value,
    content: document.getElementById('culture-content').value,
  };
  try {
    if (currentCultureId) {
      await api.put(`/culture/${currentCultureId}`, data);
    } else {
      await api.post('/culture', data);
    }
    loadCulturalContent();
    document.getElementById('culture-content-form').reset();
    currentCultureId = null;
  } catch (error) {
    alert('Error saving cultural content: ' + error.message);
  }
});

async function loadUsers() {
  // Admin can fetch users from a dedicated admin endpoint (if available)
  console.log('User management not implemented yet');
}

module.exports = { initAdmin };
