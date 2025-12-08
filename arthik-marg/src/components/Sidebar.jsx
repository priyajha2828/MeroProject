// src/components/Sidebar.jsx
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

const COLLAPSED_WIDTH = "w-16 p-2";
const EXPANDED_WIDTH = "w-96 p-6";
const ICON_SIZE = 20;
const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#111A31]";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState("dashboard");

  // dropdowns
  const [openSales, setOpenSales] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openBusinessTools, setOpenBusinessTools] = useState(false);

  // hover & profile
  const [hoverToggle, setHoverToggle] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleSetActive = (id) => {
    if (!id) return;
    setActivePage(id);

    // routing logic
    let path = "/";
    switch (id) {
      case "dashboard":
        path = "/";
        break;
      case "parties":
        path = "/parties";
        break;
      case "inventory":
        path = "/inventory";
        break;
      case "sales-invoice":
        path = "/sales-invoice";
        break;
      case "quotation":
        path = "/quotation";
        break;
      case "payment-in":
        path = "/payment-in";
        break;
      case "sales-return":
        path = "/sales-return";
        break;
      case "purchase-bills":
        path = "/purchase-bills";
        break;
      case "payment-out":
        path = "/payment-out";
        break;
      case "purchase-return":
        path = "/purchase-return";
        break;
      case "expense":
        path = "/expense";
        break;
      case "other-income":
        path = "/other-income";
        break;
      case "manage-staffs":
        path = "/manage-staffs";
        break;
      case "import-parties":
        path = "/import-parties";
        break;
      case "import-items":
        path = "/import-items";
        break;
      case "business-cards":
        path = "/business-card";
        break;
      case "reminders":
        path = "/reminders";
        break;
      case "bill-gallery":
        path = "/bill-gallery";
        break;
      case "notebook":
        path = "/notebook";
        break;
      case "reports":
        path = "/reports";
        break;
      case "help-support":
        path = "/help-support";
        break;
      case "tutorials":
        path = "/tutorials";
        break;
      case "whats-new":
        path = "/whats-new";
        break;
      case "settings":
        path = "/settings";
        break;
      case "accounts":
      case "manage-accounts":
        // Accept both ids — map them to the same route
        path = "/manage-accounts";
        break;
      default:
        path = `/${id}`;
    }

    navigate(path);

    // manage dropdown states for visual coherence
    if (["sales-invoice", "quotation", "payment-in", "sales-return"].includes(id)) {
      setOpenSales(true);
      setOpenPurchase(false);
      setOpenImport(false);
    } else if (["purchase-bills", "payment-out", "purchase-return"].includes(id)) {
      setOpenPurchase(true);
      setOpenSales(false);
      setOpenImport(false);
    } else if (["import-parties", "import-items"].includes(id)) {
      setOpenImport(true);
      setOpenSales(false);
      setOpenPurchase(false);
    } else {
      // collapse others
      setOpenSales(false);
      setOpenPurchase(false);
      setOpenImport(false);
    }
  };

  const toggleButtonContent = (isSidebarOpen, isHovered) => {
    if (isSidebarOpen) {
      return isHovered ? <ChevronsLeft size={24} /> : <Menu size={24} />;
    } else {
      return isHovered ? <ChevronsRight size={24} /> : <Menu size={24} />;
    }
  };

  return (
    <>
      <div
        className={`sticky top-0 self-start h-screen bg-white border-r border-gray-300 shadow-sm z-40 transition-all duration-300 overflow-y-auto ${sidebarOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH}`}
      >
        {/* INTERNAL TOGGLE */}
        {sidebarOpen ? (
          <div
            className="absolute top-4 right-4 bg-white shadow p-2 rounded cursor-pointer z-50"
            onClick={() => setSidebarOpen(false)}
            onMouseEnter={() => setHoverToggle(true)}
            onMouseLeave={() => setHoverToggle(false)}
            role="button"
            aria-label="Collapse sidebar"
          >
            {toggleButtonContent(true, hoverToggle)}
          </div>
        ) : (
          <div
            className="absolute top-4 right-4 bg-white shadow p-2 rounded cursor-pointer z-50"
            onClick={() => setSidebarOpen(true)}
            onMouseEnter={() => setHoverToggle(true)}
            onMouseLeave={() => setHoverToggle(false)}
            role="button"
            aria-label="Expand sidebar"
          >
            {toggleButtonContent(false, hoverToggle)}
          </div>
        )}

        {/* Logo */}
        {sidebarOpen && (
          <div className="flex items-center gap-3 mb-6">
            <img src={logo} className="w-14 h-14 object-contain" alt="Karobar Logo" />
            <h1 className="text-2xl font-bold text-gray-800">ArthikMarg</h1>
          </div>
        )}

        {/* Profile */}
        {sidebarOpen && (
          <div className="mb-5">
            <div
              className={`border py-3 px-3 rounded-lg flex items-center justify-between cursor-pointer ${isProfileOpen ? `${CUSTOM_BLUE} text-white` : "border-gray-300 text-gray-800 hover:bg-gray-100"}`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              role="button"
              aria-expanded={isProfileOpen}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold ${isProfileOpen ? "bg-white text-[#172554]" : CUSTOM_BLUE}`}>
                  A
                </div>
                <p className={isProfileOpen ? "text-white" : "text-gray-800"}>ArthikMarg</p>
              </div>
              <ChevronsUpDown size={20} className={isProfileOpen ? "text-white" : "text-gray-500"} />
            </div>

            {isProfileOpen && (
              <ul className="mt-1 space-y-1">
                <li className="pl-4 pr-2 py-2 hover:bg-gray-200 rounded flex items-center gap-3 cursor-pointer">
                  <User size={16} /> My Profile
                </li>
                <li className="pl-4 pr-2 py-2 hover:bg-gray-200 rounded flex items-center gap-3 cursor-pointer">
                  <UserPlus size={16} /> Create New Profile
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
              {/* Added Quotation here */}
              <DropItem label="Quotation" id="quotation" active={activePage} setActive={handleSetActive} />
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

          <SidebarItem label="Other Income" icon={<Wallet size={ICON_SIZE} />} id="other-income" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Manage Accounts" icon={<Building size={ICON_SIZE} />} id="accounts" active={activePage} setActive={handleSetActive} open={sidebarOpen} />
        </ul>

        {/* ——— MANAGEMENT ——— */}
        {sidebarOpen && <p className="text-gray-500 font-semibold mt-6 mb-2">Management</p>}

        <ul className="space-y-1">
          <SidebarItem label="Reports" icon={<BarChart2 size={ICON_SIZE} />} id="reports" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

          <SidebarItem label="Manage Staffs" icon={<Users2 size={ICON_SIZE} />} id="manage-staffs" active={activePage} setActive={handleSetActive} open={sidebarOpen} />

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
              <DropItem label="Business Cards" id="business-cards" active={activePage} setActive={handleSetActive} />
              <DropItem label="Greeting Card" id="greeting-card" active={activePage} setActive={handleSetActive} />
              <DropItem label="Reminders" id="reminders" active={activePage} setActive={handleSetActive} />
              <DropItem label="Bill Gallery" id="bill-gallery" active={activePage} setActive={handleSetActive} />
              <DropItem label="Notebook" id="notebook" active={activePage} setActive={handleSetActive} />
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

// Small helper components

function SidebarItem({ label, icon, active, id, setActive, open }) {
  return (
    <li
      onClick={() => id && setActive(id)}
      className={`flex items-center gap-3 p-2 rounded cursor-pointer text-lg transition ${active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`} ${!open ? "justify-center" : ""}`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") setActive(id);
      }}
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
        className={`flex items-center justify-between p-2 rounded cursor-pointer text-lg transition ${open ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`}`}
        onClick={() => setOpen(!open)}
        role="button"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
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
      className={`p-2 text-base rounded cursor-pointer transition ${active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`}`}
      role="button"
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") setActive(id);
      }}
    >
      {label}
    </li>
  );
}
