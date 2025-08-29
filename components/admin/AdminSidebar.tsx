"use client";

import React from "react";
import { Coffee, Users, BarChart3, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

type Props = {
  setActiveSection: (section: string) => void;
};

const links = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "menu", label: "Manage Menu", icon: Coffee },
  { key: "staff", label: "Manage Staff", icon: Users },
  { key: "reports", label: "Sales Reports", icon: BarChart3 },
];

export default function AdminSidebar({ setActiveSection }: Props) {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-amber-800 text-white flex flex-col p-6 h-full shadow-lg"
    >
      <h2 className="text-2xl font-extrabold mb-8 tracking-wide">BIZNest Café</h2>

      {links.map((link) => (
        <button
          key={link.key}
          onClick={() => setActiveSection(link.key)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg mb-3 hover:bg-amber-700 transition font-medium"
        >
          <link.icon size={20} /> {link.label}
        </button>
      ))}
    </motion.aside>
  );
}
