"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  };

  const validateForm = () => {
    if (form.password.length < 6) {
      setMessage("❌ Password must be at least 6 characters long");
      return false;
    }
    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return false;
    }
    if (!agreedToTerms) {
      setMessage("❌ Please agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("Creating your BIZ Nest account... ☕");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setMessage("✅ Account created! Signing you in...");
        await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });
        router.push("/");
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("❌ An unexpected error occurred.");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center p-4 relative"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/a6/b7/4f/a6b74f20e9063a9295e614a00b1e626a.jpg')",
      }}
    >
      {/* Overlay to improve contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

      <div className="relative w-full max-w-lg animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl">☕</span>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-black">
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                  BIZ
                </span>
                <span className="ml-1">Nest</span>
              </h1>
              <p className="text-amber-700 text-sm font-medium">Cafe</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow">
            Join Our Family! 🎉
          </h2>
          <p className="text-gray-100 text-lg">
            Create your account and start your coffee journey
          </p>
        </div>

        {/* Glassmorphism Card */}
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40 p-8">
  <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                👤 Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                📧 Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-white/70 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-white/70 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-700"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold text-black mb-2">
                🔐 Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/70 border border-gray-300 rounded-xl px-4 py-3 text-black placeholder-gray-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-700"
                >
                  {showConfirmPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="text-sm text-black">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Terms
                </Link>{" "}
                &{" "}
                <Link
                  href="/privacy"
                  className="text-amber-600 hover:text-amber-700 font-medium"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isLoading ? "⏳ Creating Account..." : "✨ Create My Account"}
            </button>

            {/* Status */}
            {message && (
              <div
                className={`text-center text-sm p-3 rounded-lg ${
                  message.includes("❌")
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {message}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-black">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-in */}
          <button
            type="button"
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center gap-3 py-3 bg-white border border-gray-300 rounded-xl shadow-md hover:bg-gray-50 transition-all"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5.3c1.6 0 3 .6 4.1 1.7l3-3A9.8 9.8 0 0 0 12 2a10 10 0 0 0-9.5 6.5l3.6 2.8C7.6 7.4 9.6 5.3 12 5.3z"
              />
              <path
                fill="#34A853"
                d="M23 12c0-.7-.1-1.4-.2-2H12v4.2h6.3a5.4 5.4 0 0 1-2.3 3.6l3.6 2.8C21.4 18.6 23 15.6 23 12z"
              />
              <path
                fill="#4285F4"
                d="M12 23c2.7 0 5-1 6.6-2.8l-3.6-2.8c-.9.6-2 .9-3 .9-2.5 0-4.7-1.7-5.5-4.1H2v2.6A10 10 0 0 0 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M6.5 14.2A5.9 5.9 0 0 1 6.2 12c0-.7.1-1.4.3-2.2V7.2H2A10 10 0 0 0 2 17l4.5-2.8z"
              />
            </svg>
            <span className="font-semibold text-gray-700">
              Continue with Google
            </span>
          </button>

          {/* Login Redirect */}
          <p className="text-center text-black mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-amber-600 hover:text-amber-700"
            >
              Sign in here 🔑
            </Link>
          </p>
        </div>

        <div className="text-center mt-8 text-white text-sm drop-shadow">
          <p>🔒 Your privacy is our priority</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
