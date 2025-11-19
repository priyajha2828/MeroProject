import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Topbar from "./components/Topbar";
import Dashboard from "./components/Dashboard";
import AddSales from "./components/AddSales";
import AddPurchase from "./components/AddPurchase";
import QuickPOS from "./components/QuickPOS";
import AddReminder from "./components/AddReminder";
import CompleteProfile from "./components/CompleteProfile";
import PaymentInForm from "./components/PaymentIn"; // ✅ Import PaymentInForm

export default function App() {
  const [theme, setTheme] = useState("system");
  const [active, setActive] = useState("dashboard");
  const [reminders, setReminders] = useState([]);
  const [showReminder, setShowReminder] = useState(false);

  const handleSaveReminder = (reminder) => {
    setReminders([...reminders, reminder]);
  };

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <div className="flex-1">
          <Topbar
            theme={theme}
            setTheme={setTheme}
            onAddReminder={() => setShowReminder(true)}
          />

          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/add-sales" element={<AddSales />} />
              <Route path="/add-purchase" element={<AddPurchase />} />
              <Route path="/payment-in" element={<PaymentInForm />} /> {/* ✅ PaymentIn Route */}
              <Route
                path="/quick-pos"
                element={<QuickPOS onClose={() => window.history.back()} />}
              />
              <Route path="/complete-profile" element={<CompleteProfile />} />
            </Routes>
          </main>
        </div>

        {showReminder && (
          <AddReminder
            onClose={() => setShowReminder(false)}
            onSave={handleSaveReminder}
          />
        )}
      </div>
    </Router>
  );
}
