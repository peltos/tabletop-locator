<template>
  <!-- <Popup :location="currentIRLLocation" :popupActive="popupActive"/> -->
  <div
    class="list-container container mx-auto w-full p-4 sm:p-0 sm:pt-4 md:pt-24 md:pb-4 transition-none dark:text-white">
    <ul class="grid xl:grid-cols-2  gap-4">
      <li v-for="location in OnlineLocationsFiltered"
        class="bg-white dark:bg-stone-800 p-4 rounded-xl flex flex-col gap-2">
        <div class="grid grid-cols-[3rem_1fr_100px] items-start gap-2">
          <div class="bg-white w-12 h-12 rounded-full overflow-hidden">
            <img class="object-contain w-12 h-12 self-center" :src="location.logo" :alt="'Logo '+location.name">
          </div>
          <div class="w-[calc(100%-3rem)]">
            <strong v-if="location.name" class="block">{{ location.name }} </strong>
            <span v-if="location.subtitle" class="block">{{ location.subtitle }} </span>
          </div>
          <a v-if="location.url" :href="location.url" target="_blank" class="btn btn-full">
            <ClientOnly> <!-- solved a Hydration node mismatch error -->
              <font-awesome-icon :icon="['fas', 'globe']" />
            </ClientOnly>
            Visit
          </a>
        </div>
        <div class="col-span-3">
          <strong>Description</strong>
          <p v-if="location.desc">{{ location.desc }}</p>
          <a v-if="location.url" :href="location.url">{{ location.url }}</a>
          <ul v-if="location.tags" class="mt-4 flex flex-wrap gap-2">
            <li v-for="tag in location.tags"
              class="bg-stone-300 dark:bg-stone-600 text-sm inline-block px-2 py-1 rounded-xl">{{ tag }}</li>
          </ul>
        </div>
        <ul v-if="location.socials" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 break-all">
          <li v-for="(value, key) in location.socials" class="">
            <a class="capitalize flex gap-2 items-center" :href="value">
              <div class="bg-stone-200 dark:bg-stone-600 text-black rounded-full p-1">
                <ClientOnly v-if="checkExistingFABrandicon(key)"> <!-- solved a Hydration node mismatch error -->
                  <font-awesome-icon class="w-6" :icon="['fab', key]" />
                </ClientOnly>
                <ClientOnly v-else-if="key === 'email'"> <!-- solved a Hydration node mismatch error -->
                  <font-awesome-icon class="w-6" :icon="['fas', 'envelope']" />
                </ClientOnly>
                <ClientOnly v-else> <!-- solved a Hydration node mismatch error -->
                  <font-awesome-icon class="w-6" :icon="['fas', 'globe']" />
                </ClientOnly>
              </div>
            {{ key }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup>
import Fuse from 'fuse.js'

import ONLINE_LOCATIONS from '../assets/data/onlineLocations.json';
let OnlineLocationsFiltered = ref([]);

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

function compareIRLLocations(a, b) {
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
}

function checkExistingFABrandicon(icon) {
  if (icon === "discord" ||
    icon === "reddit" ||
    icon === "youtube" ||
    icon === "instagram" ||
    icon === "facebook" ||
    icon === "linkedin" ||
    icon === "twitch" ||
    icon === "tiktok") {
    return true
  }
  return false
}
</script>