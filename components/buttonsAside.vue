<template>
  <NuxtLink
    :to="route"
    class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent py-1.5 select-none"
  >
    <img :src="icon" :alt="altIcon" class="dark:invert invert-0 opacity-75" />
    <span
      class="absolute transition-all start-full top-1/2 -ms-3.5 text-N-light border border-transparent dark:border-zinc-900 -translate-y-1/2 rounded-sm bg-N-dark px-2 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
    >
      {{ name }}
    </span>
  </NuxtLink>
</template>

<script>
export default {
  name: "buttonsAside",

  props: {
    route: {
      type: String,
      required: true,
    },
    icon: {
      required: true,
    },
    altIcon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
};
</script>
