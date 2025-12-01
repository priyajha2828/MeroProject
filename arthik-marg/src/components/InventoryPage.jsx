import React, { useState } from "react";
import { Package, Plus, FileText, X } from "lucide-react";
import { ImportItemsPage } from "./ImportItemsPage";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export function InventoryPage({ sidebarOpen }) {
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
    setForm(prev => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: replace with real save logic
    console.log("Saving item", form);
    setShowAddItem(false);
    // reset if you want:
    // setForm({ name: "", category: "General", itemType: "Product", openingStock: "", unit: "", salesPrice: "", purchasePrice: "", lowStockAlert: false });
  }

  return (
    <>
      {showImportItems && <ImportItemsPage sidebarOpen={sidebarOpen} />}

      {!showImportItems && (
        <div
          className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
          style={{
            left: sidebarOffset,
            width: `calc(100% - ${sidebarOffset})`,
          }}
        >
          <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6">
            {/* Illustration */}
            <div className="relative flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-blue-50 border-2 border-blue-100 rounded-xl flex items-center justify-center rotate-3">
                <Package size={64} className="text-blue-200" />
              </div>

              <div className="absolute -left-4 top-10 w-4 h-4 bg-yellow-200 rounded-full opacity-50"></div>
              <div className="absolute -right-2 bottom-4 w-6 h-6 bg-blue-100 rounded-full opacity-50"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Let's add your First Item
            </h2>

            <p className="text-gray-500 text-base max-w-md">
              Click on the add new item button and start managing your items.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {/* Add New Item Button */}
              <button
                onClick={() => setShowAddItem(true)}
                className={`flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold ${CUSTOM_BLUE_HOVER_BG} shadow-sm`}
              >
                <Plus size={20} />
                Add New Item
              </button>

              {/* Import Items Button */}
              <button
                onClick={() => setShowImportItems(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
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
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowAddItem(false)}
            aria-hidden="true"
          />

          {/* Modal card */}
          <div className="relative z-10 w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 mx-4">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add New Item</h3>
              <button
                onClick={() => setShowAddItem(false)}
                className="p-2 rounded hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Item name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="eg. Noodles"
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Category</label>
                  <select
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-gray-200 px-4 py-3"
                  >
                    <option>General</option>
                    <option>Food</option>
                    <option>Electronics</option>
                    {/* add more */}
                  </select>
                </div>

                {/* Item Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, itemType: "Product" }))}
                      className={`px-3 py-2 rounded-lg border ${form.itemType === "Product" ? "bg-[#174552]  text-white" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      Product
                    </button>
                    <button
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, itemType: "Service" }))}
                      className={`px-3 py-2 rounded-lg border ${form.itemType === "Service" ? "bg-[#174552]  text-white" : "bg-white border-gray-200 text-gray-700"}`}
                    >
                      Service
                    </button>
                  </div>
                </div>
              </div>

              {/* Tabs-like area: Stock Details */}
              <div className="border-t pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Opening Stock</label>
                    <input
                      name="openingStock"
                      value={form.openingStock}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-200 px-4 py-3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Measuring Unit</label>
                    <input
                      name="unit"
                      value={form.unit}
                      onChange={handleChange}
                      placeholder="Select Units"
                      className="w-full rounded-lg border border-gray-200 px-4 py-3"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sales Price</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">Rs.</span>
                      <input
                        name="salesPrice"
                        value={form.salesPrice}
                        onChange={handleChange}
                        className="w-full rounded-r-lg border border-gray-200 px-4 py-3"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Purchase Price</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">Rs.</span>
                      <input
                        name="purchasePrice"
                        value={form.purchasePrice}
                        onChange={handleChange}
                        className="w-full rounded-r-lg border border-gray-200 px-4 py-3"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4 border rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-green-600">
                      {/* icon placeholder */}
                      <Package size={18} />
                    </div>
                    <div>
                      <div className="font-medium text-gray-800">Low Stock Alert</div>
                      <div className="text-sm text-gray-500">Notify when stock is low</div>
                    </div>
                  </div>

                  <div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        name="lowStockAlert"
                        checked={form.lowStockAlert}
                        onChange={handleChange}
                      />
                      <span className="w-11 h-6 bg-gray-200 rounded-full relative after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-5 after:h-5 after:rounded-full after:transition-all"
                        // small visual only — add class toggling if you want the switch to move
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    // maybe save & clear for new
                    console.log("Save & New", form);
                    setForm({ name: "", category: "General", itemType: "Product", openingStock: "", unit: "", salesPrice: "", purchasePrice: "", lowStockAlert: false });
                  }}
                  className="px-4 py-2 rounded-lg border bg-white text-gray-700"
                >
                  Save & New
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#174552] text-white"
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
