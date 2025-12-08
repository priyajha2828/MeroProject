// src/components/PurchaseBillsPage.jsx
import React, { useContext } from "react";
import { Plus } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // adjust path if your ThemeContext lives elsewhere
import { useNavigate } from "react-router-dom";

/**
 * Theme-aware PurchaseBillsPage
 *
 * - Uses ThemeContext to read current theme (ThemeProvider should expose CSS variables).
 * - Page background uses a light grey surface from theme (--surface-200).
 * - Table / card uses --bg-default and border uses --border variable.
 * - Primary button uses --primary-500 and --primary-600.
 *
 * Props:
 *  - sidebarOpen (bool) — used to offset the page when sidebar is open
 *  - onCreate (func) — optional callback when user clicks Create Purchase Bill (fallback: navigate to /purchase-bills/create)
 */

export function PurchaseBillsPage({ sidebarOpen = false, onCreate }) {
  const { theme } = useContext(ThemeContext || {});
  const navigate = useNavigate();

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  // theme CSS variables (fallbacks provided)
  const pageStyle = {
    left: sidebarOffset,
    width: `calc(100% - ${sidebarOffset})`,
    top: "4rem", // match your app top offset
    right: 0,
    bottom: 0,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    background: "var(--surface-200, #f3f4f6)", // light grey background
    color: "var(--text-default, #0f172a)",
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 720,
    borderRadius: 12,
    padding: "2.25rem 2rem",
    background: "var(--bg-default, #ffffff)",
    border: `1px solid var(--border, rgba(15,23,42,0.06))`,
    boxShadow: "0 6px 22px rgba(2,6,23,0.06)",
    textAlign: "center",
  };

  const illustrationOuter = {
    width: 160,
    height: 160,
    borderRadius: "50%",
    background: "var(--surface-100, #eef2ff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 16px",
  };

  const phoneStyle = {
    width: 96,
    height: 128,
    background: "var(--bg-default, #ffffff)",
    borderRadius: 12,
    border: `1px solid var(--border, rgba(0,0,0,0.06))`,
    padding: 12,
    boxShadow: "inset 0 1px 0 rgba(0,0,0,0.02)",
  };

  const titleStyle = {
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 8,
    color: "var(--text-default, #0f172a)",
  };

  const descStyle = {
    color: "var(--muted, rgba(0,0,0,0.6))",
    maxWidth: 520,
    margin: "0 auto 18px",
  };

  const primaryBtnStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 18px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
    border: "1px solid transparent",
    boxShadow: "0 6px 18px rgba(23,37,84,0.06)",
    transition: "transform .08s ease, filter .08s ease",
  };

  const primaryBtnHover = (e) => {
    e.currentTarget.style.filter = "brightness(.94)";
  };
  const primaryBtnLeave = (e) => {
    e.currentTarget.style.filter = "none";
  };

  const handleCreate = () => {
    if (typeof onCreate === "function") return onCreate();
    // fallback route (adjust route if your app differs)
    navigate("/purchase-bills/create");
  };

  return (
    <div style={pageStyle} aria-live="polite">
      <div style={cardStyle} role="region" aria-label="Purchase bills empty state">
        <div style={illustrationOuter} aria-hidden>
          <div style={phoneStyle}>
            <div style={{ height: 8, background: "var(--muted, rgba(0,0,0,0.08))", borderRadius: 6, marginBottom: 14 }} />
            <div style={{ height: 8, width: "60%", background: "var(--muted, rgba(0,0,0,0.04))", borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 8, width: "80%", background: "var(--muted, rgba(0,0,0,0.04))", borderRadius: 6, marginBottom: 8 }} />
            <div style={{ height: 8, width: "50%", background: "var(--muted, rgba(0,0,0,0.04))", borderRadius: 6, marginTop: 20 }} />
          </div>
        </div>

        <h2 style={titleStyle}>Create Your First Purchase Bill</h2>

        <p style={descStyle}>
          Click on the Create Purchase Bill button and start managing your purchases.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 8 }}>
          <button
            type="button"
            onClick={handleCreate}
            onMouseEnter={primaryBtnHover}
            onMouseLeave={primaryBtnLeave}
            style={primaryBtnStyle}
            aria-label="Create Purchase Bill"
            title="Create Purchase Bill"
          >
            <Plus size={18} />
            Create Purchase Bill
          </button>

          {/* optional secondary (ghost) action */}
          <button
            type="button"
            onClick={() => navigate("/purchase-bills")} // adjust route if needed
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              border: `1px solid var(--border, rgba(0,0,0,0.06))`,
              background: "transparent",
              color: "var(--text-default, #0f172a)",
              cursor: "pointer",
            }}
            aria-label="View Purchase Bills"
            title="View Purchase Bills"
          >
            View Purchase Bills
          </button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseBillsPage;
