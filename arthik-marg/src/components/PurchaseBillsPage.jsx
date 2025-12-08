// src/components/PurchaseBillsPage.jsx
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

const CUSTOM_BLUE = "bg-[#172554]";

export function PurchaseBillsPage() {
  const [showCreate, setShowCreate] = useState(false);

  const [form, setForm] = useState({
    billNo: 1,
    date: new Date().toISOString().slice(0, 10),
    vendor: "",
    items: [{ name: "", qty: 1, rate: 0, amount: 0 }],
    notes: "",
    total: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function handleItemChange(idx, field, value) {
    setForm((p) => {
      const items = [...p.items];
      items[idx] = { ...(items[idx] || {}), [field]: value };

      const qty = Number(items[idx].qty) || 0;
      const rate = Number(items[idx].rate) || 0;
      items[idx].amount = qty * rate;

      const total = items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
      return { ...p, items, total };
    });
  }

  function addItem() {
    setForm((p) => ({ ...p, items: [...p.items, { name: "", qty: 1, rate: 0, amount: 0 }] }));
  }

  function removeItem(i) {
    setForm((p) => {
      const items = p.items.filter((_, idx) => idx !== i);
      const total = items.reduce((s, it) => s + (Number(it.amount) || 0), 0);
      return { ...p, items, total };
    });
  }

  function resetForm(nextBill = false) {
    setForm({
      billNo: nextBill ? form.billNo + 1 : 1,
      date: new Date().toISOString().slice(0, 10),
      vendor: "",
      items: [{ name: "", qty: 1, rate: 0, amount: 0 }],
      notes: "",
      total: 0,
    });
  }

  function handleSave(e, saveNew = false) {
    e?.preventDefault?.();
    // Here you'd call your API to save `form`.
    console.log("Saving Purchase Bill", form);

    if (saveNew) {
      resetForm(true);
      return;
    }

    setShowCreate(false);
    resetForm(false);
  }

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-[60vh]">
      {/* Illustration / empty state */}
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 p-4">
        <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">Create Your First Purchase Bill</h2>
        <p className="text-gray-500 text-base max-w-md">
          Click on the Create Purchase Bill button and start managing your purchases.
        </p>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => setShowCreate(true)}
            className={`flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold hover:bg-[#111A31] shadow-sm transition-colors`}
          >
            <Plus size={20} />
            Create Purchase Bill
          </button>
        </div>
      </div>

      {/* =========================
           CENTERED MODAL (updated)
         ========================= */}
      {showCreate && (
        <div className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg max-h-[90vh] overflow-hidden">
            {/* close */}
            <button
              onClick={() => setShowCreate(false)}
              className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {/* scrollable body */}
            <div className="p-6 overflow-y-auto max-h-[82vh]">
              <h3 className="text-xl font-semibold mb-4">New Purchase Bill</h3>

              <form onSubmit={(e) => handleSave(e, false)} className="space-y-4">
                {/* Basic row */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Bill No.</label>
                    <input
                      name="billNo"
                      value={form.billNo}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Vendor</label>
                    <input
                      name="vendor"
                      value={form.vendor}
                      onChange={handleChange}
                      placeholder="Search vendor..."
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
                    />
                  </div>
                </div>

                {/* Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium">Items</div>
                    <button type="button" onClick={addItem} className="text-sm text-[#174552]">+ Add Item</button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border border-gray-200 rounded">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-2 py-2 text-left">S.N.</th>
                          <th className="px-2 py-2 text-left">Name</th>
                          <th className="px-2 py-2 text-left">Qty</th>
                          <th className="px-2 py-2 text-left">Rate</th>
                          <th className="px-2 py-2 text-left">Amount</th>
                          <th className="px-2 py-2 text-left">Remove</th>
                        </tr>
                      </thead>

                      <tbody>
                        {form.items.map((it, idx) => (
                          <tr key={idx} className="border-b">
                            <td className="px-2 py-2">{idx + 1}</td>
                            <td className="px-2 py-2">
                              <input
                                value={it.name}
                                onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                                className="w-full px-1 py-1 border rounded"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="number"
                                min="1"
                                value={it.qty}
                                onChange={(e) => handleItemChange(idx, "qty", Number(e.target.value))}
                                className="w-20 px-1 py-1 border rounded"
                              />
                            </td>
                            <td className="px-2 py-2">
                              <input
                                type="number"
                                min="0"
                                value={it.rate}
                                onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                                className="w-24 px-1 py-1 border rounded"
                              />
                            </td>
                            <td className="px-2 py-2">Rs. {it.amount}</td>
                            <td className="px-2 py-2">
                              <button type="button" onClick={() => removeItem(idx)} className="text-red-600">Remove</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes & Total */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-700">Notes</label>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
                      className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <label className="text-sm text-gray-700">Total</label>
                    <div className="mt-1 text-2xl font-semibold">Rs. {form.total}</div>
                  </div>
                </div>

                {/* footer space to ensure content not hidden */}
              </form>
            </div>

            {/* footer actions */}
            <div className="flex items-center justify-end gap-3 px-6 py-4 border-t bg-white">
              <button onClick={(e) => handleSave(e, true)} className="px-4 py-2 rounded-md border bg-white">Save & New</button>
              <button onClick={(e) => handleSave(e, false)} className="px-5 py-2 rounded-md bg-[#072255] text-white">Save Purchase Bill</button>
              <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-md bg-gray-100">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PurchaseBillsPage;
