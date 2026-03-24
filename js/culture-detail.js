import api from './api.js';

export async function initCultureDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (!id) {
        window.location.href = '/culture.html';
        return;
    }
    try {
        const item = await api.get(`/culture/${id}`);
        document.getElementById('detail-container').innerHTML = `
            <h2>${escapeHtml(item.title)}</h2>
            <p><strong>Category:</strong> ${escapeHtml(item.category)}</p>
            ${item.state ? `<p><strong>State:</strong> ${escapeHtml(item.state)}</p>` : ''}
            <div>${escapeHtml(item.content).replace(/\n/g, '<br>')}</div>
        `;
    } catch (error) {
        document.getElementById('detail-container').innerHTML = '<p class="error">Failed to load content.</p>';
    }
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
