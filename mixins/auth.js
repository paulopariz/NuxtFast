import firebase from "~/plugins/firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      user: "",

      iconAttentionAlert: require("~/assets/img/icons/iconAttention.svg"),
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
        this.$router.push({ path: "/auth/login" });
        this.$alert(
          "Apenas para usuários autenticados!",
          this.iconAttentionAlert
        );
      }
      this.$store.commit("SET_LOADING", false);
    });
  },
};
