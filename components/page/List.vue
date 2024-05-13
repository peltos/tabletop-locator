<template>
  <!-- <Popup :location="currentIRLLocation" :popupActive="popupActive"/> -->
  <div
    class="list-container container mx-auto w-full p-4 sm:p-0 sm:pt-4 md:pt-24 md:pb-4 transition-none dark:text-white">
    <ul class="grid xl:grid-cols-2  gap-4">
      <SectionCard :prompt="prompt"></SectionCard>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps(['prompt'])
const prompt = computed(() => props.prompt);
</script>