<template>
  <Loading v-if="loading" />

  <div v-else class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
    <!-- <h1 class="text-emerald-600 text-7xl">BEM-VINDO</h1> -->

    <div class="flex-col flex gap-4">
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
import auth from "~/mixins/auth";
import firebase from "~/plugins/firebase";

export default {
  mixins: [auth],

  data() {
    return {
      newEmail: "",
      newPassword: "",
    };
  },

  methods: {
    async updateEmailAndPassword() {
      try {
        const user = firebase.auth().currentUser;

        if (user) {
          await user.updateEmail(this.newEmail);
          await user.updatePassword(this.newPassword);

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

<style></style>
