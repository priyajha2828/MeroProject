import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const THEME_KEY = "app_theme";

// Background colors
const BG_LIGHT = "#ffffff";
const BG_DARK = "#000000";
const BG_CLASSIC = "#f8fafc";

// Detect system theme
const systemPrefersDark = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || "system";
    } catch {
      return "system";
    }
  });

  // Helper to set a small <style id="app-theme-bg"> that enforces body/background color with !important
  const applyBodyBgStyle = (color) => {
    if (typeof document === "undefined") return;
    const id = "app-theme-bg";
    let el = document.getElementById(id);
    const css = `body { background-color: ${color} !important; color: ${color === "${BG_DARK}" ? "#fff" : "#111827"}; }`;
    // create/update element
    if (!el) {
      el = document.createElement("style");
      el.id = id;
      document.head.appendChild(el);
    }
    // set css (we don't rely on template literal color variable above, supply actual color)
    el.textContent = `body { background-color: ${color} !important; }`;
  };

  useEffect(() => {
    if (typeof document === "undefined") return;

    const html = document.documentElement;
    const body = document.body;

    // persist preference
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
    }

    // compute effective theme (handle 'system')
    const effectiveTheme =
      theme === "system" ? (systemPrefersDark() ? "dark" : "light") : theme;

    // toggle tailwind dark class
    if (effectiveTheme === "dark") html.classList.add("dark");
    else html.classList.remove("dark");

    // Set body background (and also use injected style to make it robust)
    if (effectiveTheme === "dark") {
      // set inline color too (fallback)
      body.style.backgroundColor = BG_DARK;
      body.style.color = "#ffffff";
      applyBodyBgStyle(BG_DARK);
    } else if (effectiveTheme === "light") {
      body.style.backgroundColor = BG_LIGHT;
      body.style.color = "#111827";
      applyBodyBgStyle(BG_LIGHT);
    } else if (effectiveTheme === "classic") {
      body.style.backgroundColor = BG_CLASSIC;
      body.style.color = "#111827";
      applyBodyBgStyle(BG_CLASSIC);
    }

    // React to system changes if theme === 'system'
    let mq;
    const handleSystemChange = (e) => {
      if (theme !== "system") return;
      const newEff = e.matches ? "dark" : "light";
      if (newEff === "dark") {
        html.classList.add("dark");
        body.style.backgroundColor = BG_DARK;
        body.style.color = "#fff";
        applyBodyBgStyle(BG_DARK);
      } else {
        html.classList.remove("dark");
        body.style.backgroundColor = BG_LIGHT;
        body.style.color = "#111827";
        applyBodyBgStyle(BG_LIGHT);
      }
    };

    if (window.matchMedia) {
      mq = window.matchMedia("(prefers-color-scheme: dark)");
      // modern API
      if (mq.addEventListener) mq.addEventListener("change", handleSystemChange);
      else if (mq.addListener) mq.addListener(handleSystemChange); // fallback
    }

    return () => {
      // cleanup listener
      if (mq) {
        if (mq.removeEventListener) mq.removeEventListener("change", handleSystemChange);
        else if (mq.removeListener) mq.removeListener(handleSystemChange);
      }
    };
  }, [theme]);

  // debug helper (optional) — uncomment to log theme changes in console
  // useEffect(() => console.log("theme changed to", theme), [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
