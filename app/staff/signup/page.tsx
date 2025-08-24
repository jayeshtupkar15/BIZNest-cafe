"use client";

import { useState } from "react";
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
  Briefcase
} from "lucide-react";

export default function StaffSignupPage() {
  const [form, setForm] = useState({
    name: "", // Changed from fullName to name
    email: "",
    phoneNumber: "",
    password: "",
    designation: "barista",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account.");
      }

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf8f3] via-[#f5f1ec] to-[#ede3d8] flex items-center justify-center p-4">
      <div className="relative w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <CoffeeIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">BIZ</span>
                <span className="ml-1 text-[#3b2b20]">Nest</span>
              </h1>
              <p className="text-amber-600 text-sm font-medium">Cafe</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#3b2b20] mb-2">Staff Sign Up 👨‍💼</h2>
          <p className="text-[#5d4e41] text-lg">Create your account to manage orders</p>
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <UserRoundCheck className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <MailIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <Phone className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={form.phoneNumber}
                onChange={handleChange}
                required
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <LockIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5d4e41] hover:text-[#3b2b20] transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <Briefcase className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Designation
              </label>
              <select
                name="designation"
                value={form.designation}
                onChange={handleChange}
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
              >
                <option value="barista">Barista ☕</option>
                <option value="chef">Chef 🧑‍🍳</option>
                <option value="manager">Manager 👔</option>
                <option value="cashier">Cashier 💰</option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5 text-white" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserRoundCheck className="h-5 w-5" />
                  Sign Up
                </>
              )}
            </button>

            {message && (
              <div className={`text-center text-sm p-3 rounded-lg transition-all duration-200 ${
                message.includes("❌") ? "bg-red-50 text-red-700 border border-red-200" :
                message.includes("✅") ? "bg-green-50 text-green-700 border border-green-200" :
                "bg-amber-50 text-amber-700 border border-amber-200"
              }`}>
                {message}
              </div>
            )}
          </form>

          <p className="text-center mt-8 text-[#5d4e41]">
            Already have an account?{" "}
            <Link href="/staff/login" className="font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              Log in instead
            </Link>
          </p>
        </div>

        <div className="text-center mt-8 text-[#5d4e41] text-sm">
          <p>🔒 Your data is secure with us</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
