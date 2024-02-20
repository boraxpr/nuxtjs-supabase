// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  debug: true,
  modules: [
    "nuxt-primevue",
    "@nuxtjs/supabase",
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
  ],
  css: [
    "primeicons/primeicons.css",
    "primevue/resources/themes/aura-light-amber/theme.css",
    // "@/assets/css/themes/aura/aura-light/orange/theme.scss",
    "@/assets/css/tailwind.css",
  ],
  // https://primevue.org/theming/
  primevue: {
    usePrimeVue: true,
    cssLayerOrder: "tailwind-base, primevue,tailwind-utilities",
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
      exclude: ["/signup", "/testing", "/testing"],
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
