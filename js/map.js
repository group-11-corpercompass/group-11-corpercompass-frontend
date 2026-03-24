const config = require('./env');
const { initLeafletMap, geocodeAndZoom } = require('./components/map-leaflet');

let currentMap;
let useGoogle = false; // set to true if using Google Maps

async function initMapPage() {
  const container = 'map';
  if (useGoogle) {
    const { initGoogleMap, geocodeAndZoom: googleGeocode } = await import('./components/map-google.js');
    currentMap = await initGoogleMap(container, { showMarkers: true });
    window.geocodeAndZoom = googleGeocode;
  } else {
    currentMap = await initLeafletMap(container, { showMarkers: true });
    window.geocodeAndZoom = geocodeAndZoom;
  }

  await populateStates();
  document.getElementById('zoom-to-location').addEventListener('click', async () => {
    const state = document.getElementById('state-select').value;
    const lga = document.getElementById('lga-select').value;
    if (!state) {
      alert('Please select a state');
      return;
    }
    let query = `${state} State, Nigeria`;
    if (lga) {
      query = `${lga} LGA, ${state} State, Nigeria`;
    }
    try {
      await window.geocodeAndZoom(query);
    } catch (error) {
      alert('Could not find location: ' + error.message);
    }
  });

  document.getElementById('show-markers').addEventListener('click', async () => {
    if (useGoogle) {
      const { clearMarkers, loadMarkers } = await import('./components/map-google.js');
      clearMarkers();
      await loadMarkers();
    } else {
      const { clearMarkers, loadMarkers } = require('./components/map-leaflet');
      clearMarkers();
      await loadMarkers();
    }
  });

  document.getElementById('show-heatmap').addEventListener('click', async () => {
    if (useGoogle) {
      const { clearHeatmap, loadHeatmap } = await import('./components/map-google.js');
      clearHeatmap();
      await loadHeatmap();
    } else {
      const { clearHeatmap, loadHeatmap } = require('./components/map-leaflet');
      clearHeatmap();
      await loadHeatmap();
    }
  });

  document.getElementById('clear-overlay').addEventListener('click', () => {
    if (useGoogle) {
      import('./components/map-google.js').then(m => { m.clearMarkers(); m.clearHeatmap(); });
    } else {
      const { clearMarkers, clearHeatmap } = require('./components/map-leaflet');
      clearMarkers();
      clearHeatmap();
    }
  });

  document.getElementById('state-select').addEventListener('change', (e) => {
    const state = e.target.value;
    const lgaSelect = document.getElementById('lga-select');
    if (state) {
      lgaSelect.disabled = false;
      lgaSelect.innerHTML = '<option value="">Select LGA</option><option value="Example LGA">Example LGA</option>';
    } else {
      lgaSelect.disabled = true;
      lgaSelect.innerHTML = '<option value="">Select LGA</option>';
    }
  });
}

async function populateStates() {
  const select = document.getElementById('state-select');
  const states = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue', 'Borno',
    'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa',
    'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa', 'Niger',
    'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
    'FCT'
  ];
  states.forEach(state => {
    const option = document.createElement('option');
    option.value = state;
    option.textContent = state;
    select.appendChild(option);
  });
}

module.exports = { initMapPage };
