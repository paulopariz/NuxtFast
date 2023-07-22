<template>
  <div class="">
    <nav
      id="nav"
      class="hidden w-full h-20 border border-x-0 border-t-0 dark:border-zinc-900 border-gray-200 items-center justify-between fixed top-0 bg-N-light dark:bg-N-dark px-14 max-sm:px-4 max-md:flex z-50 transition-all"
    >
      <NuxtLink to="/">
        <img src="@/assets/img/NuxtGreen.svg" alt="Logo Nuxt.js" class="w-9" />
      </NuxtLink>

      <div class="flex items-center gap-3">
        <button
          v-if="menuView == true"
          v-show="showIconThemeLight"
          @click="themeLight"
          class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent py-1.5 select-none btn-theme"
        >
          <img
            src="@/assets/img/icons/menu-mobile/iconLight.svg"
            alt="Tema light"
            class="dark:invert invert-"
          />
        </button>
        <button
          v-if="menuView == true"
          v-show="showIconThemeDark"
          @click="themeDark"
          class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent py-1.5 select-none btn-theme"
        >
          <img
            src="@/assets/img/icons/menu-mobile/iconDark.svg"
            alt="Tema dark"
            class="dark:invert invert-"
          />
        </button>
        <div class="menu" @click="showMenu">
          <div class="menu-icon">
            <input
              class="menu-icon__cheeckbox outline-none focus:bg-transparent active:bg-transparent"
              type="checkbox"
            />
            <div>
              <span class="dark:bg-N-light bg-N-dark"></span>
              <span class="dark:bg-N-light bg-N-dark"></span>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <div
      v-show="menuView"
      id="menuView"
      class="hidden max-md:block h-screen bg-N-light dark:bg-N-dark w-screen fixed z-40 transition-all"
    >
      <section
        class="w-screen bg-N-light dark:bg-N-dark grid grid-cols-2 gap-2 px-4 mt-32 transition-all"
      >
        <ButtonsMenuMobile
          route="/"
          :icon="iconHome"
          alt-icon="Página inicial"
          nameRoute="Página inicial"
          :class="{ active: $route.path === '/' }"
        />
        <ButtonsMenuMobile
          route="/content"
          :icon="iconContent"
          alt-icon="Conteúdo"
          nameRoute="Conteúdo"
          :class="{ active: $route.path === '/content' }"
        />
        <ButtonsMenuMobile
          route="/my-profile"
          :icon="iconUser"
          alt-icon="Meu perfil"
          nameRoute="Meu perfil"
          :class="{
            active: $route.path === '/my-profile' || $route.path === '/my-profile/edit',
          }"
        />
        <ButtonsMenuMobile
          route="/credits"
          :icon="iconCredits"
          alt-icon="Créditos"
          nameRoute="Créditos"
          :class="{ active: $route.path === '/credits' }"
        />
        <button
          v-if="user"
          @click="signout"
          class="w h-16 rounded-md bg-gray-200/30 dark:bg-zinc-900/20 flex items-center px-5 gap-4 border border-gray-200 dark:border-zinc-900 hover:bg-red-600/10 hover:border-red-600 dark:hover:bg-red-600/10 dark:hover:border-red-600 transition-all shadow-xl shadow-gray-200/30 dark:shadow-zinc-900/10"
        >
          <img :src="iconSignout" alt="Sair" />
          <span class="text-base font-semibold tracking-wide">Sair</span>
        </button>

        <ButtonsMenuMobile
          v-if="!user"
          route="/auth/login"
          :icon="iconSignin"
          alt-icon="Entrar"
          nameRoute="Entrar"
        />
        <ButtonsMenuMobile
          v-if="!user"
          route="/auth/signup"
          :icon="iconSignup"
          alt-icon="Cadastrar"
          nameRoute="Cadastrar"
        />
      </section>
    </div>
  </div>
</template>
<script>
import firebase from "~/plugins/firebase";

export default {
  name: "MenuMobile",

  data() {
    return {
      user: "",
      menuView: false,
      showIconThemeLight: true,
      showIconThemeDark: false,

      iconHome: require("../assets/img/icons/menu-mobile/iconHome.svg"),
      iconContent: require("../assets/img/icons/menu-mobile/iconContent.svg"),
      iconUser: require("../assets/img/icons/menu-mobile/iconUser.svg"),
      iconCredits: require("../assets/img/icons/menu-mobile/iconCredits.svg"),
      iconSignin: require("../assets/img/icons/menu-mobile/iconSignin.svg"),
      iconSignup: require("../assets/img/icons/menu-mobile/iconSignup.svg"),
      iconSignout: require("../assets/img/icons/menu-mobile/iconSignout.svg"),
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.setSavedTheme();
  },

  watch: {
    menuView(border) {
      if (border) {
        document.getElementById("nav").style.borderColor = "#ffffff00";
      } else {
        document.getElementById("nav").style.borderColor = "";
      }
    },
  },

  methods: {
    signout() {
      setTimeout(() => {
        firebase
          .auth()
          .signOut()
          .then((result) => {
            this.user = "";
            this.$router.push("/auth/login");
          });
      }, 1200);
    },
    showMenu() {
      this.menuView = !this.menuView;
    },
    setSavedTheme() {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
        this.showIconThemeDark = false;
        this.showIconThemeLight = true;
      } else {
        document.documentElement.classList.remove("dark");
        this.showIconThemeDark = true;
        this.showIconThemeLight = false;
      }
    },
    themeLight() {
      localStorage.setItem("theme", "light");
      document.documentElement.classList.remove("dark");
      this.showIconThemeDark = true;
      this.showIconThemeLight = false;
    },
    themeDark() {
      localStorage.setItem("theme", "dark");
      document.documentElement.classList.add("dark");
      this.showIconThemeDark = false;
      this.showIconThemeLight = true;
    },
  },
};
</script>

<style scoped>
#menuView,
.btn-theme {
  animation: menuView 0.3s;
}

@keyframes menuView {
  0% {
    top: -1000px;
  }
  100% {
    top: 0;
  }
}
.active {
  background-color: rgba(0, 220, 130, 0.1);
  border-color: #00dc82;
}
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
    border-radius: 1px;
    transition: all 0.2s cubic-bezier(0.1, 0.82, 0.76, 0.965);

    &:first-of-type {
      top: 0;
    }
    &:last-of-type {
      bottom: 0;
    }
  }

  .dark span {
    background-color: #ac0a0a !important;
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
