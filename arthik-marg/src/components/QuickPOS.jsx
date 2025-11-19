import { useState } from "react";

export default function QuickPOS() {
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    name: "",
    category: "General",
    type: "Product",
    salesPrice: "",
    purchasePrice: "",
    openingStock: "",
    primaryUnit: "",
    itemCode: "",
    hsCode: "",
    description: "",
  });

  const handleChange = (e) => {
    setItemData({ ...itemData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setItems([...items, { ...itemData }]);
    setItemData({
      name: "",
      category: "General",
      type: "Product",
      salesPrice: "",
      purchasePrice: "",
      openingStock: "",
      primaryUnit: "",
      itemCode: "",
      hsCode: "",
      description: "",
    });
    setShowForm(false);
  };

  const filteredItems =
    activeCategory === "all"
      ? items
      : items.filter((item) => item.category === "General");

  return (
    <div className="w-full max-w-6xl mx-auto p-8">

      <h2 className="text-4xl font-bold mb-8 text-gray-900 dark:text-gray-100">
        Quick POS
      </h2>

      {!showForm && (
        <>
          {/* Search + Add New */}
          <div className="flex gap-4 mb-8">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Items..."
              className="flex-1 px-5 py-4 rounded-lg border dark:bg-gray-700 dark:text-gray-100"
            />
            <button
              onClick={() => setShowForm(true)}
              className="px-8 py-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Add New Item
            </button>
          </div>

          {/* Category Buttons */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveCategory("all")}
              className={`px-8 py-3 rounded ${
                activeCategory === "all"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
              }`}
            >
              All Categories
            </button>

            <button
              onClick={() => setActiveCategory("general")}
              className={`px-8 py-3 rounded ${
                activeCategory === "general"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-100"
              }`}
            >
              General
            </button>
          </div>

          {/* Item List */}
          <div className="space-y-3 max-h-[450px] overflow-y-auto border-t pt-4">
            {filteredItems.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-300">
                No items found.
              </p>
            ) : (
              filteredItems
                .filter((item) =>
                  item.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((item, index) => (
                  <div
                    key={index}
                    className="p-4 rounded border dark:border-gray-700 flex justify-between"
                  >
                    <span className="font-semibold text-lg">{item.name}</span>
                    <span className="text-gray-500 dark:text-gray-300">
                      {item.category}
                    </span>
                  </div>
                ))
            )}
          </div>
        </>
      )}

      {/* Add New Item Form */}
      {showForm && (
        <div className="mt-6 space-y-6 text-lg">

          {/* Header */}
          <div className="flex justify-between">
            <h3 className="text-3xl font-bold">Add New Item</h3>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 bg-gray-300 dark:bg-gray-600 rounded hover:bg-gray-400"
            >
              Back
            </button>
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="font-semibold">Item Name</label>
              <input
                type="text"
                name="name"
                value={itemData.name}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">Item Category</label>
              <input
                type="text"
                name="category"
                value={itemData.category}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="font-semibold">Item Type</label>
              <select
                name="type"
                value={itemData.type}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              >
                <option>Product</option>
                <option>Service</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">Sales Price</label>
              <input
                type="number"
                name="salesPrice"
                value={itemData.salesPrice}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="font-semibold">Purchase Price</label>
              <input
                type="number"
                name="purchasePrice"
                value={itemData.purchasePrice}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">Opening Stock</label>
              <input
                type="number"
                name="openingStock"
                value={itemData.openingStock}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Primary + Secondary Button */}
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="font-semibold">Primary Unit</label>
              <input
                type="text"
                name="primaryUnit"
                value={itemData.primaryUnit}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div className="flex items-end">
              <button
                className="px-6 py-4 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => alert("Add Secondary Unit Logic")}
              >
                Add Secondary Unit
              </button>
            </div>
          </div>

          {/* Other Fields */}
          <div className="grid grid-cols-3 gap-8">

            <div>
              <label className="font-semibold">Item Code</label>
              <input
                type="text"
                name="itemCode"
                value={itemData.itemCode}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">HS Code</label>
              <input
                type="text"
                name="hsCode"
                value={itemData.hsCode}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="font-semibold">Description</label>
              <textarea
                name="description"
                value={itemData.description}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded border dark:bg-gray-700 dark:text-gray-100"
              />
            </div>
          </div>

          {/* Save + Cancel */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowForm(false)}
              className="px-8 py-4 bg-gray-300 dark:bg-gray-600 rounded"
            >
              Cancel
            </button>

            <button
              onClick={handleSave}
              className="px-8 py-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
