<template>
  <div class="popup absolute z-50 -translate-x-1/2 bottom-0 sm:bottom-4 left-1/2 
  w-full sm:w-2/3 lg:w-1/2 max-h-[40vh] flex flex-col 
  bg-white sm:rounded-xl border-t-4 transition-all shadow-lg text-black"
  :class="!popupActive ? '!-bottom-96' : ''">

    <!-- Popup header -->
    <div class="flex p-4 mx-4 justify-stretch items-stretch border-b-2 border-green-base">
      <a v-if="location.url" :href="location.url" class="w-full text-xl font-bold text-center" >
        <h2>{{ location.name }}</h2>
      </a>
      <h2 v-else class="w-full text-xl font-bold text-center">
        {{ location.name }}
      </h2>
    </div>

    <!-- Popup content -->
    <div class="flex flex-col md:flex-row p-4 justify-stretch items-stretch max-h-[calc(24rem-4rem)] gap-4">

      <!-- Logo -->
      <div v-if="location.logo" class="md:w-1/4 rounded-xl flex items-center justify-center">
        <img class="w-full h-full max-w-32 object-contain mb-4" :src="location.logo" />
      </div>

      <!-- Container -->
      <div class="md:[div+&]:w-3/4 overflow-x-hidden">

        <!-- Website -->
        <div v-if="location.url" class="flex gap-2 items-baseline">
          <font-awesome-icon class="w-4" :icon="['fas', 'globe']" />
          <a :href="location.url" target="_blank">
            {{location.url}}
            <font-awesome-icon class="text-black text-[0.66rem] no-underline pl-1" :icon="['fas', 'arrow-up-right-from-square']" />
          </a>
        </div>

        <!-- Address  -->
        <div v-if="location.street && location.postalcode" class="flex gap-2 items-baseline">
          <font-awesome-icon class="w-4" :icon="['fas', 'location-dot']" />
          <a :href="createGoogleMapsLink(location)" target="_blank">
            <p>{{ location.street }}, {{ location.postalcode }}
              <font-awesome-icon class="text-black text-[0.66rem] no-underline pl-1" :icon="['fas', 'arrow-up-right-from-square']" />
            </p>
          </a>
        </div>

        <!-- Description -->
        <p v-if="location.desc" class="[div+&]:mt-4">{{ location.desc }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['location','popupActive'])
const location = computed(() => props.location)
const popupActive = computed(() => props.popupActive)

function createGoogleMapsLink(location) {
  return `https://www.google.com/maps/place/${location.street.replace(' ', '+')}+${location.postalcode.replace(' ', '+')}`
}
</script>