<template>
  <!-- <Loading v-if="loading" /> -->

  <div class="absolute left-1/2 w-full -translate-x-1/2">
    <div class="container w-full m-auto my-12">
      <section v-if="!user">
        <h1>Usuarios não autenticados tem acesso apenas as seguintes aulas:</h1>
        <ul>
          <div v-for="accessAulas in aulasApi" :key="accessAulas.id">
            <li v-if="accessAulas.isLogged === false" class="">
              {{ accessAulas.name }}
            </li>
          </div>
        </ul>
      </section>

      <div>
        <h1 class="">Tempo total de leitura: {{ totalMinutes }}</h1>
        <h1 class="">Total de aulas: {{ aulasApi.length }}</h1>

        <h1 class="">Requisitos:</h1>
        <ul>
          <li class="">VueJS básico</li>
          <li class="">JavaSript básico</li>
        </ul>
      </div>

      <!--BARRA DE PROGRESSO-->
      <div v-if="user" class="mt-5 flex flex-col justify-center gap-2 items-center">
        <span class="">{{ Math.round(progressPercentage) }}% completo</span>
        <div class="w-60 h-3 bg-gray-50 mt-3 dark:bg-zinc-900">
          <div
            class="progressBar h-full bg-emerald-600"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>

      <div v-for="aula in aulasApi" :key="aula.id">
        <section
          class="mt-7 p-4 border-2 border-zinc-900 flex flex-col items-start gap-2"
          :class="{ borderCheck: user && checkedAulas[aula.id] === true }"
        >
          <div class="flex justify-between items-center w-full">
            <h1 class="text-3xl font-bold">{{ aula.id }}</h1>
            <img
              v-if="user"
              src="@/assets/img/icons/iconArrow.svg"
              alt="Ícone de usuário autenticado"
            />

            <div v-else>
              <img
                v-if="aula.isLogged === true"
                src="@/assets/img/icons/iconBlocked.svg"
                alt="Ícone de usuário autenticado"
              />
              <img
                v-else
                src="@/assets/img/icons/iconArrow.svg"
                alt="Ícone de usuário não autenticado"
              />
            </div>
          </div>
          <h2 class="text-2xl">{{ aula.name }}</h2>
          <span class="text-xs">{{ aula.minutesReading }} min de leitura</span>
          <p class="text-sm">{{ aula.description }}</p>

          <input
            v-if="user"
            type="checkbox"
            v-model="checkedAulas[aula.id]"
            @change="updateProgress"
          />
          <NuxtLink
            :to="aula.route"
            v-if="user"
            class="mt-3 bg-emerald-600 px-3 py-2 text-xs"
            >Ver {{ aula.name }}
          </NuxtLink>

          <div v-else>
            <NuxtLink
              :to="aula.route"
              v-if="aula.isLogged === false"
              class="mt-3 bg-emerald-600 px-3 py-2 text-xs"
              >Ver {{ aula.name }}
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { db, aulasApi } from "~/utils/api";
import moment from "moment";

export default {
  data() {
    return {
      checkedAulas: {},
      progressPercentage: 0,
      user: null,
    };
  },

  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        this.loadCheckboxesState(user.uid);
      } else {
        this.user = null;
        this.checkedAulas = {};
        this.progressPercentage = 0;
      }
    });
  },

  methods: {
    async loadCheckboxesState(userId) {
      try {
        //carregar o estado dos checkboxes

        const doc = await db.collection("checkboxes").doc(userId).get();

        if (doc.exists) {
          const data = doc.data();
          this.checkedAulas = data.checkedAulas || {};
          this.progressPercentage = data.progressPercentage || 0;
        } else {
          this.checkedAulas = {};
          this.progressPercentage = 0;
        }
      } catch (error) {
        console.error("Erro ao carregar os dados", error);
      }
    },

    updateProgress() {
      const checkedCount = Object.values(this.checkedAulas).filter(
        (isChecked) => isChecked
      ).length;
      this.progressPercentage = (checkedCount / aulasApi.length) * 100;

      if (this.user) {
        //salvar o estado dos checkboxes
        this.saveCheckboxesState(this.user.uid);
      }
    },

    //salvar o estado dos checkboxes
    saveCheckboxesState(userId) {
      db.collection("checkboxes")
        .doc(userId)
        .set({
          checkedAulas: this.checkedAulas,
          progressPercentage: this.progressPercentage,
        })
        .catch((error) => {
          console.error("Erro ao salvar os dados", error);
        });
    },
  },

  computed: {
    aulasApi() {
      return aulasApi;
    },

    //minutos totais das aulas
    totalMinutes() {
      const total = this.aulasApi.reduce(
        (acc, readAulas) => acc + readAulas.minutesReading,
        0
      );
      const duration = moment.duration(total, "minutes");
      const hours = duration.hours();
      const minutes = duration.minutes();
      return `${hours}h ${minutes}min`;
    },
  },
};
</script>

<style>
.progressBar {
  transition: width 0.5s ease;
}
.borderCheck {
  border-color: rgb(22, 210, 81);
}
</style>
