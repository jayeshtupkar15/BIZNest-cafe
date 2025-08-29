"use client";
import Link from "next/link";
import { FaCoffee, FaChartBar, FaClipboardList } from "react-icons/fa";

export default function StaffSidebar({
  setActiveSection,
}: {
  setActiveSection: (section: string) => void;
}) {
  return (
    <aside className="w-64 bg-[#5a3e2b] text-white h-full shadow-lg flex flex-col">
      <div className="flex items-center justify-center h-20 bg-[#4a2f22] font-bold text-xl">
        <FaCoffee className="mr-2 text-amber-400" /> Staff Panel
      </div>
      <nav className="flex-1 p-4 space-y-3">
        <button
          onClick={() => setActiveSection("dashboard")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-amber-600"
        >
          🏠 Dashboard
        </button>
        <button
          onClick={() => setActiveSection("orders")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-amber-600"
        >
          <FaClipboardList className="inline mr-2" /> Orders
        </button>
        <button
          onClick={() => setActiveSection("sales")}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-amber-600"
        >
          <FaChartBar className="inline mr-2" /> Sales Report
        </button>
      </nav>
    </aside>
  );
}
