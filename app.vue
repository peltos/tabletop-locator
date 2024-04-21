<template>
  <div class="flex flex-col md:flex-row bg-green-light dark:bg-slate-light items-stretch h-[100vh] w-full overflow-hidden relative dark:text-white">

    <!-- Header -->
    <Header :options="options" @emitScreen="setScreen" @emitPrompt="setPrompt"></Header>

    <!-- Content -->
    <div class="w-[200vw] h-full flex"
      :class="[screen === 'list' ? ' -ml-[100vw]' : '', doesHaveAnimation ? ' transition-all duration-300' : '']">
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
  bodyAttrs: {
    // class: 'dark'
  }
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