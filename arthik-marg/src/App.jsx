// src/App.jsx
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import AddReminder from "./components/AddReminder";

// Existing Pages
import Dashboard from "./components/Dashboard";
import AddSales from "./components/AddSales";
import AddPurchase from "./components/AddPurchase";
import QuickPOS from "./components/QuickPOS";
import CompleteProfile from "./components/CompleteProfile";
import PaymentInForm from "./components/PaymentIn";
import PaymentOutForm from "./components/PaymentOut";
import Quotation from "./components/Quotation";
import SaleInsights from "./components/SaleInsights";
import PurchaseInsights from "./components/PurchaseInsights";
import ExpenseInsights from "./components/ExpenseInsights";
import SalesReturn from "./components/SalesReturn";
import PurchaseReturn from "./components/PurchaseReturn";

// New / other pages
import { SalesInvoicePage } from "./components/SalesInvoicePage";
import { PurchaseBillsPage } from "./components/PurchaseBillsPage";
import { ImportPartiesPage } from "./components/ImportPartiesPage";
import { ImportItemsPage } from "./components/ImportItemsPage";
import { InventoryPage } from "./components/InventoryPage";
import { PartiesPage } from "./components/PartiesPage";
import CashReportPage from "./components/CashReportPage";


// Expense & Other Income pages
import { OtherIncomePage } from "./components/OtherIncomePage";
import { ExpensePage } from "./components/ExpensePage";

// Manage Accounts page
import ManageAccountsPage from "./components/ManageAccountsPage";

// Settings (nested)
import SettingsPage from "./components/SettingsPage";

export default function App() {
  const navigate = useNavigate();
  const [reminders, setReminders] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSaveReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 flex flex-col">
        <Topbar
          onProfileClick={() => navigate("/complete-profile")}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main className="p-6">
          <Routes>
            <Route path="/" element={<Dashboard sidebarOpen={sidebarOpen} />} />
            <Route path="/add-sales" element={<AddSales sidebarOpen={sidebarOpen} />} />
            <Route path="/add-purchase" element={<AddPurchase sidebarOpen={sidebarOpen} />} />
            <Route path="/payment-in" element={<PaymentInForm sidebarOpen={sidebarOpen} />} />
            <Route path="/payment-out" element={<PaymentOutForm sidebarOpen={sidebarOpen} />} />
            <Route path="/quotation" element={<Quotation sidebarOpen={sidebarOpen} />} />
            <Route path="/sales-return" element={<SalesReturn sidebarOpen={sidebarOpen} />} />
            <Route path="/purchase-return" element={<PurchaseReturn sidebarOpen={sidebarOpen} />} />
            <Route path="/sale-insights" element={<SaleInsights sidebarOpen={sidebarOpen} />} />
            <Route path="/purchase-insights" element={<PurchaseInsights sidebarOpen={sidebarOpen} />} />
            <Route path="/expense-insights" element={<ExpenseInsights sidebarOpen={sidebarOpen} />} />
            <Route path="/quick-pos" element={<QuickPOS sidebarOpen={sidebarOpen} />} />
            <Route path="/complete-profile" element={<CompleteProfile sidebarOpen={sidebarOpen} />} />

            <Route path="/sales-invoice" element={<SalesInvoicePage sidebarOpen={sidebarOpen} />} />
            <Route path="/purchase-bills" element={<PurchaseBillsPage sidebarOpen={sidebarOpen} />} />
            <Route path="/import-parties" element={<ImportPartiesPage sidebarOpen={sidebarOpen} />} />
            <Route path="/import-items" element={<ImportItemsPage sidebarOpen={sidebarOpen} />} />
            <Route path="/inventory" element={<InventoryPage sidebarOpen={sidebarOpen} />} />
            <Route path="/parties" element={<PartiesPage sidebarOpen={sidebarOpen} />} />
            <Route path="/cash-report/:accountId" element={<CashReportPage />} />

            {/* pages we added */}
            <Route path="/expense" element={<ExpensePage sidebarOpen={sidebarOpen} />} />
            <Route path="/other-income" element={<OtherIncomePage sidebarOpen={sidebarOpen} />} />
            <Route path="/accounts" element={<ManageAccountsPage sidebarOpen={sidebarOpen} />} />

            <Route path="/settings/*" element={<SettingsPage sidebarOpen={sidebarOpen} />} />
          </Routes>
        </main>
      </div>

      {showReminder && (
        <AddReminder onClose={() => setShowReminder(false)} onSave={handleSaveReminder} />
      )}
    </div>
  );
}
