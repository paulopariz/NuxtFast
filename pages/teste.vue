<template>
  <Loading v-if="loading" />

  <h1 v-else class="text-center mr-32 text-3xl dark:text-gray-200">TESTE</h1>
</template>

<script>
import auth from "~/mixins/auth";

export default {
  mixins: [auth],
};
</script>

<style></style>
