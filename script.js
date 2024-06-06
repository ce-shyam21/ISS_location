document.addEventListener("DOMContentLoaded", function () {
    const latElement = document.getElementById("lat");
    const lonElement = document.getElementById("lon");
    const altElement = document.getElementById("alt");
    const velElement = document.getElementById("vel");
    const visibilityElement = document.getElementById("visibility");

    // Initialize the map
    const map = L.map('map').setView([0, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const issIcon = L.icon({
        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
        iconSize: [50, 32],
        iconAnchor: [25, 16]
    });

    const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

    async function fetchISSData() {
        const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
        const data = await response.json();
        const { latitude, longitude, altitude, velocity, visibility } = data;

        latElement.textContent = latitude.toFixed(2);
        lonElement.textContent = longitude.toFixed(2);
        altElement.textContent = altitude.toFixed(2);
        velElement.textContent = velocity.toFixed(2);
        visibilityElement.textContent = visibility;

        marker.setLatLng([latitude, longitude]);
        map.setView([latitude, longitude], 2);
    }

    fetchISSData();
    setInterval(fetchISSData, 5000);
});
