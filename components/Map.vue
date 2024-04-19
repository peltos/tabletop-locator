<template>
  <div class="w-full md:h-[100vh] h-full z-10" id="map"> </div>
  <Popup :location="currentIRLLocation" :popupActive="popupActive"/>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Fuse from 'fuse.js'

import IRL_Locations_NL from '../assets/data/locations/nl/irl.json';
import IRL_Locations_BE from '../assets/data/locations/be/irl.json';

let IRLLocationsAll = [IRL_Locations_NL, IRL_Locations_BE];
let IRLLocationsFiltered = ref([]);

const props = defineProps(['prompt','screen'])
const prompt = computed(() => props.prompt);
const screen = computed(() => props.screen);
const defaultCoords = [52.09027905360301, 5.107968723830769];
let currentIRLLocation = ref({});
let popupActive = ref(false);
let timeoutPopupAnimation;

let map;
let markers;

watch(prompt, (newPrompt) => {
  filterSearch(newPrompt);
  AddingMarkers();
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentIRLLocation.value = {};
  }, 200)
  return popupActive.value = false;
})

watch(screen, () => {
  filterSearch('');
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
  map = L.map('map').setView(defaultCoords, 7);

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

  filterSearch('');
  AddingMarkers();
});

function AddingMarkers() {
  if (markers) map.removeLayer(markers);

  // markerclusters
  markers = L.markerClusterGroup();
  // adding all markers
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

  // adding markers and markerclusters
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