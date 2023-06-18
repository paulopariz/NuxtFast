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

      <header
        class="flex items-center justify-between border-2 border-x-0 border-t-0 pb-10 border-gray-200 dark:border-zinc-900"
      >
        <div class="flex flex-col gap-6">
          <div class="flex items-center gap-4">
            <img src="../assets/img/icons/iconTimer.svg" alt="" />
            <h1 class="font-semibold tracking-wide">
              Tempo de leitura {{ totalMinutes }}
            </h1>
          </div>
          <div class="flex items-center gap-4">
            <img src="../assets/img/icons/iconReq.svg" alt="" />
            <h1 class="font-semibold tracking-wide">JavaSript, VueJS básicos</h1>
          </div>
          <div class="flex items-center gap-4">
            <img src="../assets/img/icons/iconRocket.svg" alt="" />
            <h1 class="font-semibold tracking-wide">{{ aulasApi.length }} Tópicos</h1>
          </div>
        </div>

        <div>
          <img src="../assets/img/NuxtGreen.svg" alt="Logo NuxtJS" class="w-64" />
        </div>
      </header>

      <!--BARRA DE PROGRESSO-->
      <div v-if="user" class="mt-16 flex flex-col justify-start gap-2">
        <span class="">{{ Math.round(progressPercentage) }}% completo</span>
        <div
          class="w-60 h-4 bg-gray-50 mt-3 dark:bg-zinc-900 flex items-center px-1 rounded-full"
        >
          <div
            class="progressBar h-2.5 bg-N-green rounded-full"
            :style="{ width: progressPercentage + '%' }"
          ></div>
        </div>
      </div>

      <div v-for="aula in aulasApi" :key="aula.id">
        <section
          class="mt-14 pt-4 pb-7 border border-gray-200 dark:border-zinc-900 flex flex-col items-start gap-4 rounded-md transition-all hover:bg-gray-200/20 dark:hover:bg-zinc-900/20"
          :class="{ borderCheck: user && checkedAulas[aula.id] === true }"
        >
          <NuxtLink
            :to="aula.route"
            class="absolute transition-all bg-gray-200/20 dark:bg-zinc-900/20 -mt-7 -ml-3 flex items-center justify-center gap-3 px-5 py-2 rounded-full border border-gray-200 dark:border-zinc-900 backdrop-blur-md hover:bg-gray-200/40 dark:hover:bg-zinc-900/40"
          >
            <span v-if="user" class="font-bold tracking-wide"
              >Acessar {{ aula.name }}</span
            >

            <div v-else>
              <span v-if="aula.isLogged === true">Apenas usuários autenticados</span>
              <span v-else>{{ aula.name }}</span>
            </div>
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
          </NuxtLink>

          <div class="mt-7 px-5 flex flex-col gap-8 w-full">
            <div class="flex items-center justify-between">
              <h1 class="text-3xl font-bold text-N-green">{{ aula.id }}</h1>
              <span class="text-sm tracking-wide font-bold"
                >{{ aula.minutesReading }} min de leitura</span
              >
            </div>
            <p class="text-base tracking-wide w-4/6 leading-6 font-light">
              {{ aula.description }}
            </p>

            <div class="flex flex-col" v-if="user">
              <div class="flex flex-row items-center">
                <input
                  type="checkbox"
                  v-model="checkedAulas[aula.id]"
                  @change="updateProgress"
                  class="appearance-none cursor-pointer h-5 w-5 bg-gray-100 dark:bg-zinc-900 rounded-full checked:bg-N-green dark:checked:bg-N-green checked:scale-75 transition-all duration-200 peer"
                />
                <div
                  class="h-5 w-5 scale-125 cursor-pointer absolute border-gray-200 dark:border-zinc-800 border-2 rounded-full pointer-events-none peer-checked:border-N-green peer-checked:border-2"
                ></div>

                <label
                  class="flex flex-col justify-center px-2 peer-checked:text-N-green select-none"
                >
                  <span v-if="checkedAulas[aula.id] === true" class="font-semibold ml-2"
                    >Concluído</span
                  >
                  <span v-else class="font-semibold ml-2">Concluir</span>
                </label>
              </div>
            </div>
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

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),
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
        this.$alert(
          "Dados não carregados. Verifique se você está autenticado!",
          this.iconErrorAlert
        );
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

<style scoped>
.progressBar {
  transition: width 0.5s ease;
  box-shadow: 0px 0px 18px 1px #00dc80c5;
}
.borderCheck {
  /* background: radial-gradient(
        circle at 100% 100%,
        #0b0b0c 0,
        #0b0b0c 5px,
        transparent 5px
      )
      0% 0%/6px 6px no-repeat,
    radial-gradient(circle at 0 100%, #0b0b0c 0, #0b0b0c 5px, transparent 5px) 100% 0%/6px
      6px no-repeat,
    radial-gradient(circle at 100% 0, #0b0b0c 0, #0b0b0c 5px, transparent 5px) 0% 100%/6px
      6px no-repeat,
    radial-gradient(circle at 0 0, #0b0b0c 0, #0b0b0c 5px, transparent 5px) 100% 100%/6px
      6px no-repeat,
    linear-gradient(#0b0b0c, #0b0b0c) 50% 50% / calc(100% - 2px) calc(100% - 12px)
      no-repeat,
    linear-gradient(#0b0b0c, #0b0b0c) 50% 50% / calc(100% - 12px) calc(100% - 2px)
      no-repeat,
    linear-gradient(159deg, transparent 8%, #00dc82 74%); */
  border-color: #00dc82;
}
</style>
