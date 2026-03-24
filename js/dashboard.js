import api from './api.js';
import { getCurrentUser } from './auth.js';
import { renderChecklist } from './components/checklist.js';

export async function initDashboard() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    try {
        const journey = await api.get('/checklist/journey');
        const progress = await api.get('/checklist/progress');
        renderChecklist(journey, progress);
    } catch (error) {
        console.error('Failed to load dashboard:', error);
        document.getElementById('checklist-container').innerHTML = '<p class="error">Failed to load checklist. Please try again.</p>';
    }
}
