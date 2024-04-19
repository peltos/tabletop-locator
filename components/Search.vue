<template>
  <form class="w-full h-10">
    <input v-model="search" autofocus @keyup="submitForm" placeholder="Search..." type="text"
      class="border-2 py-1 px-2 w-full h-full rounded-md" />
  </form>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['categories','screen'])
const emit = defineEmits(['searchPrompt'])
const screen = computed(() => props.screen);

// form data
const search = ref('');
let prevSearch = ''
let timeoutTyping;

watch(screen, () => {
  search.value = ''
})

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