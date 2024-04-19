// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: [
    '~/assets/css/main.css', 
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      charset: 'utf-8',
      link: [
        {rel: 'stylesheet', href: 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css', integrity: "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=", crossorigin: ""},
        {rel: 'stylesheet', href: 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.Default.css'},
        {rel: 'stylesheet', href: 'https://unpkg.com/leaflet.markercluster@1.4.1/dist/MarkerCluster.css'},
      ],
      script: [
        {src: "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js", integrity: "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=", crossorigin: ""},
        {src: "https://unpkg.com/leaflet.markercluster@1.4.1/dist/leaflet.markercluster.js"}
      ]
    }
  }
})