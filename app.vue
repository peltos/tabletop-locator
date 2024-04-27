<template>
  <div
    class="flex flex-col md:flex-row bg-green-light dark:bg-slate-light items-stretch h-[100vh] w-full overflow-hidden relative dark:text-white">

    <!-- Header -->
    <SectionHeader :options="options" @emitScreen="setScreen" @emitPrompt="setPrompt" />

    <!-- Content -->
    <div class="w-[200vw] h-full flex"
      :class="[screen === 'list' ? ' -ml-[100vw]' : '', doesHaveAnimation ? ' transition-all duration-300' : '']">
      <div class="w-[100vw] h-full">
        <PageMap :prompt="prompt" :screen="screen" />
      </div>
      <div class="w-[100vw] h-full overflow-auto">
        <PageList :prompt="prompt" />
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
  link: [
    { rel: 'apple-touch-icon', sizes: "180x180", href: '/favicon/apple-touch-icon.png' },
    { rel: 'icon', type: 'image/x-icon', sizes: "32x32", href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/x-icon', sizes: "16x16", href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicon/site.manifest' },
    { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg' }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: "#5aab4e" },
    { name: 'theme-color', content: "#5aab4e" }
  ]
})
let prompt = ref('');
let screen = ref('map');
let options = ref(true);
let doesHaveAnimation = ref(false);

const route = useRoute()
const router = useRouter();

function querrySettings() {
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
querrySettings();

function setScreen(newScreen) {
  screen.value = newScreen;
  router.replace({ query: { ...router.query, screen: screen.value } });
  useHead({ title: 'Tabletop Locator | ' + screen.value.charAt(0).toUpperCase() + screen.value.slice(1) })
}

function setPrompt(newPrompt) {
  prompt.value = newPrompt;
}

</script>