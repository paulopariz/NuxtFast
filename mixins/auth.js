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
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        this.$router.push({ path: "/auth/signin" });
      }
    });
  },
};
