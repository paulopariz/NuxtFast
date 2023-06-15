<template>
  <label
    :for="forLabel"
    class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
  >
    <input
      :type="typeInput"
      :name="nameInput"
      :placeholder="placeholderInput"
      :v-model="vmodelInput"
      class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
    />

    <span
      class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
    >
      {{ title }}
    </span>
  </label>
</template>

<script>
export default {
  props: {
    forLabel: {
      type: String,
    },
    typeInput: {
      required: true,
      type: String,
    },
    nameInput: {
      type: String,
    },
    placeholderInput: {
      type: String,
    },
    vmodelInput: {
      type: Object,
      required: true,
    },
    title: {
      required: true,
      type: String,
    },
  },
};
</script>

<style></style>
