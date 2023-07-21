<template>
  <NuxtLink
    to="/"
    class="w h-16 rounded-md bg-zinc-900/50 flex items-center px-7 gap-5"
  >
    <img
      src="../assets/img/icons/iconHome.svg"
      alt=""
      class="icon invert scale-125"
    />
    <span class="text-base font-semibold">Página inicial</span>
  </NuxtLink>
</template>
<script>
export default {
  name: "buttonsMenuMobile",
};
</script>

<style scoped>
.icon:hover {
  filter: invert(0%);
}
</style>
