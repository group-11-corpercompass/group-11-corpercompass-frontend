import api from '../api.js';

export function renderChecklist(sections, progress) {
    const container = document.getElementById('checklist-container');
    if (!container) return;

    const progressMap = {};
    progress.forEach(p => {
        progressMap[p.checklistItem] = p.completed;
    });

    let html = '';
    sections.forEach(section => {
        html += `<h3>${escapeHtml(section.title)}</h3>`;
        html += '<ul class="checklist">';
        section.items.forEach(item => {
            const checked = progressMap[item._id] ? 'checked' : '';
            html += `
                <li>
                    <label>
                        <input type="checkbox" data-item-id="${item._id}" ${checked}>
                        ${escapeHtml(item.text)}
                    </label>
                </li>
            `;
        });
        html += '</ul>';
    });
    container.innerHTML = html;

    container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', async (e) => {
            const itemId = e.target.dataset.itemId;
            const completed = e.target.checked;
            try {
                await api.patch(`/checklist/${itemId}`, { completed });
            } catch (error) {
                console.error('Failed to update checklist item:', error);
                e.target.checked = !completed;
            }
        });
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
