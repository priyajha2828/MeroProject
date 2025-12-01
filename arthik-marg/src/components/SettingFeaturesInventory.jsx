// SettingFeaturesInventory.jsx
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

/**
 * Inventory Settings page (demo)
 * - Local state persisted to localStorage
 * - Clean Tailwind-based layout to match screenshots
 * - Toggle "on" color uses #174552
 */

const STORAGE_KEY = "karobar:feature-settings:inventory";
const BLUE = "#174552";

function Toggle({ checked, onChange, ariaLabel }) {
  // accessible toggle built with a real checkbox under the hood
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={ariaLabel}
      />
      <span
        className="w-12 h-6 rounded-full transition-colors"
        style={{ backgroundColor: checked ? BLUE : "#e6e6e6" }}
      />
      <span
        style={{
          position: "absolute",
          left: checked ? 46 : 8,
          top: 6,
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
          transition: "left 150ms ease",
        }}
      />
    </label>
  );
}

export default function SettingFeaturesInventory() {
  const [state, setState] = useState({
    uploadItemImage: true,
    wholesalePrice: false,
    mrp: false,
    itemLocation: false,
    partyWiseRate: false,
    lowStockDialog: false,
    defaultUnit: false,
    decimalPlaces: 2,
  });

  // load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setState((s) => ({ ...s, ...JSON.parse(raw) }));
      }
    } catch (e) {}
  }, []);

  // persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Inventory Settings</h2>

      {/* Top cards */}
      <div className="space-y-4 max-w-3xl">
        {/* Manage Item Categories */}
        <button
          type="button"
          onClick={() => alert("Open Manage Item Categories (demo)")}
          className="w-full bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow transition"
        >
          <div>
            <div className="font-medium text-gray-800">Manage Item Categories</div>
            <div className="text-sm text-gray-500 mt-1">Manage Item Categories for inventory-related information</div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* Manage Item Units */}
        <button
          type="button"
          onClick={() => alert("Open Manage Item Units (demo)")}
          className="w-full bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow transition"
        >
          <div>
            <div className="font-medium text-gray-800">Manage Item Units</div>
            <div className="text-sm text-gray-500 mt-1">Manage Item Units for inventory-related information</div>
          </div>
          <ChevronRight size={18} className="text-gray-400" />
        </button>

        {/* Upload Item Image */}
        <div className="w-full bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="font-medium text-gray-800">Upload Item Image</div>
            <div className="text-sm text-gray-500 mt-1">Enable item image uploads to recognize item easily</div>
          </div>
          <Toggle
            checked={state.uploadItemImage}
            onChange={(v) => set({ uploadItemImage: v })}
            ariaLabel="Upload Item Image"
          />
        </div>
      </div>

      {/* Pricing & Inventory Management */}
      <div className="mt-8 max-w-3xl">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Pricing & Inventory Management</h3>

        <div className="bg-white border rounded-xl shadow-sm divide-y">
          {/* helper to render a row */}
          {[
            { key: "wholesalePrice", label: "Wholesale Price" },
            { key: "mrp", label: "MRP" },
            { key: "itemLocation", label: "Item Location" },
            { key: "partyWiseRate", label: "Party Wise Item Rate" },
            { key: "lowStockDialog", label: "Low Stock Warning Dialog" },
            { key: "defaultUnit", label: "Default Unit" },
          ].map((r) => (
            <div key={r.key} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-800">{r.label}</div>
                <div className="text-sm text-gray-500 mt-1">{/* placeholder for info icon text */}</div>
              </div>
              <Toggle
                checked={Boolean(state[r.key])}
                onChange={(v) => set({ [r.key]: v })}
                ariaLabel={r.label}
              />
            </div>
          ))}

          {/* Quantity (Upto Decimal Places) row */}
          <div className="flex items-center justify-between p-4">
            <div>
              <div className="font-medium text-gray-800">Quantity (Upto Decimal Places)</div>
              <div className="text-sm text-gray-500 mt-1">Set maximum fraction digits allowed for quantities</div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => set({ decimalPlaces: Math.max(0, state.decimalPlaces - 1) })}
                className="w-8 h-8 rounded-md border flex items-center justify-center"
              >
                −
              </button>
              <div className="w-10 h-8 rounded-md border flex items-center justify-center font-medium">{state.decimalPlaces}</div>
              <button
                type="button"
                onClick={() => set({ decimalPlaces: Math.min(6, state.decimalPlaces + 1) })}
                className="w-8 h-8 rounded-md border flex items-center justify-center"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Save hint */}
      <div className="max-w-3xl mt-4 text-sm text-gray-500">
        Changes are saved locally for this demo. In production, call your API to persist workspace settings.
      </div>
    </div>
  );
}
