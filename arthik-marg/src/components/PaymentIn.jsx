// src/components/PaymentIn.jsx
import React, { useState, useContext } from "react";
import { Camera } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

/*
  PaymentIn (theme-aware)
  - Uses CSS variables from ThemeProvider (see src/context/ThemeProvider.jsx)
  - Page background uses a light grey surface: var(--surface-200)
  - Panels use var(--surface-100) and modal uses var(--bg-default)
  - All colors fall back sensibly when variables are missing
*/

function EmptyState({ title, description, buttonText, onClick }) {
  return (
    <div
      className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6"
      style={{ background: "var(--surface-200, #f3f4f6)" }}
    >
      <div className="mb-6">
        <div
          className="w-40 h-40 rounded-full flex items-center justify-center"
          style={{ background: "var(--surface-100, #f7fafc)" }}
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

export default function PaymentIn() {
  const { theme } = useContext(ThemeContext || {}); // safe when ThemeContext is missing

  // payments list (local state; replace with API in real app)
  const [payments, setPayments] = useState([]);

  // modal form visibility
  const [showForm, setShowForm] = useState(false);

  // form fields
  const [receiptType, setReceiptType] = useState("auto");
  const [receiptNumber, setReceiptNumber] = useState("AUTO-001");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState(null);

  const resetForm = () => {
    setReceiptType("auto");
    setReceiptNumber("AUTO-001");
    setDate("");
    setParty("");
    setAmount("");
    setPaymentMethod("cash");
    setRemarks("");
    setImage(null);
  };

  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();

    if (!date || !party || !amount) {
      alert("Please fill required fields: date, party and amount.");
      return;
    }

    const newPayment = {
      id: Date.now(),
      receiptType,
      receiptNumber,
      date,
      party,
      amount: Number(amount),
      paymentMethod,
      remarks,
      imageName: image ? image.name : null,
    };

    setPayments((prev) => [newPayment, ...prev]);

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

  /* theme-based inline styles */
  const pageStyle = {
    background: "var(--surface-200, #f3f4f6)", // main page grey background requested
    color: "var(--text-default, #0f172a)",
    minHeight: "calc(100vh - 4rem)",
    paddingTop: "4rem",
  };

  const panelStyle = {
    background: "var(--surface-100, #ffffff)",
    border: "1px solid rgba(0,0,0,0.06)",
    color: "var(--text-default, #0f172a)",
  };

  const modalStyle = {
    background: "var(--bg-default, #ffffff)",
    color: "var(--text-default, #0f172a)",
  };

  const inputStyle = {
    background: "var(--surface-100, #f7fafc)",
    color: "var(--text-default, #0f172a)",
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const primaryBtnStyle = {
    background: "var(--primary-500, #172554)",
    color: "var(--text-on-primary, #ffffff)",
  };

  return (
    <div style={pageStyle} className="w-full">
      {/* Empty state when no payments */}
      {(!payments || payments.length === 0) ? (
        <EmptyState
          title="Create Your First Payment In"
          description="Click on the create payment button and start recording incoming payments."
          buttonText="Create Payment"
          onClick={openForm}
        />
      ) : (
        <div className="p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>
                Payments Received
              </h2>
              <p className="text-sm" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>
                List of incoming payments
              </p>
            </div>
            <div>
              <button
                onClick={openForm}
                className="px-4 py-2 rounded transition"
                style={primaryBtnStyle}
              >
                + Add Payment
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {payments.map((p) => (
              <li key={p.id} className="p-4 rounded" style={{ ...panelStyle }}>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium" style={{ color: "var(--text-default, #0f172a)" }}>{p.party}</div>
                    <div className="text-sm" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{p.date} • {p.paymentMethod}</div>
                    {p.remarks && <div className="text-sm mt-1" style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}>{p.remarks}</div>}
                  </div>
                  <div className="text-lg font-semibold" style={{ color: "var(--text-default, #0f172a)" }}>₹{p.amount}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(2,6,23,0.55)" }}>
          <div className="w-full max-w-2xl p-6 rounded shadow-lg mx-4" style={modalStyle}>
            <button
              onClick={closeForm}
              className="absolute top-4 right-4 px-2 py-1 rounded hover:bg-gray-100 transition"
              aria-label="Close"
              style={{ color: "var(--muted, rgba(0,0,0,0.6))" }}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4" style={{ color: "var(--text-default, #0f172a)" }}>Add Payment In</h2>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              {/* Receipt Number + Date */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Receipt Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      disabled={receiptType === "auto"}
                      className="flex-1 px-3 py-2 rounded"
                      style={inputStyle}
                    />
                    <select
                      value={receiptType}
                      onChange={(e) => {
                        setReceiptType(e.target.value);
                        if (e.target.value === "auto") setReceiptNumber("AUTO-001");
                      }}
                      className="px-2 py-2 rounded"
                      style={inputStyle}
                    >
                      <option value="auto">Auto</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded"
                    style={inputStyle}
                    required
                  />
                </div>
              </div>

              {/* Party Name */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Party Name</label>
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

              {/* Received Amount */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Received Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                >
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="block font-semibold mb-1" style={{ color: "var(--text-default, #0f172a)" }}>Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks here..."
                  className="w-full px-3 py-2 rounded"
                  style={inputStyle}
                />
              </div>

              {/* Image + Actions */}
              <div className="flex items-center gap-4 mt-2">
                <label
                  className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer"
                  style={{ background: "var(--surface-100, #f7fafc)", borderColor: "rgba(0,0,0,0.06)", color: "var(--text-default, #0f172a)" }}
                >
                  <Camera size={20} />
                  <span>{image ? "Image Selected" : "Attach Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>

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
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
