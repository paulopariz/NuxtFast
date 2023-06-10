import firebase from "firebase/app";
import "firebase/firestore";

const db = firebase.firestore();

const aulasApi = [
  {
    id: 1,
    name: "Aula-1",
  },
  {
    id: 2,
    name: "Aula-2",
  },
  {
    id: 4,
    name: "Aula-4",
  },
  {
    id: 5,
    name: "Aula-5",
  },
  {
    id: 6,
    name: "Aula-6",
  },
  {
    id: 7,
    name: "Aula-7",
  },
  {
    id: 8,
    name: "Aula-8",
  },
];

export { db, aulasApi };
