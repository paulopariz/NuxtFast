<template>
  <div class="relative z-20">
    <div
      id="BG-EDIT"
      class="fixed inset-0 bg-gray-600 dark:bg-zinc-900/40 bg-opacity-75 backdrop-blur-sm transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-N-light dark:bg-N-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:mx-10"
          id="Modal-Edit"
        >
          <div class="bg-N-light dark:bg-N-dark px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-sky-900/30 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="#66bef5"
                  viewBox="0 0 256 256"
                >
                  <path
                    d="M230.15,70.54,185.46,25.86a20,20,0,0,0-28.28,0L33.86,149.17A19.86,19.86,0,0,0,28,163.31V208a20,20,0,0,0,20,20H216a12,12,0,0,0,0-24H125L230.15,98.83A20,20,0,0,0,230.15,70.54ZM91,204H52V165l84-84,39,39ZM192,103,153,64l18.34-18.34,39,39Z"
                  ></path>
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3
                  class="text-base font-semibold leading-6 text-zinc-900 dark:text-gray-200"
                >
                  {{ titleModal }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-zinc-800 dark:text-gray-400">
                    Edite os dados do seu perfil abaixo. Se você estiver
                    conectado ao GitHub e ao Google, só poderá alterar seu nome.
                  </p>
                </div>
              </div>
            </div>
            <div class="w-full grid grid-cols-2 gap-5 mt-14 mb-14">
              <label
                for="Novo nome"
                class="relative w-full block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
              >
                <input
                  type="text"
                  name="Nome"
                  placeholder="Novo nome"
                  class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none max-sm:text-sm"
                />
                <span
                  class="absolute ml-4 text-N-dark dark:text-gray-200 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                >
                  Novo nome
                </span>
              </label>

              <label
                for="Novo email"
                class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
                :class="{
                  'cursor-not-allowed': disabledInputAndButton == true,
                }"
              >
                <input
                  :disabled="disabledInputAndButton"
                  type="text"
                  name="Email"
                  placeholder="Novo email"
                  class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none disabled:cursor-not-allowed max-sm:text-sm"
                />
                <span
                  class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                >
                  Novo email
                </span>
              </label>

              <label
                for="Nova senha"
                class="relative block border rounded-sm border-gray-200 dark:border-zinc-900 bg-transparent py-2.5 transition-all focus-within:border-N-green dark:focus-within:border-N-green h-14"
                :class="{
                  'cursor-not-allowed': disabledInputAndButton == true,
                }"
              >
                <input
                  :disabled="disabledInputAndButton"
                  type="password"
                  name="Senha"
                  placeholder="Nova senha"
                  class="peer h-8 w-full transition-all border-none bg-transparent px-4 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 outline-none disabled:cursor-not-allowed max-sm:text-sm"
                />
                <span
                  class="absolute ml-4 bg-N-light start-0 px-1 -top-0.5 -translate-y-1/2 text-base transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-focus:-top-0.5 dark:bg-N-dark"
                >
                  Nova senha
                </span>
              </label>
            </div>
          </div>

          <div class="px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="clickConfirmModal"
              type="button"
              class="inline-flex w-full justify-center rounded-sm bg-N-green/20 border border-N-green px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-N-green/30 transition-all sm:ml-3 sm:w-auto"
            >
              {{ textConfirmModal }}
            </button>
            <button
              @click="clickCancelModal"
              type="button"
              class="mt-3 inline-flex w-full justify-center rounded-sm bg-N-light dark:bg-N-dark px-3 py-2 text-sm font-semibold text-zinc-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-zinc-900 hover:bg-gray-50 transition-all sm:mt-0 sm:w-auto"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModalEditUser",

  props: [
    "titleModal",
    "descModal",
    "clickConfirmModal",
    "textConfirmModal",
    "clickCancelModal",
  ],
};
</script>

<style scoped>
#BG-EDIT {
  animation: BG-EDIT 0.3s;
  transition: all 0.5s;
}
@keyframes BG-EDIT {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#Modal-Edit {
  animation: Modal-Edit 0.3s;
  transition: all 0.5s;
}

@keyframes Modal-Edit {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
