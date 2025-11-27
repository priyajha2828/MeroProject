import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Inline EmptyState (keeps component self-contained). Replace with shared EmptyState component if you have one. */
function EmptyState({ title, description, buttonText, onClick }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="mb-6">
        <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center">
          <svg width="72" height="72" viewBox="0 0 24 24" fill="none" className="opacity-40">
            <rect x="3" y="3" width="18" height="18" rx="2" stroke="#CBD5E1" strokeWidth="1.5" />
            <rect x="7" y="7" width="10" height="2" rx="1" fill="#E6E9EF" />
            <rect x="7" y="11" width="8" height="2" rx="1" fill="#E6E9EF" />
            <rect x="7" y="15" width="6" height="2" rx="1" fill="#E6E9EF" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500 max-w-xl mb-6">{description}</p>

      <button
        onClick={onClick}
        className="inline-flex items-center gap-2 bg-[#172554] text-white px-6 py-3 rounded-lg shadow hover:brightness-90 transition"
      >
        <span className="text-lg">+</span>
        <span className="font-semibold">{buttonText}</span>
      </button>
    </div>
  );
}

export default function PaymentOut() {
  const navigate = useNavigate();

  // stored payments out (local state; replace with API in real app)
  const [paymentsOut, setPaymentsOut] = useState([]); // start empty to show EmptyState

  // modal visibility for create form
  const [showForm, setShowForm] = useState(false);

  // form fields (copied from your original)
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

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  // save handler: if saveNew true keep modal open and reset form, else close modal
  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();

    // basic validation
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

    setPaymentsOut((prev) => [newPayment, ...prev]);

    if (saveNew) {
      resetForm();
      // keep modal open for another entry
    } else {
      setShowForm(false);
      resetForm();
    }
  };

  return (
    <>
      {/* If no payments show empty state, else list */}
      {(!paymentsOut || paymentsOut.length === 0) ? (
        <EmptyState
          title="Create Your First Payment Out"
          description="Click on the create payment button and start recording outgoing payments."
          buttonText="Create Payment"
          onClick={openForm}
        />
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Payments Out</h2>
              <p className="text-sm text-gray-500">List of outgoing payments</p>
            </div>

            <div>
              <button
                onClick={openForm}
                className="px-4 py-2 bg-[#172554] text-white rounded hover:brightness-95"
              >
                + Add Payment
              </button>
            </div>
          </div>

          <ul className="space-y-3">
            {paymentsOut.map((p) => (
              <li key={p.id} className="p-4 border rounded bg-white">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">{p.party}</div>
                    <div className="text-sm text-gray-500">{p.date} • {p.paymentMethod}</div>
                    {p.remarks && <div className="text-sm text-gray-600 mt-1">{p.remarks}</div>}
                  </div>
                  <div className="text-lg font-semibold">₹{p.amount}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Modal form (your original markup adapted) */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded shadow relative">
            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
              aria-label="Close"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Payment Out</h2>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              {/* Receipt Number + Date inline */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Receipt Number</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={receiptNumber}
                      onChange={(e) => setReceiptNumber(e.target.value)}
                      disabled={receiptType === "auto"}
                      className="flex-1 px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                    />
                    <select
                      value={receiptType}
                      onChange={(e) => {
                        setReceiptType(e.target.value);
                        if (e.target.value === "auto") setReceiptNumber("AUTO-001");
                      }}
                      className="px-2 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                    >
                      <option value="auto">Auto</option>
                      <option value="manual">Manual</option>
                    </select>
                  </div>
                </div>

                <div className="flex-1">
                  <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>
              </div>

              {/* Party Name */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Party Name</label>
                <input
                  type="text"
                  placeholder="Search for party..."
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>

              {/* Paid Amount */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Paid Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                >
                  <option value="cash">Cash</option>
                  <option value="bank">Bank</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              {/* Remarks */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Remarks</label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks here..."
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Image + Buttons */}
              <div className="flex items-center gap-4 mt-2">
                {/* Image upload */}
                <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer dark:bg-gray-700 dark:text-gray-100">
                  <Camera size={20} />
                  <span>{image ? "Image Selected" : "Attach Image"}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>

                {/* Save & New */}
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, true)}
                  className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
                >
                  Save & New
                </button>

                {/* Save Payment */}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
                >
                  Save Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}