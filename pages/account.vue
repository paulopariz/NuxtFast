<template>
  <Loading v-if="loading" />

  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <!-- <h1 class="text-emerald-600 text-7xl">BEM-VINDO</h1> -->

    <div class="flex-col flex gap-4">
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

      user: "",
    };
  },

  computed: {
    ...mapState(["loading"]),
  },

  mounted() {
    firebase.auth().onAuthStateChanged((userInfos) => {
      if (userInfos) {
        this.user = userInfos;
        this.newName = userInfos.displayName;
        this.newEmail = userInfos.email;
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
        console.log("erro");
      }
    },
  },
};
</script>
