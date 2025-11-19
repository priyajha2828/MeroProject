import React from 'react';

// Define Navbar height and transition constants
const NAVBAR_HEIGHT = 'h-30';
const SIDEBAR_EXPANDED_WIDTH_CLASS = 'w-96'; // Matches EXPANDED_WIDTH in Sidebar.js

function Navbar({ sidebarOpen }) {
    return (
        <div 
            className={`fixed top-0 right-0 ${NAVBAR_HEIGHT} bg-white border-b border-gray-200 shadow-sm z-30 transition-all duration-300 flex items-center px-6`}
            style={{ 
                // Dynamically calculate the left offset and width based on sidebar state
                left: sidebarOpen ? SIDEBAR_EXPANDED_WIDTH_CLASS : '0px', 
                width: sidebarOpen ? `calc(100% - ${SIDEBAR_EXPANDED_WIDTH_CLASS})` : '100%'
            }}
        >
            
            {/* Right side content placeholder */}
            <div className="ml-auto flex items-center gap-4">
                <Settings size={20} className="text-gray-500 cursor-pointer hover:text-gray-900" />
                <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
            </div>
        </div>
    );
}

// export default Navbar;