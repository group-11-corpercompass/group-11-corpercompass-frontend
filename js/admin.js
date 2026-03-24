import api from './api.js';
import { getCurrentUser } from './auth.js';

let currentAreaId = null;
let currentLodgeId = null;
let currentCultureId = null;

export async function initAdmin() {
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

// Areas
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

// Lodges (similar pattern – omitted for brevity, but implement similar to areas)
async function loadLodges() {
    // Implement similarly using /lodges endpoint
    console.log('Lodges admin not yet implemented');
}

async function loadCulturalContent() {
    // Implement similarly using /culture endpoint
    console.log('Cultural content admin not yet implemented');
}

async function loadUsers() {
    // Admin could fetch users via a dedicated admin endpoint (not in current spec)
    console.log('User admin not yet implemented');
}
