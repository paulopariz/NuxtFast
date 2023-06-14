<template>
  <div>
    <!-- <NuxtLink
      to="/"
      class="flex items-center justify-center gap-6 px-8 py-2.5 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-100 dark:bg-zinc-900 absolute top-5 left-5"
    >
      <img src="~/assets/img/icons/iconHome.svg" alt="Acessar a rota home" />
      <span class="text-sm text-black tracking-wide dark:text-gray-200 font-medium"
        >Página Inicial</span
      >
    </NuxtLink> -->
    <img src="@/assets/img/NuxtGreen.svg" alt="Icon Nuxt" class="m-auto mt-7" />
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
