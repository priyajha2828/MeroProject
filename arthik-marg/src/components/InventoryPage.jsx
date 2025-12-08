// src/components/InventoryPage.jsx
import React, { useState, useContext } from "react";
import { Package, Plus, FileText, X } from "lucide-react";
import { ImportItemsPage } from "./ImportItemsPage";
import { ThemeContext } from "../context/ThemeContext"; // adjust if necessary

export function InventoryPage({ sidebarOpen }) {
  const { theme } = useContext(ThemeContext || {}); // read theme (safe when context missing)
  const [showImportItems, setShowImportItems] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);

  // form state for Add Item modal
  const [form, setForm] = useState({
    name: "",
    category: "General",
    itemType: "Product",
    openingStock: "",
    unit: "",
    salesPrice: "",
    purchasePrice: "",
    lowStockAlert: false,
  });

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: replace with real save logic
    console.log("Saving item", form);
    setShowAddItem(false);
  }

  // theme-driven inline styles using CSS variables your ThemeProvider should set
  const pageStyle = {
    left: sidebarOffset,
    width: `calc(100% - ${sidebarOffset})`,
    background: "var(--bg-default, #ffffff)",
    color: "var(--text-default, #0f172a)",
  };

  const cardBg = { background: "var(--surface-100, #f7fafc)" }; // subtle card bg
  const primaryBg = { background: "var(--primary-500, #172554)", color: "var(--text-on-primary, #fff)" };
  const primaryBtnStyle = { background: "var(--primary-500, #172554)", color: "var(--text-on-primary, #fff)" };
  const panelBorder = { borderColor: "rgba(0,0,0,0.06)" };
  const mutedText = { color: "var(--muted, rgba(0,0,0,0.6))" };

  // toggle visual for switch
  const switchTrackStyle = (checked) => ({
    width: 44,
    height: 24,
    background: checked ? "var(--primary-500, #172554)" : "var(--surface-200, #e6e8eb)",
    borderRadius: 9999,
    position: "relative",
    transition: "background 150ms",
  });

  const switchThumbStyle = (checked) => ({
    width: 20,
    height: 20,
    background: "var(--text-on-primary, #fff)",
    borderRadius: "50%",
    position: "absolute",
    top: 2,
    left: checked ? 22 : 2,
    transition: "left 150ms",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12)",
  });

  return (
    <>
      {/* Import Items page overlay */}
      {showImportItems && <ImportItemsPage sidebarOpen={sidebarOpen} />}

      {/* Main empty state */}
      {!showImportItems && (
        <div
          className="fixed top-16 right-0 bottom-0 overflow-auto flex flex-col items-center justify-center"
          style={pageStyle}
        >
          <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-4">
            {/* Illustration */}
            <div className="relative flex flex-col items-center mb-4">
              <div
                className="w-32 h-32 rounded-xl flex items-center justify-center rotate-3"
                style={{ background: "var(--surface-200, #eef2f6)", border: "2px solid rgba(0,0,0,0.03)" }}
                aria-hidden="true"
              >
                <Package size={64} style={{ color: "var(--primary-500, #172554)" }} />
              </div>

              <div className="absolute -left-4 top-10 w-4 h-4 bg-yellow-200 rounded-full opacity-50" />
              <div className="absolute -right-2 bottom-4 w-6 h-6 bg-blue-100 rounded-full opacity-50" />
            </div>

            <h2 className="text-2xl font-bold" style={{ color: "var(--text-default, #0f172a)" }}>
              Let's add your First Item
            </h2>

            <p className="text-base max-w-md" style={mutedText}>
              Click on the add new item button and start managing your items.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {/* Add New Item Button */}
              <button
                onClick={() => setShowAddItem(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-shadow focus:outline-none"
                style={{
                  ...primaryBtnStyle,
                  boxShadow: "0 2px 8px rgba(23,37,84,0.08)",
                }}
                title="Add New Item"
              >
                <Plus size={20} />
                Add New Item
              </button>

              {/* Import Items Button */}
              <button
                onClick={() => setShowImportItems(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border transition-colors"
                style={{
                  background: "var(--surface-100, #ffffff)",
                  color: "var(--text-default, #0f172a)",
                  borderColor: "rgba(0,0,0,0.06)",
                }}
                title="Import Items"
              >
                <FileText size={20} />
                Import Items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Item Modal */}
      {showAddItem && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-auto"
          style={{ paddingTop: "4rem", left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            onClick={() => setShowAddItem(false)}
            style={{ background: "rgba(0,0,0,0.35)" }}
            aria-hidden="true"
          />

          {/* Modal card */}
          <div
            className="relative z-10 w-full max-w-3xl rounded-lg p-6 mx-4"
            style={{
              background: "var(--bg-default, #ffffff)",
              boxShadow: "0 10px 30px rgba(2,6,23,0.08)",
              border: "1px solid rgba(0,0,0,0.04)",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Add new item"
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>
                Add New Item
              </h3>
              <button
                onClick={() => setShowAddItem(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close"
                style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item name */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                  Item Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="eg. Noodles"
                  className="w-full rounded-lg px-4 py-3 focus:outline-none"
                  style={{
                    border: "1px solid rgba(0,0,0,0.06)",
                    background: "var(--surface-100, #f7fafc)",
                    color: "var(--text-default, #0f172a)",
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                    Item Category
                  </label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg px-4 py-3"
                    style={{ border: "1px solid rgba(0,0,0,0.06)", background: "var(--surface-100, #f7fafc)" }}
                  >
                    <option>General</option>
                    <option>Food</option>
                    <option>Electronics</option>
                  </select>
                </div>

                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                    Item Type
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, itemType: "Product" }))}
                      className="px-3 py-2 rounded-lg border"
                      style={{
                        background: form.itemType === "Product" ? "var(--primary-500, #172554)" : "var(--surface-100, #ffffff)",
                        color: form.itemType === "Product" ? "var(--text-on-primary, #fff)" : "var(--text-default, #0f172a)",
                        borderColor: "rgba(0,0,0,0.06)",
                      }}
                    >
                      Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, itemType: "Service" }))}
                      className="px-3 py-2 rounded-lg border"
                      style={{
                        background: form.itemType === "Service" ? "var(--primary-500, #172554)" : "var(--surface-100, #ffffff)",
                        color: form.itemType === "Service" ? "var(--text-on-primary, #fff)" : "var(--text-default, #0f172a)",
                        borderColor: "rgba(0,0,0,0.06)",
                      }}
                    >
                      Service
                    </button>
                  </div>
                </div>
              </div>

              {/* Stock Details */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                      Opening Stock
                    </label>
                    <input
                      name="openingStock"
                      value={form.openingStock}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-3"
                      style={{ border: "1px solid rgba(0,0,0,0.06)", background: "var(--surface-100, #f7fafc)" }}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                      Measuring Unit
                    </label>
                    <input
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      placeholder="Select Units"
                      className="w-full rounded-lg px-4 py-3"
                      style={{ border: "1px solid rgba(0,0,0,0.06)", background: "var(--surface-100, #f7fafc)" }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                      Sales Price
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0" style={{ background: "var(--surface-200, #f3f4f6)", borderColor: "rgba(0,0,0,0.06)" }}>
                        Rs.
                      </span>
                      <input
                        name="salesPrice"
                        value={form.salesPrice}
                        onChange={handleChange}
                        className="w-full rounded-r-lg px-4 py-3"
                        style={{ border: "1px solid rgba(0,0,0,0.06)", background: "var(--surface-100, #f7fafc)" }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
                      Purchase Price
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0" style={{ background: "var(--surface-200, #f3f4f6)", borderColor: "rgba(0,0,0,0.06)" }}>
                        Rs.
                      </span>
                      <input
                        name="purchasePrice"
                        value={form.purchasePrice}
                        onChange={handleChange}
                        className="w-full rounded-r-lg px-4 py-3"
                        style={{ border: "1px solid rgba(0,0,0,0.06)", background: "var(--surface-100, #f7fafc)" }}
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 border rounded-lg p-3 flex items-center justify-between" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-3">
                    <div style={{ color: "var(--success, #16a34a)" }}>
                      <Package size={18} />
                    </div>
                    <div>
                      <div className="font-medium" style={{ color: "var(--text-default, #0f172a)" }}>Low Stock Alert</div>
                      <div className="text-sm" style={mutedText}>Notify when stock is low</div>
                    </div>
                  </div>

                  <div>
                    <label className="relative inline-flex items-center cursor-pointer" aria-hidden="true">
                      <input
                        type="checkbox"
                        className="sr-only"
                        name="lowStockAlert"
                        checked={form.lowStockAlert}
                        onChange={handleChange}
                      />
                      <span style={switchTrackStyle(form.lowStockAlert)} />
                      <span style={switchThumbStyle(form.lowStockAlert)} />
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Save & New", form);
                    setForm({ name: "", category: "General", itemType: "Product", openingStock: "", unit: "", salesPrice: "", purchasePrice: "", lowStockAlert: false });
                  }}
                  className="px-4 py-2 rounded-lg border"
                  style={{ background: "var(--surface-100, #ffffff)", color: "var(--text-default, #0f172a)", borderColor: "rgba(0,0,0,0.06)" }}
                >
                  Save & New
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg"
                  style={primaryBtnStyle}
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default InventoryPage;
