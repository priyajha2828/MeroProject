// src/components/QuotationsPage.jsx
import React, { useState, useContext } from "react";
import { Plus } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // adjust path if needed
import Quotation from "./Quotation"; // ensure path is correct

export function QuotationsPage({ sidebarOpen = true }) {
  const { theme } = useContext(ThemeContext || {});
  const [showForm, setShowForm] = useState(false);

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  // Theme-driven styles with fallbacks
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

  const outerBg = {
    background: "var(--surface-200, #f3f4f6)", // light grey outer background
  };

  const cardBg = {
    background: "var(--bg-default, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 8,
    padding: 28,
  };

  const headingStyle = { color: "var(--text-default, #0f172a)" };
  const mutedText = { color: "var(--muted, rgba(0,0,0,0.6))" };
  const primaryBtn = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  };

  return (
    <div style={pageStyle} aria-live="polite">
      <div className="w-full" style={{ ...outerBg, minHeight: "calc(100vh - 4rem)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: 32, paddingBottom: 32 }}>
        <div className="mx-auto w-full max-w-4xl px-6">
          {/* If showForm is false show illustration card */}
          {!showForm && (
            <div style={cardBg} className="flex flex-col items-center text-center">
              {/* Illustration */}
              <div className="relative flex flex-col items-center mb-4">
                <div className="w-40 h-40 rounded-full flex items-center justify-center" style={{ background: "var(--surface-200, #f3f4f6)" }}>
                  <div className="w-24 h-32 bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center p-3 shadow-sm relative -top-2" style={{ background: "var(--bg-default, #fff)" }}>
                    <div className="w-full h-8 bg-gray-400 rounded-t-md mb-2 flex items-center px-2">
                      <div className="w-10 h-1 bg-white rounded opacity-70"></div>
                    </div>

                    <div className="w-12 h-2 bg-gray-200 rounded self-start mb-2"></div>
                    <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
                    <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
                    <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
                    <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold mb-2" style={headingStyle}>
                Create Your First Quotation
              </h2>

              <p className="text-base max-w-md mb-6" style={mutedText}>
                Click on the Create New Quotation button and start managing your quotations.
              </p>

              {/* Button */}
              <div>
                <button
                  type="button"
                  onClick={() => setShowForm(true)}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-colors focus:outline-none"
                  style={primaryBtn}
                  aria-label="Create New Quotation"
                >
                  <Plus size={20} />
                  Create New Quotation
                </button>
              </div>
            </div>
          )}

          {/* If showForm is true render the Quotation UI */}
          {showForm && (
            <>
              {/* Close control above the form (so user can return to illustration without navigating) */}
              <div className="flex items-center justify-end mb-4">
                <button
                  onClick={() => setShowForm(false)}
                  className="px-3 py-2 rounded hover:bg-gray-100 transition"
                  style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
                >
                  Close
                </button>
              </div>

              {/* Render Quotation component (it contains its own layout/modal). 
                  If you prefer Quotation to close without navigation, I can update Quotation to accept onClose. */}
              <Quotation />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuotationsPage;
