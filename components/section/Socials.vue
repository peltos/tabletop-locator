<template>
  <ul v-if="socials" class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4 break-all">
    <li v-for="(value, key) in socials">
      <a class="group capitalize flex gap-2 items-center" :href="value">
        <div class="bg-stone-200 dark:bg-stone-600 text-black dark:text-white rounded-full p-1">
          <ClientOnly v-if="checkExistingFABrandicon(key)"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon class="w-6 group-hover:scale-125 transition-all" :icon="['fab', key]" />
          </ClientOnly>
          <ClientOnly v-else-if="key === 'email'"> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon class="w-6 group-hover:scale-125 transition-all" :icon="['fas', 'envelope']" />
          </ClientOnly>
          <ClientOnly v-else> <!-- solved a Hydration node mismatch error -->
            <font-awesome-icon class="w-6 group-hover:scale-125 transition-all" :icon="['fas', 'globe']" />
          </ClientOnly>
        </div>
        {{ key }}
      </a>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(['socials'])
const socials = computed(() => props.socials);

// Value: String
// Return: Boolean
function checkExistingFABrandicon(icon) {
  if (icon === "discord" ||
    icon === "reddit" ||
    icon === "youtube" ||
    icon === "instagram" ||
    icon === "facebook" ||
    icon === "linkedin" ||
    icon === "twitch" ||
    icon === "tiktok") {
    return true
  }
  return false
}
</script>