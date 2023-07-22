<template>
  <Loading v-if="loading" />

  <div v-else class="w-screen">
    <section class="md:container w-full m-auto">
      <BaseHeader
        title="Crétidos"
        desc="O conteúdo do NuxtFast foi criado com base na documentação fornecida pelo Nuxt.js, feito por Paulo Pariz."
      />

      <div
        class="flex items-center justify-between max-mn:flex-col max-mn:items-start max-sm:gap-10"
      >
        <div class="flex flex-col gap-6">
          <a
            :href="user.html_url"
            target="_blank"
            class="flex items-center transition-all bg-gray-200/30 dark:bg-zinc-900/20 justify-between w-44 py-2 px-4 border border-gray-200 dark:border-zinc-900 rounded-full hover:bg-transparent hover:dark:bg-transparent cursor-pointer"
          >
            <h1
              class="font-semibold text-sm text-zinc-900 dark:text-gray-200 tracking-wide"
            >
              {{ user.name }}
            </h1>
            <img
              :src="user.avatar_url"
              :alt="user.login"
              :title="user.login"
              class="w-9 h-9 rounded-full dark:bg-zinc-900 p-0.5"
            />
          </a>

          <ul class="flex flex-col gap-6 ml-2">
            <li class="flex items-end gap-3">
              <h2 class="text-xl font-semibold text-N-dark dark:text-N-light">
                {{ user.following }}
              </h2>
              <p class="text-N-dark dark:text-gray-300">Seguindo</p>
            </li>

            <li class="flex items-end gap-3">
              <h2 class="text-xl font-semibold text-N-dark dark:text-N-light">
                {{ user.followers }}
              </h2>
              <p class="text-N-dark dark:text-gray-300">Seguidores</p>
            </li>

            <li class="flex items-end gap-3">
              <h2 class="text-xl font-semibold text-N-dark dark:text-N-light">
                {{ user.public_repos }}
              </h2>
              <p class="text-N-dark dark:text-gray-300">Repositórios</p>
            </li>
          </ul>
        </div>
        <div class="flex flex-col gap-6">
          <a
            href="https://www.instagram.com/parizpaulo_/"
            target="_blank"
            class="flex items-center transition-all bg-gray-200/30 dark:bg-zinc-900/20 justify-between gap-2 h-14 py-1 pl-5 pr-8 border border-gray-200 dark:border-zinc-900 rounded-full hover:bg-transparent hover:dark:bg-transparent cursor-pointer"
          >
            <img
              src="@/assets/img/icons/iconInstagram.svg"
              class="text-N-dark invert dark:invert-0"
              alt="Icon Instagram"
            />
            <h1 class="text-N-dark dark:text-gray-300">@parizpaulo_</h1>
          </a>

          <a
            href="https://www.linkedin.com/in/paulopariz/"
            target="_blank"
            class="flex items-center transition-all bg-gray-200/30 dark:bg-zinc-900/20 justify-between gap-2 h-14 py-1 pl-5 pr-8 border border-gray-200 dark:border-zinc-900 rounded-full hover:bg-transparent hover:dark:bg-transparent cursor-pointer"
          >
            <img
              src="@/assets/img/icons/iconLinkedin.svg"
              class="text-N-dark invert dark:invert-0"
              alt="Icon Linkedin"
            />
            <h1 class="text-N-dark dark:text-gray-300">in/paulopariz</h1>
          </a>

          <a
            href="https://paulopariz.vercel.app/"
            target="_blank"
            class="flex items-center transition-all bg-gray-200/30 dark:bg-zinc-900/20 justify-between gap-2 h-14 py-1 pl-5 pr-8 border border-gray-200 dark:border-zinc-900 rounded-full hover:bg-transparent hover:dark:bg-transparent cursor-pointer"
          >
            <img
              src="@/assets/img/icons/iconPortfolio.svg"
              alt="Icon Dev"
              class="text-N-dark invert dark:invert-0"
            />

            <h1 class="text-N-dark dark:text-gray-300">paulopariz.app</h1>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Credits",
  data() {
    return {
      user: [],
    };
  },

  computed: {
    ...mapState(["loading"]),
  },

  mounted() {
    setTimeout(
      () => {
        this.$store.commit("SET_LOADING", false);
      },

      500
    );
  },

  async fetch() {
    const urlGit = "https://api.github.com/users/paulopariz";
    const user = await fetch(urlGit).then((response) => response.json());
    this.user = user;
    console.log(this.user);
  },
};
</script>
