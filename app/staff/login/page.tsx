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
  Users
} from "lucide-react";

export default function StaffLoginPage() {
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
        role: "staff", // Make sure role is staff
      });

      if (res?.error) {
        setMessage(`❌ ${res.error}`);
      } else {
        setMessage("✅ Welcome back, Staff!");
        setTimeout(() => {
          router.push("/staff"); // Redirect to staff dashboard
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fcf8f3] via-[#f5f1ec] to-[#ede3d8] p-4">
      <div className="relative w-full max-w-md animate-fade-in">
        {/* Logo & Welcome */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <CoffeeIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                BIZ
              </span>{" "}
              Nest
            </h1>
          </div>
          <h2 className="text-3xl font-bold mb-2">Staff Login 👨‍💼</h2>
          <p className="text-[#5d4e41] text-lg">Sign in to manage orders</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                <MailIcon className="inline-block h-4 w-4 mr-2 align-text-bottom" />
                Email
              </label>
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
                  {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2Icon className="animate-spin h-5 w-5 text-white" />
                  Signing In...
                </>
              ) : (
                <>
                  <LogOutIcon className="h-5 w-5 -scale-x-100" />
                  Sign In as Staff
                </>
              )}
            </button>

            {message && (
              <div
                className={`text-center text-sm p-3 rounded-lg mt-2 ${
                  message.includes("❌")
                    ? "bg-red-50 text-red-700 border border-red-200"
                    : "bg-green-50 text-green-700 border border-green-200"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          <p className="text-center mt-8 text-[#5d4e41]">
            New staff member?{" "}
            <Link href="/staff/signup" className="font-semibold text-amber-600 hover:text-amber-700">
              Create an account ✨
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
