import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

export default function PurchaseInsights() {
const navigate = useNavigate();
const [purchaseTab, setPurchaseTab] = useState("daily");

const purchaseData = {
daily: [
{ day: "Mon", purchase: 1500 },
{ day: "Tue", purchase: 1800 },
{ day: "Wed", purchase: 1200 },
{ day: "Thu", purchase: 2000 },
{ day: "Fri", purchase: 2500 },
{ day: "Sat", purchase: 1700 },
{ day: "Sun", purchase: 2200 },
],
weekly: [
{ week: "Asw 19 - Asw 25", purchase: 10000 },
{ week: "Asw 26 - Kar 01", purchase: 12000 },
{ week: "Kar 02 - Kar 08", purchase: 9000 },
{ week: "Kar 09 - Kar 15", purchase: 15000 },
{ week: "Kar 16 - Kar 22", purchase: 16000 },
{ week: "Kar 23 - Kar 29", purchase: 13000 },
{ week: "Kar 30 - Man 06", purchase: 18000 },
],
monthly: [
{ month: "Asw", purchase: 45000 },
{ month: "Kar", purchase: 60000 },
{ month: "Man", purchase: 55000 },
],
quarterly: [
{ quarter: "Q1", purchase: 120000 },
{ quarter: "Q2", purchase: 140000 },
{ quarter: "Q3", purchase: 130000 },
{ quarter: "Q4", purchase: 160000 },
],
};

const getKey = () =>
purchaseTab === "daily"
? "day"
: purchaseTab === "weekly"
? "week"
: purchaseTab === "monthly"
? "month"
: "quarter";

return ( <div className="p-6">
<button onClick={() => navigate(-1)} className="mb-4 px-4 py-2 bg-gray-200 rounded">
Back </button> <h2 className="text-2xl font-bold mb-4">Purchase Insights</h2>

```
  {/* Tabs */}
  <div className="flex gap-2 mb-4">
    {["daily", "weekly", "monthly", "quarterly"].map((tab) => (
      <button
        key={tab}
        onClick={() => setPurchaseTab(tab)}
        className={`px-3 py-1 rounded ${
          purchaseTab === tab ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"
        }`}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </div>

  {/* Chart */}
  <div className="h-64 mb-4">
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={purchaseData[purchaseTab]}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey={getKey()} stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip contentStyle={{ backgroundColor: "#f3f4f6", borderRadius: 8 }} />
        <Line type="monotone" dataKey="purchase" stroke="#EF4444" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  </div>

  {/* Total Purchase */}
  <div className="font-semibold">
    Total {purchaseTab.charAt(0).toUpperCase() + purchaseTab.slice(1)} Purchase: Rs.{" "}
    {purchaseData[purchaseTab].reduce((sum, d) => sum + d.purchase, 0)}
  </div>
</div>

);
}
