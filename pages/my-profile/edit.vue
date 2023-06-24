<template>
  <Loading v-if="loading" />

  <div v-else class="w-screen">
    <section class="container w-full m-auto">
      <header
        class="border-2 border-x-0 border-t-0 pb-10 border-gray-200 dark:border-zinc-900"
      >
        <h1 class="text-xl font-semibold">Editar perfil</h1>
        <p class="tracking-wide leading-7 text-zinc-900 dark:text-gray-200 w-3/5">
          Edite os dados do seu perfil abaixo. Se você estiver conectado ao GitHub e ao
          Google, só poderá alterar seu nome.
        </p>
      </header>

      <div class="mt-10 flex justify-between items-start">
        <div
          class="flex flex-col gap-9 border-2 border-y-0 border-r-0 border-green-200 dark:border-zinc-900"
        >
          <!--ATUALIZAR NOME-->

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
          >
            <h1 class="text-xl text-N-green font-semibold">Nome</h1>
            <div class="flex flex-col gap-3 ml-2">
              <div class="flex items-center mt-4">
                <label
                  for="Novo nome"
                  class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
                >
                  <input
                    type="text"
                    name="Nome"
                    placeholder="Novo nome"
                    v-model="$v.newName.$model"
                    class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none"
                  />
                  <span
                    class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                  >
                    Novo nome
                  </span>
                </label>
                <button
                  @click="updateName"
                  class="bg-N-green hover:bg-N-green/90 transition-all rounded-sm rounded-l-none py-2.5 px-4 h-14 -ml-1 z-50"
                >
                  <img src="@/assets/img/icons/iconSave.svg" alt="Icon Save" />
                </button>
              </div>
              <span
                class="text-xs tracking-wide text-red-600"
                v-if="!$v.newName.required && $v.newName.$dirty"
                >Campo obrigatório.</span
              >
              <span
                class="text-xs tracking-wide text-red-600"
                v-if="!$v.newName.maxLength && $v.newName.$dirty"
                >Nome deve ter no máximo 50 caracteres.</span
              >
              <span
                class="text-xs tracking-wide text-red-600"
                v-if="!$v.newName.minLength && $v.newName.$dirty"
                >Nome deve ter pelo menos 3 caracteres.</span
              >
            </div>
          </div>

          <!--ATUALIZAR EMAIL-->

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
            :class="{ 'opacity-50': disabledInputAndButton == true }"
          >
            <h1 class="text-xl text-N-green font-semibold">Email</h1>

            <div class="flex flex-col gap-3 ml-2">
              <div class="flex items-center mt-4">
                <label
                  for="Novo email"
                  class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
                  :class="{ 'cursor-not-allowed': disabledInputAndButton == true }"
                >
                  <input
                    :disabled="disabledInputAndButton"
                    type="text"
                    name="Email"
                    placeholder="Novo email"
                    v-model="$v.newEmail.$model"
                    class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none disabled:cursor-not-allowed"
                  />
                  <span
                    class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                  >
                    Novo email
                  </span>
                </label>

                <button
                  :disabled="disabledInputAndButton"
                  @click="updateEmail()"
                  class="disabled:cursor-not-allowed bg-N-green hover:bg-N-green/90 transition-all rounded-sm rounded-l-none py-2.5 px-4 h-14 -ml-1 z-50"
                >
                  <img src="@/assets/img/icons/iconSave.svg" alt="Icon Save" />
                </button>
              </div>
              <div>
                <span
                  class="text-xs tracking-wide text-red-600"
                  v-if="!$v.newEmail.required && $v.newEmail.$dirty"
                  >Campo Obrigatorio</span
                >
                <span
                  class="text-xs tracking-wide text-red-600"
                  v-if="!$v.newEmail.email && $v.newEmail.$dirty"
                  >E-mail inválido</span
                >
              </div>
            </div>
          </div>

          <!--ATUALIZAR SENHA-->

          <div
            class="flex flex-col border-2 -ml-0.5 border-y-0 border-r-0 pl-3 border-N-green"
            :class="{ 'opacity-50': disabledInputAndButton == true }"
          >
            <h1 class="text-xl text-N-green font-semibold">Senha</h1>

            <div class="flex flex-col gap-3 ml-2">
              <div class="flex items-center mt-4">
                <label
                  for="Nova senha"
                  class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
                  :class="{ 'cursor-not-allowed': disabledInputAndButton == true }"
                >
                  <input
                    :disabled="disabledInputAndButton"
                    type="password"
                    name="Senha"
                    placeholder="Nova senha"
                    v-model="$v.newPassword.$model"
                    class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none disabled:cursor-not-allowed"
                  />
                  <span
                    class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                  >
                    Nova senha
                  </span>
                </label>
                <button
                  :disabled="disabledInputAndButton"
                  @click="updatePassword()"
                  class="disabled:cursor-not-allowed bg-N-green hover:bg-N-green/90 transition-all rounded-sm rounded-l-none py-2.5 px-4 h-14 -ml-1 z-50"
                >
                  <img src="@/assets/img/icons/iconSave.svg" alt="Icon Save" />
                </button>
              </div>
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
        </div>
        <div>
          <img
            v-if="user.photoURL"
            :src="user.photoURL"
            :alt="'Imagem de perfil do usuário: ' + user.displayName"
            :title="user.displayName"
            class="w-36 h-36 rounded-lg"
          />
          <div
            v-else
            class="grid w-36 h-36 place-content-center rounded-lg bg-gray-100 dark:bg-zinc-900"
            :title="user.displayName"
          >
            <h1 class="text-4xl text-gray-600 dark:text-gray-200">{{ firstLetter }}</h1>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import firebase from "~/plugins/firebase";
import { mapState } from "vuex";
import { required, email, maxLength, minLength } from "vuelidate/lib/validators";

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
      }
    });
  },

  methods: {
    async updateName() {
      this.$v.newName.$touch();

      if (this.$v.newName.$invalid) {
        return;
      }
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
          this.$alert("Não foi possível atualizar o nome!", this.iconErrorAlert);
        }
      } catch (error) {
        this.$alert("Não foi possível atualizar o nome!", this.iconErrorAlert);
      }
    },

    async updateEmail() {
      this.$v.newEmail.$touch();

      if (this.$v.newEmail.$invalid) {
        return;
      }
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
          this.$alert("Não foi possível atualizar o e-mail!", this.iconErrorAlert);
        }
      } catch (error) {
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
          this.$alert("Não foi possível atualizar a senha!", this.iconErrorAlert);
        }
      } catch (error) {
        this.$alert("Não foi possível atualizar a senha!", this.iconErrorAlert);
      }
    },
  },
};
</script>
