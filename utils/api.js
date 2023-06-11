import firebase from "~/plugins/firebase";
import "firebase/firestore";

const db = firebase.firestore();

const aulasApi = [
  {
    id: 1,
    name: "Aula-1",
    route: "/",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 2,
    name: "Aula-2",
    route: "/teste",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 4,
    name: "Aula-4",
    route: "/teste2",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 5,
    name: "Aula-5",
    route: "/my-profile",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 6,
    name: "Aula-6",
    route: "/my-profile/edit",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 7,
    name: "Aula-7",
    route: "/",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
  {
    id: 8,
    name: "Aula-8",
    route: "/teste",
    minutesReading: 10,
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500",
  },
];

export { db, aulasApi };
