<template>
  <div class="flex transition-all">
    <aside class="fixed transition-all z-20 -left-20" id="aside">
      <div
        class="flex transition-al h-screen w-16 flex-col justify-between border-e border-gray-200 bg-N-light dark:bg-N-dark dark:border-zinc-900"
      >
        <div>
          <div
            class="inline-flex h-16 w-16 items-center justify-center border-b border-gray-200 select-none dark:border-zinc-900"
            v-if="user"
            @click="consoleUser"
          >
            <div v-if="user.photoURL && user.photoURL !== 'https://github.com/.png'">
              <img
                :src="user.photoURL"
                :alt="'Imagem de perfil do usuário: ' + user.displayName"
                :title="user.displayName"
                class="grid h-10 w-10 place-content-center rounded-lg"
              />
            </div>

            <div
              v-else
              class="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 dark:bg-zinc-900"
              :title="user.displayName"
            >
              <h1 class="text-xs text-gray-600 dark:text-gray-200">{{ firstLetter }}</h1>
            </div>
          </div>
          <div>
            <nav aria-label="Main Nav" class="flex flex-col">
              <ul class="space-y-8 py-4 flex flex-col">
                <li>
                  <ButtonsAside
                    route="/"
                    :icon="iconHome"
                    alt-icon="Página inicial"
                    name="Página inicial"
                    :class="{ active: $route.path === '/' }"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/content"
                    :icon="iconStudy"
                    alt-icon="Conteúdo"
                    name="Conteúdo"
                    :class="{ active: $route.path === '/content' }"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/my-profile"
                    :icon="iconUser"
                    alt-icon="Meu perfil"
                    name="Meu perfil"
                    :class="{
                      active:
                        $route.path === '/my-profile' ||
                        $route.path === '/my-profile/edit',
                    }"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/credits"
                    :icon="iconCredits"
                    alt-icon="Créditos"
                    name="Créditos"
                    :class="{ active: $route.path === '/credits' }"
                  />
                </li>

                <li class="m-auto">
                  <button
                    v-show="showIconThemeLight"
                    @click="themeLight"
                    class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent py-1.5 select-none"
                  >
                    <img src="@/assets/img/icons/iconLight.svg" alt="Tema light" />
                    <span
                      class="absolute transition-all start-full top-1/2 ms-2 text-N-light border border-transparent dark:border-zinc-900 -translate-y-1/2 rounded-sm bg-N-dark px-2 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                    >
                      Tema
                    </span>
                  </button>
                  <button
                    v-show="showIconThemeDark"
                    @click="themeDark"
                    class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent py-1.5 select-none"
                  >
                    <img src="@/assets/img/icons/iconDark.svg" alt="Tema dark" />
                    <span
                      class="absolute transition-all start-full top-1/2 ms-2 text-N-light border border-transparent dark:border-zinc-900 -translate-y-1/2 rounded-sm bg-N-dark px-2 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
                    >
                      Tema
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          class="sticky inset-x-0 py-4 bottom-0 border-t border-gray-200 bg-N-light dark:bg-N-dark dark:border-zinc-900"
        >
          <button
            v-if="user"
            @click="signout"
            class="group relative transition-all flex justify-center items-center rounded-sm border-0 border-y-0 border-r-0 border-transparent select-none m-auto"
          >
            <img src="@/assets/img/icons/iconSignout.svg" alt="Sair" />
            <span
              class="absolute transition-all start-full top-1/2 ms-1.5 text-N-light border border-transparent dark:border-zinc-900 -translate-y-1/2 rounded-sm bg-N-dark px-2 py-1.5 text-xs font-medium opacity-0 group-hover:opacity-100 whitespace-nowrap"
            >
              Sair
            </span>
          </button>

          <div v-else>
            <nav class="flex flex-col">
              <ul class="space-y-3 flex flex-col">
                <li>
                  <ButtonsAside
                    route="/auth/login"
                    :icon="iconSignin"
                    alt-icon="Entrar"
                    name="Entrar"
                  />
                </li>
                <li>
                  <ButtonsAside
                    route="/auth/signup"
                    :icon="iconSignup"
                    alt-icon="Cadastrar"
                    name="Cadastrar"
                  />
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </aside>

    <div>
      <Nuxt class="px-64 py-12" />
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  data() {
    return {
      user: "",
      showIconThemeLight: true,
      showIconThemeDark: false,

      iconHome: require("@/assets/img/icons/iconHome.svg"),
      iconStudy: require("@/assets/img/icons/iconStudy.svg"),
      iconUser: require("@/assets/img/icons/iconUser.svg"),
      iconProgress: require("@/assets/img/icons/iconProgress.svg"),
      iconCredits: require("@/assets/img/icons/iconCredits.svg"),
      iconSignin: require("@/assets/img/icons/iconSignin.svg"),
      iconSignup: require("@/assets/img/icons/iconSignup.svg"),
    };
  },
  computed: {
    firstLetter() {
      return this.user.displayName.charAt(0).toLocaleUpperCase();
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });
    this.viewAside();
    this.setSavedTheme();
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

    consoleUser() {
      console.log(firebase.auth().currentUser);
    },

    viewAside() {
      const aside = document.getElementById("aside");
      setTimeout(() => {
        aside.style.left = "0px";
      }, 800);
    },
  },
};
</script>

<style scoped>
.active::before {
  position: absolute;
  content: "";
  width: 4.5px;
  height: 15px;
  border-radius: 2px;
  left: 0;
  background-color: #00dc82;
  box-shadow: 0px 0px 18px 1px #00dc82;
}
</style>
