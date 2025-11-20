import React, { useState } from "react";
import { Plus } from "lucide-react";
import { AddPartyForm } from "./AddPartyForm";

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export function PartiesPage({ sidebarOpen, setActive }) {
  const [showAddPartyForm, setShowAddPartyForm] = useState(false);

  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
    <>
      {/* Add Party Form Modal */}
      {showAddPartyForm && (
        <AddPartyForm
          sidebarOpen={sidebarOpen}
          onClose={() => setShowAddPartyForm(false)}
        />
      )}

      <div
        className="fixed top-16 right-0 bottom-0 bg-white overflow-auto flex flex-col items-center justify-center"
        style={{
          left: sidebarOffset,
          width: `calc(100% - ${sidebarOffset})`,
        }}
      >
        <div className="max-w-lg w-full flex flex-col items-center text-center space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Let's add your First Party
          </h2>

          <p className="text-gray-500 text-base max-w-md">
            Click on the add new party button and manage receivables & payables with them.
          </p>

          <div className="flex items-center gap-4 pt-2">
            {/* Add New Party Button */}
            <button
              onClick={() => setShowAddPartyForm(true)}
              className={`flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold ${CUSTOM_BLUE_HOVER_BG}`}
            >
              <Plus size={20} />
              Add New Party
            </button>

            {/* Import Parties Button */}
            <button
              onClick={() => setActive("import-parties")}
              className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50"
            >
              Import Parties
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
