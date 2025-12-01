// src/theme.jsx
import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "system",
  setTheme: () => {},
});

const THEME_KEY = "app_theme";

// Background colors used as robust fallback
const BG_LIGHT = "#ffffff";
const BG_DARK = "#0b1220"; // near-black so dark mode is visible
const BG_CLASSIC = "#f8fafc";

const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "system";
    } catch {
      return "system";
    }
  });

  // ensure a style tag exists to force body background if needed
  const applyBodyBgStyle = (color, textColor = "#111827") => {
    if (typeof document === "undefined") return;
    const id = "app-theme-bg";
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    el.textContent = `body { background-color: ${color} !important; color: ${textColor} !important; }`;
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    // persist
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {}

    // compute effective theme
    const effectiveTheme = theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;

    // toggle html.dark for Tailwind dark: variants
    if (effectiveTheme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");

    // apply body fallback background color so the change is visible
    if (effectiveTheme === "dark") {
      body.style.backgroundColor = BG_DARK;
      body.style.color = "#ffffff";
      applyBodyBgStyle(BG_DARK, "#ffffff");
    } else if (effectiveTheme === "classic") {
      body.style.backgroundColor = BG_CLASSIC;
      body.style.color = "#111827";
      applyBodyBgStyle(BG_CLASSIC, "#111827");
    } else {
      body.style.backgroundColor = BG_LIGHT;
      body.style.color = "#111827";
      applyBodyBgStyle(BG_LIGHT, "#111827");
    }

    // listen to system changes when theme === 'system'
    let mq;
    const handleSystemChange = (e) => {
      if (theme !== "system") return;
      const newEff = e.matches ? "dark" : "light";
      if (newEff === "dark") {
        html.classList.add("dark");
        body.style.backgroundColor = BG_DARK;
        body.style.color = "#ffffff";
        applyBodyBgStyle(BG_DARK, "#ffffff");
      } else {
        html.classList.remove("dark");
        body.style.backgroundColor = BG_LIGHT;
        body.style.color = "#111827";
        applyBodyBgStyle(BG_LIGHT, "#111827");
      }
    };

    if (window.matchMedia) {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      if (mq.addEventListener) mq.addEventListener("change", handleSystemChange);
      else if (mq.addListener) mq.addListener(handleSystemChange);
    }

    return () => {
      if (mq) {
        if (mq.removeEventListener) mq.removeEventListener("change", handleSystemChange);
        else if (mq.removeListener) mq.removeListener(handleSystemChange);
      }
    };
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}
