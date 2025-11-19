import { useState, useEffect } from "react";
import { Search, Bell, Keyboard, Sun, Moon, Laptop } from "lucide-react";

export default function Topbar() {
  const [theme, setTheme] = useState("system");
  const [showNotifications, setShowNotifications] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  // Apply theme function
  const applyTheme = (theme) => {
    const html = document.documentElement;
    html.classList.remove("dark", "classic-theme");

    if (theme === "dark") html.classList.add("dark");
    else if (theme === "classic") html.classList.add("classic-theme");
    else if (theme === "system") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        html.classList.add("dark");
      }
    }
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const getThemeIcon = () => {
    switch (theme) {
      case "light":
        return <Sun size={20} />;
      case "dark":
        return <Moon size={20} />;
      case "classic":
      case "system":
        return <Laptop size={20} />;
      default:
        return <Sun size={20} />;
    }
  };

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b bg-white dark:bg-gray-900 transition-colors duration-300">

      {/* LEFT EMPTY SPACE (for perfect centering) */}
      <div className="w-1/4"></div>

      {/* CENTERED SEARCH BAR */}
      <div className="w-1/2 flex justify-center">
        <div className="relative w-full max-w-xl">
          <input
            className="pl-10 pr-4 w-full py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
            text-gray-800 dark:text-gray-100 placeholder-gray-400 
            dark:placeholder-gray-400 focus:outline-none focus:ring-2 
            focus:ring-emerald-500 transition-colors duration-300"
            placeholder="Search or create anything..."
          />
          <div className="absolute left-3 top-2 text-gray-400 dark:text-gray-400">
            <Search size={16} />
          </div>
        </div>
      </div>

      {/* RIGHT SIDE ICONS */}
      <div className="w-1/4 flex items-center gap-4 justify-end">

        {/* Keyboard Shortcuts */}
        <div className="relative">
          <button
            onClick={() => setShowShortcuts(!showShortcuts)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Keyboard size={20} />
          </button>
          {showShortcuts && (
            <div className="absolute right-0 mt-2 w-48 p-2 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
              <p className="text-sm dark:text-gray-100">Ctrl + S: Save</p>
              <p className="text-sm dark:text-gray-100">Ctrl + P: Print</p>
              <p className="text-sm dark:text-gray-100">Ctrl + F: Search</p>
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-56 p-2 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
              <p className="text-sm dark:text-gray-100">New message from John</p>
              <p className="text-sm dark:text-gray-100">Server rebooted</p>
            </div>
          )}
        </div>

        {/* Theme Menu */}
        <div className="relative">
          <button
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {getThemeIcon()}
          </button>

          {showThemeMenu && (
            <div className="absolute right-0 mt-2 w-48 p-2 bg-white dark:bg-gray-800 
              border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
              {[
                { label: "Light", value: "light", icon: <Sun size={16} /> },
                { label: "Dark", value: "dark", icon: <Moon size={16} /> },
                { label: "Classic", value: "classic", icon: <Laptop size={16} /> },
                { label: "System Default", value: "system", icon: <Laptop size={16} /> },
              ].map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    setTheme(item.value);
                    setShowThemeMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-2 py-1 rounded 
                  hover:bg-gray-100 dark:hover:bg-gray-700 text-sm dark:text-gray-100"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded bg-emerald-500 text-white flex items-center justify-center">
            ppp
        </div>
      </div>

    </header>
  );
}
