import firebase from "firebase/app";
import "firebase/auth";

export default function ({ redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
      return redirect("/");
    }
  });
}
