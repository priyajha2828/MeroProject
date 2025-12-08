// src/components/SalesReturn.jsx
import React, { useState, useContext } from "react";
import { Camera, Trash2 } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

/* Small EmptyState inside this file to keep self-contained.
   Replace with your shared EmptyState component if you have one. */
function EmptyState({ title, description, buttonText, onClick }) {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--surface-200, #f3f4f6)" }}
    >
      <div className="mb-6">
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center"
          style={{ background: "var(--surface-100, #ffffff)" }}
        >
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="7" y="7" width="10" height="2" rx="1" fill="currentColor" />
            <rect x="7" y="11" width="8" height="2" rx="1" fill="currentColor" />
            <rect x="7" y="15" width="6" height="2" rx="1" fill="currentColor" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-default, #0f172a)" }}>
        {title}
      </h2>
      <p className="max-w-xl mb-6" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>
        {description}
      </p>

      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg shadow transition-transform active:scale-95"
        style={{
          background: "var(--primary-500, #172554)",
          color: "var(--text-on-primary, #ffffff)",
        }}
      >
        <span className="text-lg">+</span>
        <span className="font-semibold">{buttonText}</span>
      </button>
    </div>
  );
}

export default function SalesReturn() {
  const { theme } = useContext(ThemeContext || {});

  // saved sales returns
  const [returnsList, setReturnsList] = useState([]); // start empty so EmptyState appears

  // modal visibility
  const [showForm, setShowForm] = useState(false);

  // form state
  const [party, setParty] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const subtotal = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

  // helpers for items
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    const qty = Number(newItems[index].quantity) || 0;
    const rate = Number(newItems[index].rate) || 0;
    const discount = Number(newItems[index].discount) || 0;
    newItems[index].amount = qty * rate - discount;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setParty("");
    setInvoiceDate("");
    setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
    setNotes("");
    setImage(null);
  };

  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!party || !invoiceDate) {
      alert("Please fill required fields: party and invoice date.");
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

    setReturnsList((prev) => [newReturn, ...prev]);

    if (saveNew) {
      resetForm();
    } else {
      setShowForm(false);
      resetForm();
    }
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  /* theme-driven styles */
  const pageStyle = {
    background: "var(--surface-200, #f3f4f6)", // grey page background
    color: "var(--text-default, #0f172a)",
    minHeight: "calc(100vh - 4rem)",
    paddingTop: "4rem",
  };

  const panelStyle = {
    background: "var(--surface-100, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
    color: "var(--text-default, #0f172a)",
  };

  const tableHeaderStyle = {
    background: "var(--surface-200, #f3f4f6)",
    color: "var(--text-default, #0f172a)",
  };

  const inputStyle = {
    background: "var(--surface-100, #ffffff)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const primaryBtnStyle = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
  };

  return (
    <div style={pageStyle} className="w-full">
      {/* If no returns, show empty state */}
      {(!returnsList || returnsList.length === 0) ? (
        <EmptyState
          title="Create Your First Sales Return"
          description="Click the create button to start registering sales returns."
          buttonText="Create Sales Return"
          onClick={openForm}
        />
      ) : (
        <div className="p-6 max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>Sales Returns</h2>
              <p className="text-sm" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>List of saved sales returns</p>
            </div>

            <div>
              <button
                onClick={openForm}
                className="px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                + Add Sales Return
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {returnsList.map((r) => (
              <li key={r.id} className="p-4 rounded" style={{ ...panelStyle }}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium" style={{ color: "var(--text-default, #0f172a)" }}>{r.party}</div>
                    <div className="text-sm" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{r.invoiceDate}</div>
                    {r.notes && <div className="text-sm mt-1" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{r.notes}</div>}
                    <div className="mt-2 text-sm" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>
                      Items: {r.items.length} • Subtotal: Rs. {r.subtotal}
                    </div>
                  </div>

                  <div className="text-lg font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>Rs. {r.subtotal}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(2,6,23,0.55)" }}>
          <div className="w-full max-w-4xl p-6 rounded shadow-lg mx-4" style={panelStyle}>
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 px-2 py-1 rounded hover:bg-gray-100 transition"
              aria-label="Close"
              style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-default, #0f172a)" }}>Create Sales Return</h2>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              {/* Select Party */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Select Party</label>
                <input
                  type="text"
                  placeholder="Search for party..."
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Invoice Date */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Invoice Date</label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Billing Items */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm rounded" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
                  <thead>
                    <tr style={tableHeaderStyle}>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>S.N.</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Name</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Quantity</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Rate</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Discount</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Amount</th>
                      <th className="px-2 py-2 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="text-center" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                        <td className="px-2 py-2">{index + 1}</td>

                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                            className="w-full px-1 py-1 rounded"
                            style={inputStyle}
                            required
                          />
                        </td>

                        <td className="px-2 py-2">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                            className="w-16 px-1 py-1 rounded"
                            style={inputStyle}
                            required
                          />
                        </td>

                        <td className="px-2 py-2">
                          <input
                            type="number"
                            min="0"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, "rate", Number(e.target.value))}
                            className="w-20 px-1 py-1 rounded"
                            style={inputStyle}
                            required
                          />
                        </td>

                        <td className="px-2 py-2">
                          <input
                            type="number"
                            min="0"
                            value={item.discount}
                            onChange={(e) => handleItemChange(index, "discount", Number(e.target.value))}
                            className="w-16 px-1 py-1 rounded"
                            style={inputStyle}
                          />
                        </td>

                        <td className="px-2 py-2">Rs. {item.amount}</td>

                        <td className="px-2 py-2">
                          <button type="button" onClick={() => removeItem(index)} className="text-red-600 hover:text-red-800">
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Item */}
              <button
                type="button"
                onClick={addItem}
                className="mt-2 px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                Add Billing Item
              </button>

              {/* Subtotal */}
              <div className="mt-2 text-right text-lg font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>
                Sub Total: Rs. {subtotal}
              </div>

              {/* Notes */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Notes or Remarks</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter note or description..."
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                />
              </div>

              {/* Image Upload */}
              <div className="flex items-center gap-4 mt-2">
                <label
                  className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer"
                  style={{ background: "var(--surface-100, #ffffff)", borderColor: "rgba(0,0,0,0.06)", color: "var(--text-default, #0f172a)" }}
                >
                  <Camera size={20} />
                  <span>{image ? "Image Selected" : "Attach Images"}</span>
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
                </label>
              </div>

              {/* Total */}
              <div className="mt-2 text-right text-xl font-bold" style={{ color: "var(--text-default, #0f172a)" }}>
                Total Amount: Rs. {subtotal}
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button type="submit" className="px-4 py-2 rounded transition" style={primaryBtnStyle}>
                  Save & Close
                </button>

                <button type="button" onClick={(e) => handleSubmit(e, true)} className="px-4 py-2 rounded transition" style={primaryBtnStyle}>
                  Save & New
                </button>

                <button type="button" onClick={() => handleSubmit()} className="px-4 py-2 rounded transition" style={primaryBtnStyle}>
                  Save Sales Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
