<template>
  <div>
    <NuxtLink to="/" class="m-auto mt-7 justify-center flex items-center">
      <img src="@/assets/img/NuxtGreen.svg" alt="Icon Nuxt" class="" />
    </NuxtLink>
    <Nuxt class="w-80" />
  </div>
</template>

<script>
export default {
  mounted() {
    this.setSavedTheme();
  },

  methods: {
    setSavedTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
};
</script>
