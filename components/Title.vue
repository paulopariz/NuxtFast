<template>
  <h1
    class="text-2xl text-white font-bold tracking-wide before:w-3 before:h-3 before:rounded-sm before:-ml-1 before:-z-10 before:bg-N-green/70 before:border before:border-N-green before:absolute before:mt-3.5 before:shadow-md before:shadow-N-green/30"
  >
    {{ title }}
  </h1>
</template>
<script>
export default {
  name: "Title",
  props: ["title"],
};
</script>
<style></style>
