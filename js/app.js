import { initNavbar } from './components/navbar.js';

const page = window.location.pathname.split('/').pop();

async function loadPageModule() {
    if (page === 'login.html') {
        const { initLogin } = await import('./auth.js');
        initLogin?.();
    } else if (page === 'register.html') {
        const { initRegister } = await import('./auth.js');
        initRegister?.();
    } else if (page === 'dashboard.html') {
        const { initDashboard } = await import('./dashboard.js');
        initDashboard?.();
    } else if (page === 'profile.html') {
        const { initProfile } = await import('./profile.js');
        initProfile?.();
    } else if (page === 'areas.html') {
        const { initAreas } = await import('./areas.js');
        initAreas?.();
    } else if (page === 'lodges.html') {
        const { initLodges } = await import('./lodges.js');
        initLodges?.();
    } else if (page === 'map.html') {
        const { initMapPage } = await import('./map.js');
        initMapPage?.();
    } else if (page === 'budget.html') {
        const { initBudget } = await import('./budget.js');
        initBudget?.();
    } else if (page === 'culture.html') {
        const { initCulture } = await import('./culture.js');
        initCulture?.();
    } else if (page === 'culture-detail.html') {
        const { initCultureDetail } = await import('./culture-detail.js');
        initCultureDetail?.();
    } else if (page === 'admin.html') {
        const { initAdmin } = await import('./admin.js');
        initAdmin?.();
    } else if (page === 'messages.html') {
        const { initMessages } = await import('./messages.js');
        initMessages?.();
    } else if (page === 'negotiations.html') {
        const { initNegotiations } = await import('./negotiations.js');
        initNegotiations?.();
    }
}

initNavbar();
loadPageModule().catch(console.error);
