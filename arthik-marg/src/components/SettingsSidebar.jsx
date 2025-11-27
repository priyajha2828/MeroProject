// SettingsSidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  User,
  Lock,
  Globe,
  Bell,
  Menu,
  ChevronRight,
  Building
} from "lucide-react";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export default function SettingsSidebar({ collapsed: collapsedProp = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // local collapsed state initialized from prop (so parent can optionally control initial state)
  const [collapsed, setCollapsed] = useState(Boolean(collapsedProp));

  // If parent changes collapsedProp after mount, reflect that.
  useEffect(() => {
    setCollapsed(Boolean(collapsedProp));
  }, [collapsedProp]);

  // derive active from pathname: e.g. /settings/general -> general
  const active = location.pathname.split("/").filter(Boolean).pop() || "general";

  const items = [
  { id: "general", label: "General", icon: <Settings size={16} /> },
  { id: "account", label: "Account", icon: <User size={16} /> },
  { id: "business-profile", label: "Business Profile", icon: <Building size={16} /> },
  { id: "security", label: "Security", icon: <Lock size={16} /> },
  { id: "localization", label: "Localization", icon: <Globe size={16} /> },
  { id: "notifications", label: "Notifications", icon: <Bell size={16} /> },
];
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  // When user clicks a settings item: navigate and collapse the sidebar
  const handleNavClick = (id) => {
    navigate(`/settings/${id}`);
    setCollapsed(true);
  };

  // Toggle button semantics:
  // - when expanded: show hamburger (Menu). Clicking collapses.
  // - when collapsed: show chevron (ChevronRight). Clicking expands.
  // On hover we change background and swap icon visually for clarity.
  return (
    <aside
      className={`relative flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-200 ease-in-out ${
        collapsed ? "w-16" : "w-56"
      } p-3`}
      aria-label="Settings navigation"
    >
      {/* Toggle button (top-left). Visible in both states */}
      <div
        className={`absolute top-3 left-3 z-10`}
        // ensure the toggle button doesn't overflow when collapsed
      >
        <button
          onClick={() => setCollapsed((s) => !s)}
          aria-label={collapsed ? "Open settings sidebar" : "Collapse settings sidebar"}
          title={collapsed ? "Open" : "Collapse"}
          className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-150 focus:outline-none
            ${collapsed ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100"}`}
        >
          {/* Show Menu when expanded, ChevronRight when collapsed.
              Also swap on hover for a clearer affordance using CSS group/hover would be more advanced,
              but a simple hover-to-change-icon is replicated with :hover using state-less approach here. */}
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* TOP ROW — Back + Title (hidden when collapsed, but keep spacing) */}
      <div
        className={`flex items-center ${
          collapsed ? "justify-center" : "justify-start gap-3 pl-2"
        } mb-6`}
      >
        {/* Back Icon (keep it clickable and visible) */}
        <button
          onClick={handleBack}
          className={`p-1 rounded hover:bg-gray-200 transition ${
            collapsed ? "" : "mr-1"
          }`}
          title="Back"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>

        {/* Settings label */}
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        )}
      </div>

      {/* NAV ITEMS */}
      <nav className="space-y-1 mt-1">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              onClick={() => handleNavClick(it.id)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded transition-colors duration-150 ${
                isActive
                  ? `${CUSTOM_BLUE} text-white`
                  : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
              }`}
              aria-current={isActive ? "page" : undefined}
              title={it.label}
            >
              <div className="flex-shrink-0">{it.icon}</div>
              {!collapsed && <span className="capitalize">{it.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
