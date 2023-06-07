<template>
  <div>
    <Nuxt />
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

<style></style>
