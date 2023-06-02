<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-black tracking-wide text-3xl font-bold mb-5">Registrar</h1>

    <form @submit.prevent="pressed" class="flex flex-col gap-7">
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
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      errors: "",
    };
  },

  methods: {
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user);
          this.$router.push("/account");
        })
        .catch((error) => {
          this.errors = error;
        });
    },
  },
};
</script>

<style></style>
