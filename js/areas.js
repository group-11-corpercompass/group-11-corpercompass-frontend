import api from './api.js';

export async function initAreas() {
    try {
        const areas = await api.get('/areas');
        populateStateFilter(areas);
        renderAreas(areas);
        setupFilter(areas);
    } catch (error) {
        console.error('Failed to load areas:', error);
        document.getElementById('areas-container').innerHTML = '<p class="error">Failed to load areas.</p>';
    }
}

function populateStateFilter(areas) {
    const states = [...new Set(areas.map(a => a.state))].sort();
    const select = document.getElementById('state-filter');
    if (!select) return;
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        select.appendChild(option);
    });
}

function renderAreas(areas) {
    const container = document.getElementById('areas-container');
    if (!container) return;
    container.innerHTML = areas.map(area => `
        <div class="card area-card">
            <h3>${escapeHtml(area.name)}</h3>
            <p><strong>State:</strong> ${escapeHtml(area.state)}</p>
            ${area.rentRange?.min ? `<p><strong>Rent Range:</strong> ₦${area.rentRange.min.toLocaleString()} - ₦${area.rentRange.max.toLocaleString()}</p>` : ''}
            ${area.transportNotes ? `<p><strong>Transport:</strong> ${escapeHtml(area.transportNotes)}</p>` : ''}
            ${area.safetyNotes ? `<p><strong>Safety:</strong> ${escapeHtml(area.safetyNotes)}</p>` : ''}
            ${area.lifestyleNotes ? `<p><strong>Lifestyle:</strong> ${escapeHtml(area.lifestyleNotes)}</p>` : ''}
        </div>
    `).join('');
}

function setupFilter(areas) {
    const select = document.getElementById('state-filter');
    if (!select) return;
    select.addEventListener('change', (e) => {
        const state = e.target.value;
        const filtered = state ? areas.filter(a => a.state === state) : areas;
        renderAreas(filtered);
    });
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}
