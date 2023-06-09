<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-black tracking-wide text-3xl font-bold mb-5">Registrar</h1>

    <form @submit.prevent="createUser" class="flex flex-col gap-7">
      <div class="flex flex-col gap-2">
        <input
          type="text"
          name="Name"
          placeholder="Name"
          v-model="$v.name.$model"
          class="border border-gray-950 p-3 dark:bg-zinc-900"
        />
        <span v-if="!$v.name.required && $v.name.$dirty">Campo obrigatório.</span>
        <span v-if="!$v.name.maxLength && $v.name.$dirty"
          >Nome deve ter no máximo 50 caracteres.</span
        >
        <span v-if="!$v.name.minLength && $v.name.$dirty"
          >Nome deve ter pelo menos 3 caracteres.</span
        >
      </div>

      <div class="flex flex-col gap-2">
        <input
          type="text"
          name="Email"
          placeholder="Email"
          v-model="$v.email.$model"
          class="border border-gray-950 p-3 dark:bg-zinc-900"
        />
        <span v-if="!$v.email.required && $v.email.$dirty">Campo Obrigatorio</span>
        <span v-if="!$v.email.email && $v.email.$dirty">E-mail inválido</span>
      </div>

      <div class="flex flex-col gap-2">
        <input
          type="password"
          name="Senha"
          placeholder="Senha"
          v-model="$v.password.$model"
          class="border border-gray-950 p-3 dark:bg-zinc-900"
        />

        <span v-if="!$v.password.required && $v.password.$dirty">Campo obrigatório.</span>
        <span v-if="!$v.password.minLength && $v.password.$dirty"
          >A senha deve ter pelo menos 6 caracteres.</span
        >
        <span v-if="!$v.password.maxLength && $v.password.$dirty"
          >A senha deve ter no máximo 30 caracteres.</span
        >
      </div>

      <button type="submit" class="px-5 py-3 bg-emerald-600 text-white">Submit</button>
    </form>

    <div class="flex flex-col gap-7 mt-7">
      <button
        @click="createUserWithGoogle"
        class="px-5 py-3 bg-black text-white dark:bg-zinc-900"
      >
        Google
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  layout: "authentication",

  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: "",
    };
  },

  validations: {
    name: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  },

  methods: {
    // criar usuario com email e senha
    createUser() {
      //validacão
      this.$v.$touch();

      if (this.$v.$invalid) {
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;

          user
            .updateProfile({
              displayName: this.name,
            })
            .then(() => {
              console.log(user);
              this.$router.push("/account");
            })
            .catch((error) => {
              this.errors = error;
            });
        })
        .catch((error) => {
          this.errors = error;
        });
    },

    // criar usuario com o google
    async createUserWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);

        this.$router.push("/account");
      } catch (error) {
        console.error(error);
        this.errors = error;
      }
    },
  },
};
</script>

<style></style>
