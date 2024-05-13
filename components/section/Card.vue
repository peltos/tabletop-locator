<template>
  <li v-for="location in locations" class="bg-white dark:bg-stone-800 p-4 rounded-xl flex flex-col gap-2 dark:text-white text-blac">

    <!-- Card Header -->
    <div class="grid grid-cols-[3rem_1fr_100px] items-start gap-2 group">
      <a v-if="location.url" :href="location.url" target="_blank" class="logo-container bg-white w-12 h-12 rounded-full overflow-hidden">
        <img v-if="location.logo" :src="location.logo" :alt="'Logo ' + location.name" class="group-hover:p-0 object-contain w-12 h-12 p-[0.25rem] transition-all self-center">
        <img v-else src="~/assets/logos/logo_emblem_green.svg" :alt="'Logo ' + location.name" class="group-hover:p-[0.35rem] object-contain w-12 h-12 p-[0.5rem] transition-all self-center">
      </a>
      <a v-if="location.url" :href="location.url" target="_blank" class="w-[calc(100%-3rem)] !no-underline dark:!text-white !text-black">
        <strong v-if="location.name" class="block">{{ location.name }} </strong>
        <span v-if="location.subtitle" class="block">{{ location.subtitle }} </span>
      </a>
      <a v-if="location.url" :href="location.url" target="_blank" class="btn btn-full">
        <ClientOnly> <!-- solved a Hydration node mismatch error -->
          <font-awesome-icon :icon="['fas', 'globe']" />
        </ClientOnly>
        Visit
      </a>
    </div>

    <SectionChips :location="location"/>

    <!-- Card Content -->
    <div class="col-span-3">
      <strong>Description</strong>
      <p v-if="location.desc">{{ location.desc }}</p>
      <p><a v-if="location.url" :href="location.url">{{ location.url }}</a></p>
    </div>

    <!-- Card Social Footer -->
    <SectionSocials :socials="location.socials"/>
  </li>
</template>

<script setup>

const props = defineProps(['locations'])
const locations = computed(() => props.locations);


</script>