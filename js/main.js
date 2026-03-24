// main.js – entry point for bundler
const { initNavbar } = require('./components/navbar');

const page = window.location.pathname.split('/').pop();

async function loadPageModule() {
  if (page === 'login.html') {
    const { initLogin } = require('./auth');
    initLogin?.();
  } else if (page === 'register.html') {
    const { initRegister } = require('./auth');
    initRegister?.();
  } else if (page === 'dashboard.html') {
    const { initDashboard } = require('./dashboard');
    initDashboard?.();
  } else if (page === 'profile.html') {
    const { initProfile } = require('./profile');
    initProfile?.();
  } else if (page === 'areas.html') {
    const { initAreas } = require('./areas');
    initAreas?.();
  } else if (page === 'lodges.html') {
    const { initLodges } = require('./lodges');
    initLodges?.();
  } else if (page === 'map.html') {
    const { initMapPage } = require('./map');
    initMapPage?.();
  } else if (page === 'budget.html') {
    const { initBudget } = require('./budget');
    initBudget?.();
  } else if (page === 'culture.html') {
    const { initCulture } = require('./culture');
    initCulture?.();
  } else if (page === 'culture-detail.html') {
    const { initCultureDetail } = require('./culture-detail');
    initCultureDetail?.();
  } else if (page === 'admin.html') {
    const { initAdmin } = require('./admin');
    initAdmin?.();
  } else if (page === 'messages.html') {
    const { initMessages } = require('./messages');
    initMessages?.();
  } else if (page === 'negotiations.html') {
    const { initNegotiations } = require('./negotiations');
    initNegotiations?.();
  }
}

initNavbar();
loadPageModule().catch(console.error);
