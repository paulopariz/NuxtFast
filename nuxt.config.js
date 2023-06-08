export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Overview-Nuxt.js",
    htmlAttrs: {
      lang: "pt-br",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "O Nuxt.js é um framework de aplicativo web baseado no Vue.js. Ele fornece uma estrutura de desenvolvimento para criar aplicativos web universais (universal apps) e renderização do lado do servidor (server-side rendering - SSR). O Nuxt.js simplifica o desenvolvimento ao fornecer configuração pré-definida para roteamento, gerenciamento de estado, geração de páginas estáticas e muito mais, permitindo que os desenvolvedores se concentrem no desenvolvimento de recursos e na lógica de negócios",
      },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  loading: {
    color: "#059669",
    height: "4px",
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/css/tailwind.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // ...outros plugins
    "~/plugins/firebase.js",
    "~/plugins/vuelidate.js",
  ],

  router: {
    middleware: "spinner",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    "@nuxtjs/tailwindcss",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
