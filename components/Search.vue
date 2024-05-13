<template>
  <form @submit.prevent="submitForm" class="relative h-10">
    <input v-model="search" @keyup="submitForm" placeholder="Search..." type="text"
      class="border-2 py-1 px-2 w-full h-10 rounded-md" />
      <ClientOnly> <!-- solved a Hydration node mismatch error -->
        <font-awesome-icon class="absolute top-3 right-2 text-lime-700 dark:text-slate-900" :icon="['fas', 'search']" />
      </ClientOnly>
  </form>
</template>

<script setup>
const props = defineProps(['categories','screen'])
const emit = defineEmits(['searchPrompt'])
const screen = computed(() => props.screen);

// form data
const search = ref('');
let prevSearch = ''
let timeoutTyping;

// Return: Void
watch(screen, () => {
  search.value = ''
})

// Return: Void
const submitForm = async () => {
  // to prevent multiple events firing on the same keystroke
  if (prevSearch !== search.value) {
    clearTimeout(timeoutTyping);
    timeoutTyping = setTimeout(() => {
      prevSearch = search.value;
      emit('searchPrompt', search.value)
    }, 300);
  }
};

</script>