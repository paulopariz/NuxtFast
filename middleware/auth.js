import firebase from "firebase/app";
import "firebase/auth";

export default function ({ app, route, redirect }) {
  if (process.client) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      app.user = user;
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        localStorage.setItem("user", JSON.stringify(user));
        app.user = user;
      } else {
        localStorage.removeItem("user");
        delete app.user;
        redirect("/signin");
      }
    });
  }
}
