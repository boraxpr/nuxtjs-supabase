// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["nuxt-primevue", "@nuxtjs/supabase", "@nuxtjs/tailwindcss"],
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
