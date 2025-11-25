// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brandBlue: "#072255",
      },
    },
  },
  safelist: [
    // in case you dynamically generate classes elsewhere
    "bg-brandBlue",
    "text-brandBlue",
  ],
  plugins: [],
};
