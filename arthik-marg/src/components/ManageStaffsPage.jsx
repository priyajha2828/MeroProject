// src/components/ManageStaffs.jsx
import React, { useEffect, useState } from "react";

/* 
  ManageStaffs with Add New Staff modal (matching screenshot)
  - Tailwind CSS required
  - Clicking "Add New Staff" opens modal
  - Submitting adds staff to local list (optimistic)
  - Buttons/colors updated to use #172554
*/

function StatusBadge({ status }) {
  const base = "text-sm font-medium px-3 py-1 rounded-lg inline-block";
  switch ((status || "").toLowerCase()) {
    case "accepted":
      return <span className={`${base} bg-green-100 text-green-800`}>Accepted</span>;
    case "pending":
      return <span className={`${base} bg-yellow-100 text-yellow-800`}>Pending</span>;
    case "rejected":
      return <span className={`${base} bg-red-100 text-red-800`}>Rejected</span>;
    default:
      return <span className={`${base} bg-gray-100 text-gray-700`}>{status || "Unknown"}</span>;
  }
}

function LockIcon({ locked }) {
  return (
    <svg className="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4.5" y="10.5" width="15" height="9" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
      <path d={locked ? "M8 10.5V8.3a4 4 0 118 0v2.2" : "M8 10.5V8.3a4 4 0 018 0v2.2"} stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* Simple modal component */
function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg z-10">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose} aria-label="Close modal">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export default function ManageStaffs({ apiUrl = "/api/staffs" }) {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // modal state
  const [addOpen, setAddOpen] = useState(false);

  // form state
  const emptyForm = {
    name: "",
    role: "Manager",
    status: "Accepted",
    joinedDate: new Date().toISOString().slice(0, 10), // yyyy-mm-dd
    locked: false,
  };
  const [form, setForm] = useState(emptyForm);

  // role options shown as cards (matches screenshot)
  const ROLE_OPTIONS = [
    "Partner",
    "Manager",
    "Accountant",
    "Sales Person",
    "Stock Manager",
    "Entry Person",
  ];

  // demo fallback (keeps UI identical to screenshot if backend not ready)
  const mockData = [
    {
      id: 1,
      name: "Anything else",
      role: "Admin",
      status: "Accepted",
      joinedDate: "2082-03-12",
      locked: true,
    },
  ];

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setStaffs(Array.isArray(data) ? data : data.data || mockData);
      } catch (err) {
        console.warn("Failed to fetch staffs:", err);
        if (mounted) {
          setStaffs(mockData);
          setError("Could not reach backend — showing demo data.");
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, [apiUrl]);

  function formatJoinedDate(dateStr) {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      const opts = { year: "numeric", month: "short", day: "numeric" };
      return d.toLocaleDateString(undefined, opts);
    } catch {
      return dateStr;
    }
  }

  // open the modal and reset form
  function openAddModal() {
    setForm({
      ...emptyForm,
      joinedDate: new Date().toISOString().slice(0, 10),
    });
    setAddOpen(true);
  }

  // submit form: optimistic add (adjust to call backend as needed)
  function submitAdd(e) {
    e.preventDefault();
    // basic validation
    if (!form.name.trim()) {
      alert("Please enter staff name.");
      return;
    }

    const newStaff = {
      id: Date.now(),
      name: form.name.trim(),
      role: form.role,
      status: form.status,
      joinedDate: form.joinedDate,
      locked: !!form.locked,
    };

    // optimistic update
    setStaffs((s) => [newStaff, ...s]);
    setAddOpen(false);

    // NOTE: if you have a real backend, POST here and reconcile response.
    // fetch(apiUrl, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(newStaff) })
    //   .then(r=>r.json()).then(created => { /* update id etc */})
    //   .catch(err => { /* handle error */ });
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">
          Manage Staffs <span className="text-gray-500 text-sm">({staffs.length})</span>
        </h2>

        <button
          type="button"
          className="inline-flex items-center gap-2 bg-[#172554] hover:bg-[#111A31] text-white font-medium px-4 py-2 rounded-md shadow"
          onClick={openAddModal}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 6v12M6 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Add New Staff
        </button>
      </div>

      {/* card */}
      <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100"></div>

        <div className="p-6">
          {loading ? (
            <div className="py-12 text-center text-gray-500">Loading...</div>
          ) : (
            <>
              {error && (
                <div className="mb-4 text-sm text-yellow-700 bg-yellow-100 px-3 py-2 rounded">
                  {error}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full table-fixed border-collapse">
                  <thead>
                    <tr className="text-left text-gray-600">
                      <th className="py-6 px-6 w-3/12">Staff Name</th>
                      <th className="py-6 px-6 w-2/12">Role</th>
                      <th className="py-6 px-6 w-2/12">Status</th>
                      <th className="py-6 px-6 w-3/12">Joined Date</th>
                      <th className="py-6 px-6 w-1/12 text-right">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {staffs.length === 0 ? (
                      <tr>
                        <td colSpan="5" className="py-12 px-6 text-center text-gray-500">No staff available.</td>
                      </tr>
                    ) : (
                      staffs.map((s) => (
                        <tr key={s.id} className="border-t border-gray-100">
                          <td className="py-8 px-6 align-middle text-gray-800">{s.name}</td>
                          <td className="py-8 px-6 align-middle text-gray-700">{s.role}</td>

                          <td className="py-8 px-6 align-middle">
                            <div className="flex items-center h-full">
                              <StatusBadge status={s.status} />
                            </div>
                          </td>

                          <td className="py-8 px-6 align-middle text-gray-800">{formatJoinedDate(s.joinedDate)}</td>

                          <td className="py-8 px-6 align-middle text-right">
                            <button
                              type="button"
                              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-50"
                              title={s.locked ? "Locked" : "Unlocked"}
                              onClick={() => alert(`Action for ${s.name}`)}
                            >
                              <LockIcon locked={s.locked} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Add New Staff Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="Add New Staff">
        <form onSubmit={submitAdd} className="space-y-6">
          {/* Staff Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Staff Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="block w-full border border-gray-200 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#172554]/20"
              placeholder="Enter staff name"
              required
            />
          </div>

          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Role</label>
            <div className="grid grid-cols-2 gap-3">
              {ROLE_OPTIONS.map((role) => {
                const selected = form.role === role;
                return (
                  <button
                    type="button"
                    key={role}
                    onClick={() => setForm((f) => ({ ...f, role }))}
                    className={`flex items-center justify-between p-4 border rounded-lg hover:shadow-sm transition text-left ${
                      selected ? "bg-[#f1f3fb] border-[#172554]" : "bg-white border-gray-100"
                    }`}
                  >
                    <div className="text-gray-800">{role}</div>
                    <div className={`w-5 h-5 rounded-full border ${selected ? "border-[#172554] bg-[#172554]/10" : "border-gray-300"}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Permissions info */}
          <div className="mt-4 bg-[#f1f7ff] border border-[#e6f0ff] rounded p-4 flex items-center gap-3">
            <div className="bg-[#e6f3ff] text-[#172554] rounded-full w-8 h-8 flex items-center justify-center font-bold">i</div>
            <div className="text-sm text-gray-700">
              You can view or modify the staff permission access
              <div>
                <a href="#" onClick={(e) => e.preventDefault()} className="text-[#172554] underline">Manage Permissions</a>
              </div>
            </div>
          </div>

          {/* Joined date + actions */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Joined Date</label>
              <input
                type="date"
                value={form.joinedDate}
                onChange={(e) => setForm((f) => ({ ...f, joinedDate: e.target.value }))}
                className="block w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-3 ml-auto">
              <button type="button" onClick={() => setAddOpen(false)} className="px-4 py-2 border rounded-md">Cancel</button>
              <button type="submit" className="px-4 py-2 bg-[#172554] hover:bg-[#111A31] text-white rounded-md">Add Staff</button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
