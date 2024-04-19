/** @type {import('tailwindcss').Config} */
module.exports = {
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
        }
      }
    },
  },
  plugins: [],
}