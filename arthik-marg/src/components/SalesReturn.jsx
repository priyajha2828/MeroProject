import { useState } from "react";
import { Camera, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SalesReturn() {
  const navigate = useNavigate();

  const [party, setParty] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [items, setItems] = useState([
    { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
  ]);
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState(null);

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;

    // amount = quantity * rate - discount
    newItems[index].amount =
      newItems[index].quantity * newItems[index].rate -
      newItems[index].discount;

    setItems(newItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { name: "", quantity: 1, rate: 0, discount: 0, amount: 0 },
    ]);
  };

  const removeItem = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const subtotal = items.reduce((acc, item) => acc + item.amount, 0);

  const handleSubmit = (e, saveNew = false) => {
    e.preventDefault();
    console.log({ party, invoiceDate, items, notes, image });
    alert("Sales Return Saved!");

    if (saveNew) {
      setParty("");
      setInvoiceDate("");
      setItems([{ name: "", quantity: 1, rate: 0, discount: 0, amount: 0 }]);
      setNotes("");
      setImage(null);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto p-4">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 rounded shadow relative">

        {/* Close Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-bold"
        >
          X
        </button>

        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-100">
          Create Sales Return
        </h2>

        <form onSubmit={(e) => handleSubmit(e)} className="space-y-4">

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
                  <tr
                    key={index}
                    className="text-center border-b border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-2 py-1">{index + 1}</td>

                    <td className="px-2 py-1">
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) =>
                          handleItemChange(index, "name", e.target.value)
                        }
                        className="w-full px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                        required
                      />
                    </td>

                    <td className="px-2 py-1">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", Number(e.target.value))
                        }
                        className="w-16 px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                        required
                      />
                    </td>

                    <td className="px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(index, "rate", Number(e.target.value))
                        }
                        className="w-20 px-1 py-1 border rounded dark:bg-gray-700 dark:text-gray-100"
                        required
                      />
                    </td>

                    <td className="px-2 py-1">
                      <input
                        type="number"
                        min="0"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(index, "discount", Number(e.target.value))
                        }
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
          <button
            type="button"
            onClick={addItem}
            className="mt-2 px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
          >
            Add Billing Item
          </button>

          {/* Subtotal */}
          <div className="mt-2 text-right text-lg font-semibold">
            Sub Total: Rs. {subtotal}
          </div>

          {/* Notes */}
          <div>
            <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-1">
              Notes or Remarks
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Enter note or description..."
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:text-gray-100"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="flex items-center gap-4 mt-2">
            <label className="flex items-center gap-2 px-3 py-2 border rounded cursor-pointer dark:bg-gray-700 dark:text-gray-100">
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
          <div className="mt-2 text-right text-xl font-bold">
            Total Amount: Rs. {subtotal}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
            >
              Generate Sales Return
            </button>

            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
            >
              Save & New
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#072255] text-white rounded hover:bg-[#061f44]"
            >
              Save Sales Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
