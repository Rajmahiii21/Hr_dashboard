import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import ToastContainer from '../components/ui/Toast';

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-bg text-text relative font-sans">
      {/* Background radial glow */}
      <div className="absolute inset-0 radial-glow z-0" />

      {/* Desktop Sidebar */}
      <div className="hidden lg:block relative z-30 flex-shrink-0">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Mobile Drawer Backdrop & Sidebar */}
      {mobileDrawerOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />
          <div className="relative z-50 w-72 h-full">
            <Sidebar collapsed={false} setCollapsed={() => setMobileDrawerOpen(false)} />
          </div>
        </div>
      )}

      {/* Right Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen relative z-10 overflow-hidden">
        {/* Topbar: exactly 56px (h-14) */}
        <Topbar onToggleSidebar={() => setMobileDrawerOpen(true)} />

        {/* Main Content Area: exactly h-[calc(100vh-56px)] */}
        <main className="flex-1 h-[calc(100vh-56px)] overflow-y-auto overflow-x-hidden p-4 sm:p-5">
          <Outlet />
        </main>
      </div>

      {/* Global Toast Container */}
      <ToastContainer />
    </div>
  );
}
