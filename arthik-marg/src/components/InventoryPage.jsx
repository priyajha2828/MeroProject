// src/pages/InventoryPage.jsx
import React, { useEffect, useState } from "react";
import { Plus, Upload, ArrowLeft, Settings, Bell, X } from "lucide-react";

/* Inline illustration so image never breaks */
const inlineIllustration = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns='http://www.w3.org/2000/svg' width='480' height='320' viewBox='0 0 480 320' fill='none'>
  <rect width='100%' height='100%' fill='transparent'/>
  <ellipse cx='240' cy='260' rx='210' ry='30' fill='#f8fafc'/>
  <g transform='translate(190,40)'>
    <path d='M34 18 L86 6 L86 48 L34 60 Z' fill='#eef2f6' stroke='#e6edf3'/>
    <path d='M34 18 L34 60 L-8 48 L-8 6 Z' fill='#f6f9fb' stroke='#e6edf3'/>
    <path d='M34 18 L86 6 L48 0 L-8 6 Z' fill='#ffffff' opacity='0.6' />
    <path d='M48 0 L86 6 L86 48' stroke='#e6edf3' stroke-width='0.6' />
  </g>
  <g transform='translate(120,100)'>
    <circle cx='24' cy='26' r='6' fill='#f6f7fb' stroke='#dfe7f0'/>
    <rect x='18' y='34' rx='6' width='12' height='20' fill='#eef2f6' stroke='#e6edf3'/>
  </g>
  <path d='M356 28 L380 22 L374 40 Z' fill='#f1f6f8' opacity='0.9' />
  <path d='M372 32 l-12 16' stroke='#cdd9e6' stroke-dasharray='3 3' />
</svg>
`)}`;

/* ---------------- Empty state ---------------- */
function InventoryEmptyState({ onAdd, onImport }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <img src={inlineIllustration} alt="empty" className="w-56 md:w-72 opacity-95 mb-6" />
      <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2">Let's add your First Item</h2>
      <p className="text-center text-gray-500 max-w-xl leading-relaxed mb-6 px-2">
        Click on the add new item button and start managing your items
      </p>

      <div className="flex items-center gap-4">
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-medium px-5 py-3 rounded-lg shadow-sm transition focus:outline-none focus:ring-2 focus:ring-green-200"
          type="button"
        >
          <Plus size={16} />
          <span className="whitespace-nowrap">Add New Item</span>
        </button>

        <button
          onClick={onImport}
          className="inline-flex items-center gap-3 border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 font-medium px-5 py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-gray-100"
          type="button"
        >
          <Upload size={16} />
          <span className="whitespace-nowrap">Import Items</span>
        </button>
      </div>
    </div>
  );
}

/* ---------------- MeasureUnitModal (top-level, z-indexed) ---------------- */
function MeasureUnitModal({ open, onClose, onSave, initial = {} }) {
  const [primary, setPrimary] = useState(initial.primaryUnit || "");
  const [secondary, setSecondary] = useState(initial.secondaryUnit || "");
  const [conversion, setConversion] = useState(initial.conversionRate ?? "");

  useEffect(() => {
    if (open) {
      setPrimary(initial.primaryUnit || "");
      setSecondary(initial.secondaryUnit || "");
      setConversion(initial.conversionRate ?? "");
    }
  }, [open, initial]);

  if (!open) return null;

  function handleSave() {
    if (!primary.trim()) {
      alert("Please select a primary unit.");
      return;
    }
    if (secondary && (!conversion || Number(conversion) <= 0)) {
      alert("Enter a valid conversion rate (e.g. 1000)");
      return;
    }
    onSave && onSave({ primaryUnit: primary.trim(), secondaryUnit: secondary.trim(), conversionRate: conversion });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-6">
      <div className="fixed inset-0 bg-black/30" onClick={onClose} />
      <div className="relative z-80 w-full max-w-lg bg-white rounded-lg shadow-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold">Select Measuring Unit</h3>
          <button onClick={onClose} className="text-gray-500 hover:bg-gray-100 p-2 rounded" type="button" aria-label="Close"><X size={18} /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">Primary Unit</label>
            <select value={primary} onChange={(e) => setPrimary(e.target.value)} className="w-full border rounded-lg px-4 py-3">
              <option value="">eg. Kilogram</option>
              <option value="Kilogram">Kilogram</option>
              <option value="Liter">Liter</option>
              <option value="Piece">Piece</option>
              <option value="Box">Box</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Secondary Unit</label>
            <select value={secondary} onChange={(e) => setSecondary(e.target.value)} className="w-full border rounded-lg px-4 py-3">
              <option value="">eg. Gram</option>
              <option value="Gram">Gram</option>
              <option value="Milliliter">Milliliter</option>
              <option value="Dozen">Dozen</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-2">Conversion Rate</label>
            <input
              value={conversion}
              onChange={(e) => setConversion(e.target.value)}
              placeholder="eg. 1000"
              className="w-full border rounded-lg px-4 py-3 bg-gray-50"
            />
            <p className="text-xs text-gray-400 mt-1">How many secondary units equal 1 primary unit (e.g. 1000)</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-white border" type="button">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 rounded-md bg-green-600 text-white" type="button">Save</button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Add Item Modal (opens MeasureUnitModal via state) ---------------- */
function AddItemModal({ open, onClose, onSave }) {
  const [activeTab, setActiveTab] = useState("stock");
  const [form, setForm] = useState({
    name: "",
    category: "General",
    type: "Product",
    openingStock: "",
    unitLabel: "", // display label
    unitData: null, // saved unit object
    salesPrice: "",
    purchasePrice: "",
    lowStockAlert: false,
    note: "",
  });

  const [showUnitModal, setShowUnitModal] = useState(false);

  useEffect(() => {
    if (open) {
      setForm({
        name: "",
        category: "General",
        type: "Product",
        openingStock: "",
        unitLabel: "",
        unitData: null,
        salesPrice: "",
        purchasePrice: "",
        lowStockAlert: false,
        note: "",
      });
      setActiveTab("stock");
      setShowUnitModal(false);
    }
  }, [open]);

  if (!open) return null;

  function update(field, value) {
    setForm((p) => ({ ...p, [field]: value }));
  }

  function validate() {
    if (!form.name.trim()) {
      alert("Item name is required");
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e && e.preventDefault && e.preventDefault();
    if (!validate()) return;
    onSave && onSave({ ...form });
  }

  function handleSaveAndNew() {
    if (!validate()) return;
    onSave && onSave({ ...form });
    setForm((p) => ({
      ...p,
      name: "",
      openingStock: "",
      salesPrice: "",
      purchasePrice: "",
      lowStockAlert: false,
      note: "",
      // keep unit if you want — currently clearing:
      unitLabel: "",
      unitData: null,
    }));
    setActiveTab("stock");
  }

  function onUnitSave(unitObj) {
    const label = unitObj.secondaryUnit ? `${unitObj.primaryUnit} → ${unitObj.secondaryUnit}` : unitObj.primaryUnit;
    update("unitLabel", label);
    update("unitData", unitObj);
    setShowUnitModal(false);
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-6">
        <div className="fixed inset-0 bg-black/40" onClick={onClose} />
        <div className="relative z-60 w-full max-w-3xl bg-white rounded-xl shadow-xl p-6 overflow-auto max-h-[90vh]">
          <div className="flex items-center gap-4 mb-4">
            <button onClick={onClose} className="text-gray-600 p-2 rounded-full hover:bg-gray-100" type="button" aria-label="Back">
              <ArrowLeft size={18} />
            </button>
            <h3 className="text-lg font-medium">Add New Item</h3>
            <div className="ml-auto">
              <button className="p-2 rounded-md hover:bg-gray-100" aria-label="Settings" type="button">
                <Settings size={16} />
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Item Name</label>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="eg. Noodles" className="w-full border rounded-lg px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-200" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Category</label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)} className="w-full border rounded-lg px-4 py-3">
                  <option>General</option><option>Food</option><option>Office</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Item Type</label>
                <div className="flex gap-2">
                  <button type="button" onClick={() => update("type", "Product")} className={`px-4 py-2 rounded-lg border ${form.type === "Product" ? "bg-green-50 border-green-300" : "bg-white"}`}>Product</button>
                  <button type="button" onClick={() => update("type", "Service")} className={`px-4 py-2 rounded-lg border ${form.type === "Service" ? "bg-green-50 border-green-300" : "bg-white"}`}>Service</button>
                </div>
              </div>
            </div>

            <div>
              <div className="flex gap-6 border-b pb-3">
                <button type="button" className={`pb-2 ${activeTab === "stock" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500"}`} onClick={() => setActiveTab("stock")}>Stock Details</button>
                <button type="button" className={`pb-2 ${activeTab === "others" ? "text-green-600 border-b-2 border-green-500" : "text-gray-500"}`} onClick={() => setActiveTab("others")}>Others</button>
              </div>

              <div className="mt-6">
                {activeTab === "stock" ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Opening Stock</label>
                      <input value={form.openingStock} onChange={(e) => update("openingStock", e.target.value)} className="w-full border rounded-lg px-4 py-3" />
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Measuring Unit</label>
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowUnitModal(true)}
                        onKeyDown={(e) => { if (e.key === "Enter") setShowUnitModal(true); }}
                        className="w-full border rounded-lg px-4 py-3 flex justify-between items-center cursor-pointer"
                      >
                        <span className={`${!form.unitLabel ? "text-gray-400" : ""}`}>{form.unitLabel || "Select Units"}</span>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Sales Price</label>
                      <div className="flex items-center">
                        <span className="px-3 border border-r-0 rounded-l-md bg-gray-50 text-sm">Rs.</span>
                        <input value={form.salesPrice} onChange={(e) => update("salesPrice", e.target.value)} className="w-full border rounded-r-md px-4 py-3" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-gray-700 mb-2">Purchase Price</label>
                      <div className="flex items-center">
                        <span className="px-3 border border-r-0 rounded-l-md bg-gray-50 text-sm">Rs.</span>
                        <input value={form.purchasePrice} onChange={(e) => update("purchasePrice", e.target.value)} className="w-full border rounded-r-md px-4 py-3" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm text-gray-700 mb-2">Note</label>
                    <textarea value={form.note} onChange={(e) => update("note", e.target.value)} className="w-full border rounded-lg px-4 py-3" rows={4} />
                  </div>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-green-50 flex items-center justify-center">
                  <Bell size={18} className="text-green-700" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Low Stock Alert</div>
                  <div className="text-sm text-gray-500">Notify when stock is below a threshold</div>
                </div>
              </div>

              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" checked={form.lowStockAlert} onChange={(e) => update("lowStockAlert", e.target.checked)} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-green-500 peer-focus:ring-2 peer-focus:ring-green-300 transition" />
                <span className="ml-3 text-sm text-gray-600">{form.lowStockAlert ? "On" : "Off"}</span>
              </label>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4">
              <button type="button" onClick={handleSaveAndNew} className="px-4 py-2 border rounded-md bg-white">Save & New</button>
              <button type="button" onClick={handleSubmit} className="px-5 py-2 rounded-md bg-green-600 text-white">Add Item</button>
            </div>
          </form>
        </div>
      </div>

      {/* Render MeasureUnitModal at top-level when requested */}
      <MeasureUnitModal open={showUnitModal} onClose={() => setShowUnitModal(false)} onSave={onUnitSave} initial={form.unitData || {}} />
    </>
  );
}

/* ---------------- Page combining both ---------------- */
export default function InventoryPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  function handleSave(item) {
    console.log("Saved item:", item);
    setShowAddModal(false);
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {!showAddModal && (
        <InventoryEmptyState onAdd={() => setShowAddModal(true)} onImport={() => alert("Implement import flow")} />
      )}

      <AddItemModal open={showAddModal} onClose={() => setShowAddModal(false)} onSave={handleSave} />
    </div>
  );
}
