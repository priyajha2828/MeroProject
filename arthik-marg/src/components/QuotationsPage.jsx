import React from "react";
import { Plus } from "lucide-react";

const CUSTOM_BLUE = "bg-[#172554]";

export function QuotationsPage({ sidebarOpen }) {
  const expandedWidth = "24rem";
  const COLLAPSED_MARGIN = "4rem";
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
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
          <div className="w-40 h-40 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-24 h-32 bg-white border-2 border-gray-200 rounded-lg flex flex-col items-center p-3 shadow-sm relative -top-2">

              {/* Header line */}
              <div className="w-full h-8 bg-gray-400 rounded-t-md mb-2 flex items-center px-2">
                <div className="w-10 h-1 bg-white rounded opacity-70"></div>
              </div>

              {/* Lines */}
              <div className="w-12 h-2 bg-gray-200 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>
              <div className="w-16 h-2 bg-gray-100 rounded self-start mb-2"></div>

            </div>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800">
          Create Your First Quotation
        </h2>

        <p className="text-gray-500 text-base max-w-md">
          Click on the Create New Quotation button and start managing your quotations.
        </p>

        {/* Button */}
        <div className="flex items-center gap-4 pt-2">
          <button
            className={`flex items-center gap-2 px-6 py-3 ${CUSTOM_BLUE} text-white rounded-lg font-semibold hover:bg-[#111A31] shadow-sm transition-colors`}
          >
            <Plus size={20} />
            Create New Quotation
          </button>
        </div>

      </div>
    </div>
  );
}
