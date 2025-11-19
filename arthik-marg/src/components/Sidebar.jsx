import React, { useState } from "react";
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
  Plus
} from "lucide-react";
import logo from "../assets/logo.png";


// Define the width constants for clarity
const COLLAPSED_WIDTH = "w-16 p-2";  // Narrow for icons only when closed
const EXPANDED_WIDTH = "w-96 p-6";   // Wide with padding for labels when open


// --- GLOBAL ICON SIZE FOR SIDEBAR ITEMS/DROPDOWNS ---
const ICON_SIZE = 20;

// Define the custom color as a Tailwind CSS utility class
const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_BORDER = "border-[#172554]"; // Added specifically for border usage
const CUSTOM_BLUE_TEXT = "text-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#172554]";
const CUSTOM_BLUE_HOVER_TEXT = "hover:text-[#172554]";


function Navbar({ sidebarOpen }) {
  const NAVBAR_HEIGHT = 'h-16';
  const expandedWidth = '24rem'; 
  const COLLAPSED_MARGIN = '4rem'; // 4rem for toggle button space
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
    <div 
      className={`fixed top-0 right-0 ${NAVBAR_HEIGHT} bg-white border-b border-gray-200 shadow-sm z-30 transition-all duration-300 flex items-center px-6`}
      style={{ 
        left: sidebarOffset, 
        width: `calc(100% - ${sidebarOffset})`
      }}
    >
      <div className="ml-auto flex items-center gap-4">
        <Settings size={ICON_SIZE} className="text-gray-500 cursor-pointer hover:text-gray-900" />
        <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  );
}

function ContentNavbar({ sidebarOpen, setActive }) {
  const CONTENT_NAV_HEIGHT = 'h-16';
  const NAVBAR_HEIGHT_PX = '4rem'; // h-16
  const expandedWidth = '24rem'; 
  const COLLAPSED_MARGIN = '4rem';
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
    <div
      className={`fixed right-0 ${CONTENT_NAV_HEIGHT} bg-gray-50 border-b border-gray-200 z-20 transition-all duration-300 flex items-center justify-end px-6`}
      style={{ 
        left: sidebarOffset, 
        width: `calc(100% - ${sidebarOffset})`, 
        top: NAVBAR_HEIGHT_PX
      }}
    >
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setActive('sales')}
          className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors duration-200 shadow-md"
        >
          <Plus size={18} />
          Add Sales
        </button>

        <button 
          onClick={() => setActive('purchase')}
          className={`flex items-center gap-2 px-4 py-2 text-base font-semibold text-white ${CUSTOM_BLUE} rounded-lg hover:bg-[#111A31] transition-colors duration-200 shadow-md`}
        >
          <Plus size={18} />
          Add Purchase
        </button>
      </div>
    </div>
  );
}


export default function Sidebar({ active, setActive }) {
  const [openSales, setOpenSales] = useState(false);
  const [openPurchase, setOpenPurchase] = useState(false);
  const [openImport, setOpenImport] = useState(false);
  const [openBusinessTools, setOpenBusinessTools] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Navbars */}
      <Navbar sidebarOpen={sidebarOpen} />
      <ContentNavbar sidebarOpen={sidebarOpen} setActive={setActive} />

      {/* External Toggle when closed */}
      {!sidebarOpen && (
        <div
          className="fixed top-4 left-4 cursor-pointer text-gray-700 hover:text-gray-900 p-2 rounded bg-white shadow z-50 transition-all duration-300"
          onClick={() => setSidebarOpen(true)}
          onMouseEnter={() => setHoverToggle(true)}
          onMouseLeave={() => setHoverToggle(false)}
        >
          {toggleButtonContent(false, hoverToggle)}
        </div>
      )}

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-300 shadow-sm z-40 transition-all duration-300 overflow-y-auto ${
          sidebarOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH
        }`}
      >
        {/* Internal toggle when open */}
        {sidebarOpen && (
          <div
            className="absolute top-4 right-4 cursor-pointer text-gray-700 hover:text-gray-900 p-2 rounded bg-white shadow z-50 transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
            onMouseEnter={() => setHoverToggle(true)}
            onMouseLeave={() => setHoverToggle(false)}
          >
            {toggleButtonContent(true, hoverToggle)}
          </div>
        )}

        {/* Logo only visible when open */}
        <div
          className={`flex items-center gap-0 mb-6 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
          }`}
        >
          <img src={logo} alt="Karobar Logo" className="w-20 h-20 object-contain" />
          <h1 className="text-3xl font-bold text-gray-800">ArthikMarg</h1>
        </div>

        {/* User box - UPDATED SECTION */}
        {sidebarOpen && (
          <div className={`mb-5 transition-all duration-300 ${sidebarOpen ? "opacity-100" : "opacity-0 h-0 overflow-hidden"}`}>
            <div
              className={`border py-4 px-3 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 
                ${isProfileOpen 
                    ? `${CUSTOM_BLUE} ${CUSTOM_BLUE_BORDER} text-white` 
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="flex items-center gap-3">
                <div className={`${isProfileOpen ? "bg-white text-[#172554]" : `${CUSTOM_BLUE} text-white`} w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold transition-colors duration-300`}>
                  A
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-lg ${isProfileOpen ? 'text-white' : 'text-gray-800'}`}>ArthikMarg</p>
                </div>
              </div>
              <ChevronsUpDown size={24} className={`${isProfileOpen ? "text-white" : "text-gray-500"} transition-colors duration-300`} />
            </div>
            <ul className={`mt-1 space-y-1 transition-all duration-300 overflow-hidden ${isProfileOpen ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}>
              <li className="flex items-center gap-3 pl-4 pr-2 py-2 text-base cursor-pointer select-none rounded text-gray-700 hover:bg-gray-200">
                <User size={18} />
                Current Profile
              </li>
              <li className="flex items-center gap-3 pl-4 pr-2 py-2 text-base cursor-pointer select-none rounded text-gray-700 hover:bg-gray-200">
                <UserPlus size={18} />
                Create New Profile
              </li>
            </ul>
          </div>
        )}

        {/* Business section */}
        {sidebarOpen && <p className="text-gray-500 text-base mb-2 font-semibold">Business</p>}

        <ul className="space-y-1">
          <SidebarItem label="Dashboard" icon={<LayoutDashboard size={ICON_SIZE} />} active={active} id="dashboard" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Parties" icon={<Users size={ICON_SIZE} />} active={active} id="party" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Inventory" icon={<Boxes size={ICON_SIZE} />} active={active} id="inventory" setActive={setActive} open={sidebarOpen} />

          <li>
            <Dropdown label="Sales" icon={<Receipt size={ICON_SIZE} />} open={openSales} setOpen={setOpenSales} sidebarOpen={sidebarOpen}>
            </Dropdown>
          </li>

          <li>
            <Dropdown label="Purchase" icon={<ShoppingCart size={ICON_SIZE} />} open={openPurchase} setOpen={setOpenPurchase} sidebarOpen={sidebarOpen}>
            </Dropdown>
          </li>

          <SidebarItem label="Expense" icon={<Package size={ICON_SIZE} />} active={active} id="expense" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Other Income" icon={<Wallet size={ICON_SIZE} />} active={active} id="income" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Manage Accounts" icon={<Building size={ICON_SIZE} />} active={active} id="accounts" setActive={setActive} open={sidebarOpen} />
        </ul>

        {/* Management section */}
        {sidebarOpen && <p className="text-gray-500 text-base mt-6 mb-2 font-semibold">Management</p>}
        <ul className="space-y-1">
          <SidebarItem label="Reports" icon={<BarChart2 size={ICON_SIZE} />} active={active} id="reports" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Manage Staffs" icon={<Users2 size={ICON_SIZE} />} active={active} id="staffs" setActive={setActive} open={sidebarOpen} />

          <li>
            <Dropdown label="Import Data" icon={<FileUp size={ICON_SIZE} />} open={openImport} setOpen={setOpenImport} sidebarOpen={sidebarOpen}>
              <DropItem label="Import Parties" id="import-parties" active={active} setActive={setActive} first />
              <DropItem label="Import Items" id="import-items" active={active} setActive={setActive} />
            </Dropdown>
          </li>

          <li>
            <Dropdown label="Business Tools" icon={<Wrench size={ICON_SIZE} />} open={openBusinessTools} setOpen={setOpenBusinessTools} sidebarOpen={sidebarOpen}>
              <DropItem label="Business Cards" id="business-cards" active={active} setActive={setActive} first />
              <DropItem label="Greeting Card" id="greeting-card" active={active} setActive={setActive} />
              <DropItem label="Reminders" id="reminders" active={active} setActive={setActive} />
              <DropItem label="Bill Gallery" id="bill-gallery" active={active} setActive={setActive} />
              <DropItem label="Notebook" id="notebook" active={active} setActive={setActive} />
            </Dropdown>
          </li>
        </ul>

        {/* Others section */}
        {sidebarOpen && <p className="text-gray-500 text-base mt-6 mb-2 font-semibold">Others</p>}
        <ul className="space-y-1">
          <SidebarItem label="Help & Support" icon={<LifeBuoy size={ICON_SIZE} />} active={active} id="help-support" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Tutorials" icon={<BookOpen size={ICON_SIZE} />} active={active} id="tutorials" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="What's New" icon={<Sparkles size={ICON_SIZE} />} active={active} id="whats-new" setActive={setActive} open={sidebarOpen} />
          <SidebarItem label="Settings" icon={<Settings size={ICON_SIZE} />} active={active} id="settings" setActive={setActive} open={sidebarOpen} />
        </ul>
      </div>
    </>
  );
}

// SidebarItem component always show icon, conditionally show label if open
function SidebarItem({ label, icon, active, id, setActive, open }) {
  return (
    <li
      onClick={() => setActive(id)}
      className={`flex items-center gap-3 p-2 cursor-pointer rounded transition-all duration-300 text-lg ${
        active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
      }`}
    >
      {icon}
      {open && <span>{label}</span>}  {/* Show label only if sidebar open */}
    </li>
  );
}


// Dropdown component
function Dropdown({ label, icon, open, setOpen, sidebarOpen, children }) {
  if (!sidebarOpen) return null;
  return (
    <>
      <div
        className={`flex items-center justify-between p-2 cursor-pointer rounded select-none transition-all duration-300 text-lg ${
          open
            ? `${CUSTOM_BLUE} text-white`
            : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          {icon}
          {label}
        </div>
        <ChevronRight size={20} className={`transition-transform ${open ? "rotate-90 text-white" : `text-gray-700 hover:text-white`}`} />
      </div>
      <ul className={`ml-8 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${open ? "max-h-60 opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </ul>
    </>
  );
}

// DropItem component
function DropItem({ label, id, active, setActive }) {
  return (
    <li
      onClick={() => setActive(id)}
      className={`flex items-center p-2 text-base rounded cursor-pointer select-none transition-all duration-300 ${
        active === id
          ? `${CUSTOM_BLUE} text-white`
          : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
      }`}
    >
      {label}
    </li>
  );
}