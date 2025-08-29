"use client";
import { FaBars } from "react-icons/fa";

export default function StaffHeader({
  toggleSidebar,
}: {
  toggleSidebar: () => void;
}) {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <button
        onClick={toggleSidebar}
        className="md:hidden text-[#5a3e2b] text-2xl"
      >
        <FaBars />
      </button>
      <h1 className="text-xl font-bold text-[#5a3e2b]">☕ Staff Dashboard</h1>
    </header>
  );
}
