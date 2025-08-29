"use client";

import React, { useState } from "react";
import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffHeader from "../../components/staff/StaffHeader";
import Orders from "../../components/staff/OrderTable";
import SalesReport from "../../components/staff/SalesReport";


export default function StaffPage() {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Add state for orders
  const [orders, setOrders] = useState<any[]>([]);

  const renderSection = () => {
    switch (activeSection) {
      case "orders":
        return <Orders orders={orders} setOrders={setOrders} />;
      case "sales":
        return <SalesReport />;
      default:
        return (
          <div className="flex flex-col items-center justify-center text-center h-full space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-600 drop-shadow-sm">
              Welcome to Staff Dashboard
            </h2>
            <p className="text-gray-600 max-w-md">
              Track and manage customer orders, and view daily sales performance.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl">
              <button
                onClick={() => setActiveSection("orders")}
                className="bg-white hover:bg-amber-50 p-6 rounded-2xl shadow-lg border text-lg font-semibold text-amber-700 transition"
              >
                🧾 Manage Orders
              </button>
              <button
                onClick={() => setActiveSection("sales")}
                className="bg-white hover:bg-amber-50 p-6 rounded-2xl shadow-lg border text-lg font-semibold text-amber-700 transition"
              >
                📊 View Sales
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
        <StaffSidebar setActiveSection={setActiveSection} />
      </div>

      {/* Mobile Sidebar (overlay) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black opacity-40"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="relative z-50 w-64">
            <StaffSidebar
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
        <StaffHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Content */}
        <main className="p-4 md:p-8 transition-all duration-300 ease-in-out">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-md p-4 md:p-6 min-h-[80vh]">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}
