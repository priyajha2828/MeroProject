import { useState } from "react";
import { Camera } from "lucide-react";

export default function PaymentIn({ onClose }) {
  const [receiptType, setReceiptType] = useState("auto");
  const [receiptNumber, setReceiptNumber] = useState("AUTO-001");
  const [date, setDate] = useState("");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [remarks, setRemarks] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = (e, saveNew = false) => {
    e.preventDefault();
    console.log({ receiptNumber, date, party, amount, paymentMethod, remarks, image });
    alert("Payment In saved!");

    if (saveNew) {
      // reset form for new entry
      setReceiptType("auto");
      setReceiptNumber("AUTO-001");
      setDate("");
      setParty("");
      setAmount("");
      setPaymentMethod("cash");
      setRemarks("");
      setImage(null);
    } else {
      onClose(); // just close the modal
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-2xl p-6 bg-white dark:bg-gray-800 rounded shadow relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">Add Payment In</h2>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">

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

          {/* Received Amount */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Received Amount</label>
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
            ></textarea>
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
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save & New
            </button>

            {/* Save Payment */}
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"
            >
              Save Payment
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
