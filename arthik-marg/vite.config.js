// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";   // ← using SWC instead of Babel
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),       // SWC handles JSX and transforms — NO BABEL AT ALL
    tailwindcss(), // your Tailwind v4 plugin
  ],
  server: {
    hmr: { overlay: true },
  },
});
