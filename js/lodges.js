import api from './api.js';

export async function initLodges() {
    try {
        const lodges = await api.get('/lodges');
        populateAreaFilter(lodges);
        renderLodges(lodges);
        setupFilter(lodges);
    } catch (error) {
        console.error('Failed to load lodges:', error);
        document.getElementById('lodges-container').innerHTML = '<p class="error">Failed to load lodges.</p>';
    }
}

function populateAreaFilter(lodges) {
    const areas = lodges.map(l => l.area).filter((area, index, self) => 
        index === self.findIndex(a => a._id === area._id)
    );
    const select = document.getElementById('area-filter');
    if (!select) return;
    areas.forEach(area => {
        const option = document.createElement('option');
        option.value = area._id;
        option.textContent = `${area.name} (${area.state})`;
        select.appendChild(option);
    });
}

function renderLodges(lodges) {
    const container = document.getElementById('lodges-container');
    if (!container) return;
    container.innerHTML = lodges.map(lodge => `
        <div class="card lodge-card">
            <h3>${escapeHtml(lodge.name)}</h3>
            <p><strong>Area:</strong> ${escapeHtml(lodge.area.name)}, ${escapeHtml(lodge.area.state)}</p>
            ${lodge.priceRange?.min ? `<p><strong>Price Range:</strong> ₦${lodge.priceRange.min.toLocaleString()} - ₦${lodge.priceRange.max.toLocaleString()}</p>` : ''}
            ${lodge.publicContact ? `<p><strong>Contact:</strong> ${escapeHtml(lodge.publicContact)}</p>` : ''}
            ${lodge.notes ? `<p><strong>Notes:</strong> ${escapeHtml(lodge.notes)}</p>` : ''}
        </div>
    `).join('');
}

function setupFilter(lodges) {
    const select = document.getElementById('area-filter');
    if (!select) return;
    select.addEventListener('change', (e) => {
        const areaId = e.target.value;
        const filtered = areaId ? lodges.filter(l => l.area._id === areaId) : lodges;
        renderLodges(filtered);
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
