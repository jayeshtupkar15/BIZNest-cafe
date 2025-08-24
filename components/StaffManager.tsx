"use client";
import { motion } from "framer-motion";
import { useState } from "react";

interface StaffMember {
  id: number;
  name: string;
  role: string;
}

export default function StaffManager() {
  const [staff, setStaff] = useState<StaffMember[]>([
    { id: 1, name: "Jane Doe", role: "staff" },
    { id: 2, name: "John Smith", role: "staff" },
    { id: 3, name: "Admin User", role: "admin" },
  ]);

  const handleDelete = (id: number) => {
    setStaff(staff.filter(member => member.id !== id));
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100">
      <h2 className="text-2xl font-semibold text-[#3b2b20] mb-4">Staff Management</h2>
      <ul className="space-y-3 max-h-64 overflow-y-auto">
        {staff.map((member) => (
          <li key={member.id} className="flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-100">
            <span>{member.name} - <span className="text-sm font-semibold text-amber-600">{member.role.toUpperCase()}</span></span>
            <button onClick={() => handleDelete(member.id)} className="text-red-500 hover:text-red-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </li>
        ))}
      </ul>
      <button className="mt-4 w-full bg-amber-500 text-white font-bold py-3 rounded-xl hover:bg-amber-600 transition-colors">
        Add New Staff
      </button>
    </div>
  );
}