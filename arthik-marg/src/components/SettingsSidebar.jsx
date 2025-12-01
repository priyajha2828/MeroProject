// SettingsSidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  User,
  Menu,
  ChevronRight,
  Building,
  Package,
  ChevronDown,
} from "lucide-react";

/**
 * Sidebar styles used for active / hover states.
 * These are tailwind class fragments — kept as constants for readability.
 */
const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export default function SettingsSidebar({ collapsed: collapsedProp = false }) {
  const navigate = useNavigate();
  const location = useLocation();

  // local collapsed state, initialized from prop so parent can set initial state
  const [collapsed, setCollapsed] = useState(Boolean(collapsedProp));
  useEffect(() => setCollapsed(Boolean(collapsedProp)), [collapsedProp]);

  // path helpers
  const pathname = location.pathname.replace(/^\/+/, ""); // "settings/feature-settings/parties"
  const active = pathname.split("/").filter(Boolean).pop() || "general"; // e.g. "parties" or "general"

  // main top-level items rendered in the sidebar
  const items = [
    { id: "general", label: "General", icon: <Settings size={18} /> },
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "business-profile", label: "Business Profile", icon: <Building size={18} /> },
    { id: "subscription", label: "Subscription", icon: <Package size={18} /> },
  ];

  // Feature group and its children
  const featureGroup = {
    id: "feature-settings",
    label: "Feature Settings",
    children: [
      { id: "feature-settings/parties", label: "Parties" },
      { id: "feature-settings/inventory", label: "Inventory" },
      { id: "feature-settings/transactions", label: "Transactions" },
      { id: "feature-settings/invoice-print", label: "Invoice Print" },
    ],
  };

  // Derived booleans for active feature area
  const isFeatureActive = pathname.includes("feature-settings");

  // control expand/collapse state for the Feature Settings group
  const [featureOpen, setFeatureOpen] = useState(isFeatureActive);
  // keep feature group open when route moves into it
  useEffect(() => {
    if (isFeatureActive) setFeatureOpen(true);
  }, [pathname, isFeatureActive]);

  // navigation helpers
  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleNavClick = (id) => {
    navigate(`/settings/${id}`);
    // collapse sidebar after navigation for small screens / consistent UX
    setCollapsed(true);
  };

  return (
    <aside
      aria-label="Settings navigation"
      className={`relative flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-200 ease-in-out ${
        collapsed ? "w-20" : "w-72"
      } p-4`}
    >
      {/* Collapse / Expand toggle (top-left) */}
      <div className="absolute top-3 left-3 z-10">
        <button
          type="button"
          onClick={() => setCollapsed((s) => !s)}
          aria-label={collapsed ? "Open settings sidebar" : "Collapse settings sidebar"}
          title={collapsed ? "Open" : "Collapse"}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 focus:outline-none ${
            collapsed ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Header: Back + Title */}
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-start gap-3 pl-2"} mb-6`}>
        <button
          type="button"
          onClick={handleBack}
          title="Back"
          className={`p-1 rounded hover:bg-gray-200 transition ${collapsed ? "" : "mr-1"}`}
        >
          <ArrowLeft size={22} className="text-gray-700" />
        </button>

        {!collapsed && <h2 className="text-xl font-semibold text-gray-800">Settings</h2>}
      </div>

      {/* Nav items */}
      <nav className="space-y-2 mt-1">
        {items.map((it) => {
          const isActive = active === it.id;
          return (
            <button
              key={it.id}
              type="button"
              onClick={() => handleNavClick(it.id)}
              title={it.label}
              aria-current={isActive ? "page" : undefined}
              className={`flex items-center gap-4 w-full text-left p-3 rounded transition-colors duration-150 ${
                isActive ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
              }`}
            >
              <div className="flex-shrink-0">{it.icon}</div>
              {!collapsed && <span className="capitalize text-lg font-medium">{it.label}</span>}
            </button>
          );
        })}

        {/* Feature Settings group */}
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setFeatureOpen((s) => !s)}
            title={featureGroup.label}
            aria-expanded={featureOpen}
            className={`flex items-center justify-between w-full text-left p-3 rounded transition-colors duration-150 ${
              isFeatureActive ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Settings size={18} />
              </div>
              {!collapsed && <span className="capitalize text-lg font-medium">{featureGroup.label}</span>}
            </div>

            {/* Chevron rotates when open (hidden when collapsed) */}
            {!collapsed && (
              <ChevronDown
                size={18}
                className={`transform transition-transform duration-150 ${featureOpen ? "rotate-180" : "rotate-0"}`}
              />
            )}
          </button>

          {/* Feature children */}
          {featureOpen && (
            <div className="pl-10 mt-3 space-y-2">
              {featureGroup.children.map((c) => {
                // childId (e.g. "parties"), fullPath (e.g. "feature-settings/parties")
                const childId = c.id.split("/").pop();
                const isChildActive = pathname.endsWith(c.id) || pathname.endsWith(childId);

                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => navigate(`/settings/${c.id}`)}
                    title={c.label}
                    className={`flex items-center gap-3 w-full text-left p-2 rounded text-sm transition-colors duration-150 ${
                      isChildActive ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
                    }`}
                  >
                    <span className="flex-shrink-0">•</span>
                    {!collapsed && <span className="text-base font-medium">{c.label}</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
}
