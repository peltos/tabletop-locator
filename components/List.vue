<template>
  <!-- <Popup :location="currentIRLLocation" :popupActive="popupActive"/> -->
  <div class="list-container container mx-auto w-full p-4 sm:p-0 sm:pt-4 md:pt-24 transition-none">
    <ul class="">
      <li class="first:border-t-2 border-b-2 border-green-base dark:border-slate-base py-4 flex gap-4" v-for="location in IRLLocationsFiltered">
        <img :src="location.logo" :alt="location.name">
        <div>
          <strong>{{ location.name }} </strong><br>
          {{ location.desc }}
        </div>
      </li>
    </ul>

    <!-- <iframe class="w-96 h-96" src="http://localhost:3000/?screen=map&options=0" frameborder="0"></iframe> -->
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'

import ONLINE_LOCATIONS from '../assets/data/onlineLocations.json';

let IRLLocationsAll = [ONLINE_LOCATIONS];
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