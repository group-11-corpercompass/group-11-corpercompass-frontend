// create map and set initial view
const map = L.map("map").setView([9.082, 8.6753], 6); // lat, lng, zoom

// Add OpenStreetMap tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

// // Load GeoJson file
fetch("../assests_images/ng.json")
  .then((res) => res.json())
  .then((data) => {
    L.geoJSON(data, {
      onEachFeature: onEachState,
    }).addTo(map);
  });

// // Detect state click
function onEachState(feature, layer) {
  layer.on("click", function () {
    const stateName = feature.properties.name;

    map.fitBounds(layer.getBounds());

    loadLandmarks(stateName);

    console.log(feature.properties.name);
    console.log("Loading landmarks for:", stateName);
  });
}


// // Load LandMarks when state is clicked

let landmarksLayer;

function loadLandmarks(stateName) {
  fetch("landmark.json")
    .then((res) => res.json())
    .then((data) => {
      if (landmarksLayer) {
        map.removeLayer(landmarksLayer);
      }

      landmarksLayer = L.layerGroup();

      const places = data[stateName];

      if (!places) return;

      places.forEach((place) => {
        const marker = L.marker([place.lat, place.lng]);

        marker.addTo(landmarksLayer);
      });

      landmarksLayer.addTo(map);
    });
}

// // Details in right hand panel
// marker.on("click", function () {
//   showLandmark(place);
// });

function showLandmark(place) {
  const panel = document.getElementById("info-panel");

  panel.innerHTML = `
<h3>${place.name}</h3>
<p>${place.type}</p>
<p>${place.description}</p>
`;
}
