<template>
  <Loading v-if="loading" />

  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <h1 class="text-black text-4xl">{{ username }}</h1>
    <div class="flex-col flex gap-4">
      <div class="flex gap-4">
        <div
          class="grid w-36 h-36 place-content-center rounded-lg bg-gray-100 dark:bg-zinc-900"
          :title="user.displayName"
          v-if="newPhotoURL === ''"
        >
          <h1 class="text-4xl text-gray-600 dark:text-gray-200">{{ firstLetter }}</h1>
        </div>

        <img
          v-else
          :src="photoURL"
          :alt="'Imagem de perfil do usuário: ' + user.displayName"
          class="w-36 rounded-lg"
        />

        <div class="flex flex-col items-start gap-4">
          <input
            type="text"
            :value="photoGithub"
            readonly
            name="Foto"
            placeholder="URL da foto"
            class="hidden"
          />

          <input
            type="text"
            v-model="newPhotoURL"
            name="Username"
            placeholder="Username"
            class="border border-gray-950 p-2 dark:bg-zinc-900"
          />

          <div class="flex items-center gap-2">
            <button class="px-3 py-2 bg-emerald-600 text-white" @click="updatePhotoURL">
              Atualizar Foto
            </button>

            <button class="px-3 py-2 bg-red-600 text-white" @click="removePhotoURL">
              Remover Foto
            </button>
          </div>
        </div>
      </div>

      <input
        type="text"
        name="Nome"
        placeholder="Novo nome"
        v-model="$v.newName.$model"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />
      <span v-if="!$v.newName.required && $v.newName.$dirty">Campo obrigatório.</span>
      <span v-if="!$v.newName.maxLength && $v.newName.$dirty"
        >Nome deve ter no máximo 50 caracteres.</span
      >
      <span v-if="!$v.newName.minLength && $v.newName.$dirty"
        >Nome deve ter pelo menos 3 caracteres.</span
      >

      <input
        type="text"
        name="Email"
        placeholder="Novo email"
        v-model="$v.newEmail.$model"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />
      <span v-if="!$v.newEmail.required && $v.newEmail.$dirty">Campo Obrigatorio</span>
      <span v-if="!$v.newEmail.email && $v.newEmail.$dirty">E-mail inválido</span>

      <input
        type="password"
        name="Senha"
        placeholder="Nova senha"
        v-model="$v.newPassword.$model"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />

      <span v-if="!$v.newPassword.required && $v.newPassword.$dirty"
        >Campo obrigatório.</span
      >
      <span v-if="!$v.newPassword.minLength && $v.newPassword.$dirty"
        >A senha deve ter pelo menos 6 caracteres.</span
      >
      <span v-if="!$v.newPassword.maxLength && $v.newPassword.$dirty"
        >A senha deve ter no máximo 30 caracteres.</span
      >

      <button @click="updateEmailAndPassword" class="px-5 py-3 bg-emerald-600 text-white">
        Atualizar
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapState } from "vuex";
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      newName: "",
      newEmail: "",
      newPassword: "",

      photoURL: "",
      newPhotoURL: "",
      username: "",

      user: "",
    };
  },

  validations: {
    newName: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(3),
    },
    newEmail: {
      required,
      email,
    },
    newPassword: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  },

  computed: {
    ...mapState(["loading"]),

    photoGithub() {
      return `https://github.com/${this.newPhotoURL}.png`;
    },

    //capturar a primeira letra do nome do usuario para imagem
    firstLetter() {
      return this.user.displayName.charAt(0).toLocaleUpperCase();
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((userInfos) => {
      if (userInfos) {
        this.user = userInfos;
        this.newName = userInfos.displayName;
        this.newEmail = userInfos.email;

        this.getUsernameUrl(this.user.photoURL || "");

        this.photoURL = this.photoGithub;
      } else {
        this.$router.push({ path: "/auth/signin" });
      }
      this.$store.commit("SET_LOADING", false);
    });
  },

  methods: {
    async updateEmailAndPassword() {
      if (!this.$v.$invalid) {
        try {
          const user = firebase.auth().currentUser;
          console.log(user);

          if (user !== null && user !== undefined) {
            await user.updateEmail(this.newEmail);
            await user.updatePassword(this.newPassword);
            await user.updateProfile({
              displayName: this.newName,
            });

            console.log("email e senha atualizados");
          } else {
            console.log("usuario não autenticado");
          }
        } catch (error) {
          console.log(error);
          console.log("erro ao atualizar");
        }
      } else {
        console.log("scsdc");
      }
    },

    async updatePhotoURL() {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          await user.updateProfile({
            photoURL: this.photoGithub,
          });

          this.photoURL = this.photoGithub;
        }
      } catch (error) {
        console.log("erro ao atualizar a foto");
        console.error(error);
      }
    },

    getUsernameUrl(url) {
      // remove #https://github.com" e ".png"  sobrando apenas o username
      const username = url.replace("https://github.com/", "").replace(".png", "");

      this.newPhotoURL = username;
    },

    //remover foto de perfil
    removePhotoURL() {
      this.newPhotoURL = "";
    },
  },

  beforeUpdate() {
    if (this.photoGithub !== this.photoURL) {
      this.photoURL = this.photoGithub;
    }
  },
};
</script>
