// src/components/SalesInvoicePage.jsx
import React, { useContext } from "react";
import { Plus } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // adjust path if needed

/**
 * SalesInvoicePage
 * - Uses theme CSS variables provided by ThemeProvider (see src/context/ThemeProvider.jsx)
 * - Respects sidebar width via sidebarOpen prop
 */
export function SalesInvoicePage({ sidebarOpen = true }) {
  const { theme } = useContext(ThemeContext || {}); // safe if context not provided

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  // page container styles driven by theme variables with sensible fallbacks
  const pageStyle = {
    left: sidebarOffset,
    width: `calc(100% - ${sidebarOffset})`,
    background: "var(--bg-default, #ffffff)",
    color: "var(--text-default, #0f172a)",
  };

  // card / illustration background
  const illustrationBg = {
    background: "var(--surface-200, #f3f4f6)",
  };

  // primary button style
  const primaryBtn = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
  };

  // subtle card used inside illustration
  const miniCardStyle = {
    background: "var(--bg-default, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const mutedText = { color: "var(--muted, rgba(0,0,0,0.6))" };

  return (
    <div
      className="fixed top-16 right-0 bottom-0 overflow-auto flex flex-col items-center justify-center"
      style={pageStyle}
    >
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-4 py-10">
        {/* Illustration */}
        <div className="relative flex flex-col items-center mb-4">
          <div
            className="w-40 h-40 rounded-full flex items-center justify-center"
            style={{ ...illustrationBg }}
            aria-hidden="true"
          >
            <div
              className="w-24 h-32 rounded-lg flex flex-col p-3 shadow-sm relative -top-2"
              style={miniCardStyle}
            >
              <div className="w-full h-8 rounded-t-md mb-2" style={{ background: "var(--surface-100, #f7fafc)" }} />
              <div className="w-16 h-2 rounded mb-2" style={{ background: "var(--surface-100, #f7fafc)" }} />
              <div className="w-20 h-2 rounded mb-2" style={{ background: "var(--surface-100, #f7fafc)" }} />
              <div className="w-full h-2 rounded mt-auto mb-1" style={{ background: "var(--surface-100, #f7fafc)" }} />
              <div className="w-2/3 h-2 rounded mr-auto" style={{ background: "var(--surface-100, #f7fafc)" }} />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold" style={{ color: "var(--text-default, #0f172a)" }}>
          Create Your First Sales Invoice
        </h2>

        <p className="text-base max-w-md" style={mutedText}>
          Click on the create sales invoice button and start managing your sales invoices.
        </p>

        {/* Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none"
            style={{
              ...primaryBtn,
              boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
            onClick={() => {
              // replace with real navigation or open modal
              console.log("Create Sales Invoice clicked");
            }}
            aria-label="Create Sales Invoice"
          >
            <Plus size={20} />
            Create Sales Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default SalesInvoicePage;
