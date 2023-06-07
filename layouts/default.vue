<template>
  <div class="flex">
    <aside class="transition-all fixed">
      <div
        class="flex h-screen w-16 flex-col justify-between border-e bg-white transition-all"
      >
        <div>
          <div
            class="inline-flex h-16 w-16 items-center justify-center border-b border-gray-100"
            v-if="user"
          >
            <span
              class="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
              :title="user.displayName"
            >
              {{ firstLetter }}
            </span>
          </div>
          <div class="dark:bg-red-800">
            <nav aria-label="Main Nav" class="flex flex-col p-2">
              <ul class="space-y-3 pt-4 flex flex-col items-center">
                <li>
                  <ButtonsAside
                    route="/"
                    :icon="iconHome"
                    alt-icon="Configurações"
                    name="Página inicial"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/teste2"
                    :icon="iconStudy"
                    alt-icon="Conteúdo"
                    name="Conteúdo"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/account"
                    :icon="iconUser"
                    alt-icon="Meu perfil"
                    name="Meu perfil"
                  />
                </li>

                <li>
                  <ButtonsAside
                    route="/teste"
                    :icon="iconCredits"
                    alt-icon="Créditos"
                    name="Créditos"
                  />
                </li>

                <li>
                  <div
                    v-show="showIconThemeLight"
                    @click="themeLight"
                    class="group relative cursor-pointer flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <img src="@/assets/img/icons/iconLight.svg" alt="Tema light" />
                    <span
                      class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                    >
                      Tema
                    </span>
                  </div>
                  <div
                    v-show="showIconThemeDark"
                    @click="themeDark"
                    class="group relative cursor-pointer flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  >
                    <img src="@/assets/img/icons/iconDark.svg" alt="Tema dark" />
                    <span
                      class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                    >
                      Tema
                    </span>
                  </div>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div class="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-white p-2">
          <button
            v-if="user"
            @click="signout"
            class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <img src="@/assets/img/icons/iconSignout.svg" alt="Sair" />
            <span
              class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
            >
              Sair
            </span>
          </button>

          <nav v-else>
            <ul class="space-y-3 flex flex-col items-center">
              <li>
                <ButtonsAside
                  route="/auth/signin"
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
    </aside>

    <div class="px-32">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: "",
      showIconThemeLight: true,
      showIconThemeDark: false,

      iconHome: require("@/assets/img/icons/iconHome.svg"),
      iconStudy: require("@/assets/img/icons/iconStudy.svg"),
      iconUser: require("@/assets/img/icons/iconUser.svg"),
      iconCredits: require("@/assets/img/icons/iconCredits.svg"),
      iconSignin: require("@/assets/img/icons/iconSignin.svg"),
      iconSignup: require("@/assets/img/icons/iconSignup.svg"),
    };
  },
  computed: {
    firstLetter() {
      return this.user.displayName.charAt(0);
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      }
    });
    this.setSavedTheme();
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);
          this.user = "";
          this.$router.push("/auth/signin");
        });
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

<style></style>
