// Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Boxes,
  ShoppingCart,
  Package,
  Receipt,
  Wallet,
  Building,
  BarChart2,
  Users2,
  ChevronsLeft,
  ChevronsRight,
  ChevronRight,
  ChevronsUpDown,
  Menu,
  FileUp,
  Wrench,
  LifeBuoy,
  BookOpen,
  Sparkles,
  Settings,
  User,
  UserPlus,
} from "lucide-react";
import logo from "../assets/logo.png";

// Define constants
const COLLAPSED_WIDTH_CLASS = "w-16 p-2";
const EXPANDED_WIDTH_CLASS = "w-96 p-6";
const COLLAPSED_WIDTH_PX = 64; // Tailwind w-16 -> 4rem -> 64px
const EXPANDED_WIDTH_PX = 384; // Tailwind w-96 -> 24rem -> 384px
const ICON_SIZE = 20;

const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export default function Sidebar() {
  const navigate = useNavigate();

  const [activePage, setActiveState] = useState("dashboard");

  const handleSetActive = (id) => {
    setActiveState(id);

    // --- ROUTING LOGIC ---
    let path = `/${id}`;
    if (id === "dashboard") path = "/";
    if (id === "add-party") path = "/parties/add";
    navigate(path);

    // collapse sidebar when going to settings
    if (id === "settings") {
      setSidebarOpen(false);
    }

    // dropdown logic
    if (["purchase-bills", "payment-out", "purchase-return"].includes(id)) {
      setOpenPurchase(true);
      setOpenSales(false);
      setOpenImport(false);
    } else if (["sales-invoice", "payment-in", "quotation", "sales-return"].includes(id)) {
      setOpenSales(true);
      setOpenPurchase(false);
      setOpenImport(false);
    } else if (["import-parties", "import-items"].includes(id)) {
      setOpenImport(true);
      setOpenSales(false);
      setOpenPurchase(false);
    } else {
      setOpenSales(false);
      setOpenPurchase(false);
      setOpenImport(false);
    }
  };

  const [openSales, setOpenSales] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(true);
  const [openImport, setOpenImport] = useState(false);
  const [openBusinessTools, setOpenBusinessTools] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [hoverToggle, setHoverToggle] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleButtonContent = (isSidebarOpen, isHovered) => {
    if (isSidebarOpen) {
      return isHovered ? <ChevronsLeft size={24} /> : <Menu size={24} />;
    } else {
      return isHovered ? <ChevronsRight size={24} /> : <Menu size={24} />;
    }
  };

  return (
    <>
      {/* Invisible spacer: keeps main content pushed to right so fixed sidebar doesn't overlap content */}
      <div
        aria-hidden="true"
        className={`${sidebarOpen ? "w-96" : "w-16"} flex-shrink-0`}
        style={{ pointerEvents: "none" }}
      />

      {/* Fixed sidebar (independent, scrollable) */}
      <div
        className={`fixed left-0 top-0 bottom-0 bg-white border-r border-gray-300 shadow-sm z-40 transition-all duration-300 overflow-y-auto ${sidebarOpen ? "w-96 p-6" : "w-16 p-2"
          }`}
        role="navigation"
        aria-label="Main sidebar"
      >
        {/* INTERNAL TOGGLE (Visible ONLY when expanded) */}
        {sidebarOpen && (
          <div
            className="absolute top-4 right-4 bg-white shadow p-2 rounded cursor-pointer z-50"
            onClick={() => setSidebarOpen(false)}
            onMouseEnter={() => setHoverToggle(true)}
            onMouseLeave={() => setHoverToggle(false)}
          >
            {toggleButtonContent(true, hoverToggle)}
          </div>
        )}

        {/* EXTERNAL TOGGLE (Visible ONLY when collapsed) */}
        {!sidebarOpen && (
          <div
            className="absolute top-4 right-4 bg-white shadow p-2 rounded cursor-pointer z-50 transition-all duration-300"
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={() => setHoverToggle(true)}
            onMouseLeave={() => setHoverToggle(false)}
          >
            {toggleButtonContent(false, hoverToggle)}
          </div>
        )}

        {/* Logo */}
        {sidebarOpen && (
          <div className="flex items-center gap-2 mb-6">
            <img src={logo} className="w-20 h-20 object-contain" alt="Karobar Logo" />
            <h1 className="text-3xl font-bold text-gray-800">ArthikMarg</h1>
          </div>
        )}

        {/* Profile Box */}
        {sidebarOpen && (
          <div className="mb-5">
            <div
              className={`border py-4 px-3 rounded-lg flex items-center justify-between cursor-pointer ${isProfileOpen ? `${CUSTOM_BLUE} text-white` : "border-gray-300 text-white hover:bg-gray-100"
                }`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold ${isProfileOpen ? "bg-white text-[#172554]" : CUSTOM_BLUE}`}>
                  A
                </div>
                <p className={`text-lg font-medium ${isProfileOpen ? "text-white" : "text-gray-800"}`}>ArthikMarg</p>
              </div>
              <ChevronsUpDown size={22} className={isProfileOpen ? "text-white" : "text-gray-500"} />
            </div>

            {isProfileOpen && (
              <ul className="mt-1 space-y-1">
                <li className="pl-4 pr-2 py-2 hover:bg-gray-200 rounded flex items-center gap-3 cursor-pointer">
                  <User size={18} /> My Profile
                </li>
                <li className="pl-4 pr-2 py-2 hover:bg-gray-200 rounded flex items-center gap-3 cursor-pointer">
                  <UserPlus size={18} /> Create New Profile
                </li>
              </ul>
            )}
          </div>
        )}

        {/* ——— BUSINESS ——— */}
        {sidebarOpen && <p className="text-gray-500 font-semibold mb-2">Business</p>}

        <ul className="space-y-1">
          <SidebarItem label="Dashboard" icon={<LayoutDashboard size={ICON_SIZE} />} id="dashboard" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Parties" icon={<Users size={ICON_SIZE} />} id="parties" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Inventory" icon={<Boxes size={ICON_SIZE} />} id="inventory" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          {/* Sales */}
          <li>
            <Dropdown label="Sales" icon={<Receipt size={ICON_SIZE} />} open={openSales} setOpen={setOpenSales} sidebarOpen={sidebarOpen}>
              <DropItem label="Sales Invoice" id="sales-invoice" active={activePage} setActive={handleSetActive} />
              <DropItem label="Payment In" id="payment-in" active={activePage} setActive={handleSetActive} />
              <DropItem label="Sales Return" id="sales-return" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

          {/* Purchase */}
          <li>
            <Dropdown label="Purchase" icon={<ShoppingCart size={ICON_SIZE} />} open={openPurchase} setOpen={setOpenPurchase} sidebarOpen={sidebarOpen}>
              <DropItem label="Purchase Bills" id="purchase-bills" active={activePage} setActive={handleSetActive} />
              <DropItem label="Payment Out" id="payment-out" active={activePage} setActive={handleSetActive} />
              <DropItem label="Purchase Return" id="purchase-return" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

          <SidebarItem label="Expense" icon={<Package size={ICON_SIZE} />} id="expense" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Other Income" icon={<Wallet size={ICON_SIZE} />} id="income" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Manage Accounts" icon={<Building size={ICON_SIZE} />} id="accounts" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
        </ul>

        {/* ——— MANAGEMENT ——— */}
        {sidebarOpen && <p className="text-gray-500 font-semibold mt-6 mb-2">Management</p>}

        <ul className="space-y-1">
          <SidebarItem label="Reports" icon={<BarChart2 size={ICON_SIZE} />} id="reports" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Manage Staffs" icon={<Users2 size={ICON_SIZE} />} id="staffs" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          {/* Import */}
          <li>
            <Dropdown label="Import Data" icon={<FileUp size={ICON_SIZE} />} open={openImport} setOpen={setOpenImport} sidebarOpen={sidebarOpen}>
              <DropItem label="Import Parties" id="import-parties" active={activePage} setActive={handleSetActive} />
              <DropItem label="Import Items" id="import-items" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

          {/* Business Tools */}
          <li>
            <Dropdown label="Business Tools" icon={<Wrench size={ICON_SIZE} />} open={openBusinessTools} setOpen={setOpenBusinessTools} sidebarOpen={sidebarOpen}>
              <DropItem label="Business Cards" id="business-cards" />
              <DropItem label="Greeting Card" id="greeting-card" />
              <DropItem label="Reminders" id="reminders" />
              <DropItem label="Bill Gallery" id="bill-gallery" />
              <DropItem label="Notebook" id="notebook" />
            </Dropdown>
          </li>
        </ul>

        {/* ——— OTHERS ——— */}
        {sidebarOpen && <p className="text-gray-500 font-semibold mt-6 mb-2">Others</p>}

        <ul className="space-y-1">
          <SidebarItem label="Help & Support" icon={<LifeBuoy size={ICON_SIZE} />} id="help-support" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Tutorials" icon={<BookOpen size={ICON_SIZE} />} id="tutorials" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="What's New" icon={<Sparkles size={ICON_SIZE} />} id="whats-new" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Settings" icon={<Settings size={ICON_SIZE} />} id="settings" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
        </ul>
      </div>
    </>
  );
}

// ——————————————————————————————
// HELPER COMPONENTS
// ——————————————————————————————
function SidebarItem({ label, icon, active, id, setActive, open }) {
  return (
    <li
      onClick={() => setActive(id)}
      className={`flex items-center gap-3 p-2 rounded cursor-pointer text-lg transition ${active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 hover:bg-gray-200 hover:text-black`
        } ${!open && "justify-center"}`}
    >
      {icon}
      {open && <span>{label}</span>}
    </li>
  );
}

function Dropdown({ label, icon, open, setOpen, sidebarOpen, children }) {
  if (!sidebarOpen) return null;

  return (
    <>
      <div
        className={`flex items-center justify-between p-2 rounded cursor-pointer text-lg transition ${open ? `${CUSTOM_BLUE} text-white` : `text-gray-700 hover:bg-gray-200 hover:text-black`
          }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {icon}
          {label}
        </div>
        <ChevronRight size={20} className={`${open ? "rotate-90" : ""} transition`} />
      </div>

      <ul className={`ml-8 mt-1 space-y-1 overflow-hidden transition ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </ul>
    </>
  );
}

function DropItem({ label, id, active, setActive }) {
  return (
    <li
      onClick={() => id && setActive(id)}
      className={`p-2 text-base rounded cursor-pointer transition ${active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 hover:bg-gray-200  hover:text-black`
        }`}
    >
      {label}
    </li>
  );
}
