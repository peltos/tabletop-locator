<template>
  <div
    class="list-container container mx-auto w-full p-4 sm:p-0 sm:pt-4 md:pt-24 md:pb-4 transition-none dark:text-white">
    <ul class="grid xl:grid-cols-2  gap-4">
      <SectionCard :locations="OnlineLocationsFiltered"></SectionCard>
    </ul>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'
import ONLINE_LOCATIONS from '../assets/data/onlineLocations.json';

const props = defineProps(['prompt'])
const prompt = computed(() => props.prompt);
let currentIRLLocation = ref({});
let popupActive = ref(false);
let timeoutPopupAnimation;
let OnlineLocationsFiltered = ref([]);

// Return: Void
watch(prompt, (newPrompt) => {
  filterSearch(newPrompt);
  clearTimeout(timeoutPopupAnimation);
  timeoutPopupAnimation = setTimeout(() => {
    currentIRLLocation.value = {};
  }, 200)
  return popupActive.value = false;
})

// Return: Void
onMounted(() => {
  filterSearch('');
});

// Value: String
// Return: Void
function filterSearch(newPrompt) {
  OnlineLocationsFiltered.value = [] // reset IRLLocations locations

  // reset when search is empty
  if (newPrompt === '') {
    OnlineLocationsFiltered.value = ONLINE_LOCATIONS
    OnlineLocationsFiltered.value.sort(compareIRLLocations);
    return
  }
  // remaining fuzzy search
  let filter = new Fuse(ONLINE_LOCATIONS, {
    keys: ['name', 'desc']
  }).search(newPrompt).map((elm) => elm.item);
  OnlineLocationsFiltered.value = filter
  OnlineLocationsFiltered.value.sort(compareIRLLocations);
}

// Value: String, String
// Return: Interger
function compareIRLLocations(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}
</script>