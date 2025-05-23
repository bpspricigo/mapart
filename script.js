document.addEventListener('DOMContentLoaded', function () {
  const API_KEY = '9a28cb99-5e71-45e3-8372-3e2791f58782';

  const map = L.map('map').setView([48.1351, 11.5820], 13);

  const tileLayers = {
    toner: L.tileLayer(`https://tiles.stadiamaps.com/tiles/stamen_toner_background/{z}/{x}/{y}{r}.png?api_key=${API_KEY}`, {
      maxZoom: 20,
    }),
    tonerLite : L.tileLayer(`https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png?api_key=${API_KEY}`, {
      maxZoom: 20,
    }),
    terrain: L.tileLayer(`https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png?api_key=${API_KEY}`, {
      maxZoom: 20,
    }),
    watercolor: L.tileLayer(`https://tiles.stadiamaps.com/tiles/stamen_watercolor/{z}/{x}/{y}.jpg?api_key=${API_KEY}`, {
      maxZoom: 16,
    }),
  };

  // Start with Toner
  tileLayers.toner.addTo(map);

  let currentMarker = null;  // Store the current marker

  const heartIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/833/833472.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  // Add marker on click, but only one at a time
  map.on('click', function (e) {
    if (currentMarker) {
      map.removeLayer(currentMarker);
    }
    currentMarker = L.marker(e.latlng, { icon: heartIcon }).addTo(map);
  });

  // Layer switch function
  function switchLayer(name) {
    // Remove all tile layers first
    Object.values(tileLayers).forEach(layer => map.removeLayer(layer));
    tileLayers[name].addTo(map);
  }

  // Button events
  const btnToner = document.getElementById('btnToner');
  const btnTonerLite = document.getElementById('btnTonerLite');
  const btnTerrain = document.getElementById('btnTerrain');
  const btnWatercolor = document.getElementById('btnWatercolor');

  btnToner.addEventListener('click', () => switchLayer('toner'));
  btnTonerLite.addEventListener('click', () => switchLayer('tonerLite'));
  btnTerrain.addEventListener('click', () => switchLayer('terrain'));
  btnWatercolor.addEventListener('click', () => switchLayer('watercolor'));

  // Page layout controls
  const pageDiv = document.getElementById('pageDiv');
  const btnA4 = document.getElementById('btnA4');
  const btnA3 = document.getElementById('btnA3');
  const btnToggleBorder = document.getElementById('btnToggleBorder');

  btnA4.addEventListener('click', () => {
    pageDiv.classList.remove('a3-page');
    pageDiv.classList.add('a4-page');
  });

  btnA3.addEventListener('click', () => {
    pageDiv.classList.remove('a4-page');
    pageDiv.classList.add('a3-page');
  });

  btnToggleBorder.addEventListener('click', () => {
    pageDiv.classList.toggle('with-border');
  });

  // Marker Remover button
  const btnRemoveMarker = document.getElementById('btnRemoveMarker');

  btnRemoveMarker.addEventListener('click', () => {
    if (currentMarker) {
      map.removeLayer(currentMarker);
      currentMarker = null;
    }
  });
});
