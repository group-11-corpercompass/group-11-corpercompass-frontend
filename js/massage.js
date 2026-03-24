import api from './api.js';
import { getCurrentUser } from './auth.js';

let currentConversation = null;

export async function initMessages() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }
    await loadConversations();
    setupMessageForm();
}

async function loadConversations() {
    try {
        const messages = await api.get('/messages');
        const participants = new Map();
        messages.forEach(msg => {
            const otherId = msg.sender._id === getCurrentUser()._id ? msg.receiver._id : msg.sender._id;
            const otherName = msg.sender._id === getCurrentUser()._id ? msg.receiver.name : msg.sender.name;
            if (!participants.has(otherId)) {
                participants.set(otherId, { id: otherId, name: otherName, lastMsg: msg.content });
            }
        });
        const list = document.getElementById('conversations-list');
        list.innerHTML = Array.from(participants.values()).map(p => `
            <li><a href="#" data-id="${p.id}">${p.name}</a></li>
        `).join('');
        list.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                loadConversation(link.dataset.id);
            });
        });
    } catch (error) {
        console.error('Failed to load conversations:', error);
    }
}

async function loadConversation(userId) {
    try {
        const messages = await api.get(`/messages/conversation/${userId}`);
        currentConversation = userId;
        const chatDiv = document.getElementById('chat-messages');
        chatDiv.innerHTML = messages.map(msg => `
            <div class="message ${msg.sender._id === getCurrentUser()._id ? 'sent' : 'received'}">
                <strong>${msg.sender.name}:</strong> ${escapeHtml(msg.content)}
            </div>
        `).join('');
        chatDiv.scrollTop = chatDiv.scrollHeight;
        document.getElementById('chat-header').innerHTML = `<h3>Chat with ${messages[0]?.sender._id === userId ? messages[0].sender.name : messages[0]?.receiver.name || 'User'}</h3>`;
    } catch (error) {
        console.error('Failed to load conversation:', error);
    }
}

function setupMessageForm() {
    const form = document.getElementById('message-form');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!currentConversation) return;
        const content = document.getElementById('message-content').value.trim();
        if (!content) return;
        try {
            await api.post('/messages', { receiver: currentConversation, content });
            document.getElementById('message-content').value = '';
            loadConversation(currentConversation);
        } catch (error) {
            alert('Failed to send message: ' + error.message);
        }
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
