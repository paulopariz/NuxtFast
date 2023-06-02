<template>
  <div>
    <nav class="flex items-center gap-8 px-20 bg-gray-200 py-4">
      <nuxt-link v-if="!user" to="/signin">Sign In</nuxt-link>
      <nuxt-link v-if="!user" to="/signup">Sign Up</nuxt-link>
      <nuxt-link to="/">Home</nuxt-link>

      <button v-if="user" @click="signout">Sign Out</button>
    </nav>

    <Nuxt />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: "",
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
      if (!user) {
        this.$router.push("/signup");
        console.log("deslogado");
      }
      this.user = user;
    });
  },

  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);
          this.user = "";
          this.$router.push("/signup");
        });
    },
  },
};
</script>

<style></style>
