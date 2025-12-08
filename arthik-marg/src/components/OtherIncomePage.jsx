// src/components/OtherIncomePage.jsx
import React, { useEffect, useRef, useState } from "react";
import { Plus, X, Calendar, Camera } from "lucide-react";

/* CategorySelect: blue-highlight full-width list, no search */
function CategorySelect({ value, onChange, categories = [] }) {
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const rootRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (open) {
      const el = listRef.current?.children?.[highlight];
      if (el) el.scrollIntoView({ block: "nearest" });
    } else {
      setHighlight(0);
    }
  }, [open, highlight]);

  function onKeyDown(e) {
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, categories.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const sel = categories[highlight];
      if (sel) {
        onChange(sel);
        setOpen(false);
      }
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  return (
    <div
      className="relative"
      ref={rootRef}
      onKeyDown={onKeyDown}
      tabIndex={0}
      aria-haspopup="listbox"
      aria-expanded={open}
      style={{ outline: "none" }}
    >
      {/* Control */}
      <div
        className="w-full px-3 py-3 border rounded-md flex items-center justify-between cursor-pointer"
        style={{ borderColor: "rgba(34,197,94,0.25)", background: "#fff" }}
        onClick={() => setOpen((s) => !s)}
        role="button"
      >
        <div style={{ minWidth: 0 }}>
          {value ? (
            <div className="truncate text-gray-800">{value}</div>
          ) : (
            <div className="text-gray-400">Search for category</div>
          )}
        </div>

        {/* Arrow button (clickable) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen((s) => !s);
          }}
          className="ml-2 p-1 rounded"
          aria-label="Toggle categories"
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          ▾
        </button>
      </div>

      {/* Dropdown list */}
      {open && (
        <div
          className="absolute z-40 mt-2 w-full bg-white border rounded-md overflow-hidden"
          style={{ borderColor: "rgba(0,0,0,0.08)", boxShadow: "none" }}
          role="listbox"
        >
          <div ref={listRef} className="max-h-48 overflow-auto">
            {categories.map((cat, i) => {
              const isHighlighted = i === highlight;
              return (
                <div
                  key={cat}
                  onMouseEnter={() => setHighlight(i)}
                  onClick={() => {
                    onChange(cat);
                    setOpen(false);
                  }}
                  className={`px-4 py-3 cursor-pointer select-none ${isHighlighted ? "bg-blue-600 text-white" : "text-gray-800"}`}
                  style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}
                >
                  <div className="truncate">{cat}</div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* OtherIncomePage - page + modal */
export function OtherIncomePage({ sidebarOpen = true }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [showAddIncome, setShowAddIncome] = useState(false);
  const [incomes, setIncomes] = useState([]);

  // form state
  const [incomeNo, setIncomeNo] = useState(1);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [remarks, setRemarks] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [items, setItems] = useState([]);

  const categories = [
    "Grants & Funding",
    "Sponsorships",
    "Investments",
    "Commission",
    "Interest",
    "Rent",
    "Refund",
    "Other",
  ];

  // computed total
  const total = items.reduce((sum, it) => sum + (parseFloat(it.amount || 0) || 0), 0);

  useEffect(() => {
    setIncomeNo((n) => (n || 1));
  }, []);

  function addItem() {
    setItems((prev) => [...prev, { desc: "", qty: "", rate: "", amount: "" }]);
  }

  function updateItem(idx, field, value) {
    setItems((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };

      const qty = parseFloat(next[idx].qty) || 0;
      const rate = parseFloat(next[idx].rate) || 0;
      next[idx].amount = qty && rate ? (qty * rate).toFixed(2) : next[idx].amount || "";
      return next;
    });
  }

  function removeItem(idx) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  function handleAttach(e) {
    const files = Array.from(e.target.files || []);
    if (files.length) setAttachments((prev) => [...prev, ...files]);
    e.target.value = null;
  }

  function removeAttachment(i) {
    setAttachments((prev) => prev.filter((_, idx) => idx !== i));
  }

  function handleSave(e) {
    e?.preventDefault?.();

    if (!category && items.length === 0) {
      alert("Please select a category or add at least one income item.");
      return;
    }

    const payload = {
      incomeNo,
      date,
      category,
      paymentMethod,
      remarks,
      items,
      total: parseFloat(total.toFixed ? total.toFixed(2) : total),
      attachments,
    };

    console.log("Saving income", payload);

    setIncomes((prev) => [{ id: Date.now(), ...payload }, ...prev]);

    // reset & close
    setItems([]);
    setCategory("");
    setPaymentMethod("Cash");
    setRemarks("");
    setAttachments([]);
    setShowAddIncome(false);
    setIncomeNo((n) => n + 1);
  }

  return (
    <>
      {/* Main area */}
      <div
        className="fixed top-16 right-0 bottom-0 overflow-auto flex flex-col items-center justify-center"
        style={{
          left: sidebarOffset,
          width: `calc(100% - ${sidebarOffset})`,
          background: "#fff",
        }}
      >
        {incomes.length === 0 ? (
          <div className="flex flex-col items-center text-center px-4">
            <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="" className="w-40 h-40 opacity-90 mb-6" />
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Create Your First Income</h2>
            <p className="text-gray-500 max-w-sm mb-6">Click on the create income button and start managing your incomes</p>

            <button
              onClick={() => setShowAddIncome(true)}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
            >
              <Plus size={16} />
              Add New Income
            </button>
          </div>
        ) : (
          <div className="p-6 w-full max-w-4xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Other Income</h2>
              <button onClick={() => setShowAddIncome(true)} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                <Plus size={16} /> Add Income
              </button>
            </div>

            <div className="space-y-3">
              {incomes.map((inc) => (
                <div key={inc.id} className="border rounded-md p-3" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                  <div className="flex justify-between">
                    <div>
                      <div className="font-medium">Rs. {inc.total}</div>
                      <div className="text-sm text-gray-500">{inc.category || "-"}</div>
                    </div>
                    <div className="text-sm text-gray-500">{inc.date}</div>
                  </div>
                  {inc.remarks && <div className="mt-2 text-sm text-gray-600">{inc.remarks}</div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Income Modal */}
      {showAddIncome && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-auto" style={{ paddingTop: "2.5rem", paddingLeft: sidebarOffset }}>
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={() => setShowAddIncome(false)} style={{ background: "rgba(0,0,0,0.35)" }} aria-hidden="true" />

          {/* Modal panel */}
          <div
            className="relative z-10 bg-white rounded-md mx-4"
            role="dialog"
            aria-modal="true"
            aria-label="Add Income"
            style={{
              width: "720px",
              maxWidth: "calc(100% - 48px)",
              maxHeight: "80vh",
              overflow: "hidden",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 10,
              boxShadow: "0 8px 40px rgba(2,6,23,0.08)",
            }}
          >
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.04)" }}>
              <h3 className="text-lg font-semibold">Add Income</h3>
              <button onClick={() => setShowAddIncome(false)} className="p-2 rounded hover:bg-gray-100" aria-label="Close">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-4 overflow-y-auto" style={{ maxHeight: "calc(80vh - 140px)" }}>
              <form onSubmit={handleSave} className="space-y-4">
                {/* Income No & Date */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Income No.</label>
                    <div className="mt-2 flex items-center gap-3">
                      <input value={incomeNo} onChange={(e) => setIncomeNo(e.target.value)} className="w-full rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                      <span className="text-sm text-green-600 font-medium">Manual</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Date</label>
                    <div className="mt-2 relative">
                      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-md px-3 py-2 border pr-10" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                      <div className="absolute right-3 top-2.5 text-gray-500">
                        <Calendar size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Income Category</label>
                  <div className="mt-2">
                    <CategorySelect value={category} onChange={setCategory} categories={categories} />
                  </div>
                </div>

                {/* Add Income Item */}
                <div>
                  <button type="button" onClick={addItem} className="flex items-center gap-2 text-green-600 font-medium">
                    <Plus size={14} /> Add Income Item
                  </button>
                </div>

                {/* Items list */}
                {items.map((it, idx) => (
                  <div key={idx} className="bg-white border rounded-md p-3 mt-2" style={{ borderColor: "rgba(0,0,0,0.04)" }}>
                    <div className="flex justify-between items-start gap-3">
                      <div className="flex-1">
                        <label className="text-sm text-gray-600">Description</label>
                        <input value={it.desc} onChange={(e) => updateItem(idx, "desc", e.target.value)} className="w-full mt-1 rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                      </div>

                      <div className="w-24">
                        <label className="text-sm text-gray-600">Qty</label>
                        <input value={it.qty} onChange={(e) => updateItem(idx, "qty", e.target.value)} className="w-full mt-1 rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)" }} type="number" min="0" />
                      </div>

                      <div className="w-28">
                        <label className="text-sm text-gray-600">Rate</label>
                        <input value={it.rate} onChange={(e) => updateItem(idx, "rate", e.target.value)} className="w-full mt-1 rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)" }} type="number" min="0" step="0.01" />
                      </div>

                      <div className="w-28">
                        <label className="text-sm text-gray-600">Amount</label>
                        <input value={it.amount} readOnly className="w-full mt-1 rounded-md px-3 py-2 border bg-gray-50" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                      </div>

                      <div className="pt-6">
                        <button type="button" onClick={() => removeItem(idx)} className="text-red-500 hover:text-red-600 p-1">
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }} />

                {/* Total & Payment method */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Total Amount</label>
                    <div className="mt-2 flex">
                      <span className="inline-flex items-center px-3 rounded-l-md border border-r-0" style={{ background: "#f8fafc", borderColor: "rgba(0,0,0,0.06)" }}>Rs.</span>
                      <input value={total ? total.toFixed(2) : ""} readOnly className="w-full rounded-r-md px-3 py-2 border bg-gray-50" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700">Payment Method</label>
                    <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="mt-2 w-full rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <option>Cash</option>
                      <option>Bank</option>
                      <option>Mobile Wallet</option>
                    </select>
                  </div>
                </div>

                {/* Remarks */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Remarks</label>
                  <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full mt-2 rounded-md px-3 py-2 border" style={{ borderColor: "rgba(0,0,0,0.06)", background: "#fff" }} />
                </div>

                {/* Attachments */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Attachments</label>
                  <div className="mt-2 flex items-center gap-3">
                    <label className="flex items-center gap-2 px-3 py-2 border rounded-md cursor-pointer" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                      <Camera size={16} />
                      <span className="text-sm">Upload</span>
                      <input type="file" onChange={handleAttach} className="hidden" multiple />
                    </label>

                    <div className="flex flex-wrap gap-2">
                      {attachments.map((f, i) => (
                        <div key={i} className="px-3 py-1 border rounded-md text-sm flex items-center gap-2" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                          <span className="truncate max-w-xs">{f.name}</span>
                          <button type="button" onClick={() => removeAttachment(i)} className="text-gray-500 hover:text-red-500">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </form>
            </div>

            {/* Sticky footer */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.04)" }}>
              <div className="px-6 py-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddIncome(false)} className="px-4 py-2 rounded-md border">Cancel</button>
                <button type="button" onClick={handleSave} className="px-6 py-2 rounded-md bg-green-600 text-white">Save Income</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default OtherIncomePage;
