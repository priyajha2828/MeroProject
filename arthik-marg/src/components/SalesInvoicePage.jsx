import React, { useEffect, useRef, useState } from "react";
import { Plus, Trash2, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * SalesInvoicePage
 * - Shows a centered empty state first.
 * - Clicking "Create Sales Invoice" opens the full form in-place.
 * - Honours `sidebarOpen` passed by App.jsx.
 */
export default function SalesInvoicePage({ sidebarOpen = true }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const navigate = useNavigate();

  // UI: show initial empty state or form
  const [showForm, setShowForm] = useState(false);

  // ----- form state -----
  const [partyQuery, setPartyQuery] = useState("");
  const [partyOpen, setPartyOpen] = useState(false);
  const [selectedParty, setSelectedParty] = useState({ id: "cash", name: "Cash Sale" });

  const [invoiceNo, setInvoiceNo] = useState("1");
  const [invoiceDate, setInvoiceDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });

  const [items, setItems] = useState([
    { id: Date.now(), name: "", qty: 1, rate: "", discountPercent: "", discountRs: "" },
  ]);

  const [notes, setNotes] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [attachments, setAttachments] = useState([]);
  const [uploadPreviews, setUploadPreviews] = useState([]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const partyInputRef = useRef(null);

  const sampleParties = [
    { id: "cash", name: "Cash Sale", emoji: "💵" },
    { id: "party_1", name: "Sai Traders" },
    { id: "party_2", name: "Ramesh & Co." },
    { id: "party_3", name: "ABC Enterprises" },
  ];

  // ----- amounts -----
  const computeRowAmount = (row) => {
    const qty = Number(row.qty || 0);
    const rate = Number(row.rate || 0);
    const gross = qty * rate;
    const dRs = Number(row.discountRs || 0);
    const dPct = Number(row.discountPercent || 0);
    let discount = 0;
    if (dRs > 0) discount = dRs;
    else if (dPct > 0) discount = (dPct / 100) * gross;
    const net = Math.max(0, gross - discount);
    return net;
  };

  const subtotal = items.reduce((s, it) => s + computeRowAmount(it), 0);
  const totalAmount = subtotal;

  // handlers
  const addBillingItem = () => {
    setItems((p) => [
      ...p,
      { id: Date.now() + Math.random(), name: "", qty: 1, rate: "", discountPercent: "", discountRs: "" },
    ]);
  };

  const updateItem = (idx, patch) => {
    setItems((prev) => prev.map((r, i) => (i === idx ? { ...r, ...patch } : r)));
  };

  const removeItem = (idx) => {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const onAttachFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    setAttachments((p) => [...p, ...files]);

    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setUploadPreviews((p) => [...p, { name: f.name, url: ev.target.result }]);
      };
      reader.readAsDataURL(f);
    });

    // reset input value if needed
    e.target.value = null;
  };

  const removePreview = (idx) => {
    setUploadPreviews((p) => p.filter((_, i) => i !== idx));
    setAttachments((p) => p.filter((_, i) => i !== idx));
  };

  const handleSave = (e) => {
    e?.preventDefault();

    if (!selectedParty) {
      setError("Please select a party or Cash Sale.");
      return;
    }
    if (!invoiceNo || invoiceNo.trim() === "") {
      setError("Please enter invoice number.");
      return;
    }
    if (!items.length) {
      setError("Add at least one billing item.");
      return;
    }
    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      if (!it.name || it.name.trim() === "") {
        setError(`Enter item name for line ${i + 1}`);
        return;
      }
      if (!it.rate || Number(it.rate) <= 0) {
        setError(`Enter a valid rate for line ${i + 1}`);
        return;
      }
    }

    setError("");
    setSaving(true);

    setTimeout(() => {
      setSaving(false);
      alert(`Invoice ${invoiceNo} saved. Total Rs. ${totalAmount.toLocaleString()}`);
      // after saving you can either clear form or go back
      setShowForm(false);
      // optionally reset form:
      setItems([{ id: Date.now(), name: "", qty: 1, rate: "", discountPercent: "", discountRs: "" }]);
      setNotes("");
      setAttachments([]);
      setUploadPreviews([]);
    }, 900);
  };

  // party search
  const filteredParties = sampleParties.filter((p) => p.name.toLowerCase().includes(partyQuery.toLowerCase()));
  useEffect(() => {
    if (partyOpen) partyInputRef.current?.focus();
  }, [partyOpen]);

  // initial empty state UI (centered)
  const EmptyState = () => (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6">
        <div className="relative flex flex-col items-center mb-4">
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-32 bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center p-3 shadow-sm relative -top-2">
              <div className="w-full h-8 bg-gray-200 rounded-t-md mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-20 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-full h-2 bg-gray-100 rounded mt-auto mb-1"></div>
              <div className="w-2/3 h-2 bg-gray-100 rounded mr-auto"></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800">Create Your First Sales Invoice</h2>

        <p className="text-gray-500 text-base max-w-md">
          Click on the create sales invoice button and start managing your sales invoices.
        </p>

        <div className="flex items-center gap-4 pt-2">
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold shadow-sm transition-colors"
          >
            <Plus size={18} /> Create Sales Invoice
          </button>
        </div>
      </div>
    </div>
  );

  // main form UI
  const FormUI = () => (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setShowForm(false)}
          className="text-gray-600 hover:text-gray-800 p-2 rounded"
          aria-label="Back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-semibold">Create Sales Invoice</h1>
      </div>

      <form onSubmit={handleSave}>
        {/* top row */}
        <div className="grid grid-cols-12 gap-4 items-start mb-6">
          <div className="col-span-6">
            <label className="block text-sm font-medium mb-2">Select Party</label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setPartyOpen((s) => !s)}
                className="w-full text-left border-2 border-emerald-300 rounded-lg px-3 py-2 flex items-center justify-between bg-white"
                aria-haspopup="listbox"
              >
                <div className="text-gray-600">{selectedParty ? selectedParty.name : "Search for party"}</div>
                <div className="text-gray-400">▾</div>
              </button>

              {partyOpen && (
                <div className="absolute left-0 mt-2 w-full bg-white border rounded-lg shadow-lg z-40">
                  <div className="p-2">
                    <input
                      ref={partyInputRef}
                      value={partyQuery}
                      onChange={(e) => setPartyQuery(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                      placeholder="Search for party"
                      aria-label="Search parties"
                    />
                  </div>

                  <ul role="listbox" className="max-h-56 overflow-auto">
                    {filteredParties.map((p) => (
                      <li key={p.id}>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedParty(p);
                            setPartyOpen(false);
                            setPartyQuery("");
                          }}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                        >
                          <div className="text-sm">{p.emoji || "👤"}</div>
                          <div className="text-sm">{p.name}</div>
                        </button>
                      </li>
                    ))}
                    {filteredParties.length === 0 && (
                      <li className="px-4 py-3 text-sm text-gray-500">No parties found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-6 grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Invoice No</label>
              <input value={invoiceNo} onChange={(e) => setInvoiceNo(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium mb-2">Invoice Date</label>
              <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} className="w-full border rounded px-3 py-2" />
            </div>
          </div>
        </div>

        {/* items table */}
        <div className="bg-white border rounded-lg overflow-hidden mb-6">
          <table className="w-full table-fixed text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="w-12 p-3 text-left">S.N.</th>
                <th className="p-3 text-left">Name</th>
                <th className="w-28 p-3 text-left">Quantity</th>
                <th className="w-36 p-3 text-left">Rate (Rs.)</th>
                <th className="w-40 p-3 text-left">Discount</th>
                <th className="w-36 p-3 text-right">Amount (Rs.)</th>
                <th className="w-12 p-3"></th>
              </tr>
            </thead>

            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id} className="border-t">
                  <td className="p-3 align-top">{idx + 1}</td>

                  <td className="p-3">
                    <input value={it.name} onChange={(e) => updateItem(idx, { name: e.target.value })} placeholder="Enter Item name" className="w-full border rounded px-3 py-2" />
                  </td>

                  <td className="p-3">
                    <input type="number" min="0" value={it.qty} onChange={(e) => updateItem(idx, { qty: e.target.value })} className="w-full border rounded px-3 py-2" />
                  </td>

                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">Rs.</span>
                      <input type="number" min="0" value={it.rate} onChange={(e) => updateItem(idx, { rate: e.target.value })} className="w-full border rounded px-3 py-2" />
                    </div>
                  </td>

                  <td className="p-3">
                    <div className="flex gap-2 items-center">
                      <input type="number" min="0" max="100" value={it.discountPercent} onChange={(e) => updateItem(idx, { discountPercent: e.target.value, discountRs: "" })} placeholder="%" className="w-1/3 border rounded px-2 py-2" />
                      <span className="text-sm text-gray-500">%</span>
                      <div className="flex items-center gap-2 ml-2">
                        <span className="text-sm text-gray-500">Rs.</span>
                        <input type="number" min="0" value={it.discountRs} onChange={(e) => updateItem(idx, { discountRs: e.target.value, discountPercent: "" })} placeholder="Rs." className="w-2/3 border rounded px-2 py-2" />
                      </div>
                    </div>
                  </td>

                  <td className="p-3 text-right align-top">Rs. {Number(computeRowAmount(it)).toLocaleString()}</td>

                  <td className="p-3 text-right align-top">
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-600 p-1 rounded hover:bg-red-50">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}

              <tr>
                <td colSpan={7} className="p-3">
                  <button type="button" onClick={addBillingItem} className="text-emerald-600 inline-flex items-center gap-2">
                    <Plus size={14} /> Add Billing Item
                  </button>
                </td>
              </tr>

              <tr className="bg-gray-50">
                <td colSpan={5} className="p-3 text-right font-semibold">Sub Total</td>
                <td className="p-3 text-right font-semibold">Rs. {Number(subtotal).toLocaleString()}</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* notes + attach + totals + payment mode */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-7">
            <label className="block text-sm font-medium mb-2">Notes or Remarks</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Enter note or description..." className="w-full border rounded px-3 py-3 min-h-[120px]" />

            <div className="mt-4">
              <label className="block text-sm font-medium mb-2">Attach Images</label>
              <div className="flex items-center gap-3">
                <label className="w-16 h-16 border rounded-lg flex items-center justify-center text-gray-400 cursor-pointer">
                  <input type="file" accept="image/*" className="hidden" onChange={onAttachFiles} />
                  <div className="text-center">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M5 12h14" stroke="#6b7280" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </label>

                <div className="flex gap-3">
                  {uploadPreviews.map((p, idx) => (
                    <div key={idx} className="relative w-16 h-16 border rounded overflow-hidden">
                      <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removePreview(idx)} className="absolute top-0 right-0 bg-white p-1 rounded-bl">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-5">
            <div className="p-4 border rounded-lg mb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600">Total Amount</div>
                <div className="text-lg font-semibold">Rs. {Number(totalAmount).toLocaleString()}</div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Payment Mode</label>
                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} className="w-full border rounded px-3 py-2">
                  <option>Cash</option>
                  <option>Bank</option>
                  <option>Credit</option>
                </select>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border rounded">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded">
                  {saving ? "Saving..." : "Save & Create"}
                </button>
              </div>
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
          </div>
        </div>
      </form>
    </div>
  );

  // top-level layout: keeps left offset & width correct
  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white overflow-auto"
      style={{
        left: sidebarOffset,
        width: `calc(100% - ${sidebarOffset})`,
      }}
    >
      {!showForm ? <EmptyState /> : <FormUI />}
    </div>
  );
}
