// src/components/PurchaseReturn.jsx
import React, { useState, useContext } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

/**
 * PurchaseReturn (theme-aware)
 * - Uses CSS variables from ThemeProvider (see src/context/ThemeProvider.jsx)
 * - Page background uses var(--surface-200) (light grey)
 * - Panels, inputs and buttons pull colors from theme vars with sensible fallbacks
 */

export default function PurchaseReturn() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext || {});

  const [party, setParty] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    // ensure numeric normalized when necessary
    if (field === "quantity" || field === "rate" || field === "discount") {
      newItems[index][field] = Number(value) || 0;
    } else {
      newItems[index][field] = value;
    }

    // amount = quantity * rate - discount
    const qty = Number(newItems[index].quantity) || 0;
    const rate = Number(newItems[index].rate) || 0;
    const discount = Number(newItems[index].discount) || 0;
    newItems[index].amount = qty * rate - discount;

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
    ]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const subtotal = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();

    // basic validation
    if (!party || !invoiceDate) {
      alert("Please fill required fields: party and invoice date.");
      return;
    }

    // here you'd call API or state management
    console.log({ party, invoiceDate, items, notes, image, subtotal });
    // feedback
    // alert("Purchase Return Saved!");

    if (saveNew) {
      // reset form for a new entry
      setParty("");
      setInvoiceDate("");
      setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
      setNotes("");
      setImage(null);
      // keep on same page/modal
    } else {
      // go back to previous page
      navigate(-1);
    }
  };

  /* Theme-driven styles (CSS variables should be provided by ThemeProvider) */
  const pageStyle = {
    background: "var(--surface-200, #f3f4f6)", // light grey page bg
    color: "var(--text-default, #0f172a)",
    minHeight: "calc(100vh - 4rem)",
    paddingTop: "4rem",
    paddingBottom: "3rem",
  };

  const panelStyle = {
    background: "var(--surface-100, #ffffff)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const inputStyle = {
    background: "var(--bg-default, #ffffff)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const tableHeaderStyle = {
    background: "var(--surface-200, #f3f4f6)",
    color: "var(--text-default, #0f172a)",
  };

  const primaryBtnStyle = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
  };

  const accentBtnStyle = {
    background: "var(--primary-600, #061f44)",
    color: "var(--text-on-primary, #ffffff)",
  };

  return (
    <div style={pageStyle} className="w-full">
      <div className="max-w-6xl mx-auto p-6">
        <div className="relative" style={{ ...panelStyle, padding: 20, borderRadius: 8 }}>
          {/* Close Button (navigates back) */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 px-2 py-1 rounded hover:bg-gray-100 transition"
            aria-label="Close"
            style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
          >
            X
          </button>

          <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-default, #0f172a)" }}>
            Create Purchase Return
          </h2>

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            {/* Select Party */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>
                Select Party
              </label>
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
              <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>
                Invoice Date
              </label>
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
                    <th className="px-2 py-2 text-left">S.N.</th>
                    <th className="px-2 py-2 text-left">Name</th>
                    <th className="px-2 py-2 text-left">Quantity</th>
                    <th className="px-2 py-2 text-left">Rate</th>
                    <th className="px-2 py-2 text-left">Discount</th>
                    <th className="px-2 py-2 text-left">Amount</th>
                    <th className="px-2 py-2 text-left">Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} className="text-center" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <td className="px-2 py-2">{index + 1}</td>

                      <td className="px-2 py-2 text-left">
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
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          className="w-20 px-1 py-1 rounded"
                          style={inputStyle}
                          required
                        />
                      </td>

                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                          className="w-28 px-1 py-1 rounded"
                          style={inputStyle}
                          required
                        />
                      </td>

                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="0"
                          value={item.discount}
                          onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                          className="w-20 px-1 py-1 rounded"
                          style={inputStyle}
                        />
                      </td>

                      <td className="px-2 py-2">Rs. {Number(item.amount || 0).toFixed(2)}</td>

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

            {/* Add Billing Item */}
            <div>
              <button
                type="button"
                onClick={addItem}
                className="mt-2 px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                Add Billing Item
              </button>
            </div>

            {/* Subtotal */}
            <div className="mt-2 text-right text-lg font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>
              Sub Total: Rs. {subtotal.toFixed(2)}
            </div>

            {/* Notes */}
            <div>
              <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>
                Notes or Remarks
              </label>
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
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>

            {/* Total */}
            <div className="mt-2 text-right text-xl font-bold" style={{ color: "var(--text-default, #0f172a)" }}>
              Total Amount: Rs. {subtotal.toFixed(2)}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="px-4 py-2 rounded transition"
                style={accentBtnStyle}
              >
                Generate Purchase Return
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                Save & New
              </button>

              <button
                type="submit"
                className="px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                Save Purchase Return
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
