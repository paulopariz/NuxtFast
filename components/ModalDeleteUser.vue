<template>
  <div class="relative z-20">
    <div
      class="fixed inset-0 bg-gray-600 dark:bg-zinc-900/40 bg-opacity-75 backdrop-blur-sm transition-opacity"
    ></div>

    <div class="fixed inset-0 z-10 overflow-y-auto">
      <div
        class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg bg-N-light dark:bg-N-dark text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="bg-N-light dark:bg-N-dark px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 dark:bg-red-800/30 sm:mx-0 sm:h-10 sm:w-10"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
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
                    {{ descModal }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-5 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="clickConfirmModal"
              type="button"
              class="inline-flex w-full justify-center rounded-sm bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600/90 transition-all sm:ml-3 sm:w-auto"
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
  name: "ModalDeleteUser",

  props: [
    "titleModal",
    "descModal",
    "clickConfirmModal",
    "textConfirmModal",
    "clickCancelModal",
  ],
};
</script>
