import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
// import index from "./index.css";


export default function App() {
  const [active, setActive] = useState("dashboard");
  const [showForm, setShowForm] = useState(""); // "sales" or "purchase"


  // return (
  //   <div className="flex">
  //     <h1 className="text-blue-500">THIS IS APPP</h1>
  //     </div>
  // )

  return (
    <div className="flex">
      <Sidebar active={active} setActive={(page) => {
        setActive(page);
        setShowForm("");   // hide forms when switching pages
      }} />

      <div className="ml-64 p-6 w-full">

        {/* ---------------- DASHBOARD ---------------- */}
        {active === "dashboard" && (
          <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

            {/* Buttons */}
            <div className="flex gap-4 mb-6">
              <button
                onClick={() => setShowForm("sales")}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Add Sales
              </button>

              <button
                onClick={() => setShowForm("purchase")}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Add Purchase
              </button>
            </div>

            {/* Show Forms */}
            {showForm === "sales" && <AddSales />}
            {showForm === "purchase" && <AddPurchase />}
          </div>
        )}

        {/* ---------------- OTHER PAGES ---------------- */}
        {active === "party" && <h1 className="text-2xl font-bold">Party Management</h1>}
        {active === "inventory" && <h1 className="text-2xl font-bold">Inventory</h1>}
        {active === "reports" && <h1 className="text-2xl font-bold">Reports</h1>}
        {active === "staffs" && <h1 className="text-2xl font-bold">Manage Staffs</h1>}
      </div>
    </div>
  );
}