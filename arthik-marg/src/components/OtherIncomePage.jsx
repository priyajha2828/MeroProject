// components/OtherIncomePage.jsx
import React, { useState } from "react";
import { Plus, X, Calendar } from "lucide-react";

export function OtherIncomePage({ sidebarOpen }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [showAddIncome, setShowAddIncome] = useState(false);

  const [form, setForm] = useState({
    incomeNo: 1,
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    category: "",
    items: [],
    totalAmount: "",
    paymentMethod: "Cash",
    remarks: "",
    attachments: [],
  });

  const categories = [
    "Grants & Funding",
    "Sponsorships",
    "Investments",
    "Commission",
  ];

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function addIncomeItem() {
    setForm(prev => ({ ...prev, items: [...prev.items, { description: "", qty: "", rate: "", amount: "" }] }));
  }

  function handleItemChange(idx, field, value) {
    setForm(prev => {
      const items = [...prev.items];
      items[idx] = { ...(items[idx] || {}), [field]: value };
      const qty = parseFloat(items[idx].qty) || 0;
      const rate = parseFloat(items[idx].rate) || 0;
      items[idx].amount = qty * rate || "";
      return { ...prev, items };
    });
  }

  function removeIncomeItem(idx) {
    setForm(prev => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));
  }

  function recalcTotal() {
    const total = form.items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
    setForm(prev => ({ ...prev, totalAmount: total ? total.toFixed(2) : "" }));
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  }

  function removeAttachment(i) {
    setForm(prev => ({ ...prev, attachments: prev.attachments.filter((_, idx) => idx !== i) }));
  }

  function handleSave(e, resetAfter = false) {
    e?.preventDefault?.();
    recalcTotal();
    // TODO: send form to API
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

  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
      style={{
        left: sidebarOffset,
        width: `calc(100% - ${sidebarOffset})`,
      }}
    >
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-4">
        {/* Illustration */}
        <div className="flex justify-center">
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

        <h2 className="text-2xl font-bold text-gray-800">Create Your First Income</h2>

        <p className="text-gray-500 text-base max-w-md">
          Click on the create income button and start managing your incomes
        </p>

        <button
          onClick={() => setShowAddIncome(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#174552] text-white rounded-lg font-semibold hover:bg-[#11303F]"
        >
          <Plus size={20} />
          Add New Income
        </button>
      </div>

      {/* Add Income Modal */}
      {showAddIncome && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddIncome(false)} />

          <div className="relative z-10 mt-12 w-full max-w-3xl bg-white rounded-lg shadow-lg">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Add Income</h3>
              <button
                className="p-2 rounded hover:bg-gray-100"
                onClick={() => setShowAddIncome(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            {/* body (scrollable) */}
            <form onSubmit={(e) => handleSave(e, false)} className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Income No.</label>
                  <div className="flex items-center gap-3">
                    <input
                      name="incomeNo"
                      value={form.incomeNo}
                      onChange={(e) => setForm(prev => ({ ...prev, incomeNo: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-green-200 px-4 py-2 focus:outline-none"
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
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <Calendar size={16} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="text-sm text-gray-700">Income Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-green-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
                >
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <button type="button" onClick={addIncomeItem} className="inline-flex items-center gap-2 text-green-600 font-medium">
                  <Plus size={16} /> Add Income Item
                </button>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {form.items.length === 0 && <div className="text-sm text-gray-500">No items added yet.</div>}

                {form.items.map((it, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Item {idx + 1}</div>
                      <button type="button" onClick={() => removeIncomeItem(idx)} className="text-sm text-red-500">Remove</button>
                    </div>

                    <div className="grid grid-cols-6 gap-2">
                      <input
                        placeholder="Description"
                        className="col-span-3 rounded border border-gray-200 px-3 py-2"
                        value={it.description || ""}
                        onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                      />
                      <input
                        placeholder="Qty"
                        className="col-span-1 rounded border border-gray-200 px-3 py-2"
                        value={it.qty || ""}
                        onChange={(e) => handleItemChange(idx, "qty", e.target.value)}
                      />
                      <input
                        placeholder="Rate"
                        className="col-span-1 rounded border border-gray-200 px-3 py-2"
                        value={it.rate || ""}
                        onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                      />
                      <input
                        placeholder="Amount"
                        className="col-span-1 rounded border border-gray-200 px-3 py-2"
                        value={it.amount || ""}
                        readOnly
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 border-t pt-4">
                <div>
                  <label className="text-sm text-gray-700">Total Amount</label>
                  <div className="mt-1 flex">
                    <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-gray-200 bg-gray-50">Rs.</span>
                    <input
                      name="totalAmount"
                      value={form.totalAmount}
                      onChange={handleChange}
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

              <div>
                <label className="text-sm text-gray-700">Remarks</label>
                <textarea
                  name="remarks"
                  value={form.remarks}
                  onChange={handleChange}
                  placeholder="Enter remarks here..."
                  className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-3 min-h-[80px]"
                />
              </div>

              {/* Attachments with camera icon */}
              <div className="flex items-center gap-4">
                <label className="w-20 h-20 rounded border border-dashed flex items-center justify-center cursor-pointer" title="Attach image">
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div className="flex flex-col items-center text-sm text-gray-500">
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
                      <div key={i} className="relative w-20 h-20 rounded overflow-hidden border">
                        <img src={url} alt={f.name} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeAttachment(i)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
                          <X size={12} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </form>

            {/* footer */}
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button
                onClick={(e) => handleSave(e, true)}
                className="px-4 py-2 rounded-lg border bg-white text-gray-700"
              >
                Save & New
              </button>

              <button
                onClick={(e) => handleSave(e, false)}
                className="px-5 py-2 rounded-lg bg-[#174552] text-white"
              >
                Save Income
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
