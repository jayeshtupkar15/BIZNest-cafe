"use client";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import Link from "next/link";
import { Session } from "next-auth";

// Extend the Session type to include the user's role
interface CustomSession extends Session {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string; // Add the 'role' property
  };
}

export default function ProfilePage() {
  const { data: session } = useSession() as { data: CustomSession | null };

  if (!session) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
        <p className="text-xl text-gray-700 font-semibold mb-4">
          🚫 You need to login first.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      <Navbar cartCount={0} />

      {/* Background blobs for a dynamic feel */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brown-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Single Flow Profile Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl mx-auto mt-24 p-6 sm:p-10"
      >
        <div className="p-8 bg-white/80 rounded-3xl shadow-2xl border border-amber-200 backdrop-blur-md space-y-8">
          {/* Profile Image/Initials */}
          <div className="flex flex-col items-center space-y-4">
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg text-white text-4xl font-extrabold animate-pulse">
              {session.user?.name
                ?.split(" ")
                .map((n) => n[0].toUpperCase())
                .join("")}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Welcome, {session.user?.name} ☕
            </h2>
            <p className="text-gray-600 text-sm font-medium text-center">
              {session.user?.email}
            </p>
          </div>

          {/* User Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-md border border-amber-100 p-6 space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-1">
                👤 Full Name
              </label>
              <p className="w-full bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-[#3b2b20] font-medium">
                {session.user?.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-1">
                📧 Email Address
              </label>
              <p className="w-full bg-amber-50 border border-amber-100 rounded-xl px-4 py-2 text-[#3b2b20] font-medium">
                {session.user?.email}
              </p>
            </div>

            {/* Terms Status */}
            <div className="flex items-center space-x-3 text-[#5d4e41]">
              <span className="text-sm font-semibold">Terms & Privacy:</span>
              <span className="text-green-600 font-bold">Agreed ✅</span>
            </div>
          </motion.div>

          {/* Logout Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200"
          >
            Logout 🔓
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
