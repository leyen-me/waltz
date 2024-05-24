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
      "silka-regular": ["silka-regular"],
      "silka-medium": ["silka-medium"],
    },
    extend: {},
  },
};
