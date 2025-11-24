import { useState } from "react";

export default function CompleteProfile({ onClose, onSave }) {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [gst, setGst] = useState("");
  const [address, setAddress] = useState("");

  const handleSave = () => {
    const profile = { name, business, gst, address };
    onSave(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Complete Your Profile</h2>

        {/* Name */}
        <label className="block mb-2">Your Name</label>
        <input
          type="text"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Business Name */}
        <label className="block mb-2">Business Name</label>
        <input
          type="text"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={business}
          onChange={(e) => setBusiness(e.target.value)}
        />

        {/* GST */}
        <label className="block mb-2">GST Number (Optional)</label>
        <input
          type="text"
          className="w-full mb-4 px-3 py-2 border rounded"
          value={gst}
          onChange={(e) => setGst(e.target.value)}
        />

        {/* Address */}
        <label className="block mb-2">Address</label>
        <textarea
          className="w-full mb-4 px-3 py-2 border rounded"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
