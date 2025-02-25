import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SidebarComponent from './Sidebar';

const Layout = () => {
    const location = useLocation();

    // Check if the current route is "/"
    const isHomePage = location.pathname === '/';

    return (
        <div className="flex">
            {/* Conditionally render SidebarComponent */}
            {!isHomePage && <SidebarComponent />}
            {/* Main Content */}
            <div className="flex-1 min-h-screen bg-gray-100">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
