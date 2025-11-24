import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// MAIN COMPONENTS
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// DASHBOARD PAGES
import Dashboard from "./components/Dashboard";
import AddSales from "./components/AddSales";
import AddPurchase from "./components/AddPurchase";
import QuickPOS from "./components/QuickPOS";
import AddReminder from "./components/AddReminder";
import CompleteProfile from "./components/CompleteProfile";
import PaymentInForm from "./components/PaymentIn";
import PaymentOutForm from "./components/PaymentOut";
import Quotation from "./components/Quotation";
import SaleInsights from "./components/SaleInsights";
import PurchaseInsights from "./components/PurchaseInsights";
import ExpenseInsights from "./components/ExpenseInsights";
import SalesReturn from "./components/SalesReturn";
import PurchaseReturn from "./components/PurchaseReturn";

export default function App() {
  const navigate = useNavigate();

  const [active, setActive] = useState("dashboard");
  const [showForm, setShowForm] = useState(""); // "sales" | "purchase"
  const [showReminder, setShowReminder] = useState(false);
  const [reminders, setReminders] = useState([]);

  const handleSaveReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ---------------- SIDEBAR ---------------- */}
      <Sidebar
        active={active}
        setActive={(page) => {
          setActive(page);
          setShowForm("");
        }}
      />

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="flex-1 ml-64">
        <Topbar onProfileClick={() => navigate("/complete-profile")} />

        <main className="p-6">

          {/* ROUTES FROM HEAD */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-sales" element={<AddSales />} />
            <Route path="/add-purchase" element={<AddPurchase />} />
            <Route path="/payment-in" element={<PaymentInForm />} />
            <Route path="/payment-out" element={<PaymentOutForm />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/sales-return" element={<SalesReturn />} />
            <Route path="/purchase-return" element={<PurchaseReturn />} />
            <Route path="/sale-insights" element={<SaleInsights />} />
            <Route path="/purchase-insights" element={<PurchaseInsights />} />
            <Route path="/expense-insights" element={<ExpenseInsights />} />
            <Route path="/quick-pos" element={<QuickPOS />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />
          </Routes>

          {/* DASHBOARD BUTTONS IF YOU WANT THEM */}
          {active === "dashboard" && (
            <div>
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

              {showForm === "sales" && <AddSales />}
              {showForm === "purchase" && <AddPurchase />}
            </div>
          )}
        </main>
      </div>

      {/* REMINDER POPUP */}
      {showReminder && (
        <AddReminder
          onClose={() => setShowReminder(false)}
          onSave={handleSaveReminder}
        />
      )}
    </div>
  );
}
