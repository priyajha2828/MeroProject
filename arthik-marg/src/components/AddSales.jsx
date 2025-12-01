import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AddSales() {
const navigate = useNavigate();
const [form, setForm] = useState({
party: "",
invoiceNo: "",
invoiceDate: "",
notes: "",
paymentMode: "",
});

const [items, setItems] = useState([
{ name: "", qty: 1, rate: 0, discount: 0, amount: 0 },
]);

const [images, setImages] = useState([]);

// Handle form fields
const handleFormChange = (e) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

// Update Item Row
const updateItem = (index, field, value) => {
const updated = [...items];
updated[index][field] = value;


const qty = Number(updated[index].qty);
const rate = Number(updated[index].rate);
const discount = Number(updated[index].discount);

const total = qty * rate;
updated[index].amount = total - (total * discount) / 100;

setItems(updated);


};

// Add New Billing Row
const addItem = () => {
setItems([...items, { name: "", qty: 1, rate: 0, discount: 0, amount: 0 }]);
};

// Remove Row
const removeItem = (index) => {
const updated = items.filter((_, i) => i !== index);
setItems(updated);
};

// Image Upload
const handleImageUpload = (e) => {
setImages([...e.target.files]);
};

// Calculate Sub Total
const subTotal = items.reduce((sum, item) => sum + Number(item.amount), 0);

const handleSubmit = (e) => {
e.preventDefault();
console.log("Sales Form Data:", form);
console.log("Items:", items);
console.log("Images:", images);
alert("Sales Invoice Saved Successfully!");
};

return ( <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl p-6 my-6">


  {/* Back Button */}
  <button
    className="flex items-center gap-2 text-gray-700 mb-4"
    onClick={() => navigate(-1)}
  >
    <ArrowLeft size={20} />
    
  </button>

  <h2 className="text-2xl font-bold text-gray-800 mb-4">Add Sales Invoice</h2>

  <form onSubmit={handleSubmit}>
    {/* Top Section */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

      {/* Select Party */}
      <div>
        <label className="font-medium text-gray-600">Select Party</label>
        <select
          name="party"
          className="w-full border p-2 rounded mt-1"
          value={form.party}
          onChange={handleFormChange}
          required
        >
          <option value="">-- Select Party --</option>
          <option value="Cash Sale">Cash Sale</option>
          <option value="Customer 1">Customer 1</option>
          <option value="Customer 2">Customer 2</option>
          <option value="Customer 3">Customer 3</option>
        </select>
      </div>

      {/* Invoice No */}
      <div>
        <label className="font-medium text-gray-600">Invoice No</label>
        <input
          type="text"
          name="invoiceNo"
          className="w-full border p-2 rounded mt-1"
          placeholder="Enter Invoice No"
          value={form.invoiceNo}
          onChange={handleFormChange}
          required
        />
      </div>

      {/* Invoice Date */}
      <div>
        <label className="font-medium text-gray-600">Invoice Date</label>
        <input
          type="date"
          name="invoiceDate"
          className="w-full border p-2 rounded mt-1"
          value={form.invoiceDate}
          onChange={handleFormChange}
          required
        />
      </div>

    </div>

    {/* Billing Table */}
    <div className="overflow-x-auto mb-6">
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
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
              <td className="p-2 border text-center">{index + 1}</td>
              <td className="p-2 border">
                <input
                  type="text"
                  className="w-full border rounded p-1"
                  value={item.name}
                  onChange={(e) => updateItem(index, "name", e.target.value)}
                  placeholder="Enter Item Name"
                  required
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  className="w-full border rounded p-1"
                  value={item.qty}
                  onChange={(e) => updateItem(index, "qty", e.target.value)}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  className="w-full border rounded p-1"
                  value={item.rate}
                  onChange={(e) => updateItem(index, "rate", e.target.value)}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  className="w-full border rounded p-1"
                  value={item.discount}
                  onChange={(e) => updateItem(index, "discount", e.target.value)}
                />
              </td>
              <td className="p-2 border text-right">{item.amount.toFixed(2)}</td>
              <td className="p-2 border text-center">
                <button
                  type="button"
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeItem(index)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Item */}
      <button
        type="button"
        onClick={addItem}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Billing Item
      </button>
    </div>

    {/* Sub Total */}
    <div className="text-right text-xl font-semibold mb-6">
      Sub Total: ₹ {subTotal.toFixed(2)}
    </div>

    {/* Notes */}
    <div className="mb-6">
      <label className="font-medium text-gray-600">Notes / Remarks</label>
      <textarea
        name="notes"
        className="w-full border p-2 rounded mt-1"
        placeholder="Enter any notes here..."
        value={form.notes}
        onChange={handleFormChange}
      />
    </div>

    {/* Payment Mode */}
    <div className="mb-6">
      <label className="font-medium text-gray-600">Payment Mode</label>
      <select
        name="paymentMode"
        className="w-full border p-2 rounded mt-1"
        value={form.paymentMode}
        onChange={handleFormChange}
      >
        <option value="">Select Payment Mode</option>
        <option value="cash">Cash</option>
        <option value="bank">Bank Transfer</option>
        <option value="online">Online</option>
        <option value="upi">UPI</option>
      </select>
    </div>

    {/* Attach Images */}
    <div className="mb-6">
      <label className="font-medium text-gray-600">Attach Images</label>
      <input
        type="file"
        multiple
        className="w-full border p-2 rounded mt-1"
        onChange={handleImageUpload}
      />
    </div>

    {/* Buttons */}
    <div className="flex gap-4">
      <button
        type="button"
        className="bg-gray-600 text-white px-5 py-2 rounded"
        onClick={() => window.location.reload()}
      >
        Save & New
      </button>

      <button
        type="submit"
        className="bg-green-600 text-white px-6 py-2 rounded"
      >
        Save Sales Invoice
      </button>
    </div>
  </form>
</div>

);
}
