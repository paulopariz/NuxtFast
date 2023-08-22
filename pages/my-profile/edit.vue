<template>
  <Loading v-if="loading" />

  <div v-else class="w-screen">
    <section class="md:container w-full m-auto">
      <BaseHeader
        title="Meu perfil"
        desc='Esta é a seção do seu perfil. Aqui você pode ver seus dados, atualizar seu
          perfil clicando em "Editar perfil" abaixo e deletar sua conta.'
      />

      <div
        class="flex justify-between items-start max-md:flex-col-reverse max-md:gap-10"
      >
        <div
          class="flex flex-col gap-9 border-2 border-y-0 border-r-0 border-green-200 dark:border-zinc-900"
        >
          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl max-sm:text-lg text-N-green font-semibold">
              Nome
            </h1>
            <p
              class="ml-2 max-sm:text-sm font-semibold w-96 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ infoUser.displayName }}
            </p>
          </div>

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl max-sm:text-lg text-N-green font-semibold">
              Email
            </h1>
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
            <p
              class="ml-2 max-sm:text-sm font-semibold w-96 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {{ infoUser.email }}
            </p>
          </div>

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl max-sm:text-lg text-N-green font-semibold">
              Perfil criado em
            </h1>
            <p class="ml-2 max-sm:text-sm font-semibold">{{ creationDate }}</p>
          </div>
        </div>

        <div>
          <div v-if="infoUser.photoURL">
            <img
              :src="infoUser.photoURL"
              :alt="'Imagem de perfil do usuário: ' + infoUser.displayName"
              :title="infoUser.displayName"
              class="w-36 h-36 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 rounded-lg"
            />
          </div>
          <!-- <div
            v-else
            class="grid h-36 w-36 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 place-content-center rounded-lg bg-gray-100 dark:bg-zinc-900"
            :title="user.displayName"
          >
            <h1 class="text-3xl text-gray-600 dark:text-gray-200">
              {{ firstLetter }}
            </h1>
          </div> -->
        </div>
      </div>
    </section>

    <div
      class="fixed max-sm:absolute bottom-12 max-sm:bottom-6 right-12 flex items-center gap-6 max-md:right-4"
    >
      <!-- <NuxtLink
        to="/my-profile/edit"
        class="font-semibold tracking-wide decoration-1 hover:underline max-sm:text-sm"
        >Editar perfil</NuxtLink
      > -->
      <button
        @click="openModalEdit"
        class="font-semibold tracking-wide decoration-1 hover:underline max-sm:text-sm"
      >
        Editar perfil
      </button>
      <div class="h-7 w-0.5 bg-gray-200 dark:bg-zinc-900" />
      <button
        @click="deactivateOpenModal"
        class="font-semibold tracking-wide text-red-600 underline max-sm:text-sm decoration-1"
      >
        Desativar conta
      </button>
    </div>

    <ModalDeleteUser
      v-show="viewModal"
      titleModal="Desativar conta"
      :descModal="descModal"
      textConfirmModal="Desativar"
      :clickConfirmModal="deactivateAccount"
      :clickCancelModal="cancel"
    />

    <ModalEditUser
      v-show="viewModalEdit"
      titleModal="Editar perfil"
      textConfirmModal="Confirmar alterações"
      :clickConfirmModal="updateProfile"
      :clickCancelModal="cancel"
      :newName="newName"
      :newEmail="newEmail"
      :newPassword="newPassword"
    />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { db } from "~/utils/api";
import moment from "moment";
import { mapState } from "vuex";
import auth from "~/mixins/auth";
import {
  required,
  email,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";

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
      viewModalEdit: false,

      //edit
      newName: "",
      newEmail: "",
      newPassword: "",

      disabledInputAndButton: false,

      username: "",

      user: "",

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),
      iconCheckAlert: require("~/assets/img/icons/iconCheck.svg"),
      iconAttentionAlert: require("~/assets/img/icons/iconAttention.svg"),
    };
  },

  validations: {
    newName: {
      required,
      maxLength: maxLength(30),
      minLength: minLength(3),
    },
    newEmail: {
      required,
      email,
    },
    newPassword: {
      required,
      maxLength: maxLength(50),
      minLength: minLength(6),
    },
  },

  computed: {
    ...mapState(["loading"]),

    // firstLetter() {
    //   return this.user.displayName.charAt(0).toLocaleUpperCase();
    // },
  },

  mounted() {
    const user = firebase.auth().currentUser;
    if (user) {
      this.infoUser = user;

      require("moment/locale/pt-br");

      const creationDate = user.metadata.creationTime;

      const formatDateCreation = moment(creationDate).format(
        "D MMMM, YYYY [às] HH:mm"
      );

      this.creationDate = formatDateCreation;
    }
  },

  methods: {
    deactivateOpenModal() {
      setTimeout(() => {
        this.viewModal = true;
      }, 200);
    },

    openModalEdit() {
      setTimeout(() => {
        this.viewModalEdit = true;
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
                this.$alert(
                  "Usuário excluído com sucesso!",
                  this.iconCheckAlert
                );
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
      this.viewModalEdit = false;
    },

    updateProfile() {
      console.log("up");
      this.updateName();
      this.updateEmail();
      this.updatePassword();
    },

    async updateName() {
      console.log("updateName");
      try {
        const user = firebase.auth().currentUser;

        if (user !== null && user !== undefined) {
          if (user.displayName !== this.newName) {
            await user.updateProfile({
              displayName: this.newName,
            });

            this.$alert("Nome atualizado com sucesso!", this.iconCheckAlert);
          } else {
            this.$alert(
              "Por favor, utilize um nome diferente do atual.",
              this.iconAttentionAlert
            );
          }
        } else {
          this.$alert(
            "Não foi possível atualizar o nome!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$alert("Não foi possível atualizar o nome!", this.iconErrorAlert);
      }
    },

    async updateEmail() {
      console.log("updateEmail");
      try {
        const user = firebase.auth().currentUser;

        if (
          user &&
          user.providerData[0].providerId !== "google.com" &&
          user.providerData[0].providerId !== "github.com"
        ) {
          if (this.newEmail !== user.email) {
            await user.updateEmail(this.newEmail);
            this.$alert("E-mail atualizado com sucesso!", this.iconCheckAlert);
          } else {
            this.$alert(
              "Por favor, utilize um e-mail diferente do atual.",
              this.iconAttentionAlert
            );
          }
        } else {
          this.$alert(
            "Não foi possível atualizar o e-mail!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$alert(
          "Algo deu errado. Tente outro e-mail ou volte mais tarde.",
          this.iconErrorAlert
        );
      }
    },

    async updatePassword() {
      console.log("updatePassword");
      try {
        const user = firebase.auth().currentUser;

        if (
          user &&
          user.providerData[0].providerId !== "google.com" &&
          user.providerData[0].providerId !== "github.com"
        ) {
          await user.updatePassword(this.newPassword);
          this.$alert("Senha atualizada com sucesso!", this.iconCheckAlert);
          setTimeout(() => {
            this.$router.go();
          }, 2100);
        } else {
          this.$alert(
            "Não foi possível atualizar a senha!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$alert("Não foi possível atualizar a senha!", this.iconErrorAlert);
      }
    },
  },
};
</script>
