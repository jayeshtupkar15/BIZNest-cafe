"use client";

import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

type Props = {
  toggleSidebar: () => void;
};

export default function AdminHeader({ toggleSidebar }: Props) {
  const router = useRouter();

  const handleLogout = () => {
    // clear tokens if you have auth system later
    router.push("/login");
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-amber-700 shadow-md p-4 flex justify-between items-center sticky top-0 z-40"
    >
      {/* Left side */}
      <div className="flex items-center gap-3 text-white">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded hover:bg-amber-600 transition"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-lg md:text-xl font-bold tracking-wide">
          ☕ BIZNest Café Admin
        </h1>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-red-500 px-3 py-1.5 rounded-lg text-sm font-medium text-white shadow hover:bg-red-600 transition"
      >
        <LogOut size={18} /> Logout
      </button>
    </motion.header>
  );
}
