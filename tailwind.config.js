/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    fontFamily: {
      logo: ["logo"],
      time: ["time"],
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
