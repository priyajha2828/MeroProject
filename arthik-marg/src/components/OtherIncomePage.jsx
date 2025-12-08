// src/components/OtherIncomePage.jsx
import React, { useState, useRef, useEffect } from "react";
import { Plus, X, Calendar } from "lucide-react";

/**
 * OtherIncomePage - behaves like PaymentIn / PaymentOut / Expense
 *
 * Props:
 *  - sidebarOpen → existing layout handling
 *  - directOpen  → true when opened from Dashboard Add More
 *  - embedded    → true when wrapped by Dashboard ModalShell (NO backdrop here)
 *  - onClose     → callback to close Dashboard modal
 */
export function OtherIncomePage({
  sidebarOpen,
  directOpen = false,
  embedded = false,
  onClose: parentOnClose
}) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [showAddIncome, setShowAddIncome] = useState(!!directOpen);
  useEffect(() => {
    if (directOpen) setShowAddIncome(true);
  }, [directOpen]);

  const [form, setForm] = useState({
    incomeNo: 1,
    date: new Date().toISOString().slice(0, 10),
    category: "",
    items: [],
    totalAmount: "",
    paymentMethod: "Cash",
    remarks: "",
    attachments: []
  });

  const categories = [
    "Grants & Funding",
    "Sponsorships",
    "Investments",
    "Commission"
  ];

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addIncomeItem() {
    setForm(prev => ({
      ...prev,
      items: [...prev.items, { description: "", qty: "", rate: "", amount: "" }]
    }));
  }

  function handleItemChange(idx, field, value) {
    setForm(prev => {
      const items = [...prev.items];
      items[idx] = { ...(items[idx] || {}), [field]: value };

      const qty = parseFloat(items[idx].qty) || 0;
      const rate = parseFloat(items[idx].rate) || 0;
      items[idx].amount = qty && rate ? (qty * rate).toFixed(2) : "";

      return { ...prev, items };
    });
  }

  function removeIncomeItem(idx) {
    setForm(prev => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx)
    }));
  }

  function handleFileChange(e) {
    const files = [...e.target.files];
    setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  }

  function removeAttachment(i) {
    setForm(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, idx) => idx !== i)
    }));
  }

  function calculateTotal() {
    const total = form.items.reduce(
      (sum, it) => sum + (parseFloat(it.amount) || 0),
      0
    );
    return total ? total.toFixed(2) : "";
  }

  function resetForm() {
    setForm({
      incomeNo: form.incomeNo + 1,
      date: new Date().toISOString().slice(0, 10),
      category: "",
      items: [],
      totalAmount: "",
      paymentMethod: "Cash",
      remarks: "",
      attachments: []
    });
  }

  function handleSave(resetAfter = false) {
    const totalAmount = calculateTotal();
    const payload = { ...form, totalAmount };

    console.log("Saving Income →", payload);

    if (!resetAfter) {
      setShowAddIncome(false);
      if (parentOnClose) parentOnClose(); // closing Dashboard modal
    } else {
      resetForm();
    }
  }

  // Focus first field on open
  const firstInputRef = useRef(null);
  useEffect(() => {
    if (showAddIncome && firstInputRef.current) firstInputRef.current.focus();
  }, [showAddIncome]);

  /* ----------------------- PANEL CONTENT (NO BACKDROP) ---------------------- */
  const Panel = (
    <div
      className="w-full max-w-[820px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">
          Add Income
        </h3>

        {!embedded && (
          <button
            onClick={() => {
              setShowAddIncome(false);
              if (parentOnClose) parentOnClose();
            }}
            className="text-gray-500 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Body */}
      <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "64vh" }}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-700">Income No.</label>
            <div className="flex items-center gap-3 mt-1">
              <input
                ref={firstInputRef}
                name="incomeNo"
                value={form.incomeNo}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2"
              />
              <span className="text-sm font-medium text-[#174552]">Manual</span>
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Date</label>
            <div className="relative mt-1">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-200 px-4 py-2 pr-10"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Calendar size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Category */}
        <div className="mt-4">
          <label className="text-sm text-gray-700">Income Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="mt-1 w-full rounded-lg border border-green-200 px-4 py-3"
          >
            <option value="">Select category</option>
            {categories.map(c => (
              <option value={c} key={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Add item */}
        <div className="mt-4">
          <button
            type="button"
            onClick={addIncomeItem}
            className="inline-flex items-center gap-2 text-[#174552] font-medium"
          >
            <Plus size={16} /> Add Income Item
          </button>
        </div>

        {/* Income Items */}
        <div className="space-y-3 mt-4">
          {form.items.length === 0 ? (
            <div className="text-sm text-gray-500">No items added yet.</div>
          ) : (
            form.items.map((it, idx) => (
              <div key={idx} className="border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">Item {idx + 1}</span>
                  <button
                    type="button"
                    className="text-sm text-red-500"
                    onClick={() => removeIncomeItem(idx)}
                  >
                    Remove
                  </button>
                </div>

                <div className="grid grid-cols-6 gap-2">
                  <input
                    placeholder="Description"
                    className="col-span-3 rounded border border-gray-200 px-3 py-2"
                    value={it.description}
                    onChange={e =>
                      handleItemChange(idx, "description", e.target.value)
                    }
                  />
                  <input
                    placeholder="Qty"
                    className="col-span-1 rounded border border-gray-200 px-3 py-2"
                    value={it.qty}
                    onChange={e =>
                      handleItemChange(idx, "qty", e.target.value)
                    }
                  />
                  <input
                    placeholder="Rate"
                    className="col-span-1 rounded border border-gray-200 px-3 py-2"
                    value={it.rate}
                    onChange={e =>
                      handleItemChange(idx, "rate", e.target.value)
                    }
                  />
                  <input
                    placeholder="Amount"
                    readOnly
                    className="col-span-1 rounded border border-gray-200 px-3 py-2"
                    value={it.amount}
                  />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total + Payment Method */}
        <div className="grid grid-cols-2 gap-4 border-t pt-4 mt-4">
          <div>
            <label className="text-sm text-gray-700">Total Amount</label>
            <div className="mt-1 flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-gray-200 border-r-0 bg-gray-50">
                Rs.
              </span>
              <input
                name="totalAmount"
                value={calculateTotal()}
                readOnly
                className="w-full rounded-r-lg border border-gray-200 px-4 py-2"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={form.paymentMethod}
              onChange={handleChange}
              className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2"
            >
              <option>Cash</option>
              <option>Bank Transfer</option>
              <option>Card</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        {/* Remarks */}
        <div className="mt-4">
          <label className="text-sm text-gray-700">Remarks</label>
          <textarea
            name="remarks"
            value={form.remarks}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 min-h-[80px]"
            placeholder="Enter remarks here..."
          />
        </div>

        {/* Attachments */}
        <div className="flex items-center gap-4 mt-4">
          <label className="w-20 h-20 border border-dashed rounded flex items-center justify-center cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center text-sm text-gray-500">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 7h4l2-2h4l2 2h4v12H4V7z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle
                  cx="12"
                  cy="13"
                  r="3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
              Camera
            </div>
          </label>

          <div className="flex gap-2">
            {form.attachments.map((f, i) => {
              const url = URL.createObjectURL(f);
              return (
                <div
                  key={i}
                  className="relative w-20 h-20 rounded overflow-hidden border"
                >
                  <img
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeAttachment(i)}
                    className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow"
                  >
                    <X size={12} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sticky Footer */}
      <div className="px-6 py-4 border-t bg-white flex justify-end gap-3">
        <button
          onClick={() => handleSave(true)}
          className="px-4 py-2 rounded-md bg-white border text-gray-700"
        >
          Save & New
        </button>

        <button
          onClick={() => handleSave(false)}
          className="px-5 py-2 rounded-md bg-emerald-500 text-white"
        >
          Save Income
        </button>
      </div>
    </div>
  );

  /* ----------------------- RENDER LOGIC ---------------------- */

  // Dashboard → Add More (embedded panel only)
  if (directOpen && embedded) {
    return showAddIncome ? Panel : null;
  }

  // Dashboard but not embedded (rare)
  if (directOpen && !embedded) {
    return (
      showAddIncome && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto">
          <div className="mt-8">{Panel}</div>
        </div>
      )
    );
  }

  // Regular page view
  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
      style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
    >
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-4">
        <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" fill="#E5E7EB" />
          <rect x="55" y="40" width="90" height="30" rx="6" fill="#9CA3AF" />
          <rect x="55" y="75" width="90" height="90" rx="10" fill="white" />
        </svg>

        <h2 className="text-2xl font-bold text-gray-800">Create Your First Income</h2>

        <p className="text-gray-500 text-base max-w-md">
          Click on the create income button and start managing your incomes
        </p>

        <button
          onClick={() => setShowAddIncome(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#174552] text-white rounded-lg font-semibold hover:bg-[#11303F]"
        >
          <Plus size={20} /> Add New Income
        </button>
      </div>

      {/* Page-level modal */}
      {showAddIncome && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto"
          style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
        >
          <div className="mt-8">{Panel}</div>
        </div>
      )}
    </div>
  );
}
