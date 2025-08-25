// Initialize map
const map = L.map('map').setView([28.6139, 77.2090], 10); // Default Delhi

// Add OpenStreetMap layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let marker; // to track marker

// Search function
async function searchPlace() {
  const query = document.getElementById("place-input").value;
  if (!query) {
    alert("Please enter a place name");
    return;
  }

  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      alert("No results found");
      return;
    }

    const lat = data[0].lat;
    const lon = data[0].lon;

    // Remove old marker
    if (marker) map.removeLayer(marker);

    // Add new marker
    marker = L.marker([lat, lon]).addTo(map)
      .bindPopup(data[0].display_name)
      .openPopup();

    // Move map to searched location
    map.setView([lat, lon], 13);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Button click event
document.getElementById("search-btn").addEventListener("click", searchPlace);

// Enter key event
document.getElementById("place-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchPlace();
  }
});
