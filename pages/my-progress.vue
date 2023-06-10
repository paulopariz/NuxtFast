<template>
  <div class="ml-40">
    <div v-for="aula in aulasApi" :key="aula.id">
      <input type="checkbox" v-model="checkedAulas[aula.id]" @change="updateProgress" />
      {{ aula.name }}
    </div>
    <div class="progress-bar">
      <div class="progress" :style="{ width: progress + '%' }"></div>
    </div>
  </div>
</template>

<script>
import { db, aulasApi } from "~/utils/api";

export default {
  data() {
    return {
      checkedAulas: {},
      progress: 0,
    };
  },
  async asyncData({ error }) {
    try {
      //carregar o estado dos checkboxes
      const doc = await db.collection("checkboxes").doc("state").get();

      if (doc.exists) {
        const data = doc.data();
        console.log(data);
        return {
          checkedAulas: data.checkedAulas,
          progress: data.progress,
        };
      }
    } catch (err) {
      error({ statusCode: 500, message: "Erro ao carregar" });
    }

    //se não houvee dados salvo, retona vazio os checkbox e a progress-bar
    return {
      checkedAulas: {},
      progress: 0,
    };
  },
  methods: {
    updateProgress() {
      const checkedCount = Object.values(this.checkedAulas).filter(
        (isChecked) => isChecked
      ).length;
      this.progress = (checkedCount / aulasApi.length) * 100;

      //salvar o estado dos checkboxes
      this.saveCheckboxesState();
    },
    saveCheckboxesState() {
      //salvar o estado dos checkboxes
      db.collection("checkboxes")
        .doc("state")
        .set({ checkedAulas: this.checkedAulas, progress: this.progress });
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
.progress-bar {
  width: 200px;
  height: 20px;
  border: 1px solid #ccc;
  background-color: #f2f2f2;
  margin-top: 10px;
}

.progress {
  height: 100%;
  background-color: green;
  transition: width 0.5s ease;
}
</style>
