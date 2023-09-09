<template>
  <header
    class="border border-x-0 border-t-0 pb-10 max-sm:pb-6 border-gray-200 dark:border-zinc-900 mb-10"
  >
    <div class="flex gap-2 items-center">
      <h1
        class="text-2xl dark:text-white text-N-dark font-bold tracking-wide title"
      >
        {{ title }}
      </h1>

      <div class="before w-14 h-[1.6px]"></div>
    </div>

    <ul class="flex mt-2 items-center gap-2">
      <li class="flex gap-2 items-center" v-if="breadcrumb">
        <router-link
          to="/"
          class="opacity-50 text-sm dark:text-[#c7c7c7] font-semibold hover:opacity-80 transition-all"
          >Página Incial</router-link
        >
      </li>

      <li
        class="flex gap-2 items-center"
        v-for="(route, index) in breadcrumb"
        :key="index"
      >
        <img
          src="../assets/img/icons/iconBackRoute.svg"
          alt="Arrow"
          class="opacity-50 dark:invert-0 invert"
        />
        <router-link
          :class="{
            active: $route.path === route.route,
          }"
          :to="route.route"
          class="opacity-50 text-sm dark:text-[#c7c7c7] font-semibold hover:opacity-80 transition-all"
          >{{ route.name }}</router-link
        >
      </li>
    </ul>
    <p
      class="tracking-wide leading-7 text-zinc-900 dark:text-gray-200 mt-3 max-lg:text-sm max-md:text-base max-sm:text-[15px]"
    >
      {{ desc }}
    </p>
  </header>
</template>
<script>
export default {
  name: "Title",
  props: ["title", "desc", "breadcrumb"],
};
</script>
<style scoped>
.dark .active {
  color: #fff;
  opacity: 0.8;
}
.active {
  color: #000;
  opacity: 0.8;
}
.dark .before {
  background: hsla(155, 100%, 43%, 1);

  background: linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    hsla(240, 4%, 5%, 1) 93%
  );

  background: -moz-linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    hsla(240, 4%, 5%, 1) 93%
  );

  background: -webkit-linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    hsla(240, 4%, 5%, 1) 93%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#00DC82", endColorstr="#0B0B0C", GradientType=1 );
}

.before {
  background: hsla(155, 100%, 43%, 1);

  background: linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    rgb(255, 255, 255) 93%
  );

  background: -moz-linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    rgb(255, 255, 255) 93%
  );

  background: -webkit-linear-gradient(
    360deg,
    hsla(155, 100%, 43%, 1) 0%,
    rgb(255, 255, 255) 93%
  );

  filter: progid: DXImageTransform.Microsoft.gradient( startColorstr="#00DC82", endColorstr="#fff", GradientType=1 );
}
</style>
