// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  // IMPORTANT: enable class strategy so adding `dark` class on <html> toggles dark styles
  darkMode: "class",
  theme: {
    extend: {
      // optional: add brand color so you can use `bg-brand` etc.
      colors: {
        brand: {
          DEFAULT: "#172554",
          dark: "#111A31",
        },
      },
    },
  },
  plugins: [],
};
