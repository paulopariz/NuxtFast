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
              class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green"
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
                >
                  Utilize no mínimo 3 caracteres e no máximo 50.
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

              <button
                @click="updateName"
                class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
              >
                Salvar
              </button>
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
                class="form-group w-80 bg-N-light dark:bg-N-dark p-3 border rounded-md border-gray-200 dark:border-zinc-900 dark:hover:border-N-green dark:focus:border-N-green transition-all outline-none hover:border-N-green focus:border-N-green"
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
                >
                  Para editar, utilize um e-mail válido.
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

              <button
                @click="updateEmail"
                :disabled="disabledInputAndButton"
                class="inline-flex w-full justify-center rounded-md bg-N-dark dark:bg-N-light border border-N-dark dark:border-N-light px-3 py-2 text-sm font-bold text-N-light dark:text-N-dark shadow-sm hover:bg-N-dark/95 dark:hover:bg-N-light/95 transition-all sm:w-auto"
                :class="{
                  'cursor-not-allowed': disabledInputAndButton == true,
                  'opacity-50': disabledInputAndButton == true,
                }"
              >
                Salvar
              </button>
            </div>
          </div>

          <!--ATUALIZAR SENHA-->

          <div
            class="flex flex-col pl-3"
            :class="{ 'opacity-50': disabledInputAndButton == true }"
          >
            <h1 class="text-xl max-sm:text-lg text-N-green font-semibold">
              Senha
            </h1>

            <input
              :disabled="disabledInputAndButton"
              type="password"
              name="Senha"
              placeholder="Nova senha"
              v-model="$v.newPassword.$model"
              :class="{
                'cursor-not-allowed': disabledInputAndButton == true,
              }"
            />
            <button
              :disabled="disabledInputAndButton"
              @click="updatePassword()"
            >
              <img src="@/assets/img/icons/iconSave.svg" alt="Icon Save" />
            </button>
            <span
              class="text-xs tracking-wide text-red-600"
              v-if="!$v.newPassword.required && $v.newPassword.$dirty"
              >Campo obrigatório.</span
            >
            <span
              class="text-xs tracking-wide text-red-600"
              v-if="!$v.newPassword.minLength && $v.newPassword.$dirty"
              >A senha deve ter pelo menos 6 caracteres.</span
            >
            <span
              class="text-xs tracking-wide text-red-600"
              v-if="!$v.newPassword.maxLength && $v.newPassword.$dirty"
              >A senha deve ter no máximo 30 caracteres.</span
            >
          </div>
        </div>
        <!-- <div>
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="'Imagem de perfil do usuário: ' + user.displayName"
            :title="user.displayName"
            class="w-36 h-36 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 rounded-lg"
          />
          <div
            v-else
            class="grid w-36 h-36 max-md:w-28 max-md:h-28 max-sm:w-24 max-sm:h-24 place-content-center rounded-lg bg-gray-100 dark:bg-zinc-900"
            :title="user.displayName"
          >
            <h1 class="text-4xl text-gray-600 dark:text-gray-200">
              {{ firstLetter }}
            </h1>
          </div>
        </div> -->
      </div>
    </section>
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

  mounted() {
    firebase.auth().onAuthStateChanged((userInfos) => {
      if (userInfos) {
        this.user = userInfos;
        this.newName = userInfos.displayName;
        this.newEmail = userInfos.email;
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
        } else if (providerId === "google.com") {
          this.tooltipEmail = `Não é possível editar, você esta, autenticado com o Google`;
        } else {
          this.tooltipEmail = "";
        }
      }
    });
  },

  methods: {
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

<style scoped>
.form-group--error {
  border: 1px #dc2626 solid !important;
}
</style>
