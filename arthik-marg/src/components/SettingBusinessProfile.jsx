import React, { useState } from "react";
import { ChevronDown, ChevronUp, Trash2, Archive, Calendar } from "lucide-react";

export default function SettingBusinessProfile() {
  // Basic info
  const [businessName, setBusinessName] = useState("developer");
  const [contactNumber, setContactNumber] = useState("9709068360");
  const [businessEmail, setBusinessEmail] = useState("");
  const [category, setCategory] = useState("Cable Operator");
  const [type, setType] = useState("Retailer");

  // Address
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [street, setStreet] = useState("");

  // Financial
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [bankAccountAdded, setBankAccountAdded] = useState(false);

  // UI
  const [dangerOpen, setDangerOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      alert("Business profile saved (mock)");
    }, 700);
  };

  const handleAddBank = () => {
    setBankAccountAdded(true);
    alert("Bank account added (mock)");
  };

  const handleCloseFiscal = () => {
    if (!confirm("Close fiscal year? This will archive the business and create a new profile.")) return;
    alert("Fiscal year closed (mock)");
  };

  const handleArchive = () => {
    if (!confirm("Archive this business profile? You will only have read-only access.")) return;
    alert("Business archived (mock)");
  };

  const handleDelete = () => {
    if (!confirm("Delete business profile permanently? This cannot be undone.")) return;
    alert("Business deleted (mock)");
  };

  return (
    <div className="p-6 overflow-auto max-h-screen">
      <h2 className="text-2xl font-semibold mb-4">Business Profile</h2>

      <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
        {/* Card: Basic Information */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

          <div className="flex gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Business Name</label>
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Business Contact Number</label>
                <input
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Business Email</label>
                <input
                  type="email"
                  value={businessEmail}
                  onChange={(e) => setBusinessEmail(e.target.value)}
                  placeholder="Enter your business email"
                  className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option>Cable Operator</option>
                    <option>Retail</option>
                    <option>Wholesale</option>
                    <option>Service</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="mt-1 w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    <option>Retailer</option>
                    <option>Distributor</option>
                    <option>Manufacturer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Photo area */}
            <div className="w-40 flex flex-col items-center gap-3">
              <div className="w-28 h-28 rounded-md bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                <svg width="28" height="20" viewBox="0 0 24 24" fill="none" className="opacity-70">
                  <path d="M3 7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" strokeWidth="1.2" />
                  <path d="M8 11l2 2 3-3 4 4" stroke="currentColor" strokeWidth="1.2" />
                </svg>
              </div>

              <label className="w-full">
                <input type="file" className="hidden" />
                <div className="px-4 py-2 border rounded-lg text-sm font-medium text-center cursor-pointer bg-white">
                  Upload Photo
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Card: Address Information */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Address Information</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Province</label>
              <select
                value={province}
                onChange={(e) => setProvince(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="">Select Province</option>
                <option>Province 1</option>
                <option>Province 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="">Select District</option>
                <option>District A</option>
                <option>District B</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Municipality</label>
              <select
                value={municipality}
                onChange={(e) => setMunicipality(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="">Select Municipality</option>
                <option>Municipality 1</option>
                <option>Municipality 2</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Street Address</label>
              <input
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                placeholder="Enter the name of the Street"
                className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* Card: Financial Information */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Financial Information</h3>

          <div className="grid grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                placeholder="Enter registration number"
                className="mt-1 w-full px-3 py-2 border rounded-lg bg-gray-50"
              />
            </div>

            <div className="flex items-center justify-end">
              <button
                type="button"
                onClick={handleAddBank}
                className="
                  px-4 py-2 
                  border rounded-lg 
                  text-[#172554] font-medium
                  hover:bg-gray-100 hover:text-black
                  transition
                "
              >
                {bankAccountAdded ? "Bank Account Added" : "Add Bank Account"}
                <span className="ml-2">›</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2 bg-[#172554] text-white rounded-md hover:bg-[#111A31] disabled:opacity-60"
              disabled={saving}
            >
              {saving ? "Saving..." : "Save Details"}
            </button>
          </div>
        </div>

        {/* Card: Danger Area */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">
          <button
            type="button"
            onClick={() => setDangerOpen((s) => !s)}
            className="w-full px-6 py-4 flex items-center justify-between"
          >
            <div className="text-left">
              <h4 className="font-semibold">Danger Area</h4>
            </div>
            <div>{dangerOpen ? <ChevronUp /> : <ChevronDown />}</div>
          </button>

          {dangerOpen && (
            <div className="divide-y">
              <div className="p-4 flex items-start gap-4">
                <div className="p-3 rounded-md bg-gray-50">
                  <Calendar size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold">Close Fiscal Year</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    This business will be archived & a new profile will be created by carrying forward old balance as opening balance.
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleCloseFiscal}
                    className="px-4 py-2 border rounded-md text-[#172554] hover:bg-[#111A31] hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>

              <div className="p-4 flex items-start gap-4">
                <div className="p-3 rounded-md bg-gray-50">
                  <Archive size={20} />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold">Archive Business Profile</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    This business profile will be inactive but you will be able to access all data in read-only mode.
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleArchive}
                    className="px-4 py-2 border rounded-md text-[#172554] hover:bg-[#111A31] hover:text-white"
                  >
                    Archive
                  </button>
                </div>
              </div>

              <div className="p-4 flex items-start gap-4">
                <div className="p-3 rounded-md bg-red-50">
                  <Trash2 size={20} className="text-red-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-semibold text-red-600">Delete Business Profile</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    Your business profile will be deleted permanently.
                  </p>
                </div>
                <div>
                  <button
                    onClick={handleDelete}
                    className="px-4 py-2 bg-red-50 border rounded-md text-red-600 hover:bg-red-100"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
