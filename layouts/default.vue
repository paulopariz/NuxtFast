<template>
  <div>
    <div class="flex h-screen w-16 flex-col justify-between border-e bg-white">
      <div>
        <div class="inline-flex h-16 w-16 items-center justify-center" v-if="user">
          <span
            class="grid h-10 w-10 place-content-center rounded-lg bg-gray-100 text-xs text-gray-600"
          >
            {{ firstLetter }}
          </span>
        </div>

        <div class="border-t border-gray-100">
          <nav aria-label="Main Nav" class="flex flex-col p-2">
            <ul class="space-y-3 pt-4">
              <li>
                <NuxtLink
                  to="/"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src="@/assets/img/icons/iconStudy.svg" alt="Configurações" />

                  <span
                    class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  >
                    Configurações
                  </span>
                </NuxtLink>
              </li>

              <li>
                <NuxtLink
                  to="/"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src="@/assets/img/icons/iconSettings.svg" alt="Configurações" />

                  <span
                    class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  >
                    Configurações
                  </span>
                </NuxtLink>
              </li>

              <li>
                <NuxtLink
                  to="/"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src="@/assets/img/icons/iconUser.svg" alt="Meu perfil" />

                  <span
                    class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  >
                    Meu Perfil
                  </span>
                </NuxtLink>
              </li>

              <li>
                <NuxtLink
                  to="/"
                  class="group relative flex justify-center rounded px-2 py-1.5 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                >
                  <img src="@/assets/img/icons/iconCredits.svg" alt="Créditos" />
                  <span
                    class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
                  >
                    Créditos
                  </span>
                </NuxtLink>
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

        <div v-else class="space-y-3">
          <NuxtLink
            to="/auth/signin"
            class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <img src="@/assets/img/icons/iconSignin.svg" alt="Entrar" />
            <span
              class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
            >
              Entrar
            </span>
          </NuxtLink>
          <NuxtLink
            to="/auth/signin"
            class="group relative flex w-full justify-center rounded-lg px-2 py-1.5 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          >
            <img src="@/assets/img/icons/iconSignup.svg" alt="Cadastrar" />
            <span
              class="absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded bg-gray-900 px-2 py-1.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100 whitespace-nowrap"
            >
              Cadastrar
            </span>
          </NuxtLink>
        </div>
      </div>
    </div>
    <nav>
      <NuxtLink v-if="!user" to="/auth/signin">Sign In</NuxtLink>
      <NuxtLink v-if="!user" to="/auth/signup">Sign Up</NuxtLink>
      <NuxtLink to="/account">Accont</NuxtLink>
      <NuxtLink to="/">Home</NuxtLink>

      <button v-if="user" @click="signout">
        <div>{{ firstLetter }}</div>
        <p>{{ user.displayName }}</p>
      </button>
    </nav>

    <Nuxt />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: "",
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
  },
};
</script>

<style></style>
