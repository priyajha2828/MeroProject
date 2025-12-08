// src/components/Quotation.jsx
import React, { useState, useContext } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

/**
 * Theme-aware Quotation component
 * - Uses CSS variables set by your ThemeProvider (e.g. --bg-default, --surface-200, --primary-500, --text-default)
 * - Page background uses a light grey surface variable
 * - Buttons/inputs/panels fall back to sensible defaults if theme variables are missing
 */

export default function Quotation() {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext || {});

  const [party, setParty] = useState("");
  const [quotationType, setQuotationType] = useState("auto");
  const [quotationNo, setQuotationNo] = useState("AUTO-001");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  // Normalize and recalc amounts carefully
  const handleItemChange = (index, field, rawValue) => {
    const newItems = items.map((it, i) => ({ ...it })); // clone
    // if numeric fields, convert to numbers safely
    if (field === "quantity" || field === "rate" || field === "discount") {
      // parse step-by-step (defensive)
      const str = String(rawValue);
      // remove non-numeric except dot and minus (basic sanitization)
      const cleaned = str.replace(/[^\d.-]/g, "");
      const num = cleaned === "" || cleaned === "-" || cleaned === "." ? 0 : Number(cleaned);
      newItems[index][field] = Number.isFinite(num) ? num : 0;
    } else {
      newItems[index][field] = rawValue;
    }

    // compute amount = quantity * rate - discount using numeric values
    const qty = Number(newItems[index].quantity) || 0;
    const rate = Number(newItems[index].rate) || 0;
    const discount = Number(newItems[index].discount) || 0;

    // compute product step-by-step to avoid JS float surprises (kept simple)
    const product = qty * rate;
    const amount = product - discount;

    newItems[index].amount = Number.isFinite(amount) ? amount : 0;

    setItems(newItems);
  };

  const addItem = () =>
    setItems(prev => [...prev, { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);

  const removeItem = (index) => setItems(prev => prev.filter((_, i) => i !== index));

  // subtotal computed carefully by summing amounts (digit-by-digit not needed here)
  const subtotal = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();

    // basic validation
    if (!party || !invoiceDate) {
      alert("Please fill required fields: party and invoice date.");
      return;
    }

    // In real app: send payload to API. For now, console & simple feedback
    const payload = {
      party,
      quotationNo,
      invoiceDate,
      items,
      notes,
      imageName: image ? image.name : null,
      subtotal,
    };

    console.log("Quotation saved:", payload);
    alert("Quotation saved!");

    if (saveNew) {
      // reset form for new entry
      setParty("");
      setQuotationType("auto");
      setQuotationNo("AUTO-001");
      setInvoiceDate("");
      setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
      setNotes("");
      setImage(null);
    } else {
      // navigate back (close current page)
      navigate(-1);
    }
  };

  /* Theme-driven inline styles using CSS variables (with fallbacks) */
  const pageStyle = {
    background: "var(--surface-200, #f3f4f6)", // light grey page bg
    color: "var(--text-default, #0f172a)",
    minHeight: "100vh",
    padding: "2rem",
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
  };

  const panelStyle = {
    background: "var(--bg-default, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
    borderRadius: 8,
    padding: 20,
  };

  const inputStyle = {
    background: "var(--surface-100, #ffffff)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.08)",
  };

  const primaryBtn = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
  };

  const accentBtn = {
    background: "var(--primary-600, #061f44)",
    color: "var(--text-on-primary, #ffffff)",
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={panelStyle} className="relative">
          {/* Close Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 right-4 px-2 py-1 rounded hover:bg-gray-100 transition"
            aria-label="Close"
            style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
          >
            X
          </button>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "var(--text-default, #0f172a)" }}>
            Create Quotation
          </h2>

          <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
            {/* Select Party */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: 6, color: "var(--text-default, #0f172a)" }}>
                Select Party
              </label>
              <input
                type="text"
                placeholder="Search for party..."
                value={party}
                onChange={(e) => setParty(e.target.value)}
                style={{ width: "100%", padding: "10px 12px", borderRadius: 6, ...inputStyle }}
                required
              />
            </div>

            {/* Quotation Number + Invoice Date */}
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, display: "block", marginBottom: 6, color: "var(--text-default, #0f172a)" }}>
                  Quotation No
                </label>

                <div style={{ display: "flex", gap: 8 }}>
                  <input
                    type="text"
                    value={quotationNo}
                    onChange={(e) => setQuotationNo(e.target.value)}
                    disabled={quotationType === "auto"}
                    style={{ flex: 1, padding: "10px 12px", borderRadius: 6, ...inputStyle }}
                    required
                  />

                  <select
                    value={quotationType}
                    onChange={(e) => {
                      setQuotationType(e.target.value);
                      if (e.target.value === "auto") setQuotationNo("AUTO-001");
                    }}
                    style={{ padding: "10px 12px", borderRadius: 6, ...inputStyle }}
                  >
                    <option value="auto">Auto</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <label style={{ fontWeight: 600, display: "block", marginBottom: 6, color: "var(--text-default, #0f172a)" }}>
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  style={{ width: "100%", padding: "10px 12px", borderRadius: 6, ...inputStyle }}
                  required
                />
              </div>
            </div>

            {/* Billing Items Table */}
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ background: "var(--surface-200, #f3f4f6)" }}>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>S.N.</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Name</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Quantity</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Rate</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Discount</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Amount</th>
                    <th className="px-2 py-2" style={{ textAlign: "left" }}>Remove</th>
                  </tr>
                </thead>

                <tbody>
                  {items.map((item, index) => (
                    <tr key={index} style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                      <td className="px-2 py-2">{index + 1}</td>

                      <td className="px-2 py-2">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                          style={{ width: "100%", padding: "8px 10px", borderRadius: 6, ...inputStyle }}
                          required
                        />
                      </td>

                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                          style={{ width: 80, padding: "8px 10px", borderRadius: 6, ...inputStyle }}
                          required
                        />
                      </td>

                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="0"
                          value={item.rate}
                          onChange={(e) => handleItemChange(index, "rate", e.target.value)}
                          style={{ width: 100, padding: "8px 10px", borderRadius: 6, ...inputStyle }}
                          required
                        />
                      </td>

                      <td className="px-2 py-2">
                        <input
                          type="number"
                          min="0"
                          value={item.discount}
                          onChange={(e) => handleItemChange(index, "discount", e.target.value)}
                          style={{ width: 90, padding: "8px 10px", borderRadius: 6, ...inputStyle }}
                        />
                      </td>

                      <td className="px-2 py-2">Rs. {(Number(item.amount) || 0).toFixed(2)}</td>

                      <td className="px-2 py-2">
                        <button type="button" onClick={() => removeItem(index)} style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--text-default, #0f172a)" }}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div>
              <button
                type="button"
                onClick={addItem}
                style={{ marginTop: 8, padding: "8px 12px", borderRadius: 6, cursor: "pointer", ...primaryBtn }}
              >
                Add Billing Item
              </button>
            </div>

            {/* Subtotal */}
            <div style={{ textAlign: "right", fontWeight: 700 }}>Sub Total: Rs. {subtotal.toFixed(2)}</div>

            {/* Notes */}
            <div>
              <label style={{ fontWeight: 600, display: "block", marginBottom: 6, color: "var(--text-default, #0f172a)" }}>
                Notes or Remarks
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter note or description..."
                style={{ width: "100%", padding: "10px 12px", borderRadius: 6, minHeight: 80, ...inputStyle }}
              />
            </div>

            {/* Attach Images */}
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <label style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 12px", borderRadius: 6, background: "var(--surface-100, #ffffff)", border: "1px solid rgba(0,0,0,0.06)", cursor: "pointer" }}>
                <Camera size={18} />
                <span style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{image ? "Image Selected" : "Attach Images"}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </label>
            </div>

            {/* Total Amount */}
            <div style={{ textAlign: "right", fontSize: 18, fontWeight: 800 }}>Total Amount: Rs. {subtotal.toFixed(2)}</div>

            {/* Buttons */}
            <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
              <button
                type="submit"
                style={{ padding: "10px 14px", borderRadius: 6, cursor: "pointer", ...accentBtn }}
              >
                Generate Quotation
              </button>

              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                style={{ padding: "10px 14px", borderRadius: 6, cursor: "pointer", ...primaryBtn }}
              >
                Save & New
              </button>

              <button
                type="submit"
                style={{ padding: "10px 14px", borderRadius: 6, cursor: "pointer", ...primaryBtn }}
              >
                Save Quotation
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
