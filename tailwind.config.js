/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        white: '#eee',
        blue: {
          'base':'#336699',
          'light':'#86bbd8',
        },
        green: {
          'dark':'#0F3A08',
          'base':'#5AAB4E',
          'light':'#daf7dc',
        },
        slate: {
          'base':'#0f172a',
          'light':'#1e293b',
        },
      },
    },
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': {
            maxWidth: '640px',
          },
          '@screen md': {
            maxWidth: '550px',
          },
          '@screen lg': {
            maxWidth: '720px',
          },
          '@screen xl': {
            maxWidth: '980px',
          },
        }
      })
    }
  ]
}