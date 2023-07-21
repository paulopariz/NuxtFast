<template>
  <div>
    <nav
      class="hidden w-full h-20 border border-x-0 border-t-0 dark:border-zinc-900 border-gray-200 items-center justify-between fixed top-0 bg-N-light dark:bg-N-dark px-7 max-sm:flex z-50"
    >
      <NuxtLink to="/">
        <img src="@/assets/img/NuxtGreen.svg" alt="Logo Nuxt.js" class="w-9" />
      </NuxtLink>

      <div class="menu">
        <div class="menu-icon">
          <input
            class="menu-icon__cheeckbox outline-none focus:bg-transparent active:bg-transparent"
            type="checkbox"
          />
          <div>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>

    <section
      class="hidden w-screen h-screen fixed z-40 bg-N-light dark:bg-N-dark max-sm:grid grid-cols-2 py-32 px-7"
    >
      <buttonsMenuMobile />
    </section>
  </div>
</template>
<script>
export default {
  name: "MenuMobile",
};
</script>

<style scoped>
.menu {
  display: flex;
  align-items: center;
  justify-content: center;

  .menu-icon {
    transform: scale(1.2);
  }
}

.menu-icon {
  position: relative;
  width: 50px;
  height: 50px;
  cursor: pointer;

  .menu-icon__cheeckbox {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    cursor: pointer;
    z-index: 2;
    -webkit-touch-callout: none;
    position: absolute;
    opacity: 0;
  }
  div {
    margin: auto;
    position: absolute;
    top: 0;
    right: -15px;
    left: 0;
    bottom: 0;
    width: 22px;
    height: 12px;
  }
  span {
    position: absolute;
    display: block;
    width: 100%;
    height: 2px;
    background-color: var(--bar-bg, #fff);
    border-radius: 1px;
    transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

    &:first-of-type {
      top: 0;
    }
    &:last-of-type {
      bottom: 0;
    }
  }
  &.active,
  .menu-icon__cheeckbox:checked + div {
    span {
      &:first-of-type {
        transform: rotate(45deg);
        top: 5px;
      }
      &:last-of-type {
        transform: rotate(-45deg);
        bottom: 5px;
      }
    }
  }
}
</style>
