import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function SaleInsights() {
const navigate = useNavigate();
const [salesTab, setSalesTab] = useState("daily");

const salesData = {
daily: [
{ day: "Mon", sales: 2000 },
{ day: "Tue", sales: 2500 },
{ day: "Wed", sales: 1800 },
{ day: "Thu", sales: 3000 },
{ day: "Fri", sales: 3500 },
{ day: "Sat", sales: 2000 },
{ day: "Sun", sales: 4000 },
],
weekly: [
{ week: "Asw 19 - Asw 25", sales: 12000 },
{ week: "Asw 26 - Kar 01", sales: 15000 },
{ week: "Kar 02 - Kar 08", sales: 10000 },
{ week: "Kar 09 - Kar 15", sales: 18000 },
{ week: "Kar 16 - Kar 22", sales: 20000 },
{ week: "Kar 23 - Kar 29", sales: 15000 },
{ week: "Kar 30 - Man 06", sales: 22000 },
],
monthly: [
{ month: "Asw", sales: 50000 },
{ month: "Kar", sales: 70000 },
{ month: "Man", sales: 65000 },
],
quarterly: [
{ quarter: "Q1", sales: 120000 },
{ quarter: "Q2", sales: 150000 },
{ quarter: "Q3", sales: 130000 },
{ quarter: "Q4", sales: 170000 },
],
};

const getKey = () => salesTab === "daily" ? "day" : salesTab === "weekly" ? "week" : salesTab === "monthly" ? "month" : "quarter";

return ( <div className="p-6">
<button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded">Back</button> <h2 className="text-2xl font-bold mb-4">Sales Insights</h2>

  {/* Tabs */}
  <div className="flex gap-2 mb-4">
    {["daily","weekly","monthly","quarterly"].map(tab => (
      <button key={tab} onClick={() => setSalesTab(tab)} className={`px-3 py-1 rounded ${salesTab===tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}>
        {tab.charAt(0).toUpperCase()+tab.slice(1)}
      </button>
    ))}
  </div>

  {/* Chart */}
  <div className="h-64 mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={salesData[salesTab]}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={getKey()} stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }} />
        <Line type="monotone" dataKey="sales" stroke="#10B981" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Total Sales */}
  <div className="font-semibold">
    Total {salesTab.charAt(0).toUpperCase()+salesTab.slice(1)} Sales: Rs. {salesData[salesTab].reduce((sum,d)=>sum+d.sales,0)}
  </div>
</div>


);
}
