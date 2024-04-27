<template>
  <div class="w-full md:h-[100vh] h-full z-10 [&_a]:!no-underline" id="map"> </div>
  <SectionPopup :location="currentIRLLocation" :popupActive="popupActive"/>
</template>

<script setup>
import Fuse from 'fuse.js'

// location data
import IRL_Locations_NL from '../assets/data/irlLocations/nl/locations.json';
import IRL_Locations_BE from '../assets/data/irlLocations/be/locations.json';
let IRLLocationsAll = [IRL_Locations_NL, IRL_Locations_BE];
let IRLLocationsFiltered = ref([]);

// leaflet variables
let map;
let markers;

// custom variables
const props = defineProps(['prompt','screen'])
const prompt = computed(() => props.prompt);
const screen = computed(() => props.screen);
const defaultCoords = [52.09027905360301, 5.107968723830769];
let currentIRLLocation = ref({});
let popupActive = ref(false);
let timeoutPopupAnimation;

watch(prompt, (newPrompt) => {
  filterSearch(newPrompt); //filter data base on the prompt
  AddingMarkers(); // refresh the markers

  // clear data on the popup when the hide animation is finished
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentIRLLocation.value = {};
  }, 200)
  return popupActive.value = false;
})

watch(screen, () => {
  filterSearch(''); // reset search
  
  // clear data on the popup when the hide animation is finished
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentIRLLocation.value = {};
  }, 200)
  popupActive.value = false;

  // ask location and zoom in on your location if accepted
  setTimeout(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => { map.setView([position.coords.latitude, position.coords.longitude], 12) },
      (error) => {
        map.setView(defaultCoords, 7);
        console.warn(error.message)
      }
    );
  },300)
})

onMounted(() => {
  // initializing
  map = L.map('map',{zoomControl: false}).setView(defaultCoords, 7);

  // ask location and zoom in on your location if accepted
  navigator.geolocation.getCurrentPosition(
    (position) => map.setView([position.coords.latitude, position.coords.longitude], 12),
    (error) => console.warn(error.message)
  );

  // initializing map layer
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 3,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);

  // change position of the zoom controls
  L.control.zoom({
      position: 'topright'
  }).addTo(map);

  filterSearch(''); // init data
  AddingMarkers(); // init markers
});

function AddingMarkers() {
  if (markers) map.removeLayer(markers);

  // initializing markerclusters
  markers = L.markerClusterGroup();

  // creating all markers
  if (!IRLLocationsFiltered) return
    IRLLocationsFiltered.value.forEach(loc => {
      
      let marker = L.marker(loc.latlng);
      marker.on('click', () => {
        if (currentIRLLocation.value === loc) {
          clearTimeout(timeoutPopupAnimation);
          timeoutPopupAnimation = setTimeout(() => {
            currentIRLLocation.value = {};
          }, 200)
          return popupActive.value = false;
        }
        popupActive.value = true;
        currentIRLLocation.value = loc
      }
    );
    markers.addLayer(marker);
  });

  // adding markers to markerclusters
  map.addLayer(markers);
}

function filterSearch(newPrompt) {
  IRLLocationsFiltered.value = [] // reset IRLLocations locations

  // reset when search is empty
  if (newPrompt === '') {
    IRLLocationsAll.forEach((IRLLocationslang) => {
      IRLLocationsFiltered.value = [...IRLLocationsFiltered.value, ...IRLLocationslang.items]
    });
    IRLLocationsFiltered.value.sort(compareIRLLocations);
    return
  }

  // check if countrycode or nationality is typed
  let isPromptNationality = false;
  IRLLocationsAll.forEach((IRLLocationslang) => {
    if (IRLLocationslang.nationality === newPrompt || IRLLocationslang.countryCode === newPrompt) {
      IRLLocationsFiltered.value = [...IRLLocationslang.items]
      isPromptNationality = true;
      return
    }
  });
  if (isPromptNationality) {
    IRLLocationsFiltered.value.sort(compareIRLLocations);
    return;
  }
  isPromptNationality = false;

  // remaining fuzzy search
  IRLLocationsAll.forEach((IRLLocationslang) => {
    let filter = new Fuse(IRLLocationslang.items, {
      keys: ['desc', 'name', 'province']
    }).search(newPrompt).map((elm) => elm.item);

    IRLLocationsFiltered.value = [...IRLLocationsFiltered.value, ...filter]
  })
  IRLLocationsFiltered.value.sort(compareIRLLocations);
}

function compareIRLLocations(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
</script>