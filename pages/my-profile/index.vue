<template>
  <Loading v-if="loading" />

  <div v-else>
    <section class="absolute left-1/2 -translate-x-1/2 w-full h-full">
      <div class="mt-12 flex flex-col items-center justify-center container m-auto">
        <div v-if="infoUser.photoURL && user.photoURL !== 'https://github.com/.png'">
          <img :src="infoUser.photoURL" :alt="infoUser.displayName" class="w-36 h-36" />
        </div>

        <div
          v-else
          class="grid h-36 w-36 place-content-center rounded-lg bg-gray-100 t dark:bg-zinc-900"
          :title="user.displayName"
        >
          <h1 class="text-3xl text-gray-600 dark:text-gray-200">{{ firstLetter }}</h1>
        </div>

        <h1 class="text-3xl">{{ infoUser.displayName }}</h1>
        <p class="text-xl">{{ infoUser.email }}</p>
        <span class="text-xl">Data de criação: {{ creationDate }}</span>
      </div>
    </section>

    <div class="fixed bottom-12 right-12 flex items-center gap-3">
      <NuxtLink to="/my-profile/edit" class="bg-emerald-600 px-3 py-2 text-white"
        >Editar perfil</NuxtLink
      >
      <button @click="deleteUser" class="bg-red-600 px-3 py-2 text-white">
        Deletar meu perfil
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { db } from "~/utils/api";
import moment from "moment";
import { mapState } from "vuex";
import auth from "~/mixins/auth";

export default {
  name: "my-profile",
  mixins: [auth],

  data() {
    return {
      infoUser: "",
      creationDate: "",

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),
      iconCheckAlert: require("~/assets/img/icons/iconCheck.svg"),
    };
  },

  computed: {
    ...mapState(["loading"]),

    firstLetter() {
      return this.user.displayName.charAt(0).toLocaleUpperCase();
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.infoUser = user;

        const creationDate = user.metadata.creationTime;

        const formatDateCreation = moment(creationDate).format("DD-MM-YYYY h:mm A");

        this.creationDate = formatDateCreation;
      }
    });
  },

  methods: {
    deleteUser() {
      const user = firebase.auth().currentUser;

      if (user) {
        // excluir dados do firestore
        db.collection("checkboxes")
          .doc(user.uid)
          .delete()
          .then(() => {
            // excluir usuário do firebase authentication
            user
              .delete()
              .then(() => {
                this.$router.push("/");
                this.$alert("Usuário excluído com sucesso!", this.iconCheckAlert);
                setTimeout(() => {
                  this.$router.go();
                }, 2100);
              })
              .catch((error) => {
                this.$alert("Erro ao excluir o usuário!", this.iconErrorAlert);
              });
          })
          .catch((error) => {
            this.$alert("Erro ao excluir o usuário!", this.iconErrorAlert);
          });
      }
    },
  },
};
</script>

<style></style>
