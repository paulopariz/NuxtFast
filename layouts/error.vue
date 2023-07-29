<template>
  <div
    class="absolute w-screen h-screen z-[9999] -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-N-dark"
  >
    <h1
      class="error-404 text-N-light dark:text-N-dark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-black"
    >
      404
    </h1>
    <p
      class="notFound dark:text-gray-300 font-bold text-N-dark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      PÁGINA NÃO ENCONTRADA
    </p>

    <NuxtLink
      to="/"
      class="px-5 h-14 bg-N-dark transition-all border border-transparent font-semibold rounded-sm flex justify-center gap-3 items-center hover:bg-N-dark/95 dark:border-zinc-900 dark:hover:bg-zinc-900/20 absolute top-3/4 left-1/2 -translate-y-1/2 -translate-x-1/2"
    >
      <img
        style="transform: rotate(-135deg)"
        src="../assets/img/icons/iconArrow.svg"
        alt="Arrow"
        class="w-6 rotate-6"
      />
      <span class="uppercase font-semibold tracking-wide">Página inicial</span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.error-404 {
  font-size: 325px;
  text-shadow: -1px -1px 0 #701cb8, 1px 1px 0 #00dc82;
  letter-spacing: -35px;
}
.notFound {
  font-family: montserrat, sans-serif;
  font-size: 42px;
  text-transform: uppercase;
  text-shadow: 0 2px 0 #00dc82;
  letter-spacing: 12px;
}
</style>
