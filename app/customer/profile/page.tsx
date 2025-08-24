"use client";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import { useState } from "react";
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

// Helper functions to get emoji and description based on role
const getRoleEmoji = (role: string) => {
  switch (role) {
    case "customer":
      return "👤";
    case "staff":
      return "👨‍💼";
    case "admin":
      return "👑";
    default:
      return "❓";
  }
};

const getRoleDescription = (role: string) => {
  switch (role) {
    case "customer":
      return "Browse and order delicious coffee.";
    case "staff":
      return "Manage orders and customer requests.";
    case "admin":
      return "Full access to manage the coffee shop.";
    default:
      return "";
  }
};

export default function ProfilePage() {
  const { data: session } = useSession() as { data: CustomSession | null };
  
  if (!session) {
    return (
      <div className="min-h-screen bg-amber-50 flex flex-col items-center justify-center p-6">
        <p className="text-xl text-gray-700 font-semibold mb-4">🚫 You need to login first.</p>
        <Link href="/login" className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200">
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

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-5xl mx-auto mt-24 p-8 grid lg:grid-cols-2 gap-12"
      >
        {/* Profile Details Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="p-8 bg-white/80 rounded-3xl shadow-2xl border border-amber-200 backdrop-blur-md"
        >
          <div className="flex flex-col items-center space-y-6">
            {/* Profile Image/Initials */}
            <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg text-white text-4xl font-extrabold animate-pulse">
              {session.user?.name?.split(" ").map((n) => n[0].toUpperCase()).join("")}
            </div>

            <h2 className="text-3xl font-bold text-gray-800 text-center">
              Welcome, {session.user?.name} ☕
            </h2>
            <p className="text-gray-600 text-sm font-medium">
              Role: <span className="text-amber-600 font-bold">{session.user?.role?.toUpperCase()}</span>
            </p>

            {/* User Info Grid */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="w-full bg-white rounded-2xl shadow-md border border-amber-100 p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Email Address</span>
                  <span className="font-medium text-gray-700">{session.user?.email}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">🧑‍🍳</span>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Account Type</span>
                  <span className="font-medium text-gray-700">{session.user?.role}</span>
                </div>
              </div>
            </motion.div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="mt-6 w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition-all duration-200"
            >
              Logout 🔓
            </motion.button>
          </div>
        </motion.div>

        {/* Signup Form Details with hydration fix */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8"
          suppressHydrationWarning // This line fixes the error
        >
          <h3 className="text-2xl font-bold text-[#3b2b20] mb-6 text-center">
            Sign Up Information
          </h3>
          <div className="space-y-6">
            {/* Name Detail */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                👤 Full Name
              </label>
              <p className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] font-medium">
                {session.user?.name}
              </p>
            </div>

            {/* Email Detail */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                📧 Email Address
              </label>
              <p className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] font-medium">
                {session.user?.email}
              </p>
            </div>

            {/* Role Detail */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                🎭 Account Type
              </label>
              <div className="flex items-center space-x-2 w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] font-medium">
                <span>{session.user?.role && getRoleEmoji(session.user.role)}</span>
                <span>{session.user?.role?.toUpperCase()}</span>
              </div>
              <p className="text-xs text-[#5d4e41] mt-1">
                {session.user?.role && getRoleDescription(session.user.role)}
              </p>
            </div>

            {/* Terms and Privacy Status (as an example) */}
            <div className="flex items-center space-x-3 text-[#5d4e41]">
              <span className="text-sm font-semibold">Terms & Privacy:</span>
              <span className="text-green-600 font-bold">Agreed ✅</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}