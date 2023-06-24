import Vue from "vue";

const alert = {
  install(Vue) {
    Vue.prototype.$alert = (message, icon) => {
      if (process.client) {
        const elementAlert = document.createElement("div");
        elementAlert.className =
          "px-8 py-2.5 flex gap-6 items-center justify-center rounded-md bg-zinc-900 border border-zinc-800 shadow-xl fixed top-5 right-5 z-50";

        const elementIcon = document.createElement("img");
        elementIcon.src = icon;
        elementIcon.className = "w-6";
        elementAlert.appendChild(elementIcon);

        const messageELement = document.createElement("span");
        messageELement.textContent = message;
        messageELement.className = "tracking-wide text-N-light";
        elementAlert.appendChild(messageELement);

        document.body.appendChild(elementAlert);

        setTimeout(() => {
          document.body.removeChild(elementAlert);
        }, 3000);
      }
    };
  },
};

Vue.use(alert);
