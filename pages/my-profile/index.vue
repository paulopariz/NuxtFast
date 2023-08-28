<template>
  <Loading v-if="loading" />

  <div v-else class="w-screen">
    <section class="md:container w-full m-auto">
      <BaseHeader
        title="Editar perfil"
        desc="Edite os dados do seu perfil abaixo. Se você estiver conectado ao GitHub e ao
          Google, só poderá alterar seu nome."
      />

      <div
        class="flex justify-between items-start max-md:flex-col-reverse max-md:gap-10"
      >
        <div class="flex flex-col gap-9 w-full">
          <!--ATUALIZAR FOTO DE PERFIL-->
          <div
            class="w-full p-6 border border-gray-200 dark:border-zinc-900 rounded-md transition-all bg-gray-200/20 dark:bg-zinc-900/20 flex flex-col"
          >
            <div class="flex items-center justify-between">
              <div>
                <h1 class="text-xl max-sm:text-lg font-semibold">
                  Editar foto de perfil
                </h1>
                <p
                  class="text-base max-sm:text-sm text-zinc-900 dark:text-gray-200 mt-3.5"
                >
                  Clique em sua foto para poder edita-la.
                </p>
                <p
                  class="text-base max-sm:text-sm text-zinc-900 dark:text-gray-200 mb-3.5"
                >
                  Tente utilizar a URL da imagem do seu perfil do GitHub,
                  LinkedIn, Instagram, etc.
                </p>
              </div>

              <div>
                <img
                  @click="openEditPhoto"
                  v-if="user.photoURL"
                  :src="user.photoURL"
                  :alt="'Imagem de perfil do usuário: ' + user.displayName"
                  :title="user.displayName"
                  class="w-24 h-24 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 rounded-full border border-gray-200 dark:border-zinc-900 hover:border-2 hover:opacity-30 transition-all absolute z-50 cursor-pointer"
                />
                <div
                  @click="openEditPhoto"
                  v-if="!user.photoURL"
                  class="grid w-24 h-24 border border-gray-200 dark:border-zinc-800 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 place-content-center rounded-full bg-gray-100 dark:bg-zinc-900 hover:border-2 hover:opacity-20 transition-all absolute z-50 cursor-pointer"
                  :title="user.displayName"
                >
                  <h1 class="text-4xl text-gray-600 dark:text-gray-200">
                    {{ firstLetter }}
                  </h1>
                </div>
                <div
                  class="w-24 h-24 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 rounded-full relative cursor-pointer flex justify-center items-center"
                >
                  <span class="text-sm text-center font-bold tracking-wide"
                    >Editar</span
                  >
                </div>
              </div>
            </div>
            <input
              v-if="showEditPhoto"
              type="text"
              name="Nome"
              placeholder="Nova foto"
              class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green truncate"
              :class="{
                invalidPhoto: isValidPhotoUrl === false && newPhoto,
              }"
              v-model="newPhoto"
            />
            <div
              class="flex items-center justify-between pt-6 mt-6 border-x-0 border-b-0 border-t border-gray-200 dark:border-zinc-900 w-full"
            >
              <div>
                <span
                  class="text-base tracking-wide text-zinc-900 dark:text-gray-200"
                  :class="{
                    photoInvalidColor:
                      isValidPhotoUrl === false && newPhoto && showEditPhoto,
                  }"
                >
                  {{
                    isValidPhotoUrl === false && newPhoto && showEditPhoto
                      ? "Apenas imagens PNG, JPEG e WebP são válidas."
                      : "Utilize uma URL de imagem válida.",
                  }}
                </span>
              </div>

              <button
                v-if="showEditPhoto"
                @click="updatePhoto"
                class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
              >
                Salvar
              </button>
            </div>
          </div>
          <!--ATUALIZAR NOME-->

          <div
            class="w-full p-6 border border-gray-200 dark:border-zinc-900 rounded-md transition-all bg-gray-200/20 dark:bg-zinc-900/20 flex flex-col"
          >
            <h1 class="text-xl max-sm:text-lg font-semibold">Editar nome</h1>
            <p
              class="text-base max-sm:text-sm text-zinc-900 dark:text-gray-200 my-3.5"
            >
              Por favor, edite aqui o seu novo nome de usuário.
            </p>
            <input
              type="text"
              name="Nome"
              placeholder="Novo nome"
              class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green truncate"
              :class="{ 'form-group--error': $v.newName.$error }"
              v-model="$v.newName.$model"
            />

            <div
              class="flex items-center justify-between pt-6 mt-6 border-x-0 border-b-0 border-t border-gray-200 dark:border-zinc-900 w-full"
            >
              <div>
                <h1
                  v-if="!$v.newName.$error"
                  class="text-base tracking-wide text-zinc-900 dark:text-gray-200"
                  :class="{ nameValid: user.displayName !== newName }"
                >
                  {{
                    user.displayName === newName
                      ? "Utilize no mínimo 3 caracteres e no máximo 50."
                      : "Nome válido."
                  }}
                </h1>

                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newName.required && $v.newName.$dirty"
                  >Campo obrigatório.</span
                >
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newName.maxLength && $v.newName.$dirty"
                  >Nome deve ter no máximo 50 caracteres.</span
                >
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newName.minLength && $v.newName.$dirty"
                  >Nome deve ter no mínimo 3 caracteres.</span
                >
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="user.displayName !== newName"
                  @click="cancelUpdate('name')"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 border border-red-600 px-3 py-2 text-sm font-bold text-N-light shadow-sm hover:bg-red-600/90 transition-all sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  @click="updateName"
                  class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>

          <!--ATUALIZAR EMAIL-->

          <div
            class="w-full p-6 border border-gray-200 dark:border-zinc-900 rounded-md transition-all bg-gray-200/20 dark:bg-zinc-900/20 flex flex-col"
          >
            <h1 class="text-xl max-sm:text-lg font-semibold">Editar e-mail</h1>
            <p
              class="text-base max-sm:text-sm text-zinc-900 dark:text-gray-200 my-3.5"
            >
              Por favor, edite aqui o seu novo email.
            </p>

            <div class="flex items-center gap-5">
              <input
                :disabled="disabledInputAndButton"
                type="text"
                name="Email"
                placeholder="Novo email"
                v-model="$v.newEmail.$model"
                class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green truncate"
                :class="{
                  'cursor-not-allowed': disabledInputAndButton == true,
                  'form-group--error': $v.newEmail.$error,
                  'opacity-50': disabledInputAndButton == true,
                }"
              />
              <Tooltip
                v-if="disabledInputAndButton == true"
                :text="tooltipEmail"
              />
            </div>

            <div
              class="flex items-center justify-between pt-6 mt-6 border-x-0 border-b-0 border-t border-gray-200 dark:border-zinc-900 w-full"
            >
              <div>
                <h1
                  v-if="!$v.newEmail.$error"
                  class="text-base tracking-wide text-zinc-900 dark:text-gray-200"
                  :class="{ emailValid: user.email !== newEmail }"
                >
                  {{
                    user.email === newEmail
                      ? "Para editar, utilize um e-mail válido."
                      : "Email válido."
                  }}
                </h1>
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newEmail.required && $v.newEmail.$dirty"
                  >Campo Obrigatorio</span
                >
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newEmail.email && $v.newEmail.$dirty"
                  >E-mail inválido</span
                >
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="user.email !== newEmail"
                  @click="cancelUpdate('email')"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 border border-red-600 px-3 py-2 text-sm font-bold text-N-light shadow-sm hover:bg-red-600/90 transition-all sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  @click="updateEmail"
                  :disabled="disabledInputAndButton"
                  class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
                  :class="{
                    'cursor-not-allowed': disabledInputAndButton == true,
                    'dark:opacity-50 opacity-75':
                      disabledInputAndButton == true,
                  }"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>

          <!--ATUALIZAR SENHA-->

          <div
            class="w-full p-6 border border-gray-200 dark:border-zinc-900 rounded-md transition-all bg-gray-200/20 dark:bg-zinc-900/20 flex flex-col"
          >
            <h1 class="text-xl max-sm:text-lg font-semibold">Editar Senha</h1>
            <p
              class="text-base max-sm:text-sm text-zinc-900 dark:text-gray-200 my-3.5"
            >
              Por favor, edite aqui a sua nova senha de acesso.
            </p>

            <div class="flex items-center gap-5">
              <input
                :disabled="disabledInputAndButton"
                type="password"
                name="Senha"
                placeholder="Nova senha"
                v-model="$v.newPassword.$model"
                class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green truncate"
                :class="{
                  'cursor-not-allowed': disabledInputAndButton == true,
                  'form-group--error': $v.newPassword.$error,
                  'opacity-50': disabledInputAndButton == true,
                }"
              />
              <Tooltip
                v-if="disabledInputAndButton == true"
                :text="tooltipPassword"
              />
            </div>
            <div
              class="flex items-center justify-between pt-6 mt-6 border-x-0 border-b-0 border-t border-gray-200 dark:border-zinc-900 w-full"
            >
              <div>
                <h1
                  v-if="!$v.newPassword.$error"
                  class="text-base tracking-wide text-zinc-900 dark:text-gray-200"
                >
                  Utilize uma senha forte e lembre-se sempre dela.
                </h1>
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newPassword.required && $v.newPassword.$dirty"
                  >Campo obrigatório.</span
                >
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newPassword.minLength && $v.newPassword.$dirty"
                  >A senha deve ter pelo menos 6 caracteres.</span
                >
                <span
                  class="text-base tracking-wide text-red-600"
                  v-if="!$v.newPassword.maxLength && $v.newPassword.$dirty"
                  >A senha deve ter no máximo 30 caracteres.</span
                >
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="newPassword !== ''"
                  @click="cancelUpdate('password')"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 border border-red-600 px-3 py-2 text-sm font-bold text-N-light shadow-sm hover:bg-red-600/90 transition-all sm:w-auto"
                >
                  Cancelar
                </button>
                <button
                  @click="updatePassword"
                  :disabled="disabledInputAndButton"
                  class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
                  :class="{
                    'cursor-not-allowed': disabledInputAndButton == true,
                    'dark:opacity-50 opacity-75':
                      disabledInputAndButton == true,
                  }"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>

          <!--DELETAR CONTA-->

          <div
            class="w-full border bg-transparent dark:bg-red-900/10 border-red-300 dark:border-red-600 rounded-md transition-all flex flex-col"
          >
            <h1 class="text-xl max-sm:text-lg font-semibold pt-6 px-6">
              Deletar conta
            </h1>
            <p
              class="text-base max-sm:text-sm text-zinc-900 px-6 dark:text-gray-200 my-3.5"
            >
              Tem certeza disso? Essa ação resultará na exclusão permanente da
              sua conta.
            </p>

            <div
              class="flex items-center justify-between pt-3 mt-6 border-x-0 border-b-0 border-t border-red-300 dark:border-red-600 w-full bg-red-400/10 dark:bg-red-800/30"
            >
              <div class="px-6 pb-3 flex items-end justify-end w-full">
                <button
                  @click="deactivateOpenModal"
                  class="inline-flex w-full justify-center rounded-md bg-red-600 border border-red-600 px-3 py-2 text-sm font-bold text-N-light shadow-sm hover:bg-red-600/90 transition-all sm:w-auto float-right"
                >
                  Deletar minha conta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <ModalDeleteUser
      v-show="viewModal"
      titleModal="Desativar conta"
      :descModal="descModal"
      textConfirmModal="Desativar"
      :clickConfirmModal="deactivateAccount"
      :clickCancelModal="cancel"
    />
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapState } from "vuex";
import {
  required,
  email,
  maxLength,
  minLength,
} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      viewModal: false,
      descModal:
        "Tem certeza de que deseja desativar sua conta? Todos os seus dados serão removidos permanentemente. Essa ação não pode ser desfeita.",

      newPhoto: "",
      newName: "",
      newEmail: "",
      newPassword: "",

      disabledInputAndButton: false,

      username: "",

      user: "",

      iconErrorAlert: require("~/assets/img/icons/iconError.svg"),
      iconCheckAlert: require("~/assets/img/icons/iconCheck.svg"),
      iconAttentionAlert: require("~/assets/img/icons/iconAttention.svg"),

      tooltipEmail: "",
      tooltipPassword: "",

      showEditPhoto: false,
      isValidPhotoUrl: false,

      verificNewName: true,
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

    //capturar a primeira letra do nome do usuario para imagem
    firstLetter() {
      return this.user.displayName.charAt(0).toLocaleUpperCase();
    },
  },

  watch: {
    newPhoto(newValue) {
      if (this.showEditPhoto === true) {
        console.log("e", newValue);
        var url = this.newPhoto;

        // verifica se a existe url
        if (url) {
          // verifica se a url começa com "https://"
          if (url.startsWith("https://")) {
            // verifica os tipos da imagem4
            if (url.includes(".png")) {
              this.isValidPhotoUrl = true;
            } else if (url.includes(".webp")) {
              this.isValidPhotoUrl = true;
            } else if (url.includes("avatars.")) {
              this.isValidPhotoUrl = true;
            } else if (url.includes(".googleusercontent")) {
              this.isValidPhotoUrl = true;
            } else if (url.includes(".jpg") || url.includes(".jpeg")) {
              this.isValidPhotoUrl = true;
            } else {
              this.isValidPhotoUrl = false;
            }
          } else {
            this.isValidPhotoUrl = false;
          }
        } else {
          this.isValidPhotoUrl = false;
        }
      }
    },
  },

  mounted() {
    firebase.auth().onAuthStateChanged((userInfos) => {
      if (userInfos) {
        this.user = userInfos;
        this.newName = userInfos.displayName;
        this.newEmail = userInfos.email;
        this.newPhoto = userInfos.photoURL;
      } else {
        this.$router.push({ path: "/auth/login" });
      }
      this.$store.commit("SET_LOADING", false);

      if (userInfos) {
        const providerId = userInfos.providerData[0].providerId;

        if (providerId === "github.com" || providerId === "google.com") {
          this.disabledInputAndButton = true;
        }

        if (providerId === "github.com") {
          this.tooltipEmail = `Não é possível editar, você esta, autenticado com o Github`;
          this.tooltipPassword = `Não é possível editar, você esta, autenticado com o Github`;
        } else if (providerId === "google.com") {
          this.tooltipEmail = `Não é possível editar, você esta, autenticado com o Google`;
          this.tooltipPassword = `Não é possível editar, você esta, autenticado com o Google`;
        } else {
          this.tooltipEmail = "";
          this.tooltipPassword = "";
        }
      }
    });
  },

  methods: {
    deactivateOpenModal() {
      setTimeout(() => {
        this.viewModal = true;
      }, 200);
    },
    cancel() {
      this.viewModal = false;
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
    cancelUpdate(update) {
      if (update === "name") {
        this.newName = this.user.displayName;
      } else if (update === "email") {
        this.newEmail = this.user.email;
      } else {
        this.newPassword = "";
      }
    },
    openEditPhoto() {
      this.showEditPhoto = true;
      if (this.newPhoto) {
        this.isValidPhotoUrl = true;
        console.log(this.newPhoto);
      }
    },

    async updatePhoto() {
      this.$store.commit("SET_LOADING", true);
      try {
        const user = firebase.auth().currentUser;

        if (user !== null && user !== undefined) {
          if (this.isValidPhotoUrl === true || this.newPhoto == "") {
            await user.updateProfile({
              photoURL: this.newPhoto,
            });
            this.showEditPhoto = false;
            this.$store.commit("SET_LOADING", false);
            this.$alert("Foto atualizada com sucesso!", this.iconCheckAlert);
          } else {
            this.$store.commit("SET_LOADING", false);
            this.$alert(
              "Para editar, utilize uma URL válida!",
              this.iconAttentionAlert
            );
          }
        } else {
          this.$store.commit("SET_LOADING", false);
          this.$alert(
            "Não foi possível atualizar sua foto!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
        this.$alert(
          "Não foi possível atualizar sua foto!",
          this.iconErrorAlert
        );
      }
    },

    async updateName() {
      this.$v.newName.$touch();

      if (this.$v.newName.$invalid) {
        return;
      }
      this.$store.commit("SET_LOADING", true);
      try {
        const user = firebase.auth().currentUser;

        if (user !== null && user !== undefined) {
          if (user.displayName !== this.newName) {
            await user.updateProfile({
              displayName: this.newName,
            });
            this.$store.commit("SET_LOADING", false);

            this.$alert("Nome atualizado com sucesso!", this.iconCheckAlert);
          } else {
            this.$store.commit("SET_LOADING", false);
            this.$alert(
              "Para editar, utilize um nome diferente do atual.",
              this.iconAttentionAlert
            );
          }
        } else {
          this.$store.commit("SET_LOADING", false);
          this.$alert(
            "Não foi possível atualizar o nome!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
        this.$alert("Não foi possível atualizar o nome!", this.iconErrorAlert);
      }
    },

    async updateEmail() {
      this.$v.newEmail.$touch();

      if (this.$v.newEmail.$invalid) {
        return;
      }
      this.$store.commit("SET_LOADING", true);

      try {
        const user = firebase.auth().currentUser;

        if (
          user &&
          user.providerData[0].providerId !== "google.com" &&
          user.providerData[0].providerId !== "github.com"
        ) {
          if (this.newEmail !== user.email) {
            await user.updateEmail(this.newEmail);
            this.$store.commit("SET_LOADING", false);
            this.$alert("E-mail atualizado com sucesso!", this.iconCheckAlert);
          } else {
            this.$store.commit("SET_LOADING", false);
            this.$alert(
              "Por favor, utilize um e-mail diferente do atual.",
              this.iconAttentionAlert
            );
          }
        } else {
          this.$store.commit("SET_LOADING", false);
          this.$alert(
            "Não foi possível atualizar o e-mail!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
        this.$alert(
          "Algo deu errado. Tente outro e-mail ou volte mais tarde.",
          this.iconErrorAlert
        );
      }
    },

    async updatePassword() {
      this.$v.newPassword.$touch();

      if (this.$v.newPassword.$invalid) {
        return;
      }
      this.$store.commit("SET_LOADING", true);

      try {
        const user = firebase.auth().currentUser;

        if (
          user &&
          user.providerData[0].providerId !== "google.com" &&
          user.providerData[0].providerId !== "github.com"
        ) {
          await user.updatePassword(this.newPassword);

          this.newPassword = "";
          this.$v.newPassword.$reset();

          this.$store.commit("SET_LOADING", false);
          this.$alert("Senha atualizada com sucesso!", this.iconCheckAlert);
        } else {
          this.$store.commit("SET_LOADING", false);
          this.$alert(
            "Não foi possível atualizar a senha!",
            this.iconErrorAlert
          );
        }
      } catch (error) {
        this.$store.commit("SET_LOADING", false);
        this.$alert("Não foi possível atualizar a senha!", this.iconErrorAlert);
      }
    },
  },
};
</script>

<style scoped>
.form-group--error,
.invalidPhoto {
  border: 1px #dc2626 solid !important;
}
.photoInvalidColor {
  color: #dc2626;
}
.nameValid,
.emailValid {
  color: #00dc82;
}
</style>
