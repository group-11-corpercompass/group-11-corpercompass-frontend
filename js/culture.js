import api from './api.js';

export async function initCulture() {
    try {
        const content = await api.get('/culture');
        populateCategoryFilter(content);
        populateStateFilter(content);
        renderCulture(content);
        setupFilters(content);
    } catch (error) {
        console.error('Failed to load cultural content:', error);
        document.getElementById('culture-container').innerHTML = '<p class="error">Failed to load cultural guide.</p>';
    }
}

function populateCategoryFilter(content) {
    const categories = [...new Set(content.map(c => c.category))];
    const select = document.getElementById('category-filter');
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat;
        select.appendChild(option);
    });
}

function populateStateFilter(content) {
    const states = [...new Set(content.map(c => c.state).filter(Boolean))];
    const select = document.getElementById('state-filter-culture');
    states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        select.appendChild(option);
    });
}

function renderCulture(items) {
    const container = document.getElementById('culture-container');
    if (!container) return;
    container.innerHTML = items.map(item => `
        <div class="card culture-card">
            <h3><a href="culture-detail.html?id=${item._id}">${escapeHtml(item.title)}</a></h3>
            <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
            ${item.state ? `<p><strong>State:</strong> ${escapeHtml(item.state)}</p>` : ''}
            <p>${escapeHtml(item.content.substring(0, 150))}...</p>
        </div>
    `).join('');
}

function setupFilters(items) {
    const categorySelect = document.getElementById('category-filter');
    const stateSelect = document.getElementById('state-filter-culture');
    function filter() {
        const category = categorySelect.value;
        const state = stateSelect.value;
        let filtered = items;
        if (category) filtered = filtered.filter(c => c.category === category);
        if (state) filtered = filtered.filter(c => c.state === state);
        renderCulture(filtered);
    }
    categorySelect.addEventListener('change', filter);
    stateSelect.addEventListener('change', filter);
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
