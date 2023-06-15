<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="mb-8 flex justify-center flex-col items-center gap-3">
      <h1 class="tracking-wide text-3xl font-bold">Bem-vindo(a)</h1>
      <p class="text-sm text-center tracking-wide">
        Faça o seu login e aproveite todo o conteúdo disponível. Se você ainda não possui
        uma conta, clique no botão "Inscrever-se" abaixo.
      </p>
    </div>

    <form @submit.prevent="signIn" class="flex flex-col gap-5">
      <label
        for="E-mail"
        class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
      >
        <input
          type="text"
          name="E-mail"
          placeholder="E-mail"
          v-model="email"
          class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        />

        <span
          class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
        >
          E-mail
        </span>
      </label>

      <label
        for="Password"
        class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
      >
        <input
          type="password"
          name="Senha"
          placeholder="Senha"
          v-model="password"
          class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
        />

        <span
          class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
        >
          Senha
        </span>
      </label>

      <button
        type="submit"
        class="px-5 h-14 bg-N-green text-N-light font-semibold tracking-wide rounded-sm transition-all hover:bg-N-green/90"
      >
        Entrar
      </button>
    </form>

    <div class="flex items-center gap-1 mt-7 justify-center">
      <p class="text-sm">Não possui uma conta?</p>
      <NuxtLink
        to="/auth/signup"
        class="text-sm text-N-green dark:text-N-green underline decoration-1"
        >Inscrever-se</NuxtLink
      >
    </div>

    <div class="mt-7 flex justify-center items-center gap-4">
      <div class="h-[1px] w-full bg-gray-300 dark:bg-zinc-900" />
      <span class="text-xs">OU</span>
      <div class="h-[1px] w-full bg-gray-300 dark:bg-zinc-900" />
    </div>

    <div class="flex flex-col gap-2 mt-7">
      <ButtonsAuth
        :btnAuth="signInWithGoogle"
        :icon="iconGoogle"
        alt="Entrar com o Google"
        text="Entrar com o Google"
      />

      <ButtonsAuth
        :btnAuth="signInWithGithub"
        :icon="iconGithub"
        alt="Entrar com o Github"
        text="Entrar com o Github"
      />
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  layout: "authentication",

  data() {
    return {
      email: "",
      password: "",

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),

      iconGoogle: require("@/assets/img/icons/iconGoogle.svg"),
      iconGithub: require("@/assets/img/icons/iconGithub.svg"),
    };
  },

  methods: {
    async signIn() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

        this.$router.push("/");
      } catch (error) {
        this.$alert("Usuário não encontrado. Tente novamente.", this.iconErrorAlert);
      }
    },

    async signInWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);

        this.$router.push("/");
      } catch (error) {
        this.$alert("Usuário não encontrado. Tente novamente.", this.iconErrorAlert);
      }
    },

    async signInWithGithub() {
      try {
        const provider = new firebase.auth.GithubAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        console.log(provider);
        this.$router.push("/");
      } catch (error) {
        this.$alert("Usuário não encontrado. Tente novamente.", this.iconErrorAlert);
      }
    },
  },
};
</script>
