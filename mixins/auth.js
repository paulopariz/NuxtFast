import firebase from "~/plugins/firebase";
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
        this.user = user;
      } else {
        this.$router.push({ path: "/auth/signin" });
      }
      this.$store.commit("SET_LOADING", false);
    });
  },
};
