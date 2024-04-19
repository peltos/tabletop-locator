<template>
  <form class="md:absolute top-0 left-1/2 md:-translate-x-1/2 flex flex-col z-50 
  md:bg-white border-b-4 border-green-dark py-4 px-8 rounded-b-xl">
    <input v-model="search" autofocus @keyup="submitForm" placeholder="Search..." type="text"
      class="border-2 p-1 w-full rounded-md" />
  </form>

  <!-- <div class="text-white capitalize">
    <input id="checkbox-all" type="checkbox" value="all" checked />
    <label for="checkbox-all">All</label>
  </div>
  <template v-for="category of categories">
    <div class="text-white capitalize">
      <input :id="'checkbox-' + category.id" type="checkbox" :value="category.id" checked />
      <label :for="'checkbox-' + category.id">{{ getCategoryName(category) }}</label>
    </div>
  </template> -->
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['categories'])
const categories = ref(props.categories)
const emit = defineEmits(['searchPrompt'])


// form data
const search = ref('');
let prevSearch = ''
let timeoutTyping;

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

function getCategoryName(category) {
  if (!category.lang) return;

  const lang = "en";

  return category.lang.map(catLang => {
    if (catLang.countryCode === lang) return catLang.name
  }).find((elm) => elm);
}

</script>