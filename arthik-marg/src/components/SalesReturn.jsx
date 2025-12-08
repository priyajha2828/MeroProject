// src/components/SalesReturn.jsx
import React, { useEffect, useRef, useState } from "react";
import { Camera, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * SalesReturn
 * Props:
 *  - sidebarOpen (bool) : for page offset (optional)
 *  - directOpen (bool)  : open form immediately (used by Dashboard)
 *  - embedded (bool)    : when true, DO NOT render backdrop (parent provides ModalShell)
 *  - onClose (fn)       : callback to close parent wrapper (ModalShell)
 *
 * Default export kept for existing imports.
 */
export default function SalesReturn({
  sidebarOpen,
  directOpen = false,
  embedded = false,
  onClose: parentOnClose,
} = {}) {
  const navigate = useNavigate();

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  // whether the panel (form) is showing (init from directOpen)
  const [showPanel, setShowPanel] = useState(!!directOpen);
  useEffect(() => {
    if (directOpen) setShowPanel(true);
  }, [directOpen]);

  // data state
  const [returnsList, setReturnsList] = useState([]);

  // form state
  const [party, setParty] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  // focus first input when panel opens
  const firstInputRef = useRef(null);
  useEffect(() => {
    if (showPanel && firstInputRef.current) firstInputRef.current.focus();
  }, [showPanel]);

  const handleItemChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...(next[index] || {}), [field]: value };

      const qty = Number(next[index].quantity) || 0;
      const rate = Number(next[index].rate) || 0;
      const discount = Number(next[index].discount) || 0;
      next[index].amount = qty * rate - discount;

      return next;
    });
  };

  const addItem = () =>
    setItems((s) => [...s, { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);

  const removeItem = (index) => setItems((s) => s.filter((_, i) => i !== index));

  const subtotal = items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);

  const resetForm = () => {
    setParty("");
    setInvoiceDate("");
    setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
    setNotes("");
    setImage(null);
  };

  const onSave = (e, saveNew = false) => {
    e?.preventDefault?.();

    if (!party || !invoiceDate) {
      alert("Please fill required fields: Party and Invoice Date.");
      return;
    }

    const newReturn = {
      id: Date.now(),
      party,
      invoiceDate,
      items,
      notes,
      imageName: image ? image.name : null,
      subtotal,
    };

    setReturnsList((s) => [newReturn, ...s]);

    if (saveNew) {
      // keep panel open and reset
      resetForm();
      setShowPanel(true);
      return;
    }

    // close panel & notify parent or navigate back
    setShowPanel(false);
    if (parentOnClose) parentOnClose();
    else navigate(-1);
  };

  const closePanel = () => {
    setShowPanel(false);
    if (parentOnClose) parentOnClose();
    else navigate(-1);
  };

  /* ----------------- INNER PANEL (no backdrop) ------------------ */
  const Panel = (
    <div className="w-full max-w-[820px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Create Sales Return</h3>

        {!embedded && (
          <button onClick={closePanel} aria-label="Close" className="text-gray-500 hover:text-gray-800">
            <X size={18} />
          </button>
        )}
      </div>

      <form onSubmit={(e) => onSave(e, false)} className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "64vh" }}>
        {/* Party & Date */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Select Party</label>
            <input
              ref={firstInputRef}
              type="text"
              value={party}
              onChange={(e) => setParty(e.target.value)}
              placeholder="Search for party..."
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Invoice Date</label>
            <input
              type="date"
              value={invoiceDate}
              onChange={(e) => setInvoiceDate(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm"
              required
            />
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-auto mb-4">
          <table className="w-full text-sm border border-gray-200 rounded">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 border text-left">S.N.</th>
                <th className="px-2 py-2 border text-left">Name</th>
                <th className="px-2 py-2 border text-left">Quantity</th>
                <th className="px-2 py-2 border text-left">Rate</th>
                <th className="px-2 py-2 border text-left">Discount</th>
                <th className="px-2 py-2 border text-left">Amount</th>
                <th className="px-2 py-2 border text-left">Remove</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx} className="border-b">
                  <td className="px-2 py-2">{idx + 1}</td>

                  <td className="px-2 py-2">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => handleItemChange(idx, "name", e.target.value)}
                      className="w-full px-1 py-1 border rounded text-sm"
                      required
                    />
                  </td>

                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(idx, "quantity", Number(e.target.value))}
                      className="w-20 px-1 py-1 border rounded text-sm"
                      required
                    />
                  </td>

                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.rate}
                      onChange={(e) => handleItemChange(idx, "rate", Number(e.target.value))}
                      className="w-28 px-1 py-1 border rounded text-sm"
                      required
                    />
                  </td>

                  <td className="px-2 py-2">
                    <input
                      type="number"
                      min="0"
                      value={item.discount}
                      onChange={(e) => handleItemChange(idx, "discount", Number(e.target.value))}
                      className="w-20 px-1 py-1 border rounded text-sm"
                    />
                  </td>

                  <td className="px-2 py-2">Rs. {item.amount}</td>

                  <td className="px-2 py-2">
                    <button type="button" onClick={() => removeItem(idx)} className="text-red-600 hover:text-red-800">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-4">
          <button type="button" onClick={addItem} className="inline-flex items-center gap-2 text-[#174552] font-medium">
            <PlusIconFallback /> Add Billing Item
          </button>
        </div>

        <div className="mb-4 text-right text-lg font-semibold">Sub Total: Rs. {subtotal}</div>

        <div className="mb-4">
          <label className="block text-sm text-gray-700 mb-1">Notes or Remarks</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Enter note or description..."
            className="w-full px-3 py-2 border rounded text-sm"
          />
        </div>

        <div className="flex items-center gap-4 mb-4">
          <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer">
            <Camera size={18} />
            <span className="text-sm">{image ? "Image Selected" : "Attach Images"}</span>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
          </label>

          {image && (
            <div className="relative w-20 h-20 rounded overflow-hidden border">
              <img src={URL.createObjectURL(image)} alt="upload" className="w-full h-full object-cover" />
              <button type="button" onClick={() => setImage(null)} className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow">
                <X size={12} />
              </button>
            </div>
          )}
        </div>

      </form>

      {/* footer */}
      <div className="px-6 py-4 border-t bg-white flex items-center justify-end gap-3">
        <button onClick={(e) => onSave(e, true)} className="px-4 py-2 rounded-md bg-white border text-gray-800">Save & New</button>

        <button onClick={(e) => onSave(e, false)} className="px-5 py-2 rounded-md bg-[#072255] text-white">Save Sales Return</button>

        <button onClick={closePanel} className="px-4 py-2 rounded-md bg-gray-100 text-gray-800">Close</button>
      </div>
    </div>
  );

  /* ----------------- RENDER LOGIC ------------------ */

  // Dashboard → Add More (embedded panel only)
  if (directOpen && embedded) {
    return showPanel ? Panel : null;
  }

  // If opened directly with directOpen but not embedded - show overlay + panel
  if (directOpen && !embedded) {
    return (
      <>
        {showPanel && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto" style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}>
            <div className="mt-8">{Panel}</div>
          </div>
        )}
      </>
    );
  }

  // Normal page rendering (navigated from sidebar)
  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
      style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}
    >
      {/* empty state */}
      {returnsList.length === 0 ? (
        <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6 px-4">
          <div className="flex justify-center">
            <svg width="160" height="160" viewBox="0 0 200 200" fill="none">
              <circle cx="100" cy="100" r="80" fill="#E5E7EB" />
              <rect x="55" y="40" width="90" height="30" rx="6" fill="#9CA3AF" />
              <rect x="55" y="75" width="90" height="90" rx="10" fill="white" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">Create Your First Sales Return</h2>
          <p className="text-gray-500 text-base max-w-md">Click on the create button to start registering sales returns.</p>

          <button onClick={() => setShowPanel(true)} className="flex items-center gap-2 px-6 py-3 bg-[#072255] text-white rounded-lg font-semibold hover:bg-[#061f44]">
            <PlusIconFallback /> Create Sales Return
          </button>
        </div>
      ) : (
        <div className="p-4 w-full max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Sales Returns</h2>
              <p className="text-sm text-gray-500">List of saved sales returns</p>
            </div>

            <button onClick={() => setShowPanel(true)} className="px-4 py-2 bg-[#172554] text-white rounded">+ Add Sales Return</button>
          </div>

          <ul className="space-y-3">
            {returnsList.map((r) => (
              <li key={r.id} className="p-4 border rounded bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{r.party}</div>
                    <div className="text-sm text-gray-500">{r.invoiceDate}</div>
                    {r.notes && <div className="text-sm text-gray-600 mt-1">{r.notes}</div>}
                    <div className="mt-2 text-sm">
                      Items: {r.items.length} • Subtotal: Rs. {r.subtotal}
                    </div>
                  </div>

                  <div className="text-lg font-semibold">Rs. {r.subtotal}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* overlay when opened from page */}
      {showPanel && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto" style={{ left: sidebarOffset, width: `calc(100% - ${sidebarOffset})` }}>
          <div className="mt-8">{Panel}</div>
        </div>
      )}
    </div>
  );
}

/* small inline Plus icon fallback */
function PlusIconFallback() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="inline-block">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
