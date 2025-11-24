import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Topbar from "./components/Topbar";
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
import Sidebar from "./components/Sidebar";

export default function App() {
  const navigate = useNavigate();

  const [reminders, setReminders] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  const handleSaveReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* ✅ SIDEBAR FIXED */}
      <Sidebar />

      <div className="flex-1">

        {/* TOPBAR */}
        <Topbar onProfileClick={() => navigate("/complete-profile")} />

        <main className="p-6">
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
        </main>
      </div>

      {showReminder && (
        <AddReminder
          onClose={() => setShowReminder(false)}
          onSave={handleSaveReminder}
        />
      )}
    </div>
  );
}
