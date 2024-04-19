<template>
  <!-- <Popup :location="currentIRLLocation" :popupActive="popupActive"/> -->
  <div class="w-full p-4 md:pt-24">
    <ul class="container mx-auto">
      <li v-for="location in IRLLocationsFiltered">
        {{ location.name }}
      </li>
    </ul>
    
  </div>
</template>

<script setup>
import { ref, onMounted, defineProps, watch } from 'vue';
import Fuse from 'fuse.js'

import IRL_Locations_NL from '../assets/data/locations/nl/irl.json';
import IRL_Locations_BE from '../assets/data/locations/be/irl.json';

let IRLLocationsAll = [IRL_Locations_NL, IRL_Locations_BE];
let IRLLocationsFiltered = ref([]);

const props = defineProps(['prompt'])
const prompt = computed(() => props.prompt);
let currentIRLLocation = ref({});
let popupActive = ref(false);
let timeoutPopupAnimation;

watch(prompt, (newPrompt) => {
  filterSearch(newPrompt);
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentIRLLocation.value = {};
  }, 200)
  return popupActive.value = false;
})

onMounted(() => {
  filterSearch('');
});

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