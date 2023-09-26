/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      gelasio: ["Gelasio", "serif"],
      cookie: ["Cookie", "cursive"],
      inpiration: ["Inpiration", "cursive"],
      courgette: ["Courgette", "cursive"],
      pacifico: ["Pacifico", "cursive"],
    },
  },
  plugins: [],
};
