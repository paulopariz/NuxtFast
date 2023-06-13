<template>
  <Loading v-if="loading" />

  <div v-else class="dark:bg-black">
    <h1
      class="text-2xl text-black dark:text-gray-200 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      Página não encontrada
    </h1>
  </div>
</template>

<script>
import auth from "~/mixins/auth";
export default {
  mixins: [auth],
};
</script>
