import { useState } from "react";

export default function AddPurchase() {
  const [supplier, setSupplier] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [notes, setNotes] = useState("");
  const [paymentMode, setPaymentMode] = useState("Cash");
  const [images, setImages] = useState([]);
  const [items, setItems] = useState([
    { name: "", qty: 1, rate: 0, discount: 0, amount: 0 },
  ]);

  // Handle Item Change
  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;

    const qty = parseFloat(updated[index].qty) || 0;
    const rate = parseFloat(updated[index].rate) || 0;
    const discount = parseFloat(updated[index].discount) || 0;

    const total = qty * rate;
    updated[index].amount = total - (total * discount) / 100;

    setItems(updated);
  };

  // Add Item
  const addItem = () => {
    setItems([
      ...items,
      { name: "", qty: 1, rate: 0, discount: 0, amount: 0 },
    ]);
  };

  // Remove Item
  const removeItem = (index) => {
    const updated = items.filter((_, i) => i !== index);
    setItems(updated);
  };

  // Calculate Subtotal
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="max-w-5xl mx-auto bg-white p-6 shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add Purchase</h2>

      {/* Supplier, Invoice No, Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="font-semibold text-sm">Select Supplier</label>
          <select
            className="w-full p-2 border rounded mt-1"
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
          >
            <option value="">-- Choose Supplier --</option>
            <option value="Cash Purchase">Cash Purchase</option>
            <option value="ABC Traders">ABC Traders</option>
            <option value="XYZ Suppliers">XYZ Suppliers</option>
          </select>
        </div>

        <div>
          <label className="font-semibold text-sm">Invoice No</label>
          <input
            type="text"
            className="w-full p-2 border rounded mt-1"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-sm">Invoice Date</label>
          <input
            type="date"
            className="w-full p-2 border rounded mt-1"
            value={invoiceDate}
            onChange={(e) => setInvoiceDate(e.target.value)}
          />
        </div>
      </div>

      {/* Item Table */}
      <div className="overflow-x-auto">
        <table className="w-full border mb-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">S.N.</th>
              <th className="p-2 border">Item Name</th>
              <th className="p-2 border">Qty</th>
              <th className="p-2 border">Rate</th>
              <th className="p-2 border">Discount (%)</th>
              <th className="p-2 border">Amount</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td className="p-2 border">{index + 1}</td>

                <td className="p-2 border">
                  <input
                    type="text"
                    className="w-full p-1 border rounded"
                    value={item.name}
                    onChange={(e) =>
                      handleItemChange(index, "name", e.target.value)
                    }
                  />
                </td>

                <td className="p-2 border">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={item.qty}
                    onChange={(e) =>
                      handleItemChange(index, "qty", e.target.value)
                    }
                  />
                </td>

                <td className="p-2 border">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={item.rate}
                    onChange={(e) =>
                      handleItemChange(index, "rate", e.target.value)
                    }
                  />
                </td>

                <td className="p-2 border">
                  <input
                    type="number"
                    className="w-full p-1 border rounded"
                    value={item.discount}
                    onChange={(e) =>
                      handleItemChange(index, "discount", e.target.value)
                    }
                  />
                </td>

                <td className="p-2 border">{item.amount.toFixed(2)}</td>

                <td className="p-2 border">
                  <button
                    className="text-red-600 font-bold"
                    onClick={() => removeItem(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add item button */}
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={addItem}
        >
          + Add Purchase Item
        </button>
      </div>

      {/* Subtotal */}
      <div className="text-right font-bold text-xl mt-4">
        Sub Total: Rs. {subtotal.toFixed(2)}
      </div>

      {/* Notes */}
      <div className="mt-5">
        <label className="font-semibold text-sm">Notes / Remarks</label>
        <textarea
          className="w-full p-2 border rounded mt-1"
          rows="3"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      {/* Payment Mode */}
      <div className="mt-4">
        <label className="font-semibold text-sm">Payment Mode</label>
        <select
          className="w-full p-2 border rounded mt-1"
          value={paymentMode}
          onChange={(e) => setPaymentMode(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="Bank Transfer">Bank Transfer</option>
          <option value="Credit">Credit</option>
        </select>
      </div>

      {/* Attach Images */}
      <div className="mt-4">
        <label className="font-semibold text-sm">Attach Images</label>
        <input
          type="file"
          multiple
          className="w-full mt-1"
          onChange={(e) => setImages([...e.target.files])}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="bg-gray-600 text-white px-6 py-2 rounded">
          Save & New
        </button>
        <button className="bg-blue-700 text-white px-6 py-2 rounded">
          Save Purchase Invoice
        </button>
      </div>
    </div>
  );
}
