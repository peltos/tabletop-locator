<template>
  <div class="bg-stone-100 dark:bg-stone-800 z-20 w-full md:w-80 md:py-4 text-black dark:text-white transition-colors">

    <!-- Top header section -->
    <div class="p-2 md:p-8 h-full border-r-4 border-stone-200 dark:border-stone-800">

      <!-- Logo / mobile search section -->
      <div class="flex items-center gap-4 mb-4 justify-between">
        <div class="flex items-center gap-4">
          <img class="hidden dark:block w-12" src="~/assets/logos/logo_emblem_white.svg" alt="Tabletop locator logo" />
          <img class="dark:hidden w-12" src="~/assets/logos/logo_emblem_green.svg" alt="Tabletop locator logo" />
          <p class="text-lime-700 dark:text-lime-500 font-bold text-base lg:text-lg leading-5">Tabletop <br> locator</p>
        </div>
        <Search class="md:hidden" @searchPrompt="emitPrompt" :screen="screen" />
        <button class="md:hidden" @click="menuOpen = !menuOpen">
          <ClientOnly> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon class="text-xl" :icon="['fas', 'bars']" />
          </ClientOnly>
        </button>
      </div>

      <!-- Menu -->
      <div :class="menuOpen ? '!right-0' : ''"
        class="md:flex transition-all absolute md:static right-[-50%] top-0 z-50 bg-stone-100 h-full dark:bg-stone-800 px-4 py-5 md:p-0 flex flex-col items-end md:items-baseline gap-4">
        <button @click="menuOpen = !menuOpen" class="md:hidden">
          <ClientOnly> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon class="text-xl" :icon="['fas', 'bars']" />
          </ClientOnly>
        </button>

        <!-- IRL/Online switch (Desktop only) -->
        <div class="hidden md:flex gap-2">
          <button v-if="options" @click="emitScreen('map')" class="btn flex-1"
            :class="screen === 'map' ? 'btn-active' : ''">
            <ClientOnly> <!-- solved a Hydration node mismatch error -->
              <font-awesome-icon :icon="['fas', 'earth-americas']" />
            </ClientOnly>
            <span>IRL</span>
          </button>

          <button v-if="options" @click="emitScreen('list')" class="btn flex-1"
            :class="screen === 'list' ? 'btn-active' : ''">
            <ClientOnly> <!-- solved a Hydration node mismatch error -->
              <font-awesome-icon :icon="['fas', 'computer']" />
            </ClientOnly>
            <span>Online</span>
          </button>
        </div>

        <!-- Darkmode switch -->
        <button class="btn" @click="setDarkMode(!darkMode)">
          <ClientOnly v-if="darkMode"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'sun']" />
          </ClientOnly>
          <ClientOnly v-if="!darkMode"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon :icon="['fas', 'moon']" />
          </ClientOnly>
          <span>{{ darkMode ? 'Light Mode' : 'Dark Mode' }}</span>
        </button>
      </div>
    </div>

    <!-- Bottom header section (Mobile only) -->
    <div class="md:hidden flex gap-2 p-2">

      <!-- IRL/Online switch (Mobile only) -->
      <button v-if="options" @click="emitScreen('map')" class="btn flex-1"
        :class="screen === 'map' ? 'btn-active' : ''">
        <ClientOnly> <!-- solved a Hydration node mismatch error -->
          <font-awesome-icon :icon="['fas', 'earth-americas']" />
        </ClientOnly>
        <span>IRL</span>
      </button>

      <button v-if="options" @click="emitScreen('list')" class="btn flex-1"
        :class="screen === 'list' ? 'btn-active' : ''">
        <ClientOnly> <!-- solved a Hydration node mismatch error -->
          <font-awesome-icon :icon="['fas', 'computer']" />
        </ClientOnly>
        <span>Online</span>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['screen', 'options'])
let screen = ref(props.screen);
let options = computed(() => props.options);
let darkMode = ref(false);
let menuOpen = ref(false);

// Return: Void
onMounted(() => {
  // check system darkmode and/or localstorage darkmode preference
  let darkmodeLocalStorage = localStorage.getItem("darkmode")
  if (darkmodeLocalStorage) {
    if (darkmodeLocalStorage === 'true') setDarkMode(true);
    else setDarkMode(false);
  } else {
    runColorMode((isDarkMode) => {
      if (isDarkMode) setDarkMode(true);
      else setDarkMode(false);
    })
  }
});

const emit = defineEmits(['emitScreen', 'emitPrompt'])

// Value: String
// Return: Void
function emitScreen(newScreen) {
  emit('emitPrompt', ''); // reset prompt
  emit('emitScreen', newScreen); // for the parent
  screen.value = newScreen // for the child
}

// Value: String
// Return: Void
function emitPrompt(newPrompt) {
  emit('emitPrompt', newPrompt);
}

// Value: Boolean
// Return: Void
function setDarkMode(newDarkMode) {
  darkMode.value = newDarkMode;
  localStorage.setItem("darkmode", newDarkMode)

  useHead({
    bodyAttrs: {
      class: computed(() => {
        if (darkMode.value) return 'dark';
        if (!darkMode.value) return '';

        return '';
      }),
    }
  })
}

// Return: Boolean
function isDarkMode() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

// Value: Function
// Return: Boolean
function runColorMode(fn) {
  if (!window.matchMedia) return;
  const query = window.matchMedia('(prefers-color-scheme: dark)');
  fn(query.matches);
  query.addEventListener('change', (event) => fn(event.matches));
}

</script>