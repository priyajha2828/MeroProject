// SettingsPage.jsx
import React, { useState } from "react";
import SettingsSidebar from "./SettingsSidebar"; // your sidebar (already navigates to /settings/account)
import SettingAccount from "./SettingAccount";   // the real account page you uploaded
import { Routes, Route, Navigate } from "react-router-dom";

function GeneralSettings() {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold">General</h3>
      <p className="mt-2 text-gray-600">General settings content.</p>
    </div>
  );
}
function SecuritySettings() {
  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold">Security</h3>
    </div>
  );
}

export default function SettingsPage() {
  const [settingsCollapsed, setSettingsCollapsed] = useState(false);

  return (
    // App.jsx renders the global Sidebar already, so this is the settings area only
    <div className="flex-1 flex overflow-hidden">
      <SettingsSidebar collapsed={settingsCollapsed} />

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
          {/* <-- Use your actual SettingAccount component here */}
          <Route path="account" element={<SettingAccount />} />
          <Route path="security" element={<SecuritySettings />} />

          {/* fallback -> go to /settings */}
          <Route path="*" element={<Navigate to="/settings" replace />} />
        </Routes>
      </section>
    </div>
  );
}
