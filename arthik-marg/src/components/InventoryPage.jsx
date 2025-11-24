import React, { useState } from "react";
import { Package, Plus, FileText } from "lucide-react";
import { ImportItemsPage } from "./ImportItemsPage";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export function InventoryPage({ sidebarOpen }) {
  const [showImportItems, setShowImportItems] = useState(false);

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
    <>
      {/* If user clicked Import Items → show import page */}
      {showImportItems && (
        <ImportItemsPage sidebarOpen={sidebarOpen} />
      )}

      {/* Main Inventory Page */}
      {!showImportItems && (
        <div
          className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
          style={{
            left: sidebarOffset,
            width: `calc(100% - ${sidebarOffset})`,
          }}
        >
          <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6">
            {/* Illustration */}
            <div className="relative flex flex-col items-center mb-4">
              <div className="w-32 h-32 bg-blue-50 border-2 border-blue-100 rounded-xl flex items-center justify-center rotate-3">
                <Package size={64} className="text-blue-200" />
              </div>

              <div className="absolute -left-4 top-10 w-4 h-4 bg-yellow-200 rounded-full opacity-50"></div>
              <div className="absolute -right-2 bottom-4 w-6 h-6 bg-blue-100 rounded-full opacity-50"></div>
            </div>

            <h2 className="text-2xl font-bold text-gray-800">
              Let's add your First Item
            </h2>

            <p className="text-gray-500 text-base max-w-md">
              Click on the add new item button and start managing your items.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {/* Add New Item Button */}
              <button
                className={`flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold ${CUSTOM_BLUE_HOVER_BG} shadow-sm`}
              >
                <Plus size={20} />
                Add New Item
              </button>

              {/* Import Items Button */}
              <button
                onClick={() => setShowImportItems(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <FileText size={20} />
                Import Items
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
