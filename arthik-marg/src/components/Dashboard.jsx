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

return ( <div className="p-4">
{/* Header */} <div className="flex items-center justify-between mb-6"> <h2 className="text-3xl font-bold">Welcome Rejina Agrawal</h2>

```
    <div className="flex gap-3 relative">  
      <button  
        onClick={() => navigate("/quick-pos")}  
        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"  
      >  
        Quick POS  
      </button>  

      <button  
        onClick={() => navigate("/add-sales")}  
        className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700"  
      >  
        + Add Sales  
      </button>  

      <button  
        onClick={() => navigate("/add-purchase")}  
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"  
      >  
        + Add Purchase  
      </button>  

      {/* Add More Dropdown */}  
      <div className="relative">  
        <button  
          onClick={() => setShowAddMore(!showAddMore)}  
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 flex items-center gap-1"  
        >  
          + Add More ▼  
        </button>  

        {showAddMore && (  
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">  
            <button  
              onClick={() => navigate("/payment-in")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <DollarSign size={16} /> Payment In  
            </button>  
            <button  
              onClick={() => navigate("/payment-out")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <CreditCard size={16} /> Payment Out  
            </button>  
            <button  
              onClick={() => navigate("/quotation")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <ShoppingCart size={16} /> Quotation  
            </button>  
            <button  
              onClick={() => navigate("/sales-return")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <Package size={16} /> Sales Return  
            </button>  
            <button  
              onClick={() => navigate("/purchase-return")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <Package size={16} /> Purchase Return  
            </button>  
            <button  
              onClick={() => navigate("/expense")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <BarChart2 size={16} /> Expense  
            </button>  
            <button  
              onClick={() => navigate("/income")}  
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"  
            >  
              <DollarSign size={16} /> Income  
            </button>  
          </div>  
        )}  
      </div>  
    </div>  
  </div>  

  {/* Cards */}  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">  
    <Card title="To Receive" amount="Rs. 0" color="bg-emerald-50" icon={<DollarSign size={20} />} />  
    <Card title="To Give" amount="Rs. 0" color="bg-pink-50" icon={<CreditCard size={20} />} />  
    <Card title="Sales" amount="Rs. 0" color="bg-emerald-50" icon={<ShoppingCart size={20} />} />  
    <Card title="Purchase" amount="Rs. 0" color="bg-sky-50" icon={<Package size={20} />} />  
    <Card title="Expense" amount="Rs. 0" color="bg-sky-50" icon={<BarChart2 size={20} />} />  
  </div>  

  {/* Main Content */}  
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">  
    {/* Cashflow Chart */}  
    <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-4 rounded shadow">  
      <h3 className="font-semibold mb-4 text-gray-900 dark:text-gray-100">  
        Cashflow (Last 7 Days)  
      </h3>  

      <div className="h-56">  
        <ResponsiveContainer width="100%" height="100%">  
          <LineChart data={cashflowData} margin={{ top: 10, right: 20, left: 0, bottom: 20 }}>  
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />  
            <XAxis dataKey="day" stroke="#6b7280" />  
            <YAxis stroke="#6b7280" />  
            <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: "8px" }} />  

            <Line  
              type="monotone"  
              dataKey="income"  
              stroke="#10B981"  
              strokeWidth={2}  
              dot={{ stroke: "#10B981", strokeWidth: 2, r: 5, fill: "#10B981" }}  
              activeDot={{ r: 6 }}  
            />  

            <Line  
              type="monotone"  
              dataKey="expense"  
              stroke="#EF4444"  
              strokeWidth={2}  
              dot={{ stroke: "#EF4444", strokeWidth: 2, r: 5, fill: "#EF4444" }}  
              activeDot={{ r: 6 }}  
            />  

          </LineChart>  
        </ResponsiveContainer>  
      </div>  

      {/* Legend */}  
      <div className="flex gap-4 mt-2">  
        <div className="flex items-center gap-1">  
          <span className="w-3 h-3 rounded-full bg-green-500 block"></span>  
          <span className="text-sm text-gray-700 dark:text-gray-200">Money In</span>  
        </div>  

        <div className="flex items-center gap-1">  
          <span className="w-3 h-3 rounded-full bg-red-500 block"></span>  
          <span className="text-sm text-gray-700 dark:text-gray-200">Money Out</span>  
        </div>  
      </div>  
    </div>  

    {/* Right Side Cards */}  
    <div className="space-y-4">  

      {/* Balance */}  
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">  
        <div className="text-sm text-gray-500 dark:text-gray-300">Total Balance (Cash & Bank)</div>  
        <div className="text-2xl font-semibold mt-2">Rs. 0</div>  
      </div>  

      {/* Complete Profile */}  
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">  
        <div className="flex items-center justify-between">  
          <div>  
            <div className="text-sm text-gray-500 dark:text-gray-300">Complete your Profile</div>  
            <div className="font-semibold text-lg">  
              {profileData ? "100%" : "30%"}  
            </div>  
          </div>  

          <button  
            onClick={() => setShowProfile(true)}  
            className="px-3 py-1 bg-gray-100 dark:bg-gray-600 rounded"  
          >  
            Complete Profile  
          </button>  
        </div>  
      </div>  

      {/* Reminders */}  
      <div className="bg-white dark:bg-gray-700 p-4 rounded shadow">  
        <div className="text-sm text-gray-500 dark:text-gray-300">Upcoming Reminders ({reminders.length})</div>  

        {reminders.length === 0 && (  
          <div className="mt-2">  
            Looks like you haven't created any reminders yet. Click "Add New Reminder" to create.  
          </div>  
        )}  

        {reminders.length > 0 && (  
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
          className="mt-3 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"  
        >  
          Add New Reminder  
        </button>  
      </div>  
    </div>  
  </div>  

  {/* Reminder Modal */}  
  {showReminder && (  
    <AddReminder  
      onClose={() => setShowReminder(false)}  
      onSave={handleSaveReminder}  
    />  
  )}  

  {/* Complete Profile Modal */}  
  {showProfile && (  
    <CompleteProfile  
      onClose={() => setShowProfile(false)}  
      onSave={(data) => setProfileData(data)}  
    />  
  )}  
</div>  

);
}
