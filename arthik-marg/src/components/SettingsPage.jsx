// SettingsPage.jsx (updated — DO NOT render global Sidebar here)
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar"; // the inner settings nav
import { Routes, Route, Navigate } from "react-router-dom";

function GeneralSettings() {
  return <div><h3 className="text-xl font-semibold">General</h3><p className="mt-2 text-gray-600">General settings content.</p></div>;
}
function AccountSettings() {
  return <div><h3 className="text-xl font-semibold">Account</h3></div>;
}
function SecuritySettings() {
  return <div><h3 className="text-xl font-semibold">Security</h3></div>;
}

export default function SettingsPage() {
  const [settingsCollapsed, setSettingsCollapsed] = useState(false);

  return (
    // We do not render the global Sidebar here — App.jsx already renders it
    <div className="flex-1 flex overflow-hidden">
      {/* Secondary settings sidebar (left column inside settings) */}
      <SettingsSidebar collapsed={settingsCollapsed} />

      {/* Content area */}
      <section className="flex-1 p-6 overflow-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Settings</h1>
            <p className="text-sm text-gray-500">Configure your account and application.</p>
          </div>

          
        </div>

        <Routes>
          <Route index element={<Navigate to="general" replace />} />
          <Route path="general" element={<GeneralSettings />} />
          <Route path="account" element={<AccountSettings />} />
          <Route path="security" element={<SecuritySettings />} />
        </Routes>
      </section>
    </div>
  );
}