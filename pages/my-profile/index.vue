<template>
  <Loading v-if="loading" />

  <div v-else class="w-screen">
    <section class="container w-full m-auto">
      <BaseHeader
        title="Meu perfil"
        desc='Esta é a seção do seu perfil. Aqui você pode ver seus dados, atualizar seu
          perfil clicando em "Editar perfil" abaixo e deletar sua conta.'
      />

      <div class="flex justify-between items-start">
        <div
          class="flex flex-col gap-9 border-2 border-y-0 border-r-0 border-green-200 dark:border-zinc-900"
        >
          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl text-N-green font-semibold">Nome</h1>
            <p class="ml-2 font-semibold">{{ infoUser.displayName }}</p>
          </div>

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl text-N-green font-semibold">Email</h1>
            <p
              v-if="infoUser.providerData[0].providerId !== 'password'"
              class="text-zinc-900 dark:text-gray-200 text-sm"
            >
              Esse email é referente a sua conta
              <span
                class="text-N-green"
                v-if="infoUser.providerData[0].providerId === 'google.com'"
                >Google</span
              >
              <span
                class="text-N-green"
                v-if="infoUser.providerData[0].providerId === 'github.com'"
                >Github</span
              >
              !
            </p>
            <p class="ml-2 font-semibold">{{ infoUser.email }}</p>
          </div>

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl text-N-green font-semibold">Perfil criado em</h1>
            <p class="ml-2 font-semibold">{{ creationDate }}</p>
          </div>
        </div>

        <div>
          <div v-if="infoUser.photoURL">
            <img
              :src="infoUser.photoURL"
              :alt="'Imagem de perfil do usuário: ' + infoUser.displayName"
              :title="infoUser.displayName"
              class="w-36 h-36 rounded-lg"
            />
          </div>
          <div
            v-else
            class="grid h-36 w-36 place-content-center rounded-lg bg-gray-100 t dark:bg-zinc-900"
            :title="user.displayName"
          >
            <h1 class="text-3xl text-gray-600 dark:text-gray-200">{{ firstLetter }}</h1>
          </div>
        </div>
      </div>
    </section>

    <div v-show="viewModal">
      <Modal
        titleModal="Desativar conta"
        :descModal="descModal"
        textConfirmModal="Desativar"
        :clickConfirmModal="deactivateAccount"
        :clickCancelModal="cancel"
      />
    </div>

    <div class="fixed bottom-12 right-12 flex items-center gap-6">
      <NuxtLink
        to="/my-profile/edit"
        class="font-semibold tracking-wide decoration-1 hover:underline"
        >Editar perfil</NuxtLink
      >
      <div class="h-7 w-0.5 bg-gray-200 dark:bg-zinc-900" />
      <button
        @click="deactivateOpenModal"
        class="font-semibold tracking-wide text-red-600 underline decoration-1"
      >
        Desativar conta
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { db } from "~/utils/api";
import moment from "moment";
import { mapState } from "vuex";
import auth from "~/mixins/auth";

export default {
  name: "my-profile",
  mixins: [auth],

  data() {
    return {
      infoUser: "",
      creationDate: "",

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),
      iconCheckAlert: require("~/assets/img/icons/iconCheck.svg"),

      descModal:
        "Tem certeza de que deseja desativar sua conta? Todos os seus dados serão removidos permanentemente. Essa ação não pode ser desfeita.",

      viewModal: false,
    };
  },

  computed: {
    ...mapState(["loading"]),

    firstLetter() {
      return this.user.displayName.charAt(0).toLocaleUpperCase();
    },
  },

  mounted() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.infoUser = user;

      const creationDate = user.metadata.creationTime;

      const formatDateCreation = moment(creationDate).format("DD-MM-YYYY h:mm A");

      this.creationDate = formatDateCreation;
    }
  },

  methods: {
    deactivateOpenModal() {
      setTimeout(() => {
        this.viewModal = true;
      }, 200);
    },

    deactivateAccount() {
      const user = firebase.auth().currentUser;

      if (user) {
        // excluir dados do firestore
        db.collection("checkboxes")
          .doc(user.uid)
          .delete()
          .then(() => {
            // excluir usuário do firebase authentication
            user
              .delete()
              .then(() => {
                this.$router.push("/");
                this.$alert("Usuário excluído com sucesso!", this.iconCheckAlert);
                setTimeout(() => {
                  this.$router.go();
                }, 2100);
              })
              .catch((error) => {
                this.$alert("Erro ao excluir o usuário!", this.iconErrorAlert);
              });
          })
          .catch((error) => {
            this.$alert("Erro ao excluir o usuário!", this.iconErrorAlert);
          });
      }
    },
    cancel() {
      this.viewModal = false;
    },
  },
};
</script>

<style></style>
