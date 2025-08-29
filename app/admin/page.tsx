"use client";

import React, { useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";
import MenuManager from "../../components/admin/MenuManager";
import StaffManager from "../../components/admin/StaffManager";
import SalesReports from "../../components/admin/SalesReports";

export default function AdminPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderSection = () => {
    switch (activeSection) {
      case "menu":
        return <MenuManager />;
      case "staff":
        return <StaffManager />;
      case "reports":
        return <SalesReports />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 drop-shadow-sm">
              Welcome to Admin Dashboard
            </h2>
            <p className="text-gray-600 max-w-md">
              Manage your menu, staff, and track sales with a clean and intuitive interface.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl">
              <button
                onClick={() => setActiveSection("menu")}
                className="bg-white hover:bg-amber-50 p-6 rounded-2xl shadow-lg border text-lg font-semibold text-amber-700 transition"
              >
                🍔 Manage Menu
              </button>
              <button
                onClick={() => setActiveSection("staff")}
                className="bg-white hover:bg-amber-50 p-6 rounded-2xl shadow-lg border text-lg font-semibold text-amber-700 transition"
              >
                👥 Manage Staff
              </button>
              <button
                onClick={() => setActiveSection("reports")}
                className="bg-white hover:bg-amber-50 p-6 rounded-2xl shadow-lg border text-lg font-semibold text-amber-700 transition"
              >
                📊 View Reports
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-100 to-amber-50 overflow-hidden">
      {/* Sidebar for desktop */}
      <div className="hidden md:flex">
        <AdminSidebar setActiveSection={setActiveSection} />
      </div>

      {/* Mobile Sidebar (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative z-50 w-64">
            <AdminSidebar
              setActiveSection={(section) => {
                setActiveSection(section);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <AdminHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Animated Section Transition */}
        <main className="p-4 md:p-8 transition-all duration-300 ease-in-out">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-4 md:p-6 min-h-[80vh]">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
