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
        primary: "var(--primary-500)",
        bg: "var(--bg-default)",
        surface: "var(--surface-100)",
        text: "var(--text-default)",
        "text-alt": "var(--text-default-alt)",

        brand: {
          DEFAULT: "#172554",
          dark: "#111A31",
        },
      },

      borderColor: {
        DEFAULT: "var(--text-default)",
      },

      transitionProperty: {
        theme: "background-color, color, border-color",
      },
    },
  },

  plugins: [],
};
