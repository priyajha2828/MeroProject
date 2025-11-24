import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function ExpenseInsights() {
const navigate = useNavigate();
const [expenseTab, setExpenseTab] = useState("daily");

const expenseData = {
daily: [
{ day: "Mon", expense: 1000 },
{ day: "Tue", expense: 1200 },
{ day: "Wed", expense: 900 },
{ day: "Thu", expense: 1500 },
{ day: "Fri", expense: 1700 },
{ day: "Sat", expense: 1300 },
{ day: "Sun", expense: 2000 },
],
weekly: [
{ week: "Asw 19 - Asw 25", expense: 8000 },
{ week: "Asw 26 - Kar 01", expense: 10000 },
{ week: "Kar 02 - Kar 08", expense: 7000 },
{ week: "Kar 09 - Kar 15", expense: 12000 },
{ week: "Kar 16 - Kar 22", expense: 15000 },
{ week: "Kar 23 - Kar 29", expense: 11000 },
{ week: "Kar 30 - Man 06", expense: 18000 },
],
monthly: [
{ month: "Asw", expense: 40000 },
{ month: "Kar", expense: 55000 },
{ month: "Man", expense: 50000 },
],
quarterly: [
{ quarter: "Q1", expense: 120000 },
{ quarter: "Q2", expense: 140000 },
{ quarter: "Q3", expense: 130000 },
{ quarter: "Q4", expense: 160000 },
],
};

const getKey = () =>
expenseTab === "daily"
? "day"
: expenseTab === "weekly"
? "week"
: expenseTab === "monthly"
? "month"
: "quarter";

return ( <div className="p-6">
<button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded">
Back </button>

  <h2 className="text-2xl font-bold mb-4">Expense Insights</h2>

  {/* Tabs */}
  <div className="flex gap-2 mb-4">
    {["daily", "weekly", "monthly", "quarterly"].map((tab) => (
      <button
        key={tab}
        onClick={() => setExpenseTab(tab)}
        className={`px-3 py-1 rounded ${
          expenseTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>

  {/* Chart */}
  <div className="h-64 mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={expenseData[expenseTab]}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={getKey()} stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }} />
        <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Total Expense */}
  <div className="font-semibold">
    Total {expenseTab.charAt(0).toUpperCase() + expenseTab.slice(1)} Expense: Rs.{" "}
    {expenseData[expenseTab].reduce((sum, d) => sum + d.expense, 0)}
  </div>
</div>


);
}
