// import config from "./env.js";
// import {
//   initLeafletMap,
//   clearMarkers,
//   clearHeatmap,
// } from "./components/map-leaflet.js";

// // To use Google Maps instead, import from './components/map-google.js'

// let currentMap;

// export async function initMapPage() {
//   // Choose mapping library based on config or user preference

//   currentMap = await initLeafletMap(container, { showMarkets: true });
// }

// document.getElementById("show-markers").addEventListener("click", async () => {
//   // Reload markers (clear and load again)
//   clearMarkers();

//   await loadMarkers(); // from leaflet module
// });

// document.getElementById("show-heatmap").addEventListener("click", async () => {
//   clearHeatmap();

//   const { loadHeatmap } = await import("./components/map-leaflet.js");
//   await loadHeatmap;
// });

// document.getElementById("clear-overlay").addEventListener("click", () => {
//   clearMarkers();
//   clearHeatmap();
// });


// // // // // //  from api.js
// Nigerian state boundary files
// fetch(
//   "https://temikeezy.github.io/nigeria-geojson-data/data/lgas-with-wards.json",
// )
//   .then((res) => res.json())
//   .then((data) => {
//     L.geoJSON(data, {
//       style: {
//         color: "#2b7cff",
//         weight: 1,
//       },
//       onEachFeature: onEachState,
//     }).addTo(map);
//   });

fetch(
  "https://temikeezy.github.io/nigeria-geojson-data/data/lgas-with-wards.json",
)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);

    L.geoJSON(data).addTo(map);
  });

// Detect when a state is Click
function onEachState(feature, layer) {
  layer.on("click", function () {
    const stateName = feature.properties.name;

    map.fitBounds(layer.getBounds());

    loadLandmarks(stateName);
  });
}

// // Load the landmark Dynamically
let landmarksLayer;

function loadLandmarks(stateName) {
  fetch("data/landmarks.json")
    .then((res) => res.json())
    .then((data) => {
      if (landmarksLayer) {
        map.removeLayer(landmarksLayer);
      }

      landmarksLayer = L.layerGroup();

      const landmarks = data[stateName];

      if (!landmarks) return;

      landmarks.forEach((place) => {
        const marker = L.marker([place.lat, place.lng]);

        marker.on("click", () => {
          showLandmarkDetails(place);
        });

        landmarksLayer.addLayer(marker);
      });

      landmarksLayer.addTo(map);
    });
}

// // Show landmark on right panel
function showLandmarkDetails(place) {
  const panel = document.getElementById("landmark-details");

  panel.innerHTML = `
   <h3>${place.name}</h3>
   <p>Type: ${place.type}</p>
   <p>${place.description}</p>
 `;
}

// Add a single marker
// const marker = L.marker([9.082, 8.6753]).addTo(map);
// marker.bindPopup("<b>Hello!</b><br>This is a marker.").openPopup();

// const cities = [
//   { name: "Kaduna", coords: [10.5036, 7.4337] },
//   { name: "Oyo", coords: [8.1574, 3.6147] },
//   { name: "Enugu", coords: [6.4483, 7.5139] },
// ];

// cities.forEach((city) => {
//   L.marker(city.coords).addTo(map).bindPopup(`<b>${city.name}</b>`);
// });

// Add interactivity
// map.on("click", function (e) {
//   alert(`You clicked the map at ${e.latlng}`);
// });