<template>
  <header
    class="border-2 border-x-0 border-t-0 pb-10 border-gray-200 dark:border-zinc-900 mb-10"
  >
    <h1
      class="text-2xl text-white font-bold tracking-wide before:w-3 before:h-3 before:rounded-sm before:-ml-1 before:-z-10 before:bg-N-green/70 before:border before:border-N-green before:absolute before:mt-3.5 before:shadow-md before:shadow-N-green/30"
    >
      {{ title }}
    </h1>
    <p class="tracking-wide leading-7 text-zinc-900 dark:text-gray-200 w-3/5 mt-3">
      {{ desc }}
    </p>
  </header>
</template>
<script>
export default {
  name: "Title",
  props: ["title", "desc"],
};
</script>
<style></style>
