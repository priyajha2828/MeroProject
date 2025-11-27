import { useState } from "react";
import { LogOut } from "lucide-react";

export default function SettingAccount() {
  const [name, setName] = useState("priya jha");
  const [phone, setPhone] = useState("+977 9709068360");
  const [email, setEmail] = useState("");

  const handleUpdate = () => {
    // later connect API here
    alert("Account Updated!");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-6">My Account</h2>

      <div className="bg-white dark:bg-gray-900 shadow rounded-xl p-6 border border-gray-200 dark:border-gray-800 max-w-3xl">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>

        <div className="flex gap-6">
          {/* Left Form */}
          <div className="flex-1 space-y-4">
            {/* Name */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Your Phone Number
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-3 py-2 border rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Profile Photo Upload */}
          <div className="w-40 flex flex-col items-center gap-3">
            <div className="w-28 h-28 rounded-md bg-gray-200 dark:bg-gray-700" />
            <button className="px-4 py-2 border rounded-lg text-sm font-medium bg-white dark:bg-gray-800">
              Upload Photo
            </button>
          </div>
        </div>

        {/* Update Button */}
        <div className="mt-6">
  <button
    onClick={handleUpdate}
    className="px-6 py-2 bg-[#172554] text-white rounded-lg hover:bg-[#111A31]"
  >
    Update Account
  </button>
</div>

        {/* Logout */}
        <div className="mt-4">
          <button className="flex items-center gap-2 text-red-500 hover:text-red-600 font-medium">
            <LogOut size={18} />
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
