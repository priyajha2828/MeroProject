// src/components/ReportsGallery.jsx
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SECTIONS = [
  {
    id: "transaction",
    title: "Transaction Report",
    items: [
      ["Sales", "View your sales data on a given time"],
      ["Purchase", "View your purchase data on a given time"],
      ["Sales Return", "View your sales return data on a given time"],
      ["Purchase Return", "View your purchase return data on a given time"],
      ["Day Book", "View all of your daily transactions"],
      ["All Transactions", "View all party transactions in a given time"],
      ["Profit And Loss", "View your profit & loss in a givem time"],
    ],
  },
  {
    id: "party",
    title: "Party Report",
    items: [
      ["Party Statement", "Check the transactions of certain party"],
      ["All Party Report", "Receivable/payable dues of every party"],
    ],
  },
  {
    id: "inventory",
    title: "Inventory Report",
    items: [
      ["Item Details Report", "Check stock, transaction of individual item."],
      ["Item List Report", "Shows all the item rates like, sales, purchase, MRP price etc..."],
      ["Low Stock Summary Report", "View all items which are getting low on quantity"],
      ["Stock Quantity Report", "View opening & closing quantity of each item"],
    ],
  },
  {
    id: "income-expense",
    title: "Income Expense Report",
    items: [
      ["Income Expense Report", "Check all the income expense report"],
      ["Expense Category", "Check the categorized expense report in a given date"],
      ["Income Category", "Check the categorized income report in a given date"],
    ],
  },
  {
    id: "business-status",
    title: "Business Status",
    items: [
      ["Cash In Hand Statement", "Check all transaction made with cash"],
      ["Bank Statement", "Check all the transaction made with bank"],
      ["Discount Report", "Check the total discounted amount made by each parties in purchase & sales."],
      ["Tax Sales", "Check report of all Tax applicable sales."],
      ["Tax Purchase", "Check report of all Tax applicable purchase."],
    ],
  },
];

export default function ReportsGallery() {
  const [active, setActive] = useState("All Reports");
  const navigate = useNavigate();

  const tabs = [
    "All Reports",
    "Transactions",
    "Parties",
    "Inventory",
    "Income Expense",
    "Business Status",
  ];

  // Handle card click + route mapping
  const handleClick = (title) => {
    const route = title
      .toLowerCase()
      .replace(/ /g, "-")              // spaces → dashes
      .replace(/&/g, "and")            // & → and
      .replace(/[^a-zA-Z0-9-]/g, "");  // remove invalid chars

    navigate(`/reports/${route}`);
  };

  // Filter sections to render according to active tab
  const sectionsToShow = useMemo(() => {
    if (active === "All Reports") return SECTIONS;
    if (active === "Transactions") return SECTIONS.filter((s) => s.id === "transaction");
    if (active === "Parties") return SECTIONS.filter((s) => s.id === "party");
    if (active === "Inventory") return SECTIONS.filter((s) => s.id === "inventory");
    if (active === "Income Expense") return SECTIONS.filter((s) => s.id === "income-expense");
    if (active === "Business Status") return SECTIONS.filter((s) => s.id === "business-status");
    return SECTIONS;
  }, [active]);

  return (
    <div className="px-8 pt-6 pb-16 w-full">

      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Browse Various Reports
      </h1>

      {/* Tabs + Search */}
      <div className="flex items-center justify-between w-full mb-10">
        <div className="flex gap-3 flex-wrap">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`px-4 py-2 rounded-lg text-sm font-medium border transition ${
                active === t
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {t}
            </button>
          ))}

        </div>

        <div className="relative w-64">
          <Search
            size={18}
            className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500"
          />
          <input
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none"
            placeholder="Search reports..."
          />
        </div>
      </div>

      {/* Render filtered sections (keeps exact same UI) */}
      {sectionsToShow.map((section) => (
        <div key={section.id} className="mb-12">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">{section.title}</h2>

          <div className="grid grid-cols-4 gap-6">
            {section.items.map(([title, desc]) => (
              <div
                key={title}
                onClick={() => handleClick(title)}
                className="p-5 border border-gray-200 rounded-2xl bg-white hover:shadow-md cursor-pointer transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

    </div>
  );
}
