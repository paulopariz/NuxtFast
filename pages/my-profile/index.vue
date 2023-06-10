<template>
  <Loading v-if="loading" />

  <div v-else>
    <section class="absolute left-1/2 -translate-x-1/2 w-full h-full">
      <div class="mt-12 flex flex-col items-center justify-center container m-auto">
        <img :src="infoUser.photoURL" :alt="infoUser.displayName" class="w-36 h-36" />
        <h1 class="dark:text-gray-200 text-3xl">{{ infoUser.displayName }}</h1>
        <p class="dark:text-gray-200 text-xl">{{ infoUser.email }}</p>
        <span class="dark:text-gray-200 text-xl"
          >Data de criação: {{ creationDate }}</span
        >
        <span class="dark:text-gray-200 text-xl">Ultimo login: {{ lastLoginDate }}</span>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
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
      lastLoginDate: "",
    };
  },

  computed: {
    ...mapState(["loading"]),
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.infoUser = user;

        const creationDate = user.metadata.creationTime;
        const lastLoginDate = user.metadata.lastSignInTime;

        const formatDateCreation = moment(creationDate).format("DD-MM-YYYY h:mm A");
        const formatDateLastLogin = moment(lastLoginDate).format("DD-MM-YYYY h:mm A");

        this.creationDate = formatDateCreation;
        this.lastLoginDate = formatDateLastLogin;
      }
    });
  },
};
</script>

<style></style>
