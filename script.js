document.addEventListener('DOMContentLoaded', function () {
  const map = L.map('map').setView([48.1351, 11.5820], 13);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors & CartoDB',
    subdomains: 'abcd',
    maxZoom: 19
  }).addTo(map);

  map.on('click', function (e) {
    L.marker(e.latlng).addTo(map);
  });
});
