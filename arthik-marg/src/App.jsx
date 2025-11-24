import { useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

// Pages
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

import { PurchaseBillsPage } from "./components/PurchaseBillsPage";
import { ImportPartiesPage } from "./components/ImportPartiesPage";
import { ImportItemsPage } from "./components/ImportItemsPage";
import { PartiesPage } from "./components/PartiesPage";
import { InventoryPage } from "./components/InventoryPage";
import { AddPartyForm } from "./components/AddPartyForm";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [reminders, setReminders] = useState([]);
  const [showReminder, setShowReminder] = useState(false);
  const [isSidebarOpen] = useState(true); 

  const isAddPartyModalOpen = location.pathname === "/parties/add";

  const sidebarOffset = isSidebarOpen ? "ml-96" : "ml-16";

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">

      {/* Sidebar */}
      <Sidebar />

      {/* Main container */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOffset}`}>

        {/* Topbar */}
        <Topbar onProfileClick={() => navigate("/complete-profile")} />

        {/* Main content */}
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-sales" element={<AddSales />} />
            <Route path="/add-purchase" element={<AddPurchase />} />

            {/* BUSINESS PAGES */}
            <Route path="/parties" element={<PartiesPage />} />
            <Route path="/inventory" element={<InventoryPage />} />
            <Route path="/purchase-bills" element={<PurchaseBillsPage />} />

            {/* TRANSACTIONS */}
            <Route path="/payment-in" element={<PaymentInForm />} />
            <Route path="/payment-out" element={<PaymentOutForm />} />
            <Route path="/quotation" element={<Quotation />} />
            <Route path="/sales-return" element={<SalesReturn />} />
            <Route path="/purchase-return" element={<PurchaseReturn />} />

            {/* INSIGHTS */}
            <Route path="/sale-insights" element={<SaleInsights />} />
            <Route path="/purchase-insights" element={<PurchaseInsights />} />
            <Route path="/expense-insights" element={<ExpenseInsights />} />

            {/* OTHER */}
            <Route path="/quick-pos" element={<QuickPOS />} />
            <Route path="/complete-profile" element={<CompleteProfile />} />

            {/* IMPORTS */}
            <Route path="/import-parties" element={<ImportPartiesPage />} />
            <Route path="/import-items" element={<ImportItemsPage />} />

            {/* ADD PARTY MODAL TRIGGER */}
            <Route path="/parties/add" element={<PartiesPage />} />
          </Routes>
        </main>
      </div>

      {/* Add Party Modal */}
      {isAddPartyModalOpen && (
        <AddPartyForm onClose={() => navigate("/parties")} />
      )}

      {/* Reminder Modal */}
      {showReminder && (
        <AddReminder
          onClose={() => setShowReminder(false)}
          onSave={(reminder) => setReminders([...reminders, reminder])}
        />
      )}
    </div>
  );
}
