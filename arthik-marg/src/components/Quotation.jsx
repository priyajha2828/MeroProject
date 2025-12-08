// src/components/Quotation.jsx
import React from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Quotation() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 p-6">
      <div className="text-center max-w-2xl">
        {/* Icon */}
        <div className="mx-auto mb-8 w-40 h-40 rounded-full bg-white/50 flex items-center justify-center shadow-sm">
          <div className="w-20 h-20 rounded-md bg-white/60 flex items-center justify-center border border-gray-200">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#CBD5E1"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 8h10M7 12h6M7 16h4" />
            </svg>
          </div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-3">
          Create Your First Quotation
        </h2>

        {/* Subtext */}
        <p className="text-gray-500 mb-8">
          Click on the create quotation button and start sending quotations to your customers.
        </p>

        {/* Button → Navigate to create page */}
        <button
          onClick={() => navigate("/quotation/create")}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-lg bg-slate-800 text-white font-medium shadow hover:shadow-md transition"
        >
          <Plus size={16} />
          Create Quotation
        </button>
      </div>
    </div>
  );
}
