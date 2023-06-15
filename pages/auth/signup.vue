<template>
  <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <div class="mb-8 flex justify-center flex-col items-center gap-3">
      <h1 class="tracking-wide text-3xl font-bold">Bem-vindo(a)</h1>
      <p class="text-sm text-center tracking-wide">
        Crie sua conta usando e-mail e senha ou faça login com sua conta do Google ou
        Github. Se já possui uma conta, clique em "Conecte-se".
      </p>
    </div>

    <form @submit.prevent="createUser" class="flex flex-col gap-5">
      <div class="flex flex-col gap-2">
        <label
          for="Nome"
          class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
        >
          <input
            type="text"
            name="Nome"
            placeholder="Nome"
            v-model="$v.name.$model"
            class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          />

          <span
            class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
          >
            Nome
          </span>
        </label>

        <span
          v-if="!$v.name.required && $v.name.$dirty"
          class="text-xs tracking-wide text-red-600"
          >Campo obrigatório.</span
        >
        <span
          v-if="!$v.name.maxLength && $v.name.$dirty"
          class="text-xs tracking-wide text-red-600"
          >Nome deve ter no máximo 40 caracteres.</span
        >
        <span
          v-if="!$v.name.minLength && $v.name.$dirty"
          class="text-xs tracking-wide text-red-600"
          >Nome deve ter pelo menos 3 caracteres.</span
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="E-mail"
          class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
        >
          <input
            type="text"
            name="E-mail"
            placeholder="E-mail"
            v-model="$v.email.$model"
            class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          />

          <span
            class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
          >
            E-mail
          </span>
        </label>

        <span
          v-if="!$v.email.required && $v.email.$dirty"
          class="text-xs tracking-wide text-red-600"
          >Campo Obrigatorio</span
        >
        <span
          v-if="!$v.email.email && $v.email.$dirty"
          class="text-xs tracking-wide text-red-600"
          >E-mail inválido</span
        >
      </div>

      <div class="flex flex-col gap-2">
        <label
          for="Senha"
          class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green"
        >
          <input
            type="password"
            name="Senha"
            placeholder="Senha"
            v-model="$v.password.$model"
            class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
          />

          <span
            class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
          >
            Senha
          </span>
        </label>

        <span
          v-if="!$v.password.required && $v.password.$dirty"
          class="text-xs tracking-wide text-red-600"
          >Campo obrigatório.</span
        >
        <span
          v-if="!$v.password.minLength && $v.password.$dirty"
          class="text-xs tracking-wide text-red-600"
          >A senha deve ter pelo menos 6 caracteres.</span
        >
        <span
          v-if="!$v.password.maxLength && $v.password.$dirty"
          class="text-xs tracking-wide text-red-600"
          >A senha deve ter no máximo 30 caracteres.</span
        >
      </div>

      <button
        type="submit"
        class="px-5 h-14 bg-N-green text-N-light font-semibold tracking-wide rounded-sm transition-all hover:bg-N-green/90"
      >
        Criar conta
      </button>
    </form>

    <div class="flex items-center gap-1 mt-7 justify-center">
      <p class="text-sm">Já possui uma conta?</p>
      <NuxtLink to="/auth/login" class="text-sm text-N-green underline decoration-1"
        >Conecte-se</NuxtLink
      >
    </div>

    <div class="mt-7 flex justify-center items-center gap-4">
      <div class="h-[1px] w-full bg-gray-300 dark:bg-zinc-900" />
      <span class="text-xs">OU</span>
      <div class="h-[1px] w-full bg-gray-300 dark:bg-zinc-900" />
    </div>

    <div class="flex flex-col gap-2 mt-7">
      <ButtonsAuth
        :btnAuth="createUserWithGoogle"
        :icon="iconGoogle"
        alt="Criar conta com o Google"
        text="Criar conta com o Google"
      />

      <ButtonsAuth
        :btnAuth="createUserWithGithub"
        :icon="iconGithub"
        alt="Criar conta com o Github"
        text="Criar conta com o Github"
      />
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

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),

      iconGoogle: require("~/assets/img/icons/iconGoogle.svg"),
      iconGithub: require("~/assets/img/icons/iconGithub.svg"),
    };
  },

  validations: {
    name: {
      required,
      maxLength: maxLength(40),
      minLength: minLength(3),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      maxLength: maxLength(30),
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
              this.$router.push("/my-profile");
            })
            .catch((error) => {
              this.errors = error;
              this.$alert("Algo deu errado. Tente novamente.", this.iconErrorAlert);
            });
        })
        .catch((error) => {
          this.errors = error;
          this.$alert("Algo deu errado. Tente novamente.", this.iconErrorAlert);
        });
    },

    // criar usuario com o google
    async createUserWithGoogle() {
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);

        this.$router.push("/my-profile");
      } catch (error) {
        this.errors = error;
        this.$alert("Algo deu errado. Tente novamente.", this.iconErrorAlert);
      }
    },

    async createUserWithGithub() {
      try {
        const provider = new firebase.auth.GithubAuthProvider();
        await firebase.auth().signInWithPopup(provider);

        this.$router.push("/my-profile");
      } catch (error) {
        console.error(error);
        this.$alert("Algo deu errado. Tente novamente.", this.iconErrorAlert);

        this.errors = error;
      }
    },
  },
};
</script>
