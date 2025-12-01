// SettingFeaturesInvoicePrint.jsx
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

const STORAGE_KEY = "karobar:feature-settings:invoice-print";
const BTN_BG = "#172554"; // updated to requested blue
const BTN_TEXT = "white";

function Toggle({ checked, onChange, ariaLabel }) {
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
        style={{ backgroundColor: checked ? BTN_BG : "#e6e6e6" }}
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

/**
 * Invoice Print Settings page
 * - Component is self-scrolling (min-h-0 overflow-auto) so only right panel scrolls.
 * - State persists to localStorage for demo purposes.
 * - Primary action color: BTN_BG (#172554) with white text.
 */
export default function SettingFeaturesInvoicePrint() {
  const [state, setState] = useState({
    printType: "regular", // 'regular' | 'thermal'
    pageSize: "A4 (210 × 297 mm)",
    showBankQR: false,
    showLogo: true,
    showPhone: true,
    showAddress: true,
    showEmail: true,
    showBankAccount: false,
    showRegistration: false,
    showPartyBalance: false,
    showItemUnit: true,
    hideHSCode: false,
    hideBranding: false,
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  const ManageButton = ({ title, subtitle, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className="w-full bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm hover:shadow transition text-left"
    >
      <div>
        <div className="font-medium text-gray-800">{title}</div>
        {subtitle && <div className="text-sm text-gray-500 mt-1">{subtitle}</div>}
      </div>
      <ChevronRight size={18} className="text-gray-400" />
    </button>
  );

  return (
    <div className="min-h-0 overflow-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Invoice Print Settings</h2>

      <div className="space-y-6 max-w-3xl">
        {/* Select Default Print Type */}
        <div className="bg-white border rounded-xl p-5 shadow-sm flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-800">Select Default Print Type</div>
            <div className="text-sm text-gray-500 mt-1">You can select printing type as your preferences</div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => set({ printType: "regular" })}
              className="px-4 py-2 rounded-md border transition inline-flex items-center gap-2"
              style={
                state.printType === "regular"
                  ? { backgroundColor: BTN_BG, color: BTN_TEXT, borderColor: BTN_BG }
                  : {}
              }
            >
              <span className="text-sm font-medium">🖨️ Regular</span>
            </button>

            <button
              onClick={() => set({ printType: "thermal" })}
              className="px-4 py-2 rounded-md border transition inline-flex items-center gap-2"
              style={
                state.printType === "thermal"
                  ? { backgroundColor: BTN_BG, color: BTN_TEXT, borderColor: BTN_BG }
                  : {}
              }
            >
              <span className="text-sm font-medium">🔥 Thermal</span>
            </button>
          </div>
        </div>

        {/* Invoices group */}
        <div className="space-y-3">
          <ManageButton title="Default Invoice Style" subtitle="Manage invoice styles and fields" onClick={() => alert("Open Default Invoice Style (demo)")} />
          <ManageButton title="Signature" subtitle="Add your signature or create one for invoices" onClick={() => alert("Open Signature (demo)")} />
          <ManageButton title="Upload Bank QR" subtitle="Add your QR" onClick={() => alert("Open Upload Bank QR (demo)")} />
          <ManageButton title="Terms & Conditions" subtitle="Thank you for Doing business with us." onClick={() => alert("Open Terms & Conditions (demo)")} />
        </div>

        {/* Printer Settings */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="font-medium text-gray-800">Printer Settings</div>
          <div className="text-sm text-gray-500 mt-2">To adjust page size, choose from preset options</div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-gray-800">Page Size</div>
            <div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-md border cursor-pointer"
              onClick={() => {
                const val = prompt("Choose page size (A4 / A5)", state.pageSize);
                if (val) set({ pageSize: val });
              }}
            >
              <span className="text-sm">{state.pageSize}</span>
              <ChevronRight size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Invoice Customization (list of toggles) */}
        <div className="bg-white border rounded-xl shadow-sm divide-y">
          {[
            { key: "showBankQR", label: "Show Bank QR on Invoice" },
            { key: "showLogo", label: "Show Business Logo on Invoice" },
            { key: "showPhone", label: "Show Phone Number on Invoice" },
            { key: "showAddress", label: "Show Address on Invoice" },
            { key: "showEmail", label: "Show Email on Invoice" },
            { key: "showBankAccount", label: "Show Bank Account on Invoice" },
            { key: "showRegistration", label: "Show Registration No. on Invoice" },
            { key: "showPartyBalance", label: "Show Party Balance on Invoice" },
            { key: "showItemUnit", label: "Show Item Unit on Invoice" },
            { key: "hideHSCode", label: "Hide HS Code on Invoice" },
            { key: "hideBranding", label: "Hide Karobar Branding" },
          ].map((r) => (
            <div key={r.key} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-gray-800">{r.label}</div>
              </div>
              <Toggle checked={Boolean(state[r.key])} onChange={(v) => set({ [r.key]: v })} ariaLabel={r.label} />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-3xl mt-4 text-sm text-gray-500">
        Changes are saved locally for this demo. Replace with API calls to persist workspace settings.
      </div>
    </div>
  );
}
