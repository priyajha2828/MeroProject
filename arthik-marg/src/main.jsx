// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import ThemeProvider from "./theme.jsx";   // ⬅ import your theme provider

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>     {/* ⬅ wrap entire app */}
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);
