// src/components/QuickPOS.jsx
import React, { useState, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * QuickPOS (theme-aware)
 * - uses CSS variables supplied by your ThemeProvider:
 *   --bg-default, --surface-200, --surface-100, --primary-500, --muted, --text-default
 * - falls back to sensible values when variables are not present
 * - keeps original behavior, only injects theme-driven colors/styles
 */

export default function QuickPOS() {
  const { theme } = useContext(ThemeContext || {}); // safe fallback

  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    name: "",
    category: "General",
    type: "Product",
    salesPrice: "",
    purchasePrice: "",
    openingStock: "",
    primaryUnit: "",
    itemCode: "",
    hsCode: "",
    description: "",
  });

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setItems([...items, { ...itemData }]);
    setItemData({
      name: "",
      category: "General",
      type: "Product",
      salesPrice: "",
      purchasePrice: "",
      openingStock: "",
      primaryUnit: "",
      itemCode: "",
      hsCode: "",
      description: "",
    });
    setShowForm(false);
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === "General");

  /* Theme-aware inline styles using CSS variables with fallbacks */
  const pageStyle = {
    background: "var(--surface-200, #f3f4f6)", // page light-grey surface
    color: "var(--text-default, #0f172a)",
    minHeight: "100vh",
    padding: "2rem",
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
  };

  const panelStyle = {
    background: "var(--bg-default, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 8,
    padding: 20,
  };

  const inputStyle = {
    background: "var(--surface-100, #ffffff)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.08)",
  };

  const primaryBtn = {
    background: "var(--primary-500, #16a34a)", // green-ish default for Save
    color: "var(--text-on-primary, #ffffff)",
  };

  const addBtn = {
    background: "var(--primary-500, #059669)",
    color: "var(--text-on-primary, #ffffff)",
  };

  const ghostBtn = {
    background: "transparent",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const categoryActiveStyle = {
    background: "var(--primary-500, #059669)",
    color: "var(--text-on-primary, #fff)",
  };

  const categoryInactiveStyle = {
    background: "var(--surface-100, #ffffff)",
    color: "var(--muted, rgba(0,0,0,0.6))",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={panelStyle}>
          <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 20 }}>Quick POS</h2>

          {!showForm && (
            <>
              {/* Search + Add New */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Items..."
                  style={{
                    flex: 1,
                    padding: "14px 18px",
                    borderRadius: 10,
                    ...inputStyle,
                    fontSize: 16,
                  }}
                />
                <button
                  onClick={() => setShowForm(true)}
                  style={{
                    padding: "12px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    ...addBtn,
                    fontWeight: 600,
                    border: "none",
                  }}
                >
                  Add New Item
                </button>
              </div>

              {/* Category Buttons */}
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                <button
                  onClick={() => setActiveCategory("all")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    ...(activeCategory === "all" ? categoryActiveStyle : categoryInactiveStyle),
                    fontWeight: 600,
                  }}
                >
                  All Categories
                </button>

                <button
                  onClick={() => setActiveCategory("general")}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 10,
                    cursor: "pointer",
                    ...(activeCategory === "general" ? categoryActiveStyle : categoryInactiveStyle),
                    fontWeight: 600,
                  }}
                >
                  General
                </button>
              </div>

              {/* Item List */}
              <div
                style={{
                  maxHeight: 450,
                  overflowY: "auto",
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  paddingTop: 16,
                }}
              >
                {filteredItems.length === 0 ? (
                  <p style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>No items found.</p>
                ) : (
                  filteredItems
                    .filter((item) =>
                      item.name.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((item, index) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          borderRadius: 8,
                          border: "1px solid rgba(0,0,0,0.06)",
                          marginBottom: 12,
                          background: "var(--bg-default, #ffffff)",
                        }}
                      >
                        <span style={{ fontWeight: 600, fontSize: 16 }}>{item.name}</span>
                        <span style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{item.category}</span>
                      </div>
                    ))
                )}
              </div>
            </>
          )}

          {/* Add New Item Form */}
          {showForm && (
            <div style={{ marginTop: 12 }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                <h3 style={{ fontSize: 22, fontWeight: 700 }}>Add New Item</h3>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 8,
                    cursor: "pointer",
                    ...ghostBtn,
                  }}
                >
                  Back
                </button>
              </div>

              {/* Fields */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Item Name</label>
                  <input
                    type="text"
                    name="name"
                    value={itemData.name}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Item Category</label>
                  <input
                    type="text"
                    name="category"
                    value={itemData.category}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Item Type</label>
                  <select
                    name="type"
                    value={itemData.type}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  >
                    <option>Product</option>
                    <option>Service</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Sales Price</label>
                  <input
                    type="number"
                    name="salesPrice"
                    value={itemData.salesPrice}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Purchase Price</label>
                  <input
                    type="number"
                    name="purchasePrice"
                    value={itemData.purchasePrice}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Opening Stock</label>
                  <input
                    type="number"
                    name="openingStock"
                    value={itemData.openingStock}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Primary Unit</label>
                  <input
                    type="text"
                    name="primaryUnit"
                    value={itemData.primaryUnit}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => alert("Add Secondary Unit Logic")}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 8,
                      cursor: "pointer",
                      ...primaryBtn,
                      border: "none",
                    }}
                  >
                    Add Secondary Unit
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 16 }}>
                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Item Code</label>
                  <input
                    type="text"
                    name="itemCode"
                    value={itemData.itemCode}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>HS Code</label>
                  <input
                    type="text"
                    name="hsCode"
                    value={itemData.hsCode}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontWeight: 600, marginBottom: 6 }}>Description</label>
                  <textarea
                    name="description"
                    value={itemData.description}
                    onChange={handleChange}
                    style={{ width: "100%", padding: 14, borderRadius: 8, ...inputStyle, minHeight: 86 }}
                  />
                </div>
              </div>

              {/* Save + Cancel */}
              <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button
                  onClick={() => setShowForm(false)}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    ...ghostBtn,
                  }}
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 8,
                    cursor: "pointer",
                    ...primaryBtn,
                    border: "none",
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
