// src/components/PurchaseReturnPage.jsx
import React, { useContext } from "react";
import { Plus } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // adjust path if needed

/**
 * Theme-aware PurchaseReturnPage
 * - Uses CSS variables provided by ThemeProvider (see src/context/ThemeProvider.jsx)
 * - Respects sidebarOpen prop for layout
 * - Accepts optional onCreate callback (called when user clicks Create)
 */
export function PurchaseReturnPage({ sidebarOpen = true, onCreate }) {
  const { theme } = useContext(ThemeContext || {}); // safe fallback if no provider

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  // theme-driven styles (use CSS variables with sensible fallbacks)
  const pageStyle = {
    left: sidebarOffset,
    width: `calc(100% - ${sidebarOffset})`,
    top: "4rem",
    bottom: 0,
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "var(--bg-default, #ffffff)",
    color: "var(--text-default, #0f172a)",
    overflow: "auto",
    paddingTop: "2.5rem",
    paddingBottom: "2.5rem",
  };

  const cardBg = { background: "var(--surface-200, #f3f4f6)" }; // outer illustration bg
  const miniCardStyle = {
    background: "var(--bg-default, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const headingStyle = { color: "var(--text-default, #0f172a)" };
  const mutedText = { color: "var(--muted, rgba(0,0,0,0.6))" };

  const primaryBtn = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  const handleCreate = () => {
    if (typeof onCreate === "function") onCreate();
    else console.log("Create Purchase Return clicked");
  };

  return (
    <div style={pageStyle} aria-live="polite">
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-6">
        {/* Illustration */}
        <div className="relative flex flex-col items-center mb-4">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center"
            style={cardBg}
            aria-hidden="true"
          >
            <div
              className="w-24 h-32 rounded-lg flex flex-col p-3 shadow-sm relative -top-2"
              style={miniCardStyle}
            >
              {/* Header stripe */}
              <div className="w-full h-8 rounded-t-md mb-2 flex items-center px-2" style={{ background: "var(--surface-100, #f7fafc)" }}>
                <div className="w-10 h-1 bg-white rounded opacity-70"></div>
              </div>

              {/* Lines */}
              <div className="w-12 h-2 bg-gray-200 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
            </div>
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-bold" style={headingStyle}>
          Create Your First Purchase Return
        </h2>

        <p className="text-base max-w-md" style={mutedText}>
          Click the button below to create a purchase return and start tracking returned items.
        </p>

        {/* Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            onClick={handleCreate}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none"
            style={primaryBtn}
            aria-label="Create Purchase Return"
          >
            <Plus size={20} />
            Create Purchase Return
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseReturnPage;
