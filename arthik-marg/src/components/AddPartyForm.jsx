// src/components/AddPartyForm.jsx
import React, { useState, useContext } from "react";
import { User, Upload, X } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext"; // matches your ThemeContext.js

// Custom fallback classes (tailwind utilities kept for layout)
const GRAY_HOVER_BG = "hover:bg-gray-100";

export function AddPartyForm({ onClose }) {
  const today = new Date().toISOString().split("T")[0];

  // theme from context (ThemeProvider applies CSS variables on root)
  const { theme } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    openingBalance: "0",
    asOfDate: today,
  });

  const [partyType, setPartyType] = useState("Customer");
  const [activeTab, setActiveTab] = useState("Credit Info");
  const [transactionType, setTransactionType] = useState("To Receive");
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    console.log("Saving Party:", {
      formData,
      partyType,
      transactionType,
      photo: photoPreview ? "Uploaded" : "None",
    });
    if (onClose) onClose();
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const InputField = ({ label, name, placeholder, type = "text", required = false }) => (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1" style={{ color: "var(--text-default)" }}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        className="px-3 py-2 border rounded-lg focus:outline-none text-sm"
        style={{
          borderColor: "rgba(128,128,128,0.35)",
          background: "var(--surface-100)",
          color: "var(--text-default)",
        }}
      />
    </div>
  );

  const TabButton = ({ name }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
        activeTab === name ? "border-b-2" : "text-gray-400"
      }`}
      style={{
        borderColor: activeTab === name ? "var(--primary-500)" : "transparent",
        color: activeTab === name ? "var(--primary-500)" : "var(--text-default)",
        background: "transparent",
      }}
    >
      {name}
    </button>
  );

  const TransactionButton = ({ type, label }) => {
    const active = transactionType === type;
    return (
      <button
        onClick={() => setTransactionType(type)}
        className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors duration-200 border`}
        style={{
          background: active ? "var(--primary-500)" : "var(--surface-100)",
          color: active ? "var(--text-default)" : "var(--text-default)",
          borderColor: active ? "transparent" : "rgba(128,128,128,0.35)",
          boxShadow: active ? "0 6px 18px rgba(16,24,40,0.15)" : "none",
        }}
      >
        {label}
      </button>
    );
  };

  // modal container style driven by CSS variables from ThemeProvider
  const modalStyle = {
    background: "var(--bg-default)",
    color: "var(--text-default)",
    // small visual tweak if classic theme: subtle border
    border: theme === "classic" ? "1px solid rgba(0,0,0,0.08)" : "none",
  };

  // button style (primary) uses --primary-500 and --text-default
  const primaryButtonStyle = {
    background: "var(--primary-500)",
    color: "var(--text-default)",
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="rounded-lg shadow-2xl w-full max-w-2xl transform transition-all"
        style={modalStyle}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "rgba(128,128,128,0.08)" }}>
          <h2 className="text-xl font-bold" style={{ color: "var(--text-default)" }}>
            Add New Party
          </h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-700">
            <X size={24} style={{ color: "var(--text-default)" }} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {/* Top Row */}
          <div className="flex gap-6 mb-6">
            <div className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-full flex items-center justify-center mb-2 overflow-hidden border"
                style={{
                  background: "var(--surface-100)",
                  borderColor: "rgba(128,128,128,0.12)",
                }}
              >
                {photoPreview ? (
                  <img src={photoPreview} alt="Party" className="w-full h-full object-cover" />
                ) : (
                  <User size={48} style={{ color: "rgba(128,128,128,0.7)" }} />
                )}
              </div>

              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoUpload}
              />

              <label
                htmlFor="photo-upload"
                className="text-sm font-medium mb-0 hover:text-black flex items-center gap-1 cursor-pointer"
                style={{ color: "var(--text-default)" }}
              >
                <Upload size={14} />
                <span style={{ color: "var(--text-default)" }}>Upload Photo</span>
              </label>
            </div>

            <div className="flex flex-col space-y-4 w-full">
              <InputField label="Full Name" name="fullName" placeholder="Enter the name of party" required />
              <InputField label="Phone Number" name="phoneNumber" placeholder="Enter party phone no" type="tel" />
            </div>
          </div>

          {/* Party Type */}
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block" style={{ color: "var(--text-default)" }}>
              Party Type
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setPartyType("Customer");
                  setTransactionType("To Receive");
                }}
                className="px-4 py-2 text-sm font-medium rounded transition-colors duration-200 border"
                style={{
                  background: partyType === "Customer" ? "var(--primary-500)" : "var(--surface-100)",
                  color: partyType === "Customer" ? "var(--text-default)" : "var(--text-default)",
                  borderColor: partyType === "Customer" ? "transparent" : "rgba(128,128,128,0.35)",
                }}
              >
                Customer
              </button>

              <button
                onClick={() => {
                  setPartyType("Supplier");
                  setTransactionType("To Give");
                }}
                className="px-4 py-2 text-sm font-medium rounded transition-colors duration-200 border"
                style={{
                  background: partyType === "Supplier" ? "var(--primary-500)" : "var(--surface-100)",
                  color: partyType === "Supplier" ? "var(--text-default)" : "var(--text-default)",
                  borderColor: partyType === "Supplier" ? "transparent" : "rgba(128,128,128,0.35)",
                }}
              >
                Supplier
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b mb-6" style={{ borderColor: "rgba(128,128,128,0.08)" }}>
            <TabButton name="Credit Info" />
            <TabButton name="Additional Info" />
          </div>

          {/* Tab Content */}
          {activeTab === "Credit Info" && (
            <div className="space-y-6">
              <div className="flex gap-6">
                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium mb-1" style={{ color: "var(--text-default)" }}>
                    Opening Balance
                  </label>
                  <input
                    type="number"
                    name="openingBalance"
                    value={formData.openingBalance}
                    onChange={handleChange}
                    placeholder="Rs. eg. 0"
                    className="px-3 py-2 border rounded-lg focus:outline-none text-sm"
                    style={{
                      borderColor: "rgba(128,128,128,0.35)",
                      background: "var(--surface-100)",
                      color: "var(--text-default)",
                    }}
                  />
                </div>

                <div className="flex flex-col w-1/2">
                  <label className="text-sm font-medium mb-1" style={{ color: "var(--text-default)" }}>
                    As of Date
                  </label>
                  <input
                    type="date"
                    name="asOfDate"
                    value={formData.asOfDate}
                    onChange={handleChange}
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none"
                    style={{
                      borderColor: "rgba(128,128,128,0.35)",
                      background: "var(--surface-100)",
                      color: "var(--text-default)",
                    }}
                  />
                </div>
              </div>

              {/* Transaction Type */}
              <div className="flex gap-4 pt-2">
                <TransactionButton type="To Receive" label="To Receive" />
                <TransactionButton type="To Give" label="To Give" />
              </div>
            </div>
          )}

          {activeTab === "Additional Info" && (
            <div className="text-sm p-4" style={{ color: "var(--text-default)" }}>
              Additional fields go here (GSTIN, Address, Email, etc.)
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-4 border-t rounded-b-lg" style={{ borderColor: "rgba(128,128,128,0.08)", background: "var(--surface-200)" }}>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold"
            style={primaryButtonStyle}
          >
            Save Party
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPartyForm;
