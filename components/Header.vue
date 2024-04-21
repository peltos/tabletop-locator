<template>
  <!-- Desktop logo tile -->
  <div
    class="hidden md:flex justify-center items-center absolute w-48 h-48 lg:w-72 lg:h-72 bg-green-base dark:bg-slate-base top-0 left-0 z-50 [clip-path:polygon(50%_100%,100%_55%,82%_0%,18%_0%,0%_55%);] -translate-x-1/2">
    <div class=" w-8 lg:w-16 ml-20 lg:ml-28 mb-10 flex flex-col justify-center items-center">
      <ClientOnly> <!-- solved a Hydration node mismatch error -->
        <img class="mb-2" src="~/assets/logos/logo_white.svg" alt="Tabletop locator logo">
      </ClientOnly>
      <p class="text-[#fff] text-center font-bold text-base lg:text-lg leading-5">Tabletop locator</p>
    </div>
  </div>

  <!-- Desktop logo tile outline -->
  <div
    class="hidden md:flex justify-center items-center absolute w-[12.5rem] h-[12.5rem] lg:w-[18.5rem] lg:h-[18.5rem] bg-white top-[-0.20rem] lg:top-[-0.20rem] left-0 z-40 [clip-path:polygon(50%_100%,100%_55%,82%_0%,18%_0%,0%_55%);] -translate-x-1/2">
  </div>

  <!-- Header -->
  <div class="md:absolute top-0 left-1/2 md:-translate-x-1/2 z-50">
    <div class="md:hidden w-full py-2 px-4 bg-green-base dark:bg-slate-base">
      <div class="container mx-auto flex items-center gap-2 justify-between">
        <div class="flex justify-center items-center gap-2">
          <ClientOnly> <!-- solved a Hydration node mismatch error -->
            <img class="w-8" src="~/assets/logos/logo_white.svg" alt="Tabletop locator logo">
          </ClientOnly>
          <p class="hidden [@media(min-width:400px)]:block text-[#fff] font-bold text-lg leading-5">Tabletop <br> locator</p>
        </div>
        <Search @searchPrompt="emitPrompt" :screen="screen" />
        <div class="text-white [@media(min-width:500px)]:w-[120px] flex justify-end">
          <button class="p-3" @click="setDarkMode(!darkMode)">
          <ClientOnly v-if="darkMode"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'sun']" />
          </ClientOnly>
          <ClientOnly v-if="!darkMode"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'moon']" />
          </ClientOnly>
        </button>
        </div>
      </div>
    </div>

    <div class="w-full border-b-4 py-2 px-4 md:py-4 md:px-8 md:rounded-b-xl bg-white shadow-lg">
      <div class="container mx-auto flex gap-4 justify-around items-center font-bold">
        <button v-if="options" @click="emitScreen('map')" class="btn">
          <ClientOnly> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'earth-americas']" />
          </ClientOnly>
          <span>IRL</span>
        </button>

        <Search class="hidden md:block" @searchPrompt="emitPrompt" :screen="screen" />

        <button v-if="options" @click="emitScreen('list')" class="btn">
          <ClientOnly> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'computer']" />
          </ClientOnly>
          <span>Online</span>
        </button>
      </div>
    </div>
  </div>

  <!--  -->
  <div
    class="hidden md:flex justify-center items-center absolute w-12 h-12 bg-green-base dark:bg-slate-base top-0 right-0 z-50 text-white rounded-bl-xl">
    <button class="p-3" @click="setDarkMode(!darkMode)">
      <ClientOnly v-if="darkMode"> <!-- solved a Hydration node mismatch error -->
        <font-awesome-icon :icon="['fas', 'sun']" />
      </ClientOnly>
      <ClientOnly v-if="!darkMode"> <!-- solved a Hydration node mismatch error -->
        <font-awesome-icon :icon="['fas', 'moon']" />
      </ClientOnly>
    </button>
  </div>
</template>

<script setup>
const props = defineProps(['screen','options'])
let screen = ref(props.screen);
let options = computed(() => props.options);
let darkMode = ref(false);

const emit = defineEmits(['emitScreen','emitPrompt'])
function emitScreen(newScreen) {
  emit('emitPrompt', ''); // reset prompt
  emit('emitScreen', newScreen); // for the parent
  screen.value = newScreen // for the child
}
function emitPrompt(newPrompt) {
  emit('emitPrompt', newPrompt);
}

function setDarkMode(newDarkMode) {
  darkMode.value = newDarkMode;
  useHead({
    bodyAttrs: {
      class:  computed(() => {
        if (darkMode.value) return 'dark';
        
        return '';
      }),
    }
  })
}

</script>