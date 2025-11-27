import React, { useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

/* Small EmptyState inside this file to keep self-contained.
   Replace with your shared EmptyState component if you have one. */
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

export default function SalesReturn() {
  const navigate = useNavigate();

  // saved sales returns
  const [returnsList, setReturnsList] = useState([]); // start empty so EmptyState appears

  // modal visibility
  const [showForm, setShowForm] = useState(false);

  // form state (your existing fields)
  const [party, setParty] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const subtotal = items.reduce((acc, item) => acc + (Number(item.amount) || 0), 0);

  // helpers for items
  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // ensure numeric fields are numbers
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
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  // reset form to initial state
  const resetForm = () => {
    setParty("");
    setInvoiceDate("");
    setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
    setNotes("");
    setImage(null);
  };

  // handle save: if saveNew true keep modal open and reset form,
  // otherwise close modal after saving.
  const handleSubmit = (e, saveNew = false) => {
    if (e && e.preventDefault) e.preventDefault();

    // basic validation
    if (!party || !invoiceDate) {
      alert("Please fill required fields: party and invoice date.");
      return;
    }

    // build return object
    const newReturn = {
      id: Date.now(),
      party,
      invoiceDate,
      items,
      notes,
      imageName: image ? image.name : null,
      subtotal,
    };

    // add to list
    setReturnsList((prev) => [newReturn, ...prev]);

    // feedback (you can replace with toast)
    // alert("Sales Return Saved!");

    if (saveNew) {
      resetForm();
      // keep modal open for another entry
    } else {
      // close modal
      setShowForm(false);
      resetForm();
    }
  };

  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <>
      {/* If no returns, show empty state */}
      {(!returnsList || returnsList.length === 0) ? (
        <EmptyState
          title="Create Your First Sales Return"
          description="Click the create button to start registering sales returns."
          buttonText="Create Sales Return"
          onClick={openForm}
        />
      ) : (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Sales Returns</h2>
              <p className="text-sm text-gray-500">List of saved sales returns</p>
            </div>

            <div>
              <button
                onClick={openForm}
                className="px-4 py-2 bg-[#172554] text-white rounded hover:brightness-95"
              >
                + Add Sales Return
              </button>
            </div>
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

      {/* Modal form */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto p-4">
          <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded shadow relative">
            {/* Close Button */}
            <button
              onClick={closeForm}
              className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
              aria-label="Close"
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
              Create Sales Return
            </h2>

            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-4">
              {/* Select Party */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Select Party
                </label>
                <input
                  type="text"
                  placeholder="Search for party..."
                  value={party}
                  onChange={(e) => setParty(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>

              {/* Invoice Date */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
                  Invoice Date
                </label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => setInvoiceDate(e.target.value)}
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                  required
                />
              </div>

              {/* Billing Items */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-200 dark:border-gray-700 rounded">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700">
                      <th className="px-2 py-1 border">S.N.</th>
                      <th className="px-2 py-1 border">Name</th>
                      <th className="px-2 py-1 border">Quantity</th>
                      <th className="px-2 py-1 border">Rate</th>
                      <th className="px-2 py-1 border">Discount</th>
                      <th className="px-2 py-1 border">Amount</th>
                      <th className="px-2 py-1 border">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr key={index} className="text-center border-b border-gray-200 dark:border-gray-700">
                        <td className="px-2 py-1">{index + 1}</td>

                        <td className="px-2 py-1">
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => handleItemChange(index, "name", e.target.value)}
                            className="w-full px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                            required
                          />
                        </td>

                        <td className="px-2 py-1">
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleItemChange(index, "quantity", Number(e.target.value))}
                            className="w-16 px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                            required
                          />
                        </td>

                        <td className="px-2 py-1">
                          <input
                            type="number"
                            min="0"
                            value={item.rate}
                            onChange={(e) => handleItemChange(index, "rate", Number(e.target.value))}
                            className="w-20 px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                            required
                          />
                        </td>

                        <td className="px-2 py-1">
                          <input
                            type="number"
                            min="0"
                            value={item.discount}
                            onChange={(e) => handleItemChange(index, "discount", Number(e.target.value))}
                            className="w-16 px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                          />
                        </td>

                        <td className="px-2 py-1">Rs. {item.amount}</td>

                        <td className="px-2 py-1">
                          <button
                            type="button"
                            onClick={() => removeItem(index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Add Item */}
              <button type="button" onClick={addItem} className="mt-2 px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]">
                Add Billing Item
              </button>

              {/* Subtotal */}
              <div className="mt-2 text-right text-lg font-semibold">Sub Total: Rs. {subtotal}</div>

              {/* Notes */}
              <div>
                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">Notes or Remarks</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter note or description..."
                  className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
                />
              </div>

              {/* Image Upload */}
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer dark:bg-gray-700 dark:text-gray-100">
                  <Camera size={20} />
                  <span>{image ? "Image Selected" : "Attach Images"}</span>
                  <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="hidden" />
                </label>
              </div>

              {/* Total */}
              <div className="mt-2 text-right text-xl font-bold">Total Amount: Rs. {subtotal}</div>

              {/* Buttons */}
              <div className="flex gap-4 mt-4">
                <button type="submit" className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]">
                  Save & Close
                </button>

                <button type="button" onClick={(e) => handleSubmit(e, true)} className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]">
                  Save & New
                </button>

                <button type="button" onClick={() => { /* If you want a separate Save Sales Return behavior */ handleSubmit(); }} className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]">
                  Save Sales Return
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}