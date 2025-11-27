import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./Card";
import AddReminder from "./AddReminder";
import CompleteProfile from "./CompleteProfile";

import {
  DollarSign,
  CreditCard,
  ShoppingCart,
  Package,
  BarChart2,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const navigate = useNavigate();

  const [showReminder, setShowReminder] = useState(false);
  const [reminders, setReminders] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showAddMore, setShowAddMore] = useState(false);

  const cashflowData = [
    { day: "Mon", income: 2000, expense: 1500 },
    { day: "Tue", income: 2500, expense: 1000 },
    { day: "Wed", income: 1800, expense: 1200 },
    { day: "Thu", income: 3000, expense: 2000 },
    { day: "Fri", income: 3500, expense: 2500 },
    { day: "Sat", income: 2000, expense: 1800 },
    { day: "Sun", income: 4000, expense: 2200 },
  ];

  const handleSaveReminder = (newReminder) => {
    setReminders([...reminders, newReminder]);
  };

  const buttonBaseClass = "px-4 py-2 rounded-xl text-white hover:opacity-90";

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">Welcome Rejina Agrawal</h2>

        <div className="flex gap-3 relative">
          <button
            onClick={() => navigate("/quick-pos")}
            className={`${buttonBaseClass} bg-[#072255]`}
          >
            Quick POS
          </button>

          <button
            onClick={() => navigate("/add-sales")}
            className={`${buttonBaseClass} bg-[#072255]`}
          >
            + Add Sales
          </button>

          <button
            onClick={() => navigate("/add-purchase")}
            className={`${buttonBaseClass} bg-[#072255]`}
          >
            + Add Purchase
          </button>

          {/* Add More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowAddMore(!showAddMore)}
              className={`${buttonBaseClass} bg-[#072255] flex items-center gap-1`}
            >
              + Add More ▼
            </button>

            {showAddMore && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-50">
                <button
                  onClick={() => navigate("/payment-in")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-t-xl"
                >
                  <DollarSign size={16} /> Payment In
                </button>

                <button
                  onClick={() => navigate("/payment-out")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <CreditCard size={16} /> Payment Out
                </button>

                <button
                  onClick={() => navigate("/quotation")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <ShoppingCart size={16} /> Quotation
                </button>

                <button
                  onClick={() => navigate("/sales-return")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <Package size={16} /> Sales Return
                </button>

                <button
                  onClick={() => navigate("/purchase-return")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <Package size={16} /> Purchase Return
                </button>

                <button
                  onClick={() => navigate("/expense-insights")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
                >
                  <BarChart2 size={16} /> Expense
                </button>

                <button
                  onClick={() => navigate("/income")}
                  className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 rounded-b-xl"
                >
                  <DollarSign size={16} /> Income
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cashflow */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-4">Cashflow (Last 7 Days)</h3>

        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={cashflowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="day" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#f3f4f6",
                  borderRadius: 8,
                }}
              />
              <Line type="monotone" dataKey="income" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-5 gap-4 mb-4">
        <Card
          title="To Receive"
          amount="Rs. 0"
          color="bg-emerald-50"
          icon={<DollarSign size={20} />}
          onClick={() => navigate("/to-receive")}
        />

        <Card
          title="To Give"
          amount="Rs. 0"
          color="bg-pink-50"
          icon={<CreditCard size={20} />}
          onClick={() => navigate("/to-give")}
        />

        <Card
          title="Sales"
          amount="Rs. 0"
          color="bg-emerald-50"
          icon={<ShoppingCart size={20} />}
          onClick={() => navigate("/sale-insights")}
        />

        <Card
          title="Purchase"
          amount="Rs. 0"
          color="bg-sky-50"
          icon={<Package size={20} />}
          onClick={() => navigate("/purchase-insights")}
        />

        <Card
          title="Expense"
          amount="Rs. 0"
          color="bg-indigo-50"
          icon={<BarChart2 size={20} />}
          onClick={() => navigate("/expense-insights")}
        />
      </div>

      {/* Panels */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* Reminders */}
        <div className="bg-white p-4 rounded-xl shadow min-h-40">
          <div className="text-sm text-gray-500">
            Upcoming Reminders ({reminders.length})
          </div>

          {reminders.length === 0 ? (
            <div className="mt-2 text-gray-600">
              Looks like you haven't created any reminders yet.
            </div>
          ) : (
            <ul className="mt-2 list-disc list-inside">
              {reminders.map((r, i) => (
                <li key={i}>
                  {r.title} - {new Date(r.dateTime).toLocaleString()} ({r.type})
                </li>
              ))}
            </ul>
          )}

          <button
            onClick={() => setShowReminder(true)}
            className={`${buttonBaseClass} bg-[#072255] mt-3`}
          >
            Add New Reminder
          </button>
        </div>

        {/* Balance */}
        <div className="bg-white p-4 rounded-xl shadow min-h-40 flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Total Balance (Cash & Bank)</div>
            <div className="text-2xl font-semibold mt-2">Rs. 0</div>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-white p-4 rounded-xl shadow min-h-40 flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Complete your Profile</div>
            <div className="font-semibold text-lg">{profileData ? "100%" : "30%"}</div>
          </div>

          <button
            onClick={() => setShowProfile(true)}
            className={`${buttonBaseClass} bg-[#072255] mt-4`}
          >
            Complete Profile
          </button>
        </div>
      </div>

      {/* Modals */}
      {showReminder && (
        <AddReminder
          onClose={() => setShowReminder(false)}
          onSave={handleSaveReminder}
        />
      )}

      {showProfile && (
        <CompleteProfile
          onClose={() => setShowProfile(false)}
          onSave={(data) => setProfileData(data)}
        />
      )}
    </div>
  );
}
