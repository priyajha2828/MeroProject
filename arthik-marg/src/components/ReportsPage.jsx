// src/components/ReportPage.jsx
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Search,
  Calendar as CalendarIcon,
  Download,
  Printer,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Check,
} from "lucide-react";

/* REPORTS_MAP (titles/descriptions) */
const REPORTS_MAP = {
  sales: { title: "Sales Report", desc: "View your sales data on a given time" },
  purchase: { title: "Purchase Report", desc: "View your purchase data on a given time" },
  "sales-return": { title: "Sales Return", desc: "View your sales return data on a given time" },
  "purchase-return": { title: "Purchase Return", desc: "View your purchase return data on a given time" },
  "day-book": { title: "Day Book", desc: "View all of your daily transactions" },
  "all-transactions": { title: "All Transactions", desc: "View all party transactions in a given time" },
  "profit-and-loss": { title: "Profit And Loss", desc: "View your profit & loss in a given time" },

  "party-statement": { title: "Party Statement", desc: "Check the transactions of certain party" },
  "all-party-report": { title: "All Party Report", desc: "Receivable/payable dues of every party" },

  "item-details-report": { title: "Item Details Report", desc: "Check stock, transaction of individual item." },
  "item-list-report": { title: "Item List Report", desc: "Shows all the item rates like, sales, purchase, MRP price etc..." },
  "low-stock-summary-report": { title: "Low Stock Summary Report", desc: "View all items which are getting low on quantity" },
  "stock-quantity-report": { title: "Stock Quantity Report", desc: "View opening & closing quantity of each item" },

  "income-expense-report": { title: "Income Expense Report", desc: "Check all the income expense report" },
  "expense-category": { title: "Expense Category", desc: "Check the categorized expense report in a given date" },
  "income-category": { title: "Income Category", desc: "Check the categorized income report in a given date" },

  "cash-in-hand-statement": { title: "Cash In Hand Statement", desc: "Check all transaction made with cash" },
  "bank-statement": { title: "Bank Statement", desc: "Check all the transaction made with bank" },
  "discount-report": { title: "Discount Report", desc: "Check the total discounted amount made by each parties in purchase & sales." },
  "tax-sales": { title: "Tax Sales", desc: "Check report of all Tax applicable sales." },
  "tax-purchase": { title: "Tax Purchase", desc: "Check report of all Tax applicable purchase." },
};

function prettyTitleFromId(id) {
  if (!id) return "Report";
  return id
    .replace(/-/g, " ")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* --- Date helpers --- */
const startOfDay = (d) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const endOfDay = (d) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};
const formatDisplay = (d) => {
  if (!d) return "";
  return d.toLocaleDateString();
};
const toInputDate = (d) => {
  if (!d) return "";
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};

/* calendar grid builder */
function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startWeekDay = first.getDay();
  const totalDays = last.getDate();

  const weeks = [];
  let week = new Array(startWeekDay).fill(null);

  for (let d = 1; d <= totalDays; d++) {
    week.push(new Date(year, month, d));
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length > 0) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }
  return weeks;
}

/* presets */
const PRESETS = [
  "All Date",
  "Today",
  "Yesterday",
  "This Week",
  "This Month",
  "Last Month",
  "This Fiscal Year",
  "This Year",
];

export default function ReportPage() {
  const navigate = useNavigate();
  const { reportId } = useParams();

  const info = useMemo(() => {
    const normalized = (reportId || "").toLowerCase();
    return REPORTS_MAP[normalized] || { title: `${prettyTitleFromId(normalized)}`, desc: "" };
  }, [reportId]);

  // status dropdown
  const [statusOpen, setStatusOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const statusRef = useRef(null);

  // date popover
  const [dateOpen, setDateOpen] = useState(false);
  const dateRef = useRef(null);

  // selected dates
  const [startDate, setStartDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [endDate, setEndDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0);
  });
  const [preset, setPreset] = useState("This Month");

  // calendar view month/year
  const [viewYear, setViewYear] = useState(() => startDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(() => startDate.getMonth());

  const [selecting, setSelecting] = useState(false);

  useEffect(() => {
    function onDocClick(e) {
      if (statusRef.current && !statusRef.current.contains(e.target)) {
        setStatusOpen(false);
      }
      if (dateRef.current && !dateRef.current.contains(e.target)) {
        setDateOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  // Preset application
  const applyPreset = (p) => {
    const now = new Date();
    let s = null;
    let e = null;

    if (p === "All Date") {
      s = null;
      e = null;
    } else if (p === "Today") {
      s = startOfDay(now);
      e = endOfDay(now);
    } else if (p === "Yesterday") {
      const y = new Date(now);
      y.setDate(now.getDate() - 1);
      s = startOfDay(y);
      e = endOfDay(y);
    } else if (p === "This Week") {
      const day = now.getDay();
      const sday = new Date(now);
      sday.setDate(now.getDate() - day);
      s = startOfDay(sday);
      const eday = new Date(sday);
      eday.setDate(sday.getDate() + 6);
      e = endOfDay(eday);
    } else if (p === "This Month") {
      s = new Date(now.getFullYear(), now.getMonth(), 1);
      e = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else if (p === "Last Month") {
      const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      s = new Date(last.getFullYear(), last.getMonth(), 1);
      e = new Date(last.getFullYear(), last.getMonth() + 1, 0);
    } else if (p === "This Fiscal Year") {
      const year = now.getMonth() >= 3 ? now.getFullYear() : now.getFullYear() - 1;
      s = new Date(year, 3, 1);
      e = new Date(year + 1, 2, 31);
    } else if (p === "This Year") {
      s = new Date(now.getFullYear(), 0, 1);
      e = new Date(now.getFullYear(), 11, 31);
    }

    setPreset(p);
    setStartDate(s);
    setEndDate(e);
    if (s) {
      setViewYear(s.getFullYear());
      setViewMonth(s.getMonth());
    } else {
      const n = new Date();
      setViewYear(n.getFullYear());
      setViewMonth(n.getMonth());
    }
  };

  const prevMonth = () => {
    let y = viewYear;
    let m = viewMonth - 1;
    if (m < 0) {
      m = 11;
      y -= 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };
  const nextMonth = () => {
    let y = viewYear;
    let m = viewMonth + 1;
    if (m > 11) {
      m = 0;
      y += 1;
    }
    setViewYear(y);
    setViewMonth(m);
  };

  const handleDayClick = (day) => {
    if (!day) return;
    if (!selecting) {
      setStartDate(startOfDay(day));
      setEndDate(null);
      setSelecting(true);
      setPreset("Custom");
    } else {
      const s = startDate ? startOfDay(startDate) : startOfDay(day);
      const clicked = startOfDay(day);
      if (clicked.getTime() < s.getTime()) {
        setStartDate(clicked);
        setEndDate(s);
      } else {
        setEndDate(endOfDay(clicked));
      }
      setSelecting(false);
      setPreset("Custom");
    }
  };

  const inRange = (d) => {
    if (!d) return false;
    if (!startDate && !endDate) return false;
    const time = startOfDay(d).getTime();
    if (startDate && !endDate) {
      return time === startOfDay(startDate).getTime();
    }
    if (startDate && endDate) {
      return time >= startOfDay(startDate).getTime() && time <= startOfDay(endDate).getTime();
    }
    return false;
  };

  const weeks = useMemo(() => getMonthMatrix(viewYear, viewMonth), [viewYear, viewMonth]);

  return (
    <div className="px-8 pt-6 pb-16 w-full min-h-[600px] flex flex-col">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-600 hover:text-gray-800 p-2 rounded-full" aria-label="Back">
            <ChevronLeft size={20} />
          </button>

          <h1 className="text-2xl font-semibold text-gray-800">{info.title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-600">
            <Printer size={16} />
            <span className="text-sm">Print PDF</span>
          </button>

          <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-gray-100 text-gray-600">
            <Download size={16} />
            <span className="text-sm">Download Excel</span>
            <ChevronDown size={14} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex items-center justify-between gap-4 mb-12">
        <div className="flex-1 max-w-2xl flex gap-4 items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute top-3 left-3 text-gray-400" />
            <input className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none" placeholder="Search..." />
          </div>

          {/* All Status dropdown */}
          <div className="relative" ref={statusRef}>
            <button
              onClick={() => setStatusOpen((s) => !s)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 bg-white"
            >
              {selectedStatus} <ChevronDown size={14} />
            </button>

            {statusOpen && (
              <div className="absolute mt-2 left-0 w-44 bg-white border border-gray-200 rounded shadow-md z-50">
                <ul className="p-2">
                  {["All Status", "Paid", "Unpaid", "Partially Paid", "Overdue"].map((s) => (
                    <li
                      key={s}
                      onClick={() => {
                        setSelectedStatus(s);
                        setStatusOpen(false);
                      }}
                      className={`px-3 py-2 rounded cursor-pointer text-sm ${selectedStatus === s ? "bg-emerald-50 text-emerald-600" : "hover:bg-gray-100"}`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Date/Calendar popover (compact) */}
          <div className="relative" ref={dateRef}>
            <button
              onClick={() => {
                if (!dateOpen && preset !== "Custom") applyPreset(preset);
                setDateOpen((d) => !d);
              }}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm flex items-center gap-2 bg-white"
            >
              <CalendarIcon size={16} />
              <span>
                {preset !== "Custom" ? preset : `${formatDisplay(startDate)} → ${formatDisplay(endDate)}`}
              </span>
              {dateOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {dateOpen && (
              <div className="absolute mt-2 left-0 w-[520px] bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-0 overflow-hidden">
                <div className="flex">
                  {/* Left: Presets */}
                  <div className="w-48 bg-white p-3 border-r border-gray-100">
                    <ul className="space-y-1">
                      {PRESETS.map((p) => (
                        <li key={p}>
                          <button
                            onClick={() => applyPreset(p)}
                            className={`w-full text-left flex items-center justify-between px-2 py-2 rounded ${preset === p ? "border border-emerald-300 bg-emerald-50 text-emerald-700" : "hover:bg-gray-50"}`}
                          >
                            <span className="text-sm">{p}</span>
                            {preset === p && <Check size={14} className="text-emerald-600" />}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Compact Calendar */}
                  <div className="flex-1 p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <button onClick={prevMonth} className="p-1 rounded hover:bg-gray-100"><ChevronLeft size={16} /></button>
                        <div className="text-sm font-medium">
                          {new Date(viewYear, viewMonth, 1).toLocaleString(undefined, { month: "short", year: "numeric" })}
                        </div>
                        <button onClick={nextMonth} className="p-1 rounded hover:bg-gray-100"><ChevronRight size={16} /></button>
                      </div>
                    </div>

                    {/* small calendar box */}
                    <div className="bg-white border border-gray-100 rounded p-2">
                      <div className="grid grid-cols-7 gap-1 text-[10px] text-gray-500 mb-1">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                          <div key={d} className="text-center py-1">{d}</div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {weeks.map((week, wi) =>
                          week.map((day, di) => {
                            const isDisabled = !day;
                            const isInRange = day && inRange(new Date(day));
                            const isStart = day && startDate && startOfDay(day).getTime() === startOfDay(startDate).getTime();
                            const isEnd = day && endDate && startOfDay(day).getTime() === startOfDay(endDate).getTime();

                            const base = "h-8 flex items-center justify-center text-xs rounded";
                            const disabledClass = isDisabled ? "text-gray-300 cursor-default bg-white" : "cursor-pointer";
                            const rangeClass = isInRange ? "bg-emerald-50 text-emerald-800" : "";
                            const singleSelected = isStart && isEnd ? "bg-emerald-600 text-white rounded" : "";
                            const startClass = isStart && !isEnd ? "bg-emerald-600 text-white rounded-l-md" : "";
                            const endClass = isEnd && !isStart ? "bg-emerald-600 text-white rounded-r-md" : "";

                            return (
                              <button
                                key={`${wi}-${di}`}
                                onClick={() => handleDayClick(day)}
                                disabled={isDisabled}
                                className={`${base} ${disabledClass} ${rangeClass} ${startClass} ${endClass} ${singleSelected}`}
                              >
                                {day ? day.getDate() : ""}
                              </button>
                            );
                          })
                        )}
                      </div>
                    </div>

                    {/* --- NEW: Pills shown directly BELOW calendar as requested --- */}
                    <div className="mt-3 flex items-center gap-3">
                      <div className="px-3 py-1 border border-gray-200 rounded text-xs bg-white">
                        {startDate ? toInputDate(startDate) : "—"}
                      </div>
                      <div className="text-xs text-gray-500">→</div>
                      <div className="px-3 py-1 border border-gray-200 rounded text-xs bg-white">
                        {endDate ? toInputDate(endDate) : "—"}
                      </div>
                    </div>

                    {/* compact actions */}
                    <div className="mt-3 flex justify-end gap-2">
                      <button
                        onClick={() => setDateOpen(false)}
                        className="px-3 py-1 rounded border border-gray-200 bg-white text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => {
                          setDateOpen(false);
                          // Hook: fetch data for startDate/endDate/selectedStatus here
                        }}
                        className="px-3 py-1 rounded bg-emerald-500 text-white text-sm"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="px-3 py-2 border border-gray-200 rounded-lg text-sm">Sort By</div>
        </div>
      </div>

      {/* Empty / placeholder state */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-[220px] h-[220px] flex items-center justify-center rounded-full bg-gray-100">
          <div className="w-32 h-40 bg-white rounded-xl shadow-inner flex flex-col items-start justify-start p-3">
            <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-12 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-8 bg-gray-200 rounded mb-2" />
            <div className="h-3 w-20 bg-gray-200 rounded" />
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mt-6">No Transactions Found</h2>

        {info.desc && <p className="text-sm text-gray-500 mt-2 max-w-xl text-center">{info.desc}</p>}
      </div>
    </div>
  );
}
