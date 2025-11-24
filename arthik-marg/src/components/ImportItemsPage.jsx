import React, { useState } from "react";
import { FileText, Download, CloudUpload } from "lucide-react";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export function ImportItemsPage({ sidebarOpen }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

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
    if (e.dataTransfer.files?.length > 0) {
      setUploadedFile(e.dataTransfer.files[0]);
    }
  };
  const handleFileSelect = (e) => {
    if (e.target.files?.length > 0) {
      setUploadedFile(e.target.files[0]);
    }
  };

  return (
    <div
      className="fixed top-16 right-0 bottom-0 bg-white flex"
      style={{
        left: sidebarOffset,
        width: `calc(100% - ${sidebarOffset})`,
      }}
    >
      {/* LEFT SECTION */}
      <div className="w-1/2 p-10 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Import Items in 3 Steps</h2>

        {/* Step 1 */}
        <h3 className="text-xl font-bold mb-6">
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
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Item Name
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Category
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Sale Price
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Purchase Price
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Opening Stock
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Low Stock
                </th>
                <th className="px-3 py-2 text-left text-white uppercase text-xs">
                  Item Code
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-3 py-2">Clear Gold Soap</td>
                <td className="px-3 py-2">General</td>
                <td className="px-3 py-2">100</td>
                <td className="px-3 py-2">80</td>
                <td className="px-3 py-2">500</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">CG123</td>
              </tr>

              <tr>
                <td className="px-3 py-2">Premium Watch (L)</td>
                <td className="px-3 py-2">Electronics</td>
                <td className="px-3 py-2">12000</td>
                <td className="px-3 py-2">9000</td>
                <td className="px-3 py-2">15</td>
                <td className="px-3 py-2">2</td>
                <td className="px-3 py-2"></td>
              </tr>

              <tr>
                <td className="px-3 py-2">Mixed Fruit Snack</td>
                <td className="px-3 py-2">General</td>
                <td className="px-3 py-2">70</td>
                <td className="px-3 py-2">50</td>
                <td className="px-3 py-2">80</td>
                <td className="px-3 py-2">10</td>
                <td className="px-3 py-2">MFB123</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Download Button */}
        <a
          href="/files/sample_items.xlsx"
          download="sample_items_import.xlsx"
          className={`inline-flex items-center gap-2 px-6 py-3 text-white rounded-lg font-semibold ${CUSTOM_BLUE} ${CUSTOM_BLUE_HOVER_BG} shadow-sm mb-12`}
        >
          <Download size={20} />
          Download Sample File
        </a>

        {/* Steps 2 & 3 */}
        <h3 className="text-xl font-bold mb-2">2. Review & Adjust Data</h3>
        <p className="text-gray-600 mb-6">
          Review your data inside the app. Fix errors before importing.
        </p>

        <h3 className="text-xl font-bold mb-2">3. Confirm & Import</h3>
        <p className="text-gray-600 mb-6">
          Once everything looks correct, begin the import.
        </p>
      </div>

      {/* RIGHT SECTION - DRAG & DROP */}
      <div className="w-1/2 p-10 flex items-center justify-center bg-gray-50 border-l border-gray-200">
        <label
          htmlFor="file-upload-items"
          className={`w-full h-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors 
            ${isDragging ? "border-blue-500 bg-blue-50/50" : "border-gray-300 hover:border-blue-400"}`}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload-items"
            accept=".xlsx,.xls"
            className="hidden"
            onChange={handleFileSelect}
          />

          {uploadedFile ? (
            <div className="text-center p-4">
              <FileText size={48} className="text-green-500 mx-auto mb-4" />
              <p className="text-gray-700 text-lg font-semibold">File Ready:</p>
              <p className="text-green-600">{uploadedFile.name}</p>
              <p className="text-gray-400 text-sm mt-2">Click to change file</p>
            </div>
          ) : (
            <>
              <CloudUpload
                size={48}
                className={`mb-4 ${
                  isDragging ? "text-blue-500" : "text-gray-400"
                }`}
              />
              <p className="text-gray-500 text-lg font-semibold">
                Click to Upload or Drag & Drop
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Excel files up to 500 entries & 1MB supported.
              </p>
            </>
          )}
        </label>
      </div>
    </div>
  );
}
