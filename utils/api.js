import firebase from "~/plugins/firebase";
import "firebase/firestore";

const db = firebase.firestore();

const aulasApi = [
  {
    id: 1,
    name: "Aula-1",
    route: "/",
    isLogged: true,
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 2,
    name: "Aula-2",
    route: "/teste",
    isLogged: false,
    minutesReading: 13,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 3,
    name: "Aula-3",
    route: "/teste",
    isLogged: false,
    minutesReading: 12,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 4,
    name: "Aula-4",
    route: "/teste2",
    isLogged: true,
    minutesReading: 11,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 5,
    name: "Aula-5",
    route: "/my-profile",
    isLogged: true,
    minutesReading: 21,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 6,
    name: "Aula-6",
    route: "/my-profile/edit",
    isLogged: false,
    minutesReading: 6,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 7,
    name: "Aula-7",
    route: "/",
    isLogged: true,
    minutesReading: 12,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 8,
    name: "Aula-8",
    route: "/teste",
    isLogged: false,
    minutesReading: 18,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
];

export { db, aulasApi };
