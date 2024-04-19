<template>
  <div class="flex flex-col md:flex-row bg-white items-stretch h-[100vh] w-full overflow-hidden relative">
    <Search :categories="categories" @searchPrompt="filterSearch" />
    <Map :locations="locationsFiltered" />
  </div>
</template>

<script setup>
useHead({
  title: 'Tabletop Locator',
  meta: [
    { name: 'description', content: 'Find your tabletopshop near you!' }
  ],
})
import { ref } from 'vue';
import Fuse from 'fuse.js'

import categoriesRaw from './assets/data/categories.json';
import locationsNL from './assets/data/locations/nl/locations.json';
import locationsBE from './assets/data/locations/be/locations.json';

let locationsAll = [locationsNL, locationsBE];
let locationsFiltered = ref([]);
let categories = ref(categoriesRaw.sort(compareCategories))

onMounted(() => {
  filterSearch('')
})

function filterSearch(newPrompt) {
  locationsFiltered.value = [] // reset locations

  // reset when search is empty
  if (newPrompt === '') {
    locationsAll.forEach((locationslang) => {
      locationsFiltered.value = [...locationsFiltered.value, ...locationslang.items]
    });
    locationsFiltered.value.sort(comparelocations);
    return
  }

  // check if countrycode or nationality is typed
  let isPromptNationality = false;
  locationsAll.forEach((locationslang) => {
    if (locationslang.nationality === newPrompt || locationslang.countryCode === newPrompt) {
      locationsFiltered.value = [...locationslang.items]
      isPromptNationality = true;
      return
    }
  });
  if (isPromptNationality) {
    locationsFiltered.value.sort(comparelocations);
    return;
  }
  isPromptNationality = false;

  // remaining fuzzy search
  locationsAll.forEach((locationslang) => {
    let filter = new Fuse(locationslang.items, {
      keys: ['desc', 'name', 'province']
    }).search(newPrompt).map((elm) => elm.item);

    locationsFiltered.value = [...locationsFiltered.value, ...filter]
  })

  locationsFiltered.value.sort(comparelocations);
}

function compareCategories(a, b) {
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
}

function comparelocations(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

</script>