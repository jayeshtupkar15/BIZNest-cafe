"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Coffee, ShoppingBag, Menu, X } from "lucide-react";

export default function Navbar({ cartCount }: { cartCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();

  const [isClient, setIsClient] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => setIsClient(true), []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/customer/menu" },
    { name: "Orders", path: "/customer/orders" },
  ];

  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 py-4 backdrop-blur-sm bg-white/80 shadow-md border-b border-amber-200">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <Link
            href="/"
            className="font-bold text-xl tracking-wider hover:text-amber-500 transition-colors duration-200"
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent font-extrabold">
              BIZ
            </span>
            <span className="ml-1 text-gray-800">Nest</span>
            <span className="ml-2 text-amber-400 text-sm font-medium">Cafe</span>
          </Link>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-6 uppercase text-sm font-medium text-gray-700">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`relative px-3 py-2 rounded-lg hover:text-amber-500 transition-all duration-200 hover:bg-amber-50 ${
                  isClient && pathname === link.path
                    ? "font-extrabold text-amber-500 bg-amber-50"
                    : ""
                }`}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>

          {/* Profile / Login */}
          {isClient && session?.user ? (
            <button
              onClick={() => router.push("/customer/profile")}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full hover:bg-amber-50 transition-all duration-200"
            >
              <div className="w-8 h-8 bg-amber-400 text-white font-bold rounded-full flex items-center justify-center">
                {getInitials(session.user.name)}
              </div>
              <span className="text-gray-700 font-medium hidden sm:inline">
                Profile
              </span>
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="hidden sm:block px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all duration-200 shadow-md"
            >
              Login
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-amber-100"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 border-t border-amber-200 shadow-md">
          <ul className="flex flex-col p-4 space-y-3">
            {links.map((link) => (
              <li key={link.path}>
                <Link
                  href={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2 rounded-md ${
                    pathname === link.path
                      ? "font-bold text-amber-500 bg-amber-50"
                      : "text-gray-700 hover:text-amber-500 hover:bg-amber-50"
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            {/* Mobile Profile/Login */}
            {session?.user ? (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/customer/profile");
                }}
                className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-amber-500 hover:bg-amber-50"
              >
                Profile
              </button>
            ) : (
              <button
                onClick={() => {
                  setMobileOpen(false);
                  router.push("/login");
                }}
                className="w-full text-left px-3 py-2 rounded-md text-gray-700 hover:text-amber-500 hover:bg-amber-50"
              >
                Login
              </button>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}
