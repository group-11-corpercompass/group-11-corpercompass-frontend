import api from './api.js';
import { getCurrentUser } from './auth.js';

export async function initNegotiations() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }
    await loadNegotiations();
    document.getElementById('close-detail').addEventListener('click', () => {
        document.getElementById('negotiation-detail').style.display = 'none';
        document.getElementById('negotiations-container').style.display = 'grid';
    });
}

async function loadNegotiations() {
    try {
        const negotiations = await api.get('/negotiations');
        const container = document.getElementById('negotiations-container');
        container.innerHTML = negotiations.map(neg => `
            <div class="card negotiation-card" data-id="${neg._id}">
                <h3>Lodge: ${neg.lodge.name}</h3>
                <p>Proposed Price: ₦${neg.proposedPrice}</p>
                <p>Status: ${neg.status}</p>
                <button class="btn view-negotiation">View Details</button>
            </div>
        `).join('');
        document.querySelectorAll('.view-negotiation').forEach(btn => {
            btn.addEventListener('click', () => showNegotiationDetail(btn.closest('.negotiation-card').dataset.id));
        });
    } catch (error) {
        console.error('Failed to load negotiations:', error);
    }
}

async function showNegotiationDetail(id) {
    try {
        const negotiation = await api.get(`/negotiations/${id}`);
        const container = document.getElementById('negotiation-content');
        container.innerHTML = `
            <p><strong>Lodge:</strong> ${negotiation.lodge.name}</p>
            <p><strong>Proposed Price:</strong> ₦${negotiation.proposedPrice}</p>
            <p><strong>Status:</strong> ${negotiation.status}</p>
            <div><strong>Messages:</strong></div>
            <div id="neg-messages">
                ${negotiation.messages.map(msg => `
                    <div><strong>${msg.sender.name}:</strong> ${escapeHtml(msg.content)}</div>
                `).join('')}
            </div>
        `;
        document.getElementById('negotiation-detail').style.display = 'block';
        document.getElementById('negotiations-container').style.display = 'none';
        document.getElementById('negotiation-message-form').onsubmit = async (e) => {
            e.preventDefault();
            const content = document.getElementById('neg-message').value.trim();
            if (!content) return;
            try {
                await api.post(`/negotiations/${id}/messages`, { content });
                document.getElementById('neg-message').value = '';
                showNegotiationDetail(id);
            } catch (error) {
                alert('Failed to send message: ' + error.message);
            }
        };
    } catch (error) {
        alert('Failed to load negotiation details: ' + error.message);
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
