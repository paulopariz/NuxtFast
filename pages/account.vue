<template>
  <Loading v-if="loading" />

  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <!-- <h1 class="text-emerald-600 text-7xl">BEM-VINDO</h1> -->

    <h1 class="text-black text-4xl">{{ username }}</h1>
    <div class="flex-col flex gap-4">
      <div class="flex gap-4">
        <img :src="photoURL" :alt="user.displayName" class="w-36 rounded-lg" />

        <div class="flex flex-col items-start gap-4">
          <input
            type="text"
            :value="photoGithub"
            readonly
            name="Foto"
            placeholder="URL da foto"
            class="border border-gray-950 p-2 dark:bg-zinc-900"
          />

          <input
            type="text"
            v-model="newPhotoURL"
            name="Foto"
            placeholder="URL da foto"
            class="border border-gray-950 p-2 dark:bg-zinc-900"
          />
          <button class="px-3 py-2 bg-emerald-600 text-white" @click="updatePhotoURL">
            Atualizar Foto
          </button>
        </div>
      </div>

      <input
        type="text"
        name="Nome"
        placeholder="Novo nome"
        v-model="newName"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />
      <input
        type="text"
        name="Email"
        placeholder="Novo email"
        v-model="newEmail"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />
      <input
        type="password"
        name="Senha"
        placeholder="Nova senha"
        v-model="newPassword"
        class="border border-gray-950 p-3 dark:bg-zinc-900"
      />

      <button @click="updateEmailAndPassword" class="px-5 py-3 bg-emerald-600 text-white">
        Atualizar
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapState } from "vuex";

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

  computed: {
    ...mapState(["loading"]),

    photoGithub() {
      return `https://github.com/${this.newPhotoURL}.png`;
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((userInfos) => {
      if (userInfos) {
        this.user = userInfos;
        this.newName = userInfos.displayName;
        this.newEmail = userInfos.email;

        this.getUsernameUrl(this.user.photoURL);

        this.photoURL = this.photoGithub;
      } else {
        this.$router.push({ path: "/auth/signin" });
      }
      this.$store.commit("SET_LOADING", false);
    });
  },

  methods: {
    async updateEmailAndPassword() {
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
  },

  beforeUpdate() {
    if (this.photoGithub !== this.photoURL) {
      this.photoURL = this.photoGithub;
    }
  },
};
</script>
