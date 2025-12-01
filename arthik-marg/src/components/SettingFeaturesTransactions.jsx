// SettingFeaturesTransactions.jsx
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "karobar:feature-settings:transactions";
const BLUE = "#172554"; // UPDATED BLUE COLOR

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

export default function SettingFeaturesTransactions() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    cashSaleByDefault: false,
    dueDateReminder: false,
    otherIncomeTransaction: true,
    enablePrefixes: true,
    additionalCharges: true,
    roundOff: false,

    prefixes: {
      sales: "SAL-",
      salesReturn: "SR-",
      paymentIn: "PIN-",
      quotation: "QT-",
    },
  });

  // Load saved settings
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw) }));
    } catch (e) {}
  }, []);

  // Save on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }, [state]);

  const set = (patch) => setState((s) => ({ ...s, ...patch }));

  // reusable button
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
      <h2 className="text-2xl font-semibold mb-6">Transaction Settings</h2>

      <div className="space-y-4 max-w-3xl">
        {/* Row 1 */}
        <div className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="font-medium text-gray-800">Set Cash Sale by Default</div>
            <div className="text-sm text-gray-500 mt-1">
              Every transaction will be recorded as cash.
            </div>
          </div>
          <Toggle
            checked={state.cashSaleByDefault}
            onChange={(v) => set({ cashSaleByDefault: v })}
            ariaLabel="Set Cash Sale by Default"
          />
        </div>

        {/* Row 2 */}
        <div className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="font-medium text-gray-800">Enable Due Date Reminder</div>
            <div className="text-sm text-gray-500 mt-1">
              Record due dates for unpaid invoices.
            </div>
          </div>
          <Toggle
            checked={state.dueDateReminder}
            onChange={(v) => set({ dueDateReminder: v })}
            ariaLabel="Enable Due Date Reminder"
          />
        </div>

        {/* Row 3 */}
        <div className="bg-white border rounded-xl p-5 flex items-center justify-between shadow-sm">
          <div>
            <div className="font-medium text-gray-800">Enable Other Income Transaction</div>
            <div className="text-sm text-gray-500 mt-1">
              Enables recording of other income transactions.
            </div>
          </div>
          <Toggle
            checked={state.otherIncomeTransaction}
            onChange={(v) => set({ otherIncomeTransaction: v })}
            ariaLabel="Enable Other Income Transaction"
          />
        </div>

        {/* category manage */}
        <ManageButton title="Manage Income Categories" onClick={() => alert("Open Income Categories")} />
        <ManageButton title="Manage Expense Categories" onClick={() => alert("Open Expense Categories")} />

        {/* Prefix Section */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-medium text-gray-800">Enable Transaction Prefixes</div>
              <div className="text-sm text-gray-500 mt-1">
                Manage invoice number prefixes
              </div>
            </div>

            <Toggle
              checked={state.enablePrefixes}
              onChange={(v) => set({ enablePrefixes: v })}
              ariaLabel="Enable Prefix"
            />
          </div>

          {state.enablePrefixes && (
            <div className="mt-4 border-t pt-4 space-y-2">
              {[
                { key: "sales", label: "Sales Prefix" },
                { key: "salesReturn", label: "Sales Return Prefix" },
                { key: "paymentIn", label: "Payment In Prefix" },
                { key: "quotation", label: "Quotation Prefix" },
              ].map((r) => (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    const current = state.prefixes[r.key];
                    const val = prompt(`Edit ${r.label}`, current);
                    if (val !== null)
                      set({
                        prefixes: { ...state.prefixes, [r.key]: val },
                      });
                  }}
                  className="w-full text-left p-3 rounded hover:bg-gray-50 flex items-center justify-between"
                >
                  <div>
                    <div className="text-gray-800">{r.label}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {state.prefixes[r.key]}
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Other Settings */}
        <div className="bg-white border rounded-xl p-5 shadow-sm">
          <div className="font-medium text-gray-800 mb-3">Others Settings</div>

          <div className="divide-y">
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-gray-800">Enable Additional Charges</div>
                <div className="text-sm text-gray-500 mt-1">
                  Add additional charges to invoices.
                </div>
              </div>
              <Toggle
                checked={state.additionalCharges}
                onChange={(v) => set({ additionalCharges: v })}
                ariaLabel="Enable Additional Charges"
              />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <div className="text-gray-800">Enable Round Off</div>
                <div className="text-sm text-gray-500 mt-1">
                  Round total automatically.
                </div>
              </div>
              <Toggle
                checked={state.roundOff}
                onChange={(v) => set({ roundOff: v })}
                ariaLabel="Enable Round Off"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mt-4 text-sm text-gray-500">
        Changes saved locally. Replace with API for production.
      </div>
    </div>
  );
}
