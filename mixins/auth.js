import firebase from "firebase/app";
import "firebase/auth";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: "",
    };
  },

  computed: {
    ...mapState(["loading"]),
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = user;
      } else {
        this.$router.push({ path: "/auth/signin" });
      }
      this.$store.commit("SET_LOADING", false);
    });
  },
};
