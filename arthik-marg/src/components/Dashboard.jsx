// src/components/Dashboard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Card from "./Card";
import AddReminder from "./AddReminder";
import CompleteProfile from "./CompleteProfile";

import { DollarSign, CreditCard, ShoppingCart, Package, BarChart2 } from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PaymentInForm from "./PaymentIn";
import PaymentOutForm from "./PaymentOut";
import CreateQuotation from "./CreateQuotation";
import SalesReturn from "./SalesReturn";
import PurchaseReturn from "./PurchaseReturn";
import { ExpensePage } from "./ExpensePage";
import { OtherIncomePage } from "./OtherIncomePage";

/**
 * Lightweight helper panels used by Dashboard.
 * If you have separate components for these, replace these with imports.
 */
function ReminderPanel({ reminders = [], open = () => {} }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow min-h-40">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Reminders</h3>
          <p className="text-xs text-gray-500 mt-1">Upcoming reminders: {reminders.length}</p>
        </div>
        <button onClick={open} className="px-3 py-1 bg-[#172554] text-white rounded text-sm">Open</button>
      </div>
    </div>
  );
}

function BalancePanel() {
  return (
    <div className="bg-white p-4 rounded-xl shadow min-h-40 flex flex-col justify-between">
      <div>
        <div className="text-sm text-gray-500">Total Balance (Cash & Bank)</div>
        <div className="text-2xl font-semibold mt-2">Rs. 0</div>
      </div>
    </div>
  );
}

function ProfilePanel({ profileData = null, open = () => {} }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow min-h-40 flex flex-col justify-between">
      <div>
        <div className="text-sm text-gray-500">Complete your Profile</div>
        <div className="font-semibold text-lg">{profileData ? "100%" : "30%"}</div>
      </div>

      <button onClick={open} className="px-4 py-2 mt-4 bg-[#072255] text-white rounded-xl">
        Complete Profile
      </button>
    </div>
  );
}

export default function Dashboard() {
  const navigate = useNavigate();

  const [showAddMore, setShowAddMore] = useState(false);

  // Modal flags
  const [showPaymentIn, setShowPaymentIn] = useState(false);
  const [showPaymentOut, setShowPaymentOut] = useState(false);
  const [showQuotationCreate, setShowQuotationCreate] = useState(false);
  const [showSalesReturnCreate, setShowSalesReturnCreate] = useState(false);
  const [showPurchaseReturnCreate, setShowPurchaseReturnCreate] = useState(false);
  const [showExpenseCreate, setShowExpenseCreate] = useState(false);
  const [showIncomeCreate, setShowIncomeCreate] = useState(false);

  const [showReminder, setShowReminder] = useState(false);
  const [reminders, setReminders] = useState([]);

  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const handleSaveReminder = (newReminder) => {
    setReminders((prev) => [...prev, newReminder]);
  };

  const cashflowData = [
    { day: "Mon", income: 2000, expense: 1500 },
    { day: "Tue", income: 2500, expense: 1000 },
    { day: "Wed", income: 1800, expense: 1200 },
    { day: "Thu", income: 3000, expense: 2000 },
    { day: "Fri", income: 3500, expense: 2500 },
    { day: "Sat", income: 2000, expense: 1800 },
    { day: "Sun", income: 4000, expense: 2200 },
  ];

  const buttonBaseClass = "px-4 py-2 rounded-xl text-white hover:opacity-90";

  return (
    <div className="p-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Welcome</h2>

        <div className="flex gap-3 relative">
          <button onClick={() => navigate("/quick-pos")} className={`${buttonBaseClass} bg-[#072255]`}>Quick POS</button>
          <button onClick={() => navigate("/add-sales")} className={`${buttonBaseClass} bg-[#072255]`}>+ Add Sales</button>
          <button onClick={() => navigate("/add-purchase")} className={`${buttonBaseClass} bg-[#072255]`}>+ Add Purchase</button>

          <div className="relative">
            <button onClick={() => setShowAddMore((prev) => !prev)} className={`${buttonBaseClass} bg-[#072255] flex items-center gap-1`}>
              + Add More ▼
            </button>

            {showAddMore && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <DropdownBtn label="Payment In" icon={<DollarSign size={16} />} onClick={() => { setShowAddMore(false); setShowPaymentIn(true); }} />
                <DropdownBtn label="Payment Out" icon={<CreditCard size={16} />} onClick={() => { setShowAddMore(false); setShowPaymentOut(true); }} />
                <DropdownBtn label="Quotation" icon={<ShoppingCart size={16} />} onClick={() => { setShowAddMore(false); setShowQuotationCreate(true); }} />
                <DropdownBtn label="Sales Return" icon={<Package size={16} />} onClick={() => { setShowAddMore(false); setShowSalesReturnCreate(true); }} />
                <DropdownBtn label="Purchase Return" icon={<Package size={16} />} onClick={() => { setShowAddMore(false); setShowPurchaseReturnCreate(true); }} />
                <DropdownBtn label="Expense" icon={<BarChart2 size={16} />} onClick={() => { setShowAddMore(false); setShowExpenseCreate(true); }} />
                <DropdownBtn label="Income" icon={<DollarSign size={16} />} onClick={() => { setShowAddMore(false); setShowIncomeCreate(true); }} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CASHFLOW WIDGET */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-4">Cashflow (Last 7 Days)</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflowData}>
              <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }} />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <Card title="To Receive" amount="Rs. 0" color="bg-emerald-50" icon={<DollarSign size={20} />} onClick={() => navigate("/to-receive")} />
        <Card title="To Give" amount="Rs. 0" color="bg-pink-50" icon={<CreditCard size={20} />} onClick={() => navigate("/to-give")} />
        <Card title="Sales" amount="Rs. 0" color="bg-emerald-50" icon={<ShoppingCart size={20} />} onClick={() => navigate("/sale-insights")} />
        <Card title="Purchase" amount="Rs. 0" color="bg-sky-50" icon={<Package size={20} />} onClick={() => navigate("/purchase-insights")} />
        <Card title="Expense" amount="Rs. 0" color="bg-indigo-50" icon={<BarChart2 size={20} />} onClick={() => navigate("/expense-insights")} />
      </div>

      {/* PANELS */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <ReminderPanel reminders={reminders} open={() => setShowReminder(true)} />
        <BalancePanel />
        <ProfilePanel profileData={profileData} open={() => setShowProfile(true)} />
      </div>

      {/* ================= MODALS FROM ADD MORE ================= */}
      {showPaymentIn && (
        <ModalShell onClose={() => setShowPaymentIn(false)}>
          <PaymentInForm directOpen embedded onClose={() => setShowPaymentIn(false)} />
        </ModalShell>
      )}

      {showPaymentOut && (
        <ModalShell onClose={() => setShowPaymentOut(false)}>
          <PaymentOutForm directOpen embedded onClose={() => setShowPaymentOut(false)} />
        </ModalShell>
      )}

      {showQuotationCreate && (
        <ModalShell onClose={() => setShowQuotationCreate(false)}>
          <CreateQuotation directOpen embedded onClose={() => setShowQuotationCreate(false)} />
        </ModalShell>
      )}

      {showSalesReturnCreate && (
        <ModalShell onClose={() => setShowSalesReturnCreate(false)}>
          <SalesReturn directOpen embedded onClose={() => setShowSalesReturnCreate(false)} />
        </ModalShell>
      )}

      {showPurchaseReturnCreate && (
        <ModalShell onClose={() => setShowPurchaseReturnCreate(false)}>
          <PurchaseReturn directOpen embedded onClose={() => setShowPurchaseReturnCreate(false)} />
        </ModalShell>
      )}

      {showExpenseCreate && (
        <ModalShell onClose={() => setShowExpenseCreate(false)}>
          <ExpensePage directOpen embedded onClose={() => setShowExpenseCreate(false)} />
        </ModalShell>
      )}

      {showIncomeCreate && (
        <ModalShell onClose={() => setShowIncomeCreate(false)}>
          <OtherIncomePage directOpen embedded onClose={() => setShowIncomeCreate(false)} />
        </ModalShell>
      )}

      {/* REMINDER */}
      {showReminder && <AddReminder onClose={() => setShowReminder(false)} onSave={handleSaveReminder} />}

      {/* PROFILE */}
      {showProfile && <CompleteProfile onClose={() => setShowProfile(false)} onSave={(data) => setProfileData(data)} />}
    </div>
  );
}

/* ------------------------ SMALL HELPERS ------------------------ */

function DropdownBtn({ label, icon, onClick }) {
  return (
    <button onClick={onClick} className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ModalShell({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-6 bg-black/40 overflow-auto">
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-4xl mt-10">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-600 hover:text-black">
          ✕
        </button>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
