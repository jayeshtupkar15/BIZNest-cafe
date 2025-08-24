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
    role: "customer",
  });

  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage(""); // Clear message when user starts typing
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
        
        // Auto login after signup
        await signIn("credentials", {
          redirect: false,
          email: form.email,
          password: form.password,
        });

        setTimeout(() => {
          // Redirect to the correct URL path based on the selected role
          switch (form.role) {
            case "admin":
              router.push("/admin");
              break;
            case "staff":
              router.push("/staff");
              break;
            case "customer":
            default:
              router.push("/");
              break;
          }
        }, 1500);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      setMessage("❌ An unexpected error occurred.");
    }
  };

  const getRoleEmoji = (role: string) => {
    switch (role) {
      case "customer": return "👤";
      case "staff": return "👨‍💼";
      case "admin": return "👑";
      default: return "👤";
    }
  };

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "customer": return "Browse menu, place orders, track deliveries";
      case "staff": return "Manage orders, handle customer requests";
      case "admin": return "Full system access, manage users and settings";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fcf8f3] via-[#f5f1ec] to-[#ede3d8] flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%238b4513' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-lg">
        {/* Logo and Welcome Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-white"
              >
                <path d="M17 8h1a4 4 0 1 1 0 8h-1"/>
                <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/>
                <line x1="6" x2="6" y1="2" y2="4"/>
                <line x1="10" x2="10" y1="2" y2="4"/>
                <line x1="14" x2="14" y1="2" y2="4"/>
              </svg>
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">BIZ</span>
                <span className="ml-1 text-[#3b2b20]">Nest</span>
              </h1>
              <p className="text-amber-600 text-sm font-medium">Cafe</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold text-[#3b2b20] mb-2">Join Our Family! 🎉</h2>
          <p className="text-[#5d4e41] text-lg">Create your account and start your coffee journey with us</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                👤 Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                📧 Email Address
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

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                🔒 Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a strong password"
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
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="text-xs text-[#5d4e41] mt-1">At least 6 characters</p>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                🔐 Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] placeholder-[#5d4e41]/60 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#5d4e41] hover:text-[#3b2b20] transition-colors"
                >
                  {showConfirmPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-[#3b2b20] mb-2">
                🎭 Account Type
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full bg-white/50 border border-white/30 rounded-xl px-4 py-3 text-[#3b2b20] focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-200"
              >
                <option value="customer">👤 Customer</option>
                <option value="staff">👨‍💼 Staff Member</option>
                <option value="admin">👑 Administrator</option>
              </select>
              <p className="text-xs text-[#5d4e41] mt-1 flex items-center gap-1">
                <span>{getRoleEmoji(form.role)}</span>
                {getRoleDescription(form.role)}
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-1 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <label htmlFor="terms" className="text-sm text-[#5d4e41]">
                I agree to the{" "}
                <Link href="/terms" className="text-amber-600 hover:text-amber-700 font-medium">
                  Terms of Service
                </Link>
                {" "}and{" "}
                <Link href="/privacy" className="text-amber-600 hover:text-amber-700 font-medium">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </>
              ) : (
                <>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Create My Account
                </>
              )}
            </button>

            {/* Status Message */}
            {message && (
              <div className={`text-center text-sm p-3 rounded-lg transition-all duration-200 ${
                message.includes("❌") 
                  ? "bg-red-50 text-red-700 border border-red-200" 
                  : message.includes("✅")
                  ? "bg-green-50 text-green-700 border border-green-200"
                  : "bg-amber-50 text-amber-700 border border-amber-200"
              }`}>
                {message}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#5d4e41]/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/70 text-[#5d4e41]">or sign up with</span>
            </div>
          </div>

          {/* Social Signup Options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
  type="button"
  onClick={() =>
    signIn("google", { callbackUrl: "http://localhost:3000/" })
  }
  className="flex items-center justify-center gap-2 p-3 bg-white/50 border border-white/30 rounded-xl hover:bg-white/70 transition-all duration-200"
>
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
  Google
</button>
            
          </div>

          {/* Login Link */}
          <p className="text-center text-[#5d4e41]">
            Already have an account? {" "}
            <Link href="/login" className="font-semibold text-amber-600 hover:text-amber-700 transition-colors">
              Sign in here 🔑
            </Link>
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-[#5d4e41] text-sm">
          <p>🔒 Your privacy is our priority</p>
          <p className="mt-2">© 2024 BIZ Nest Cafe. All rights reserved.</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}