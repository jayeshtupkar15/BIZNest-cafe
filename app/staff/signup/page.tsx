"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  CoffeeIcon,
  EyeIcon,
  EyeOffIcon,
  MailIcon,
  LockIcon,
  Loader2Icon,
  UserRoundCheck,
  Phone,
  Briefcase,
  Users,
  Crown,
  User
} from "lucide-react";

export default function StaffSignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    designation: "barista",
  });
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    setShowPassword(false);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Creating your staff account... 👨‍💼");

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "staff" }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create account.");

      setMessage("✅ Staff account created successfully! Redirecting to login...");
      const signInRes = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        role: "staff",
      });
      if (signInRes?.error) {
        setMessage(`❌ An error occurred after signup: ${signInRes.error}`);
      } else {
        setTimeout(() => router.push("/staff"), 1500);
      }
    } catch (error: any) {
      setMessage(`❌ ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getMessageClassName = (message: string) => {
    if (message.includes("❌")) return "bg-red-50/90 text-red-800 border border-red-200";
    if (message.includes("✅")) return "bg-green-50/90 text-green-800 border border-green-200";
    return "bg-amber-50/90 text-amber-800 border border-amber-200";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: `url("https://i.pinimg.com/736x/a6/b7/4f/a6b74f20e9063a9295e614a00b1e626a.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo and Welcome */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <CoffeeIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">BIZ</span>
                <span className="ml-1 text-white">Nest</span>
              </h1>
              <p className="text-amber-300 text-sm font-medium">Cafe</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Staff Sign Up 👨‍💼</h2>
          <p className="text-gray-200 text-lg">Create your account to manage orders</p>
        </div>

        {/* Role Tabs */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-2 mb-6 flex justify-between items-center">
          <Link href="/login" className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:bg-white/20">
            <User className="h-6 w-6 text-gray-300" />
            <span className="text-xs font-semibold mt-1 text-gray-200">Customer</span>
          </Link>
          <Link href="/staff/signup" className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 bg-white/30">
            <Users className="h-6 w-6 text-amber-300" />
            <span className="text-xs font-semibold mt-1 text-white">Staff</span>
          </Link>
          <Link href="/admin/login" className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:bg-white/20">
            <Crown className="h-6 w-6 text-gray-300" />
            <span className="text-xs font-semibold mt-1 text-gray-200">Admin</span>
          </Link>
        </div>

        {/* Signup Form */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <UserRoundCheck className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Full Name
              </label>
              <input type="text" name="name" placeholder="Enter full name" value={form.name} onChange={handleChange} required className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <MailIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Email Address
              </label>
              <input type="email" name="email" placeholder="Enter your email" value={form.email} onChange={handleChange} required className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200" />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <Phone className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Phone Number
              </label>
              <input type="tel" name="phoneNumber" placeholder="Enter your phone" value={form.phoneNumber} onChange={handleChange} required className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200" />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <LockIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Password
              </label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" placeholder="Create a password" value={form.password} onChange={handleChange} required className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-200 hover:text-white transition-colors">
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <Briefcase className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Designation
              </label>
              <select name="designation" value={form.designation} onChange={handleChange} className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200">
                <option value="barista">Barista ☕</option>
                <option value="chef">Chef 🧑‍🍳</option>
                <option value="manager">Manager 👔</option>
                <option value="cashier">Cashier 💰</option>
              </select>
            </div>

            {/* Submit */}
            <button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
              {isLoading ? <>
                <Loader2Icon className="animate-spin h-5 w-5 text-white" /> Creating Account...
              </> : <>
                <UserRoundCheck className="h-5 w-5" /> Sign Up
              </>}
            </button>

            {message && <div className={`text-center text-sm p-3 rounded-lg transition-all duration-200 ${getMessageClassName(message)}`}>{message}</div>}
          </form>

          <div className="text-center mt-8 text-gray-200">
            Already have an account? <Link href="/staff/login" className="font-semibold text-amber-300 hover:text-amber-400">Log in instead</Link>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-200 text-sm">
          <p>🔒 Your data is secure with us</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
