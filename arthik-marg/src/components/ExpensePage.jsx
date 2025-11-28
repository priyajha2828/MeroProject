// ExpensePage.jsx
import React, { useState } from "react";
import { Plus, X, Calendar } from "lucide-react";

export function ExpensePage({ sidebarOpen }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [showAddExpense, setShowAddExpense] = useState(false);

  const [form, setForm] = useState({
    expenseNo: 1,
    date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    category: "",
    items: [
      // each item: { description, qty, rate, amount }
    ],
    totalAmount: "",
    paymentMethod: "Cash",
    remarks: "",
    attachments: [], // file objects
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleItemChange(index, field, value) {
    setForm(prev => {
      const items = [...prev.items];
      items[index] = { ...(items[index] || {}), [field]: value };
      const qty = parseFloat(items[index].qty) || 0;
      const rate = parseFloat(items[index].rate) || 0;
      items[index].amount = qty * rate || "";
      return { ...prev, items };
    });
  }

  function addExpenseItem() {
    setForm(prev => ({ ...prev, items: [...prev.items, { description: "", qty: "", rate: "", amount: "" }] }));
  }

  function removeExpenseItem(index) {
    setForm(prev => {
      const items = prev.items.filter((_, i) => i !== index);
      return { ...prev, items };
    });
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setForm(prev => ({ ...prev, attachments: [...prev.attachments, ...files] }));
  }

  function removeAttachment(idx) {
    setForm(prev => {
      const attachments = prev.attachments.filter((_, i) => i !== idx);
      return { ...prev, attachments };
    });
  }

  function recalcTotal() {
    const total = form.items.reduce((sum, it) => sum + (parseFloat(it.amount) || 0), 0);
    setForm(prev => ({ ...prev, totalAmount: total ? total.toFixed(2) : "" }));
  }

  function handleSave(e) {
    e.preventDefault();
    recalcTotal();
    // TODO: Replace with API call
    console.log("Saving expense:", form);
    setShowAddExpense(false);
    // optionally reset form here
  }

  // fixed category list requested
  const categories = [
    "Miscellaneous",
    "Travel & Transportation",
    "Repair & Maintenance",
    "Marketing",
    "Utilities",
    "Bank Fees",
    "Salaries and rent",
  ];

  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
      style={{
        left: sidebarOffset,
        width: `calc(100% - ${sidebarOffset})`,
      }}
    >
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6">

        {/* Illustration */}
        <div className="flex justify-center">
          <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="80" fill="#E5E7EB" />
            <rect x="55" y="40" width="90" height="30" rx="6" fill="#9CA3AF" />
            <rect x="55" y="75" width="90" height="90" rx="10" fill="white" />
            <rect x="65" y="90" width="50" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="105" width="70" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="120" width="60" height="6" rx="3" fill="#D1D5DB" />
            <rect x="65" y="135" width="40" height="6" rx="3" fill="#D1D5DB" />
          </svg>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">
          Create Your First Expense
        </h2>

        <p className="text-gray-500 text-base max-w-md">
          Click on the create expense button and start managing your expense
        </p>

        <button
          onClick={() => setShowAddExpense(true)}
          className="flex items-center gap-2 px-6 py-3 bg-[#27AE60] text-white rounded-lg font-semibold hover:bg-[#1E8C4D]"
        >
          <Plus size={20} />
          Add New Expense
        </button>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center"
          style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowAddExpense(false)} />

          <div className="relative z-10 mt-12 w-full max-w-3xl bg-white rounded-lg shadow-lg">
            {/* header */}
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Add Expense</h3>
              <button className="p-2 rounded hover:bg-gray-100" onClick={() => setShowAddExpense(false)}>
                <X size={18} />
              </button>
            </div>

            {/* body - scrollable */}
            <form onSubmit={handleSave} className="max-h-[70vh] overflow-y-auto px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-700">Expense No.</label>
                  <div className="flex items-center gap-3">
                    <input
                      name="expenseNo"
                      value={form.expenseNo}
                      onChange={(e) => setForm(prev => ({ ...prev, expenseNo: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2"
                    />
                    <span className="text-sm font-medium" style={{ color: "#174552" }}>
                        Manual
                    </span>

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

              {/* Category: use a select with the requested options */}
              <div>
                <label className="text-sm text-gray-700">Expense Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-green-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
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
                <button type="button" onClick={addExpenseItem} className="inline-flex items-center gap-2 text-[#174552] font-medium">
                  <Plus size={16} /> Add Expense Item
                </button>
              </div>

              {/* Items list */}
              <div className="space-y-3">
                {form.items.length === 0 && (
                  <div className="text-sm text-gray-500">No items added yet.</div>
                )}
                {form.items.map((it, idx) => (
                  <div key={idx} className="border rounded-lg p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm font-medium">Item {idx + 1}</div>
                      <button type="button" onClick={() => removeExpenseItem(idx)} className="text-sm text-red-500">Remove</button>
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
                      placeholder=""
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-700">Payment Method</label>
                  {/* fixed to Cash only */}
                  <input
                    name="paymentMethod"
                    value="Cash"
                    readOnly
                    className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2 bg-gray-50 text-gray-700"
                  />
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

              {/* attachments - camera icon as requested */}
              <div className="flex items-center gap-4">
                <label
                  className="w-20 h-20 rounded border border-dashed flex items-center justify-center cursor-pointer"
                  title="Attach image"
                >
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  <div className="flex flex-col items-center text-sm text-gray-500">
                    {/* camera icon (SVG) */}
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

            {/* footer actions - only Save Expense kept */}
            <div className="flex items-center justify-end gap-3 p-4 border-t">
              <button onClick={handleSave} className="px-5 py-2 rounded-lg bg-[#174552] text-white">Save Expense</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
