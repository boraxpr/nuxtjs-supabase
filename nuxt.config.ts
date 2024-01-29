import component from "./.nuxt/types/vue-shim";
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-primevue", "@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
  css: [
    "@/assets/css/tailwind.css",
    "primeicons/primeicons.css",
    // "primevue/resources/themes/saga-orange/theme.css",
    "@/assets/css/themes/mytheme/theme.scss",
  ],
  // https://primevue.org/theming/
  primevue: {
    usePrimevue: true,
    cssLayerOrder: "tailwind-base, tailwind-utilities, primevue",
    options: {
      unstyled: false,
      ripple: true,
      inputStyle: "filled",
    },
    components: {
      include: "*",
    },
    // importPT: { as: "Lara", from: "/assets/presets/lara" },
  },
  supabase: {
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/signup"],
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
  },
  runtimeConfig: {
    public: {
      api_key: process.env.SUPABASE_KEY,
      url: process.env.SUPABASE_URL,
    },
  },
});
