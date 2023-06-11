<template>
  <Loading v-if="loading" />

  <div v-else class="absolute left-1/2 w-full -translate-x-1/2">
    <div class="container w-full m-auto my-12">
      <div class="mt-5 flex flex-col justify-center gap-2 items-center">
        <span class="dark:text-gray-200"
          >{{ Math.round(progressPercentage) }}% completo</span
        >
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
        >
          <h1 class="text-3xl dark:text-gray-200 font-bold">{{ aula.id }}</h1>
          <h2 class="dark:text-gray-200 text-2xl">{{ aula.name }}</h2>
          <span class="dark:text-gray-200 text-xs"
            >{{ aula.minutesReading }} min de leitura</span
          >
          <p class="dark:text-gray-400 text-sm">{{ aula.description }}</p>

          <input
            type="checkbox"
            v-model="checkedAulas[aula.id]"
            @change="updateProgress"
          />
          <NuxtLink
            :to="aula.route"
            class="dark:text-gray-200 mt-3 bg-emerald-600 px-3 py-2 text-xs"
            >Ver {{ aula.name }}</NuxtLink
          >
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { db, aulasApi } from "~/utils/api";
import auth from "~/mixins/auth";

export default {
  mixins: [auth],

  data() {
    return {
      checkedAulas: {},
      progressPercentage: 0,
    };
  },

  async asyncData({ error }) {
    try {
      //carregar o estado dos checkboxes
      const doc = await db.collection("checkboxes").doc("state").get();

      if (doc.exists) {
        const data = doc.data();
        return {
          checkedAulas: data.checkedAulas,
          progressPercentage: data.progressPercentage,
        };
      }
    } catch (err) {
      error({ statusCode: 500, message: "Erro ao carregar" });
    }

    //se não houvee dados salvo, retona vazio os checkbox e a progressPercentage-bar
    return {
      checkedAulas: {},
      progressPercentage: 0,
    };
  },

  methods: {
    updateProgress() {
      const checkedCount = Object.values(this.checkedAulas).filter(
        (isChecked) => isChecked
      ).length;
      this.progressPercentage = (checkedCount / aulasApi.length) * 100;

      //salvar o estado dos checkboxes
      this.saveCheckboxesState();
    },
    saveCheckboxesState() {
      //salvar o estado dos checkboxes
      db.collection("checkboxes").doc("state").set({
        checkedAulas: this.checkedAulas,
        progressPercentage: this.progressPercentage,
      });
    },
  },
  computed: {
    aulasApi() {
      return aulasApi;
    },
  },
};
</script>

<style>
.progressBar {
  transition: width 0.5s ease;
}
</style>
