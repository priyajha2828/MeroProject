import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove("dark", "classic-theme");

    if (theme === "dark") html.classList.add("dark");
    if (theme === "classic") html.classList.add("classic-theme");

  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
