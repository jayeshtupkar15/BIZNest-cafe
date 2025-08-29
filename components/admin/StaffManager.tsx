"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Briefcase, Trash2 } from "lucide-react";

interface StaffMember {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  designation: string;
  role: string;
  createdAt?: string;
}

export default function StaffManager() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch staff from backend
  const fetchStaff = async () => {
    try {
      const res = await fetch("/api/staff");
      if (!res.ok) throw new Error("Failed to fetch staff");
      const data = await res.json();
      setStaff(data);
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Delete staff member
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch("/api/staff", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!res.ok) throw new Error("Failed to delete staff");

      setStaff(staff.filter((member) => member._id !== id));
    } catch (error) {
      console.error("Error deleting staff:", error);
    }
  };

  if (loading) return <p className="text-center">Loading staff...</p>;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100">
      <h2 className="text-2xl font-semibold text-[#3b2b20] mb-6">
        Staff Management 👨‍🍳
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-2">
        {staff.length === 0 ? (
          <p className="text-center text-gray-500 col-span-2">
            No staff members found.
          </p>
        ) : (
          staff.map((member) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-amber-50 rounded-2xl p-5 shadow-md border border-amber-100 relative"
            >
              {/* Avatar */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-amber-200 flex items-center justify-center text-xl font-bold text-[#3b2b20]">
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#3b2b20]">
                    {member.name}
                  </h3>
                  <p className="text-sm text-amber-600 font-medium capitalize">
                    {member.designation}
                  </p>
                </div>
              </div>

              {/* Details */}
              <div className="space-y-2 text-sm text-[#3b2b20]">
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-amber-600" /> {member.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-amber-600" /> {member.phoneNumber}
                </p>
                <p className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-amber-600" />{" "}
                  {member.role?.toUpperCase() || "STAFF"}
                </p>
                <p className="text-xs text-[#5d4e41]">
                  Joined on:{" "}
                  {member.createdAt
                    ? new Date(member.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(member._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
