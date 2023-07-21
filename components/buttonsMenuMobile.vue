<template>
  <NuxtLink
    :to="route"
    class="w h-16 rounded-md bg-gray-200/30 dark:bg-zinc-900/20 flex items-center px-7 gap-5 border border-gray-200 dark:border-zinc-900 hover:bg-N-green/10 hover:border-N-green dark:hover:bg-N-green/20 dark:hover:border-N-green transition-all shadow-xl shadow-gray-200/30 dark:shadow-zinc-900/10"
  >
    <img :src="icon" :alt="altIcon" />
    <span class="text-base font-semibold tracking-wide">{{ nameRoute }}</span>
  </NuxtLink>
</template>
<script>
export default {
  name: "buttonsMenuMobile",

  props: {
    route: {
      type: String,
    },
    icon: {},
    altIcon: {
      type: String,
    },
    nameRoute: {
      type: String,
    },
  },
};
</script>

<style scoped></style>
