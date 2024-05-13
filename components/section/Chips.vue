<template>
  <ul v-if="location.tags" class="flex flex-wrap gap-2">
    <li v-for="tag in checkIfCategoriesExist(location)"
      class="bg-stone-300 dark:bg-stone-600 text-sm inline-block px-2 py-1 rounded-xl">{{ tag }}</li>
  </ul>
</template>

<script setup>
import CATEGORIES from '../assets/data/categories.json';

const props = defineProps(['location'])
const location = computed(() => props.location);

// Value: Object
// Return: Array<string>
function checkIfCategoriesExist(location) {
  return location.tags.map(tag => {
    let filteredTag = CATEGORIES.map(cat => {
      if (cat.id === tag) return cat.lang[0].name //TODO: Make it international. It defaults to English
    }).filter(fil => fil);
    if (filteredTag.length > 0) return filteredTag[0];
    else console.warn(`The tag '${tag}' from online location '${location.name}' is not a valid tag. Please check the list of categories to see which ones are valid.`);
  }).filter((tag) => tag);
}
</script>