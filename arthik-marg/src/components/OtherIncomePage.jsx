// src/components/OtherIncomePage.jsx
import React, { useState, useContext } from "react";
import { Plus, X, Calendar } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Theme-aware OtherIncomePage
 * - Reads current theme from ThemeContext and uses CSS variables (with sensible fallbacks)
 * - Uses a light grey page background and theme primary color for actions
 * - Keeps original UX but applies theme styles consistently
 *
 * Usage:
 * <OtherIncomePage sidebarOpen={sidebarOpen} />
 */

export function OtherIncomePage({ sidebarOpen = false }) {
  const { theme } = useContext(ThemeContext || {});

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [showAddIncome, setShowAddIncome] = useState(false);

  const [form, setForm] = useState({
    incomeNo: 1,
    date: new Date().toISOString().slice(0, 10),
    category: "",
    items: [],
    totalAmount: "",
    paymentMethod: "Cash",
    remarks: "",
    attachments: [],
  });

  const categories = ["Grants & Funding", "Sponsorships", "Investments", "Commission"];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function addIncomeItem() {
    setForm((prev) => ({ ...prev, items: [...prev.items, { description: "", qty: "", rate: "", amount: "" }] }));
  }

  function handleItemChange(idx, field, value) {
    setForm((prev) => {
      const items = [...prev.items];
      items[idx] = { ...(items[idx] || {}), [field]: value };
      const qty = parseFloat(items[idx].qty) || 0;
      const rate = parseFloat(items[idx].rate) || 0;
      items[idx].amount = qty * rate || "";
      return { ...prev, items };
    });
  }

  function removeIncomeItem(idx) {
    setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  }

  function recalcTotal() {
    const total = form.items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
    setForm((prev) => ({ ...prev, totalAmount: total ? total.toFixed(2) : "" }));
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files || []);
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  }

  function removeAttachment(i) {
    setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((_, idx) => idx !== i) }));
  }

  function handleSave(e, resetAfter = false) {
    e?.preventDefault?.();
    recalcTotal();
    // TODO: submit to API
    console.log("Save Income:", form);

    if (resetAfter) {
      setForm({
        incomeNo: form.incomeNo + 1,
        date: new Date().toISOString().slice(0, 10),
        category: "",
        items: [],
        totalAmount: "",
        paymentMethod: "Cash",
        remarks: "",
        attachments: [],
      });
    } else {
      setShowAddIncome(false);
    }
  }

  // theme-aware CSS variables with fallbacks
  const vars = {
    primary: "var(--primary-500, #174552)",
    primaryHover: "var(--primary-600, #11303F)",
    bg: "var(--bg-default, #ffffff)",
    pageBg: "var(--surface-200, #f3f4f6)", // light grey page background
    text: "var(--text-default, #0f172a)",
    muted: "var(--muted, rgba(0,0,0,0.6))",
    border: "var(--border, rgba(0,0,0,0.06))",
    success: "var(--success, #16a34a)",
  };

  const pageStyle = {
    left: sidebarOffset,
    width: `calc(100% - ${sidebarOffset})`,
    top: "4rem",
    right: 0,
    bottom: 0,
    position: "fixed",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    background: vars.pageBg,
    color: vars.text,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 820,
    borderRadius: 12,
    padding: "1.75rem 1.5rem",
    background: vars.bg,
    border: `1px solid ${vars.border}`,
    boxShadow: "0 6px 18px rgba(2,6,23,0.06)",
    textAlign: "center",
  };

  const primaryBtn = {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 16px",
    borderRadius: 10,
    fontWeight: 700,
    cursor: "pointer",
    background: vars.primary,
    color: "#fff",
    border: "1px solid transparent",
  };

  const secondaryBtn = {
    padding: "8px 12px",
    borderRadius: 8,
    background: "transparent",
    border: `1px solid ${vars.border}`,
    color: vars.text,
    cursor: "pointer",
  };

  return (
    <div style={pageStyle} aria-live="polite">
      <div style={cardStyle} className="px-4">
        {/* Illustration */}
        <div className="flex justify-center mb-4" aria-hidden>
          <svg width="160" height="160" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="100" cy="100" r="80" fill="#E5E7EB" />
            <rect x="55" y="40" width="90" height="30" rx="6" fill="#9CA3AF" />
            <rect x="55" y="75" width="90" height="90" rx="10" fill="white" />
            <rect x="65" y="90" width="50" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="105" width="70" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="120" width="60" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="135" width="40" height="6" rx="3" fill="#D1D5DB" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold" style={{ color: vars.text }}>
          Create Your First Income
        </h2>

        <p className="text-base max-w-md" style={{ color: vars.muted }}>
          Click on the create income button and start managing your incomes
        </p>

        <button
          onClick={() => setShowAddIncome(true)}
          style={primaryBtn}
          className="mt-4"
          aria-label="Add New Income"
        >
          <Plus size={18} />
          Add New Income
        </button>
      </div>

      {/* Modal */}
      {showAddIncome && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
        >
          {/* backdrop */}
          <div className="absolute inset-0" onClick={() => setShowAddIncome(false)} style={{ background: "rgba(2,6,23,0.45)" }} />

          <div
            className="relative z-10 mt-12 w-full max-w-3xl"
            style={{
              background: vars.bg,
              borderRadius: 12,
              boxShadow: "0 10px 40px rgba(2,6,23,0.15)",
              overflow: "hidden",
            }}
          >
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: vars.border }}>
              <h3 className="text-lg font-semibold" style={{ color: vars.text }}>
                Add Income
              </h3>
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowAddIncome(false)}
                aria-label="Close"
                style={{ color: vars.muted }}
              >
                <X size={18} />
              </button>
            </div>

            {/* body */}
            <form onSubmit={(e) => handleSave(e, false)} className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm" style={{ color: vars.muted }}>
                    Income No.
                  </label>
                  <div className="flex items-center gap-3 mt-1">
                    <input
                      name="incomeNo"
                      value={form.incomeNo}
                      onChange={(e) => setForm((prev) => ({ ...prev, incomeNo: e.target.value }))}
                      className="w-full rounded-lg px-4 py-2"
                      style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                    />
                    <span className="text-sm font-medium" style={{ color: vars.primary }}>
                      Manual
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-sm" style={{ color: vars.muted }}>
                    Date
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full rounded-lg px-4 py-2 pr-10"
                      style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: vars.muted }}>
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm" style={{ color: vars.muted }}>
                  Income Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg px-4 py-3"
                  style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button type="button" onClick={addIncomeItem} style={{ color: vars.primary, fontWeight: 600 }} className="inline-flex items-center gap-2">
                  <Plus size={14} /> Add Income Item
                </button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {form.items.length === 0 && <div className="text-sm" style={{ color: vars.muted }}>No items added yet.</div>}

                {form.items.map((it, idx) => (
                  <div key={idx} className="border rounded-lg p-3" style={{ borderColor: vars.border }}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium" style={{ color: vars.text }}>Item {idx + 1}</div>
                      <button type="button" onClick={() => removeIncomeItem(idx)} className="text-sm" style={{ color: "#dc2626" }}>
                        Remove
                      </button>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      <input
                        placeholder="Description"
                        className="col-span-3 rounded px-3 py-2"
                        value={it.description || ""}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                        style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                      />
                      <input
                        placeholder="Qty"
                        className="col-span-1 rounded px-3 py-2"
                        value={it.qty || ""}
                        onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                        style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                      />
                      <input
                        placeholder="Rate"
                        className="col-span-1 rounded px-3 py-2"
                        value={it.rate || ""}
                        onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                        style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                      />
                      <input
                        placeholder="Amount"
                        className="col-span-1 rounded px-3 py-2"
                        value={it.amount || ""}
                        readOnly
                        style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <label className="text-sm" style={{ color: vars.muted }}>Total Amount</label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0" style={{ borderColor: vars.border, background: "var(--surface-100,#f8fafc)" }}>
                      Rs.
                    </span>
                    <input
                      name="totalAmount"
                      value={form.totalAmount}
                      onChange={handleChange}
                      className="w-full rounded-r-lg px-4 py-2"
                      style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm" style={{ color: vars.muted }}>Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={form.paymentMethod}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg px-4 py-2"
                    style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                  >
                    <option>Cash</option>
                    <option>Bank Transfer</option>
                    <option>Card</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-sm" style={{ color: vars.muted }}>Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks here..."
                  className="mt-1 w-full rounded-lg px-4 py-3 min-h-[80px]"
                  style={{ border: `1px solid ${vars.border}`, background: "transparent", color: vars.text }}
                />
              </div>

              {/* Attachments */}
              <div className="flex items-center gap-4">
                <label className="w-20 h-20 rounded border border-dashed flex items-center justify-center cursor-pointer" title="Attach image" style={{ borderColor: vars.border }}>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div className="flex flex-col items-center text-sm" style={{ color: vars.muted }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-1">
                      <path d="M4 7h4l2-2h4l2 2h4v12H4V7z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                    Camera
                  </div>
                </label>

                <div className="flex gap-2 overflow-x-auto">
                  {form.attachments.map((f, i) => {
                    const url = URL.createObjectURL(f);
                    return (
                      <div key={i} className="relative w-20 h-20 rounded overflow-hidden border" style={{ borderColor: vars.border }}>
                        <img src={url} alt={f.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeAttachment(i)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow" style={{ border: `1px solid ${vars.border}` }}>
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>

            {/* footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t" style={{ borderColor: vars.border }}>
              <button onClick={(e) => handleSave(e, true)} className="px-4 py-2 rounded-lg" style={{ background: "transparent", border: `1px solid ${vars.border}`, color: vars.text }}>
                Save & New
              </button>

              <button onClick={(e) => handleSave(e, false)} className="px-5 py-2 rounded-lg" style={{ background: vars.primary, color: "#fff" }}>
                Save Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OtherIncomePage;
