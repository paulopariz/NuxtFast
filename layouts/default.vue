<template>
  <div>
    <nav class="flex items-center gap-8 px-20 bg-gray-200 py-4">
      <nuxt-link v-if="!user" to="/signin">Sign In</nuxt-link>
      <nuxt-link v-if="!user" to="/signup">Sign Up</nuxt-link>
      <nuxt-link to="/account">Accont</nuxt-link>
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
  middleware: "auth",

  data() {
    return {
      user: "",
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        this.$router.push({ path: "/signin" });
      }
    });
  },

  //     if (this.$route.path !== "/") {
  //       firebase.auth().onAuthStateChanged((user) => {
  //         if (!user) {
  //           console.log(user);
  //           this.user = user;
  //           this.$router.push({ path: "/signin" });
  //         } else {
  //         }
  //       });
  //     }
  //   },

  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((result) => {
          console.log(result);
          this.user = "";
          this.$router.push("/signin");
        });
    },
  },
};
</script>

<style></style>
