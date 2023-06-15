<template>
  <button
    @click="btnAuth"
    class="px-5 h-14 bg-N-dark transition-all border border-transparent font-semibold rounded-sm flex justify-center gap-3 items-center hover:bg-N-dark/95 dark:border-zinc-900 dark:hover:bg-zinc-900/20"
  >
    <img :src="icon" :alt="alt" class="w-6" />
    <span class="text-N-light font-semibold tracking-wide">{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    btnAuth: {
      type: Function,
    },
    icon: {
      require: true,
      type: String,
    },
    alt: {
      type: String,
    },
    text: {
      type: String,
    },
  },
};
</script>
