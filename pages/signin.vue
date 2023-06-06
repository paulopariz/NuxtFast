<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-black tracking-wide text-3xl font-bold mb-5">Entrar na conta</h1>

    <form @submit.prevent="signIn" class="flex flex-col gap-7">
      <input
        type="text"
        name="Email"
        placeholder="Email"
        v-model="email"
        class="border border-gray-950 p-3"
      />
      <input
        type="password"
        name="Senha"
        placeholder="Senha"
        v-model="password"
        class="border border-gray-950 p-3"
      />

      <button type="submit" class="px-5 py-3 bg-emerald-600 text-white">Submit</button>
    </form>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";

export default {
  layout: false,

  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },

  methods: {
    async signIn() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password);

        this.$router.push("/");
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>
