<template>
  <Loading v-if="loading" />

  <div v-else>
    <Header />
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapState(["loading"]),
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
      this.$store.commit("SET_LOADING", false);
    });
  },
};
</script>
