<template>
  <div class="flex flex-col md:flex-row bg-slate-800">
    <div class="w-96 h-32 md:h-full p-4 ">
      <h1 class="text-xl font-bold mb-4 text-white">Tabletop Locator</h1>
      <input type="text" placeholder="Search..." class="border-2 p-1 w-full rounded-md">
    </div>
    <div class="w-[100vw] h-[100vh]" id="map">
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue';
  import LocationsNL from './assets/locations/nl/locations.json';
  
  onMounted(() => {
    let map = L.map('map').setView([52.09027905360301, 5.107968723830769], 7);

    // ask location and zoom in on your location if accepted
    navigator.geolocation.getCurrentPosition(
      (position) => {map.setView([position.coords.latitude, position.coords.longitude], 12)}, 
      (error) => console.warn(error.message)
    );

    // initializing mapp
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // markerclusters
    var markers = L.markerClusterGroup();

    // adding all markers
    LocationsNL.forEach(loc => {
      let marker = L.marker(loc.latlng);
      marker.bindPopup(`
        <div class="relative w-full h-full flex flex-col items-center"> 
          <img class="w-24 max-h-24 mb-4 object-contain" src="${loc.logo}"/>
          <h2 class="text-xl font-bold mb-4 text-center">${loc.name}</h2>
          <p class>${loc.desc}</p> 
        </div>
      `);
      markers.addLayer(marker);
    });

    // adding markers and markerclusters
    map.addLayer(markers);
  });
</script>