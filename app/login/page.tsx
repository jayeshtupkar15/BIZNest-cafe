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
  LogOutIcon,
  User,
  Users,
  Crown,
} from "lucide-react";

export default function CustomerLoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("Brewing your login... ☕");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        role: "customer", // This page is exclusively for customer login
      });

      if (res?.error) {
        setMessage(`❌ ${res.error}`);
      } else {
        setMessage("✅ Welcome back to BIZ Nest Cafe!");
        setTimeout(() => {
          router.push("/"); // Redirect to the default customer landing page
        }, 1000);
      }
    } catch (error) {
      setMessage(`❌ An unexpected error occurred.`);
      console.error("Login Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf8f3] via-[#f5f1ec] to-[#ede3d8] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b4513' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo and Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <CoffeeIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  BIZ
                </span>
                <span className="ml-1 text-[#3b2b20]">Nest</span>
              </h1>
              <p className="text-amber-600 text-sm font-medium">Cafe</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#3b2b20] mb-2">
            Welcome Back! ☕
          </h2>
          <p className="text-[#5d4e41] text-lg">
            Sign in to your account and enjoy our delicious menu
          </p>
        </div>

        {/* Role Selection Links */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-2 mb-6 flex justify-between items-center">
          <Link
            href="/login"
            className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 bg-white shadow"
          >
            <User className="h-6 w-6 text-amber-600" />
            <span className="text-xs font-semibold mt-1 text-amber-600">
              Customer
            </span>
          </Link>

          <Link
            href="/staff/login"
            className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
          >
            <Users className="h-6 w-6 text-gray-400" />
            <span className="text-xs font-semibold mt-1 text-gray-500">
              Staff
            </span>
          </Link>

          <Link
            href="/admin/login"
            className="flex-1 flex flex-col items-center p-2 rounded-lg transition-all duration-300 hover:bg-gray-200"
          >
            <Crown className="h-6 w-6 text-gray-400" />
            <span className="text-xs font-semibold mt-1 text-gray-500">
              Admin
            </span>
          </Link>
        </div>

        <p className="text-center text-[#5d4e41] mb-6">
          👤 Access the menu and place new orders.
        </p>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <MailIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <LockIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5d4e41] hover:text-[#3b2b20] transition-colors"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5 text-white" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogOutIcon className="h-5 w-5 -scale-x-100" />
                  Sign In as Customer
                </>
              )}
            </button>

            {/* Status Message */}
            {message && (
              <div
                className={`text-center text-sm p-3 rounded-lg transition-all duration-200 ${
                  message.includes("❌")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : message.includes("✅")
                    ? "bg-green-50 text-green-700 border border-green-200"
                    : "bg-amber-50 text-amber-700 border border-amber-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Conditional Sign Up Link */}
          <div className="text-center mt-8 text-[#5d4e41]">
            <p>
              New to BIZ Nest Cafe?{" "}
              <Link
                href="/signup"
                className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
              >
                Create an account ✨
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#5d4e41] text-sm">
          <p>🔒 Your data is secure with us</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
