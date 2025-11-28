// src/pages/CashReportPage.jsx
import React, { useRef, useMemo, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import Calendar from "@sbmdkl/nepali-datepicker-reactjs";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";

/* ---------- Date helpers (AD) ---------- */
const pad2 = (n) => `${n}`.padStart(2, "0");
const formatAD = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  return `${dt.getFullYear()}-${pad2(dt.getMonth() + 1)}-${pad2(dt.getDate())}`;
};
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
const endOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const endOfMonth = (d) => new Date(d.getFullYear(), d.getMonth() + 1, 0, 23, 59, 59, 999);
const startOfYesterday = () => {
  const t = new Date();
  t.setDate(t.getDate() - 1);
  return startOfDay(t);
};
const endOfYesterday = () => {
  const t = new Date();
  t.setDate(t.getDate() - 1);
  return endOfDay(t);
};
const startOfWeek = (d = new Date()) => {
  const day = d.getDay();
  const copy = new Date(d);
  copy.setDate(d.getDate() - day);
  return startOfDay(copy);
};
const endOfWeek = (d = new Date()) => {
  const s = startOfWeek(d);
  const copy = new Date(s);
  copy.setDate(s.getDate() + 6);
  return endOfDay(copy);
};
const startOfYear = (d = new Date()) => new Date(d.getFullYear(), 0, 1);
const endOfYear = (d = new Date()) => new Date(d.getFullYear(), 11, 31, 23, 59, 59, 999);

/* ---------- Quick ranges helpers ---------- */
const canonicalRangeForKey = (key) => {
  const now = new Date();
  switch (key) {
    case "all":
      return { start: null, end: null };
    case "today":
      return { start: startOfDay(now), end: endOfDay(now) };
    case "yesterday":
      return { start: startOfYesterday(), end: endOfYesterday() };
    case "thisWeek":
      return { start: startOfWeek(now), end: endOfWeek(now) };
    case "thisMonth":
      return { start: startOfMonth(now), end: endOfMonth(now) };
    case "lastMonth": {
      const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      return { start: startOfMonth(last), end: endOfMonth(last) };
    }
    case "thisFiscalYear":
      return { start: startOfYear(now), end: endOfYear(now) };
    case "thisYear":
      return { start: startOfYear(now), end: endOfYear(now) };
    default:
      return { start: null, end: null };
  }
};

const labelForKey = {
  all: "All Date",
  today: "Today",
  yesterday: "Yesterday",
  thisWeek: "This Week",
  thisMonth: "This Month",
  lastMonth: "Last Month",
  thisFiscalYear: "This Fiscal Year",
  thisYear: "This Year",
};

const rangesEqual = (a, b) => {
  const as = a && a.start ? a.start.getTime() : null;
  const ae = a && a.end ? a.end.getTime() : null;
  const bs = b && b.start ? b.start.getTime() : null;
  const be = b && b.end ? b.end.getTime() : null;
  return as === bs && ae === be;
};

const keyForRange = (range) => {
  const keys = Object.keys(labelForKey);
  for (let k of keys) {
    const canonical = canonicalRangeForKey(k);
    if (rangesEqual(range, canonical)) return k;
  }
  return null;
};

/* ---------- Component ---------- */
export default function CashReportPage() {
  const navigate = useNavigate();
  const { accountId } = useParams();
  const location = useLocation();

  const reportData = (location.state && location.state.reportData) || [];
  const closingBalance = (location.state && location.state.closingBalance) || 0;
  const printRef = useRef(null);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRange, setFilterRange] = useState({ start: null, end: null });

  // store applied BS strings so printed header can use them
  const [appliedRangeBs, setAppliedRangeBs] = useState({ start: "", end: "" });

  // picker state
  const [showPicker, setShowPicker] = useState(false);
  const [tempRange, setTempRange] = useState({ start: null, end: null });
  const [tempRangeBs, setTempRangeBs] = useState({ start: "", end: "" });
  const [tempQuickKey, setTempQuickKey] = useState(null);
  const [showStartInlineCal, setShowStartInlineCal] = useState(false);
  const [showEndInlineCal, setShowEndInlineCal] = useState(false);

  // Open picker preloads current applied range/bs
  const openPicker = () => {
    setTempRange({ start: filterRange.start, end: filterRange.end });
    setTempQuickKey(keyForRange(filterRange));
    setTempRangeBs({ start: appliedRangeBs.start || "", end: appliedRangeBs.end || "" });
    setShowStartInlineCal(false);
    setShowEndInlineCal(false);
    setShowPicker(true);
  };

  const applyQuickRangeToTemp = (key) => {
    const { start: s, end: e } = canonicalRangeForKey(key);
    setTempRange({ start: s, end: e });
    setTempQuickKey(key);
    setTempRangeBs({ start: "", end: "" });
    setShowStartInlineCal(false);
    setShowEndInlineCal(false);
  };

  const applyPicker = () => {
    setFilterRange({ start: tempRange.start, end: tempRange.end });
    setTempQuickKey(keyForRange({ start: tempRange.start, end: tempRange.end }));
    setAppliedRangeBs({ start: tempRangeBs.start || "", end: tempRangeBs.end || "" });
    setShowPicker(false);
    setShowStartInlineCal(false);
    setShowEndInlineCal(false);
  };

  const cancelPicker = () => {
    setTempRange({ start: filterRange.start, end: filterRange.end });
    setTempQuickKey(keyForRange(filterRange));
    setTempRangeBs({ start: appliedRangeBs.start || "", end: appliedRangeBs.end || "" });
    setShowPicker(false);
    setShowStartInlineCal(false);
    setShowEndInlineCal(false);
  };

  const onStartInlineCalChange = ({ bsDate, adDate }) => {
    if (!adDate) return;
    const d = new Date(adDate);
    setTempRange((p) => ({ ...p, start: startOfDay(d) }));
    setTempRangeBs((p) => ({ ...p, start: bsDate || "" }));
    setTempQuickKey(null);
    setShowStartInlineCal(false);
  };

  const onEndInlineCalChange = ({ bsDate, adDate }) => {
    if (!adDate) return;
    const d = new Date(adDate);
    setTempRange((p) => ({ ...p, end: endOfDay(d) }));
    setTempRangeBs((p) => ({ ...p, end: bsDate || "" }));
    setTempQuickKey(null);
    setShowEndInlineCal(false);
  };

  // parse row date robustly
  const parseRowDate = (d) => {
    if (!d) return null;
    if (d instanceof Date) return d;
    if (!isNaN(Number(d))) return new Date(Number(d));
    const parsed = new Date(d);
    if (!isNaN(parsed.getTime())) return parsed;
    const m = String(d).match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
    if (m) {
      const day = parseInt(m[1], 10);
      const month = parseInt(m[2], 10) - 1;
      const year = parseInt(m[3], 10);
      return new Date(year, month, day);
    }
    return null;
  };

  // filtered data uses applied filterRange + searchTerm
  const filteredData = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    const s = filterRange.start ? new Date(filterRange.start).getTime() : null;
    const e = filterRange.end ? new Date(filterRange.end).getTime() : null;

    return reportData.filter((row) => {
      if (s != null && e != null) {
        const dt = parseRowDate(row.date);
        if (!dt) return false;
        const t = dt.getTime();
        if (t < s || t > e) return false;
      }
      if (q === "") return true;
      const fields = [
        row.date || "",
        row.type || "",
        row.remarks || "",
        row.moneyIn != null ? String(row.moneyIn) : "",
        row.moneyOut != null ? String(row.moneyOut) : "",
        row.balance != null ? String(row.balance) : "",
      ]
        .join(" ")
        .toLowerCase();
      return fields.indexOf(q) !== -1;
    });
  }, [reportData, searchTerm, filterRange]);

  // Excel export
  function handleDownloadExcel() {
    const rows = filteredData.map((row) => ({
      Date: row.date,
      Particular: row.type,
      "Notes/Remarks": row.remarks || "",
      "Money In": row.moneyIn || "",
      "Money Out": row.moneyOut || "",
      Balance: row.balance || "",
    }));
    const worksheet = XLSX.utils.json_to_sheet(rows.length ? rows : [{}]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Cash Report");
    XLSX.writeFile(workbook, `Cash_Report${accountId ? `_${accountId}` : ""}.xlsx`);
  }

  /* ---------- Printing via hidden iframe (robust) ---------- */
  const buildPrintableHtml = () => {
    const companyName = "Something";
    const companyPhone = "9820318653";
    const logoSvg = `<svg width="90" height="28" viewBox="0 0 90 28" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="2" width="18" height="24" rx="3" fill="#10B981" /></svg>`;

    const fromLabel = appliedRangeBs.start || (filterRange.start ? formatAD(filterRange.start) : "—");
    const toLabel = appliedRangeBs.end || (filterRange.end ? formatAD(filterRange.end) : "—");

    const now = new Date();
    const generatedOnAD = `${formatAD(now)} • ${now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    const totalEntries = filteredData.length;

    const rowsHtml = filteredData
      .map((r) => {
        const moneyIn = r.moneyIn ? `Rs. ${Number(r.moneyIn).toLocaleString()}` : "---";
        const moneyOut = r.moneyOut ? `Rs. ${Number(r.moneyOut).toLocaleString()}` : "---";
        const balance = `Rs. ${Number(r.balance || 0).toLocaleString()}`;
        return `
          <tr>
            <td style="padding:8px 10px;border:1px solid #e6edf3;">${r.date || ""}</td>
            <td style="padding:8px 10px;border:1px solid #e6edf3;">${r.type || ""}</td>
            <td style="padding:8px 10px;border:1px solid #e6edf3;">${r.remarks || ""}</td>
            <td style="padding:8px 10px;border:1px solid #e6edf3;text-align:right;">${moneyIn}</td>
            <td style="padding:8px 10px;border:1px solid #e6edf3;text-align:right;">${moneyOut}</td>
            <td style="padding:8px 10px;border:1px solid #e6edf3;text-align:right;">${balance}</td>
          </tr>
        `;
      })
      .join("");

    const tableBody =
      rowsHtml ||
      `<tr><td colspan="6" style="padding:18px;text-align:center;color:#6b7280;border:1px solid #e6edf3;">No transactions found</td></tr>`;

    const styles = `
      <style>
        @media print { body { -webkit-print-color-adjust: exact; } }
        body { font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, Arial; color:#0f172a; margin:20px; }
        .header { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; }
        .company { font-size:18px; font-weight:700; }
        .phone { font-size:13px; color:#374151; margin-top:4px; }
        .title { font-size:16px; font-weight:600; margin-top:18px; margin-bottom:8px; }
        .meta { display:flex; justify-content:space-between; font-size:13px; margin-bottom:8px; align-items:flex-start; }
        .balance { font-weight:600; color:#111827; text-align:right; }
        table.report { width:100%; border-collapse:separate; border-spacing:0; border:1px solid #e6edf3; border-radius:6px; overflow:hidden; }
        table.report thead th { background:#f8fafc; color:#374151; font-weight:600; text-align:left; padding:10px 12px; border-bottom:1px solid #e6edf3; }
        td { font-size:13px; vertical-align:top; }
        .small { font-size:12px; color:#6b7280; }
      </style>
    `;

    return `
      <html>
        <head><title>Cash Report</title>${styles}</head>
        <body>
          <div class="header">
            <div>
              <div class="company">${companyName}</div>
              <div class="phone">${companyPhone}</div>
            </div>
            <div>${logoSvg}</div>
          </div>

          <hr style="border:none;border-top:1px solid #e6edf3;margin:8px 0 16px 0;" />

          <div style="display:flex;justify-content:space-between;">
            <div>
              <div class="title">Cash In Hand Statement</div>
              <div style="font-size:13px;color:#374151;">
                <div><strong>From:</strong> ${fromLabel}</div>
                <div><strong>To:</strong> ${toLabel}</div>
              </div>
            </div>
            <div style="text-align:right;">
              <div class="small">Closing Balance:</div>
              <div class="balance">Rs. ${Number(closingBalance || 0).toLocaleString()}</div>
            </div>
          </div>

          <div style="display:flex;justify-content:space-between;margin-top:12px;margin-bottom:8px;">
            <div class="small">Total entries: ${totalEntries}</div>
            <div class="small">Report Generated on ${generatedOnAD}</div>
          </div>

          <table class="report">
            <thead>
              <tr>
                <th style="padding:10px 12px;">Date</th>
                <th style="padding:10px 12px;">Particular</th>
                <th style="padding:10px 12px;">Notes/Remarks</th>
                <th style="padding:10px 12px;text-align:right;">Money In</th>
                <th style="padding:10px 12px;text-align:right;">Money Out</th>
                <th style="padding:10px 12px;text-align:right;">Balance</th>
              </tr>
            </thead>
            <tbody>
              ${tableBody}
            </tbody>
          </table>
        </body>
      </html>
    `;
  };

  const printViaIframe = (html) => {
    try {
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.style.visibility = "hidden";

      if ("srcdoc" in iframe) {
        iframe.srcdoc = html;
      } else {
        iframe.src = "about:blank";
      }

      document.body.appendChild(iframe);

      const removeIframe = () => {
        try {
          document.body.removeChild(iframe);
        } catch (e) {
          /* noop */
        }
      };

      const doPrintFromIframe = () => {
        try {
          const iwin = iframe.contentWindow || iframe.contentDocument;
          if (!iwin) {
            alert("Unable to access print frame. Try allowing popups or print manually.");
            removeIframe();
            return;
          }
          iwin.focus();
          iwin.print();
        } catch (err) {
          console.error("iframe print error:", err);
          alert("Print failed — check console for details.");
        } finally {
          setTimeout(removeIframe, 700);
        }
      };

      iframe.onload = () => {
        setTimeout(doPrintFromIframe, 120);
      };

      if (!("srcdoc" in iframe)) {
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(html);
        doc.close();
        iframe.onload = () => setTimeout(doPrintFromIframe, 120);
        setTimeout(() => {
          try {
            doPrintFromIframe();
          } catch (e) {
            /* noop */
          }
        }, 500);
      }
    } catch (e) {
      console.error("printViaIframe unexpected error:", e);
      alert("Print failed unexpectedly — check console.");
    }
  };

  // main print handler: commit picker if open, then print via iframe
  const handlePrintClick = () => {
    if (showPicker) {
      setFilterRange({ start: tempRange.start, end: tempRange.end });
      setAppliedRangeBs({ start: tempRangeBs.start || "", end: tempRangeBs.end || "" });
      setShowPicker(false);
      setShowStartInlineCal(false);
      setShowEndInlineCal(false);
      setTimeout(() => {
        const html = buildPrintableHtml();
        printViaIframe(html);
      }, 160);
    } else {
      const html = buildPrintableHtml();
      printViaIframe(html);
    }
  };

  // small UI helpers
  const labelForRange = (range, quickKey) => {
    const key = quickKey || keyForRange(range);
    if (key) return labelForKey[key];
    if (!range || (!range.start && !range.end)) return "All Date";
    return `${formatAD(range.start)} → ${formatAD(range.end)}`;
  };

  const selectedRangeLabel = () => {
    if (showPicker) {
      const key = tempQuickKey || keyForRange(tempRange);
      return labelForRange(tempRange, key);
    }
    return labelForRange(filterRange, null);
  };

  const appliedQuick = keyForRange(filterRange);

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M20 6L9 17l-5-5" stroke="#065F46" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  return (
    <div className="p-8 max-w-7xl mx-auto relative">
      {/* header & controls */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => navigate(-1)} className="text-gray-600 hover:underline">
              ←
            </button>
            <div>
              <h1 className="text-2xl font-semibold">Cash In Hand Statement</h1>
              <span className="text-sm text-gray-500">({accountId || "all"})</span>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search transactions (date, type, remarks, amount...)"
              className="border rounded-lg px-4 py-2 w-64 focus:outline-none"
            />

            {/* Date range button that opens picker */}
            <div className="relative">
              <button onClick={openPicker} className="px-4 py-2 rounded-lg border bg-white text-gray-700">
                {selectedRangeLabel()}
              </button>

              {showPicker && (
                <div
                  className="absolute z-50 mt-2 w-[780px] bg-white border rounded-lg shadow-lg p-4 grid grid-cols-[200px_1fr] gap-4"
                  style={{ right: 0 }}
                >
                  <div className="border-r pr-3">
                    <ul className="text-sm space-y-2">
                      {[
                        { key: "all", label: "All Date" },
                        { key: "today", label: "Today" },
                        { key: "yesterday", label: "Yesterday" },
                        { key: "thisWeek", label: "This Week" },
                        { key: "thisMonth", label: "This Month" },
                        { key: "lastMonth", label: "Last Month" },
                        { key: "thisFiscalYear", label: "This Fiscal Year" },
                        { key: "thisYear", label: "This Year" },
                      ].map((it) => {
                        const isTempActive = tempQuickKey === it.key;
                        const isAppliedActive = appliedQuick === it.key;
                        return (
                          <li key={it.key}>
                            <button
                              onClick={() => applyQuickRangeToTemp(it.key)}
                              className={`w-full text-left px-3 py-2 rounded flex items-center justify-between ${
                                isTempActive ? "border-2 border-green-300 bg-green-50 text-green-800 rounded-lg" : "hover:bg-gray-50"
                              }`}
                            >
                              <span>{it.label}</span>
                              {isTempActive && (
                                <span className="ml-2">
                                  <CheckIcon />
                                </span>
                              )}
                              {!isTempActive && isAppliedActive && <span className="text-xs text-green-700">✓</span>}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div>
                    {/* Start / End BS boxes + inline calendars */}
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-500">Start</div>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowStartInlineCal((s) => !s);
                              setShowEndInlineCal(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setShowStartInlineCal((s) => !s);
                                setShowEndInlineCal(false);
                              }
                            }}
                            className="px-3 py-2 border rounded-md bg-white text-sm w-full cursor-pointer"
                          >
                            {tempRangeBs.start ||
                              (tempQuickKey && labelForKey[tempQuickKey] !== "All Date" ? labelForKey[tempQuickKey] : "—") ||
                              "—"}
                          </div>
                        </div>

                        {showStartInlineCal && (
                          <div className="mt-2 p-3 border rounded bg-white shadow-sm" onClick={(e) => e.stopPropagation()}>
                            <Calendar onChange={({ bsDate, adDate }) => onStartInlineCalChange({ bsDate, adDate })} language="ne" defaultDate={tempRange.start ? formatAD(tempRange.start) : ""} />
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-gray-500">End</div>
                          <div
                            role="button"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              setShowEndInlineCal((s) => !s);
                              setShowStartInlineCal(false);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                setShowEndInlineCal((s) => !s);
                                setShowStartInlineCal(false);
                              }
                            }}
                            className="px-3 py-2 border rounded-md bg-white text-sm w-full cursor-pointer"
                          >
                            {tempRangeBs.end ||
                              (tempQuickKey && labelForKey[tempQuickKey] !== "All Date" ? labelForKey[tempQuickKey] : "—") ||
                              "—"}
                          </div>
                        </div>

                        {showEndInlineCal && (
                          <div className="mt-2 p-3 border rounded bg-white shadow-sm" onClick={(e) => e.stopPropagation()}>
                            <Calendar onChange={({ bsDate, adDate }) => onEndInlineCalChange({ bsDate, adDate })} language="ne" defaultDate={tempRange.end ? formatAD(tempRange.end) : ""} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="text-xs text-gray-500 mb-1">Preview</div>
                      <div className="p-3 bg-gray-50 rounded text-sm">{tempRange.start && tempRange.end ? `${formatAD(tempRange.start)} → ${formatAD(tempRange.end)}` : "All Date"}</div>
                    </div>

                    <div className="flex items-center justify-end gap-2">
                      <button onClick={cancelPicker} className="px-3 py-2 rounded border text-sm text-gray-600">Cancel</button>
                      <button onClick={applyPicker} className="px-3 py-2 rounded bg-green-600 text-white text-sm">Apply</button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setSearchTerm("")} className="px-3 py-2 rounded-lg border text-sm text-gray-600">
              Clear
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-6">
          <button onClick={handlePrintClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border bg-white text-gray-700 hover:shadow no-print">
            Print PDF
          </button>
          <button onClick={handleDownloadExcel} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#10B981] text-white no-print">
            Download Excel
          </button>
        </div>
      </div>

      {/* printable content preview inside app */}
      <div ref={printRef} className="mt-6">
        <div className="mb-6">
          <div className="bg-gray-50 p-6 rounded-xl shadow-sm w-64">
            <div className="text-xl font-bold">Rs. {Number(closingBalance).toLocaleString()}</div>
            <div className="text-gray-500 text-sm">Closing Balance</div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border rounded-lg overflow-hidden">
            <thead className="bg-gray-50 text-gray-600 text-sm">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Particular</th>
                <th className="p-3 text-left">Notes/Remarks</th>
                <th className="p-3 text-left">Money In</th>
                <th className="p-3 text-left">Money Out</th>
                <th className="p-3 text-left">Balance</th>
              </tr>
            </thead>

            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    No transactions found
                  </td>
                </tr>
              ) : (
                filteredData.map((row, i) => (
                  <tr key={i} className="border-t text-sm">
                    <td className="p-3">{row.date}</td>
                    <td className="p-3">{row.type}</td>
                    <td className="p-3">{row.remarks || "--"}</td>
                    <td className="p-3">{row.moneyIn ? `Rs. ${Number(row.moneyIn).toLocaleString()}` : "--"}</td>
                    <td className="p-3">{row.moneyOut ? `Rs. ${Number(row.moneyOut).toLocaleString()}` : "--"}</td>
                    <td className="p-3">Rs. {Number(row.balance || 0).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
