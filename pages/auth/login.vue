<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-black tracking-wide text-3xl font-bold mb-5">Entrar na conta</h1>

    <form @submit.prevent="signIn" class="flex flex-col gap-7">
      <input
        type="text"
        name="Email"
        placeholder="Email"
        v-model="email"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />
      <input
        type="password"
        name="Senha"
        placeholder="Senha"
        v-model="password"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />

      <p v-show="userInvalid">Usuario invalido</p>

      <button type="submit" class="px-5 py-3 bg-emerald-600 text-white">Submit</button>
    </form>

    <div class="flex flex-col gap-7 mt-7">
      <button
        @click="signInWithGoogle"
        class="px-5 py-3 bg-black text-white dark:bg-zinc-900"
      >
        Google
      </button>
      <button
        @click="signInWithGithub"
        class="px-5 py-3 bg-black text-white dark:bg-zinc-900"
      >
        Github
      </button>
    </div>

    <div class="flex items-center gap-3 mt-7">
      <p>Não possui uma conta?</p>
      <NuxtLink to="/auth/signup">Inscrever-se</NuxtLink>
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

      userInvalid: false,
    };
  },

  methods: {
    async signIn() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

        this.$router.push("/");
      } catch (error) {
        console.error(error);
        this.userInvalid = true;
      }
    },

    async signInWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);

        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.userInvalid = true;
      }
    },

    async signInWithGithub() {
      try {
        const provider = new firebase.auth.GithubAuthProvider();
        await firebase.auth().signInWithPopup(provider);
        console.log(provider);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        this.userInvalid = true;
      }
    },
  },
};
</script>
