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
  Plus,
  Search,
  Bell,
  Moon,
  Keyboard,
  FileText,
  ScrollText
} from "lucide-react";
import logo from "../assets/logo.png";
import { ImportPartiesPage } from "./ImportPartiesPage";
import { ImportItemsPage } from "./ImportItemsPage";
import { PartiesPage } from "./PartiesPage";

import {InventoryPage} from "./InventoryPage";
import {SalesInvoicePage} from "./SalesInvoicePage";
import {PaymentInPage} from "./PaymentInPage";
import {PaymentOutPage} from "./PaymentOutPage";
import {PurchaseBillsPage} from "./PurchaseBillsPage";
import {PurchaseReturnPage} from "./PurchaseReturnPage";
import {SalesReturnPage} from "./SalesReturnPage";
import { AddPartyForm } from "./AddPartyForm.jsx";


// Define the width constants for clarity
const COLLAPSED_WIDTH = "w-16 p-2";
const EXPANDED_WIDTH = "w-96 p-6";
const ICON_SIZE = 20;

// Custom Colors
const CUSTOM_BLUE = "bg-[#172554]";
const CUSTOM_BLUE_BORDER = "border-[#172554]";
const CUSTOM_BLUE_HOVER_BG = "hover:bg-[#172554]";
// Custom Green for the button in Payment Out Page
const CUSTOM_GREEN = "bg-green-600";
const CUSTOM_GREEN_HOVER = "hover:bg-green-700";

// --- COMPONENTS ---

// 1. Navbar (Global)
function Navbar({ sidebarOpen }) {
  const NAVBAR_HEIGHT = 'h-16';
  const expandedWidth = '24rem';
  const COLLAPSED_MARGIN = '4rem';
  const sidebarOffset = sidebarOpen ? expandedWidth : COLLAPSED_MARGIN;

  return (
    <div 
      className={`fixed top-0 right-0 ${NAVBAR_HEIGHT} bg-white border-b border-gray-200 shadow-sm z-30 transition-all duration-300 flex items-center justify-between px-6`}
      style={{ 
        left: sidebarOffset, 
        width: `calc(100% - ${sidebarOffset})`
      }}
    >
      {/* Search Bar */}
      <div className="relative flex items-center w-96">
        <Search size={18} className="absolute left-3 text-gray-400" />
        <input 
          type="text" 
          placeholder="Search or create anything..." 
          className="w-full pl-10 pr-16 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
        />
        <span className="absolute right-3 text-xs text-gray-400 font-medium border border-gray-200 rounded px-1.5 py-0.5 bg-white">
          Ctrl + K
        </span>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1 cursor-pointer">
             <span className="text-lg">🇺🇸</span>
        </div>
        <Keyboard size={20} className="text-gray-500 cursor-pointer hover:text-gray-700" />
        <Bell size={20} className="text-gray-500 cursor-pointer hover:text-gray-700" />
        <Moon size={20} className="text-gray-500 cursor-pointer hover:text-gray-700" />
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 cursor-pointer">
            <div className="w-8 h-8 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-sm">
                P
            </div>
            <span className="text-sm font-medium text-gray-700">priya jha</span>
            <ChevronRight size={16} className="rotate-90 text-gray-400" />
        </div>
      </div>
    </div>
  );
}

// 2. Content Navbar (Hidden on empty state pages)
function ContentNavbar({ sidebarOpen, setActive }) {
  const CONTENT_NAV_HEIGHT = 'h-16';
  const NAVBAR_HEIGHT_PX = '4rem';
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
          onClick={() => setActive('sales-invoice')} 
          className={`flex items-center gap-2 px-4 py-2 text-base font-semibold text-white ${CUSTOM_BLUE} rounded-lg hover:bg-[#111A31] transition-colors duration-200 shadow-md`}
        >
          <Plus size={18} />
          Add Sales
        </button>

        <button 
          onClick={() => setActive('purchase-bills')} 
          className={`flex items-center gap-2 px-4 py-2 text-base font-semibold text-white ${CUSTOM_BLUE} rounded-lg hover:bg-[#111A31] transition-colors duration-200 shadow-md`}
        >
          <Plus size={18} />
          Add Purchase
        </button>
      </div>
    </div>
  );
}

  
// --- MAIN SIDEBAR COMPONENT ---
// FIXED: Removed { active, setActive } from props destructuring
export default function Sidebar() {
  
  // --- STATE MODIFICATIONS ---
  // SET DEFAULT ACTIVE PAGE TO 'payment-out' to match the image
  const [activePage, setActiveState] = useState('payment-out'); 
  
  // FIXED: Renamed setActive to handleSetActive to avoid conflict
  const handleSetActive = (id) => { 
    setActiveState(id);
    // Auto-open dropdown on click
    if (['purchase-bills', 'payment-out', 'purchase-return'].includes(id)) {
        setOpenPurchase(true);
        setOpenSales(false);
    } else if (['sales-invoice', 'payment-in', 'quotation', 'sales-return'].includes(id)) {
        setOpenSales(true);
        setOpenPurchase(false);
    } else {
        setOpenSales(false);
        setOpenPurchase(false);
    }
  };


  // Set Purchase dropdown to open and Sales to closed by default
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

  // Check if current active page is one of the empty state pages
  const isEmptyStatePage = [
      'party', 
      'inventory', 
      'sales-invoice', 
      'payment-in', 
      'quotation',
      'sales-return',
      'purchase-bills',
      'payment-out', // Added for this page
      'purchase-return' // Added for consistency
  ].includes(activePage); 

  return (
    <>
      {/* Top Navbar (Global) */}
      <Navbar sidebarOpen={sidebarOpen} />

      {/* Content Navbar - Hidden on empty state pages */}
      {!isEmptyStatePage && (
          <ContentNavbar sidebarOpen={sidebarOpen} setActive={handleSetActive} /> 
      )}

      {/* Render Pages - Used activePage */}
      {activePage === 'party' && ( <PartiesPage sidebarOpen={sidebarOpen} setActive={handleSetActive} />)}
      {activePage === 'inventory' && <InventoryPage sidebarOpen={sidebarOpen} />}
      {activePage === 'sales-invoice' && <SalesInvoicePage sidebarOpen={sidebarOpen} />}
      {activePage === 'payment-in' && <PaymentInPage sidebarOpen={sidebarOpen} />}
      {activePage === 'quotation' && <QuotationsPage sidebarOpen={sidebarOpen} />}
      {activePage === 'sales-return' && <SalesReturnPage sidebarOpen={sidebarOpen} />}
      {activePage === 'purchase-bills' && <PurchaseBillsPage sidebarOpen={sidebarOpen} />}
      {/* NEW Page rendering for Payment Out */}
      {activePage === 'payment-out' && <PaymentOutPage sidebarOpen={sidebarOpen} />} 
      {activePage === 'purchase-return' && <PurchaseReturnPage sidebarOpen={sidebarOpen} />}
      {activePage === 'import-parties' && <ImportPartiesPage sidebarOpen={sidebarOpen} />}
      {activePage=== 'import-items' && <ImportItemsPage sidebarOpen={sidebarOpen} />}
      {activePage === 'add-party' && (<AddPartyForm sidebarOpen={sidebarOpen} onClose={() => handleSetActive("party")} />)}


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

        {/* User box */}
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
          {/* Used activePage and handleSetActive */}
          <SidebarItem label="Dashboard" icon={<LayoutDashboard size={ICON_SIZE} />} active={activePage} id="dashboard" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Parties" icon={<Users size={ICON_SIZE} />} active={activePage} id="party" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Inventory" icon={<Boxes size={ICON_SIZE} />} active={activePage} id="inventory" setActive={handleSetActive} open={sidebarOpen} />

          {/* Sales Dropdown */}
          <li>
            <Dropdown label="Sales" icon={<Receipt size={ICON_SIZE} />} open={openSales} setOpen={setOpenSales} sidebarOpen={sidebarOpen}>
                <DropItem label="Sales Invoice" id="sales-invoice" active={activePage} setActive={handleSetActive} />
                <DropItem label="Payment In" id="payment-in" active={activePage} setActive={handleSetActive} />
                <DropItem label="Quotation" id="quotation" active={activePage} setActive={handleSetActive} />
                <DropItem label="Sales Return" id="sales-return" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

          {/* Purchase Dropdown */}
          <li>
            <Dropdown label="Purchase" icon={<ShoppingCart size={ICON_SIZE} />} open={openPurchase} setOpen={setOpenPurchase} sidebarOpen={sidebarOpen}>
                <DropItem label="Purchase Bills" id="purchase-bills" active={activePage} setActive={handleSetActive} />
                {/* Payment Out is active and highlighted */}
                <DropItem label="Payment Out" id="payment-out" active={activePage} setActive={handleSetActive} /> 
                <DropItem label="Purchase Return" id="purchase-return" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

          {/* Used activePage and handleSetActive */}
          <SidebarItem label="Expense" icon={<Package size={ICON_SIZE} />} active={activePage} id="expense" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Other Income" icon={<Wallet size={ICON_SIZE} />} active={activePage} id="income" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Manage Accounts" icon={<Building size={ICON_SIZE} />} active={activePage} id="accounts" setActive={handleSetActive} open={sidebarOpen} />
        </ul>

        {/* Management section */}
        {sidebarOpen && <p className="text-gray-500 text-base mt-6 mb-2 font-semibold">Management</p>}
        <ul className="space-y-1">
          {/* Used activePage and handleSetActive */}
          <SidebarItem label="Reports" icon={<BarChart2 size={ICON_SIZE} />} active={activePage} id="reports" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Manage Staffs" icon={<Users2 size={ICON_SIZE} />} active={activePage} id="staffs" setActive={handleSetActive} open={sidebarOpen} />

          <li>
            <Dropdown label="Import Data" icon={<FileUp size={ICON_SIZE} />} open={openImport} setOpen={setOpenImport} sidebarOpen={sidebarOpen}>
              <DropItem label="Import Parties" id="import-parties" active={activePage} setActive={handleSetActive} />
              <DropItem label="Import Items" id="import-items" active={activePage} setActive={handleSetActive} />
            </Dropdown>
          </li>

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

        {/* Others section */}
        {sidebarOpen && <p className="text-gray-500 text-base mt-6 mb-2 font-semibold">Others</p>}
        <ul className="space-y-1">
          {/* Used activePage and handleSetActive */}
          <SidebarItem label="Help & Support" icon={<LifeBuoy size={ICON_SIZE} />} active={activePage} id="help-support" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Tutorials" icon={<BookOpen size={ICON_SIZE} />} active={activePage} id="tutorials" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="What's New" icon={<Sparkles size={ICON_SIZE} />} active={activePage} id="whats-new" setActive={handleSetActive} open={sidebarOpen} />
          <SidebarItem label="Settings" icon={<Settings size={ICON_SIZE} />} active={activePage} id="settings" setActive={handleSetActive} open={sidebarOpen} />
        </ul>
      </div>
    </>
  );
}

// SidebarItem component 
function SidebarItem({ label, icon, active, id, setActive, open }) {
  return (
    <li
      onClick={() => setActive(id)}
      className={`flex items-center gap-3 p-2 cursor-pointer rounded transition-all duration-300 text-lg ${
        active === id ? `${CUSTOM_BLUE} text-white` : `text-gray-700 ${CUSTOM_BLUE_HOVER_BG} hover:text-white`
      }
      ${!open ? 'justify-center' : ''}
      `}
    >
      {icon}
      {open && <span>{label}</span>} 
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
        <ChevronRight size={20} className={`transition-transform ${open ? "rotate-90 text-white" : `text-gray-700`}`} />
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