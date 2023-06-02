import firebase from "firebase";

export default function ({ redirect }) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      return redirect("/signin");
    } else {
      return;
    }
  });
}
