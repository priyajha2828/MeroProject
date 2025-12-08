// src/components/PaymentOut.jsx
import React, { useEffect, useRef, useState } from "react";
import { Camera } from "lucide-react";

/**
 * PaymentOut - panel that matches PaymentIn UI & sizing
 * Props:
 *  - directOpen (bool): open the form modal immediately
 *  - embedded (bool): when true, DO NOT render backdrop (parent provides ModalShell)
 *  - onClose (fn): optional callback to close parent wrapper (ModalShell)
 */
export default function PaymentOut({ directOpen = false, embedded = false, onClose: parentOnClose } = {}) {
  const [paymentsOut, setPaymentsOut] = useState([]);
  const [showForm, setShowForm] = useState(!!directOpen);

  useEffect(() => {
    if (directOpen) setShowForm(true);
  }, [directOpen]);

  const [receiptType, setReceiptType] = useState("auto");
  const [receiptNumber, setReceiptNumber] = useState("1");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState(null);

  const firstInputRef = useRef(null);
  useEffect(() => {
    if (showForm && firstInputRef.current) firstInputRef.current.focus();
  }, [showForm]);

  const resetForm = () => {
    setReceiptType("auto");
    setReceiptNumber("1");
    setDate("");
    setParty("");
    setAmount("");
    setPaymentMethod("cash");
    setRemarks("");
    setImage(null);
  };

  const savePaymentLocal = (saveNew = false) => {
    if (!party || !amount || !date) {
      alert("Please fill required fields: Date, Party and Amount.");
      return false;
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
      return true;
    } else {
      setShowForm(false);
      resetForm();
      if (parentOnClose) parentOnClose();
      return true;
    }
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    resetForm();
    if (parentOnClose) parentOnClose();
  };

  const Panel = (
    <div className="w-full max-w-[820px] bg-white rounded-lg shadow-lg flex flex-col overflow-hidden" role="dialog" aria-modal="true">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">Add Payment Out</h3>
        {!embedded && (
          <button onClick={closeForm} aria-label="Close" className="text-gray-500 hover:text-gray-800">✕</button>
        )}
      </div>

      <div className="px-6 py-5 overflow-y-auto" style={{ maxHeight: "64vh" }}>
        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-5">
            <label className="block text-sm text-gray-600 mb-2">Receipt Number</label>
            <div className="flex items-center gap-3">
              <input
                ref={firstInputRef}
                type="text"
                value={receiptNumber}
                onChange={(e) => setReceiptNumber(e.target.value)}
                disabled={receiptType === "auto"}
                className="w-full px-4 py-3 border rounded bg-white text-sm"
              />
              <button
                type="button"
                onClick={() => setReceiptType((s) => (s === "auto" ? "manual" : "auto"))}
                className={`text-sm font-medium ${receiptType === "auto" ? "text-emerald-500" : "text-gray-600"}`}
              >
                {receiptType === "auto" ? "Auto" : "Manual"}
              </button>
            </div>
          </div>

          <div className="col-span-7">
            <label className="block text-sm text-gray-600 mb-2">Date</label>
            <div className="relative">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-3 border rounded bg-white text-sm"
              />
            </div>
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm text-gray-600 mb-2">Party Name</label>
          <select
            value={party}
            onChange={(e) => setParty(e.target.value)}
            className="w-full px-4 py-3 border rounded bg-white text-sm"
          >
            <option value="">Search for party</option>
            <option value="party-1">Party 1</option>
            <option value="party-2">Party 2</option>
          </select>
        </div>

        <hr className="my-6 border-t border-gray-100" />

        <div className="grid grid-cols-12 gap-4 items-end">
          <div className="col-span-6">
            <label className="block text-sm text-gray-600 mb-2">Paid Amount</label>
            <div className="flex">
              <span className="inline-flex items-center px-4 py-3 border border-r-0 rounded-l bg-gray-50 text-gray-600 text-sm">Rs.</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 px-4 py-3 border rounded-r text-sm"
              />
            </div>
          </div>

          <div className="col-span-6">
            <label className="block text-sm text-gray-600 mb-2">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full px-4 py-3 border rounded bg-white text-sm"
            >
              <option value="cash">Cash</option>
              <option value="bank">Bank</option>
              <option value="cheque">Cheque</option>
            </select>
          </div>
        </div>

        <hr className="my-6 border-t border-gray-100" />

        <div>
          <label className="block text-sm text-gray-600 mb-2">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter remarks here..."
            className="w-full px-4 py-3 border rounded min-h-[110px] text-sm"
          />
        </div>

        <div className="mt-6">
          <label className="inline-flex items-center gap-3 px-3 py-3 border rounded cursor-pointer">
            <Camera size={18} />
            <span className="text-sm text-gray-700">{image ? "Image Selected" : "Attach Image"}</span>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="px-6 py-4 border-t bg-white flex items-center justify-between">
        <div />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => savePaymentLocal(true)}
            className="px-5 py-2 rounded-md bg-white border text-gray-800 text-sm hover:shadow-sm"
          >
            Save & New
          </button>

          <button
            type="button"
            onClick={() => savePaymentLocal(false)}
            className="px-5 py-2 rounded-md bg-emerald-500 text-white text-sm hover:brightness-95"
          >
            Save Payment Out
          </button>
        </div>
      </div>
    </div>
  );

  if (directOpen && embedded) {
    return showForm ? Panel : null;
  }

  if (directOpen && !embedded) {
    return (
      <>
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto">
            <div className="mt-8">{Panel}</div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="p-4">
      {(!paymentsOut || paymentsOut.length === 0) ? (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <div className="mb-6">
            <div className="w-40 h-40 rounded-full bg-gray-100 flex items-center justify-center"></div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">Create Your First Payment Out</h2>
          <p className="text-gray-500 max-w-xl mb-6">Click on the create payment button and start recording outgoing payments.</p>

          <button
            onClick={openForm}
            className="inline-flex items-center gap-2 bg-[#172554] text-white px-6 py-3 rounded-lg shadow hover:brightness-90 transition"
          >
            <span className="text-lg">+</span>
            <span className="font-semibold">Create Payment</span>
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Payments Out</h2>
              <p className="text-sm text-gray-500">List of outgoing payments</p>
            </div>
            <div>
              <button onClick={openForm} className="px-4 py-2 bg-[#172554] text-white rounded">+ Add Payment</button>
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto">
          <div className="mt-8">{Panel}</div>
        </div>
      )}
    </div>
  );
}
