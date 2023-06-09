<template>
  <NuxtLink
    :to="route"
    class="group relative flex justify-center rounded px-2 py-1.5 hover:bg-gray-50 hover:text-gray-700 select-none dark:hover:bg-zinc-900"
  >
    <img :src="icon" :alt="altIcon" />
    <span
      class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
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
