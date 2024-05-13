<template>
  <div class="md:flex overflow-hidden">

    <!-- Header -->
    <SectionHeader :screen="screen" :options="options" @emitScreen="setScreen" @emitPrompt="setPrompt" />

    <!-- Content -->
    <div class="w-full md:h-[100vh] relative">
      
      <!-- Searchbar -->
      <div class="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div class="w-full py-2 px-4 md:py-4 md:px-8 md:rounded-b-xl bg-white dark:bg-stone-800 shadow-lg">
          <Search class="" @searchPrompt="setPrompt" :screen="screen" />
        </div>
      </div>

      <div class="grid grid-cols-2 w-[200%] h-full" :class="[screen === 'list' ? ' -ml-[100%]' : '', doesHaveAnimation ? ' transition-all duration-300' : '']">
        <div class="">
          <PageMap :prompt="prompt" :screen="screen" />
        </div>
        <div class="bg-stone-100 dark:bg-stone-700 h-[calc(100vh-145px)] md:h-[100vh] overflow-auto">
          <PageList :prompt="prompt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
let development = process.env.NODE_ENV !== 'production' ? '': '/tabletop-locator'

useHead({
  title: 'Tabletop Locator',
  meta: [
    { name: 'description', content: 'Find your tabletopshop near you!' }
  ],
  link: [
    { rel: 'apple-touch-icon', sizes: "180x180", href: development + '/favicon/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/x-icon', sizes: "32x32", href: development + '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/x-icon', sizes: "16x16", href: development + '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: development + '/favicon/site.webmanifest' },
    { rel: 'mask-icon', href: development + '/favicon/safari-pinned-tab.svg' }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: "#5aab4e" },
    { name: 'theme-color', content: "#5aab4e" }
  ],
  bodyAttrs: {
    class: 'overflow-hidden'
  }
})
let prompt = ref('');
let screen = ref('map');
let options = ref(true);
let doesHaveAnimation = ref(false);

const route = useRoute()
const router = useRouter();

// Return: Void
function urlQuerrySettings() {
  setTimeout(() => {
    doesHaveAnimation.value = true;
  }, 200);

  if (Object.keys(route.query).length === 0) {
    router.replace({ query: { ...router.query, screen: screen.value } });
  }

  if (route.query.screen === 'list') screen.value = 'list';
  if (route.query.options === '0') options.value = false;

  useHead({ title: 'Tabletop Locator | ' + screen.value.charAt(0).toUpperCase() + screen.value.slice(1) })
}
urlQuerrySettings();

// Value: String
// Return: Void
function setScreen(newScreen) {
  screen.value = newScreen;
  router.replace({ query: { ...router.query, screen: screen.value } });
  useHead({ title: 'Tabletop Locator | ' + screen.value.charAt(0).toUpperCase() + screen.value.slice(1) })
}
 
// Value: String
// Return: Void
function setPrompt(newPrompt) {
  prompt.value = newPrompt;
}

</script>