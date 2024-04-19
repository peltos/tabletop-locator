<template>
  <div class="w-full md:h-[100vh] h-full z-10" id="map"> </div>
  <Popup :location="currentLocation" :popupActive="popupActive"/>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Popup from './Popup.vue';

const props = defineProps(['locations'])
const locations = computed(() => {
  return props.locations
})
let currentLocation = ref({});
let popupActive = ref(false);
let timeoutPopupAnimation;

let map;
let markers;

watch(locations, () => {
  AddingMarkers();
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentLocation.value = {};
  }, 200)
  return popupActive.value = false;
})

onMounted(() => {
  map = L.map('map').setView([52.09027905360301, 5.107968723830769], 7);

  // ask location and zoom in on your location if accepted
  navigator.geolocation.getCurrentPosition(
    (position) => { map.setView([position.coords.latitude, position.coords.longitude], 12) },
    (error) => console.warn(error.message)
  );

  // initializing mapp
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  AddingMarkers();
});

function AddingMarkers() {
  if (markers) map.removeLayer(markers);

  // markerclusters
  markers = L.markerClusterGroup();
  // adding all markers
  if (!locations) return
  locations.value.forEach(loc => {
    let marker = L.marker(loc.latlng);
    marker.on('click', () => {
      if (currentLocation.value === loc) {
        clearTimeout(timeoutPopupAnimation);
        timeoutPopupAnimation = setTimeout(() => {
          currentLocation.value = {};
        }, 200)
        return popupActive.value = false;
      }
      popupActive.value = true;
      currentLocation.value = loc
    }
    );
    markers.addLayer(marker);
  });

  // adding markers and markerclusters
  map.addLayer(markers);
}
</script>