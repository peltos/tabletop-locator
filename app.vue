<template>
  <div class="flex flex-col md:flex-row bg-green-light items-stretch h-[100vh] w-full overflow-hidden relative">
   
    <!-- header -->
    <div class="md:absolute top-0 left-1/2 md:-translate-x-1/2 flex z-50  bg-white border-b-4 border-green-dark py-4 px-8 rounded-b-xl gap-4">
      <button @click="screen = 'map'; prompt = ''" class="bg-green-base hover:bg-green-light border-2 border-green-base transition px-4 py-2 rounded-xl flex items-center gap-2">
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'earth-americas']" />
        </ClientOnly>
        <span class="hidden md:inline">IRL</span>
      </button>
      <Search @searchPrompt="(newPrompt) => prompt = newPrompt" :screen="screen" />
      <button @click="screen = 'list'; prompt = ''" class="bg-green-base hover:bg-green-light border-2 border-green-base transition px-4 py-2 rounded-xl flex items-center gap-2">
        <ClientOnly>
          <font-awesome-icon :icon="['fas', 'computer']" />
        </ClientOnly>
        <span class="hidden md:inline">Online</span>
      </button>
    </div>

    <!-- content -->
    <div class="w-[200vw] h-full flex transition-all duration-300" :class="screen === 'list' ? ' -ml-[100vw]' : ''">
      <div class="w-[100vw] h-full">
        <Map :prompt="prompt" :screen="screen" />
      </div>
      <div class="w-[100vw] h-full">
        <List :prompt="prompt" />
      </div>
    </div>
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
let prompt = ref('');
let screen = ref('map');
</script>