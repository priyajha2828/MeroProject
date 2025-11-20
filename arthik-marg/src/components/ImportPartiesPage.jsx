import React, { useState } from "react";
import {
  FileText,
  Download,
  CloudUpload,
} from "lucide-react";

// --- Import Parties Page Component ---
export function ImportPartiesPage({ sidebarOpen }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const CUSTOM_BLUE = "bg-[#172554]";
  const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

  // Drag & Drop State
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleDownload = () => {
    console.log("Download initiated for sample_parties.xlsx");
  };

  // DRAG & DROP HANDLERS
  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files?.length > 0) setUploadedFile(files[0]);
  };
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files?.length > 0) setUploadedFile(files[0]);
  };

  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white flex"
      style={{
        left: sidebarOffset,
        width: `calc(100% - ${sidebarOffset})`,
      }}
    >
      {/* ---------------- LEFT COLUMN ---------------- */}
      <div className="w-1/2 p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold text-black mb-6">
          Import Parties in 3 Steps
        </h2>

        {/* Step 1 */}
        <h3 className="text-xl font-bold text-black mb-6">
          1. Download the file & Fill Data
        </h3>
        <p className="text-gray-600 mb-4">
          Download our sample excel file and enter your data according to the file format.
        </p>

        {/* Sample Table */}
        <div className="border border-gray-300 rounded-lg overflow-x-auto mb-6 shadow-sm">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className={CUSTOM_BLUE}>
              <tr>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Party Name
                </th>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Phone Number
                </th>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Customer / Supplier
                </th>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Opening Balance
                </th>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Receivables / Payables
                </th>
                <th className="px-3 py-2 text-left text-xs text-white uppercase tracking-wider">
                  Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2 text-gray-700">Rani Retail</td>
                <td className="px-3 py-2 text-gray-700">9111111111</td>
                <td className="px-3 py-2 text-gray-700">Customer</td>
                <td className="px-3 py-2 text-gray-700">1000</td>
                <td className="px-3 py-2 text-gray-700">Receivables</td>
                <td className="px-3 py-2 text-gray-700"></td>
              </tr>

              <tr>
                <td className="px-3 py-2 text-gray-700">Mohan Dakhal</td>
                <td className="px-3 py-2 text-gray-700">0000000000</td>
                <td className="px-3 py-2 text-gray-700">Customer</td>
                <td className="px-3 py-2 text-gray-700">1000</td>
                <td className="px-3 py-2 text-gray-700">Receivables</td>
                <td className="px-3 py-2 text-gray-700"></td>
              </tr>

              <tr>
                <td className="px-3 py-2 text-gray-700">Krishna Lalit</td>
                <td className="px-3 py-2 text-gray-700">0000000000</td>
                <td className="px-3 py-2 text-gray-700">Supplier</td>
                <td className="px-3 py-2 text-gray-700">8000</td>
                <td className="px-3 py-2 text-gray-700">Payable</td>
                <td className="px-3 py-2 text-gray-700">Sanepa</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Button */}
        <a
          href="/files/sample_parties.xlsx"
          download="sample_parties_import.xlsx"
          className={`inline-flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold ${CUSTOM_BLUE_HOVER_BG} shadow-sm transition-colors mb-12 cursor-pointer`}
          onClick={handleDownload}
        >
          <Download size={20} />
          Download Sample File
        </a>

        {/* Step 2 */}
        <h3 className="text-xl font-bold text-black mb-2">
          2. Review & Adjust Data
        </h3>
        <p className="text-gray-600 mb-6">
          Review the data inside the app. Fix errors before importing.
        </p>

        {/* Step 3 */}
        <h3 className="text-xl font-bold text-black mb-2">
          3. Confirm & Import
        </h3>
        <p className="text-gray-600 mb-6">
          After everything is ready, start the import process.
        </p>
      </div>

      {/* ---------------- RIGHT COLUMN (Drag & Drop) ---------------- */}
      <div className="w-1/2 p-10 flex items-center justify-center bg-gray-50 border-l border-gray-200">
        <label
          htmlFor="file-upload-parties"
          className={`w-full h-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center p-8 cursor-pointer transition-colors 
            ${isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300 hover:border-blue-400"}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {/* hidden input */}
          <input
            type="file"
            id="file-upload-parties"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileSelect}
          />

          {uploadedFile ? (
            <div className="text-center p-4">
              <FileText size={48} className="text-green-500 mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-semibold mb-1">File Ready:</p>
              <p className="text-green-600 font-medium">{uploadedFile.name}</p>
              <p className="text-gray-400 text-sm mt-3">Click here to change the file.</p>
            </div>
          ) : (
            <>
              <CloudUpload
                size={48}
                className={`mb-4 ${isDragging ? "text-blue-500" : "text-gray-400"}`}
              />
              <p className="text-gray-500 text-lg font-semibold">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Only Excel files up to 500 entries & 1MB supported.
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
