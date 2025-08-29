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
  Crown
} from "lucide-react";

export default function AdminLoginPage() {
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
    setMessage("Logging you in... 🔑");

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email,
        password: form.password,
        role: "admin",
      });

      if (res?.error) {
        setMessage(`❌ ${res.error}`);
      } else {
        setMessage("✅ Welcome back, Admin!");
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    } catch (error) {
      setMessage("❌ An unexpected error occurred.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <CoffeeIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">BIZ</span>
              <span className="ml-1 text-white">Nest</span>
            </h1>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Admin Login 👑</h2>
          <p className="text-gray-200 text-lg">Manage your cafe dashboard</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/20 backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
                <MailIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-white mb-2">
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
                  className="w-full bg-white/40 border border-white/30 rounded-xl px-4 py-3 text-black placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-200 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5 text-white" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogOutIcon className="h-5 w-5 -scale-x-100" />
                  Sign In as Admin
                </>
              )}
            </button>

            {/* Status Message */}
            {message && (
              <div
                className={`text-center text-sm p-3 rounded-lg transition-all duration-200 ${
                  message.includes("❌")
                    ? "bg-red-50/90 text-red-800 border border-red-200"
                    : "bg-green-50/90 text-green-800 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-center mt-8 text-gray-200">
            New admin?{" "}
            <Link href="/admin/signup" className="font-semibold text-amber-300 hover:text-amber-400 transition-colors">
              Create account ✨
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-200 text-sm">
          <p>🔒 Your data is secure with us</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
