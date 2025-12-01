// src/components/SettingsSidebar.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Settings,
  User,
  Users,
  Menu,
  ChevronRight,
  Building,
  Package,
  ChevronDown,
  Box,
} from "lucide-react";
import { useLocale } from "./LocaleProvider";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export default function SettingsSidebar({ collapsed: collapsedProp = false }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLocale();

  const [collapsed, setCollapsed] = useState(Boolean(collapsedProp));
  useEffect(() => setCollapsed(Boolean(collapsedProp)), [collapsedProp]);

  const pathname = location.pathname.replace(/^\/+/, "");
  const active = pathname.split("/").filter(Boolean).pop() || "general";

  // ❌ Removed settings_nav keys → using plain text
  const items = [
    { id: "general", label: "General", icon: <Settings size={18} /> },
    { id: "account", label: "Account", icon: <User size={18} /> },
    { id: "business-profile", label: "Business Profile", icon: <Building size={18} /> },
    { id: "subscription", label: "Subscription", icon: <Package size={18} /> },
  ];

  // Feature group
  const featureGroup = {
    id: "feature-settings",
    label: "Feature Settings",
    children: [
      { id: "feature-settings/parties", icon: <Users size={12} />, label: "Parties" },
      { id: "feature-settings/inventory", icon: <Box size={12} />, label: "Inventory" },
      { id: "feature-settings/transactions", icon: <Settings size={12} />, label: "Transactions" },
      { id: "feature-settings/invoice-print", icon: <Package size={12} />, label: "Invoice Print" },
    ],
  };

  const isFeatureActive = pathname.includes("feature-settings");
  const [featureOpen, setFeatureOpen] = useState(isFeatureActive);

  useEffect(() => {
    if (isFeatureActive) setFeatureOpen(true);
  }, [pathname, isFeatureActive]);

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  };

  const handleNavClick = (id) => {
    navigate(`/settings/${id}`);
    setCollapsed(true);
  };

  return (
    <aside
      aria-label="Settings navigation"
      className={`relative flex-shrink-0 border-r border-gray-200 bg-white transition-all duration-200 ease-in-out ${
        collapsed ? "w-20" : "w-72"
      } p-4`}
    >
      {/* Collapse/Expand */}
      <div className="absolute top-3 left-3 z-10">
        <button
          type="button"
          onClick={() => setCollapsed((s) => !s)}
          aria-label={collapsed ? "Open sidebar" : "Collapse sidebar"}
          title={collapsed ? "Open" : "Collapse"}
          className={`flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-150 ${
            collapsed ? "bg-gray-100 hover:bg-gray-200" : "bg-white hover:bg-gray-100"
          }`}
        >
          {collapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </button>
      </div>

      {/* Header */}
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

      {/* Navigation List */}
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

        {/* Feature Settings */}
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
              <Settings size={18} />
              {!collapsed && <span className="capitalize text-lg font-medium">{featureGroup.label}</span>}
            </div>

            {!collapsed && (
              <ChevronDown
                size={18}
                className={`transform transition-transform duration-150 ${featureOpen ? "rotate-180" : "rotate-0"}`}
              />
            )}
          </button>

          {featureOpen && (
            <div className="pl-10 mt-3 space-y-2">
              {featureGroup.children.map((c) => {
                const childId = c.id.split("/").pop();
                const isChildActive = pathname.endsWith(c.id) || pathname.endsWith(childId);

                return (
                  <button
                    key={c.id}
                    onClick={() => navigate(`/settings/${c.id}`)}
                    title={c.label}
                    className={`flex items-center gap-3 w-full text-left p-2 rounded text-sm transition-colors duration-150 ${
                      isChildActive ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
                    }`}
                  >
                    {c.icon}
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
