"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Coffee, ShoppingBag } from "lucide-react";

/**
 * Navbar component for customer-facing pages.
 * It dynamically displays navigation links, a profile icon, or a login button
 * based on the user's authentication status.
 *
 * @returns React.ReactNode
 */
export default function Navbar({ cartCount }: { cartCount: number }) {
  // Get Next.js router and current path for navigation
  const router = useRouter();
  const pathname = usePathname();
  
  // State to ensure client-side rendering is ready before using hooks
  // This helps prevent hydration mismatches
  const [isClient, setIsClient] = useState(false);
  
  // Fetch the user session to determine login status
  const { data: session } = useSession();

  // Set isClient to true once the component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Define navigation links
  const links = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/customer/menu" },
    { name: "Orders", path: "/customer/orders" },
  ];

  /**
   * Helper function to get user initials for the profile button.
   * @param name The user's full name.
   * @returns The initials as a string.
   */
  const getInitials = (name: string | undefined | null) => {
    if (!name) return "U"; // Default initial for an unknown user
    const names = name.split(" ");
    return names.map((n) => n[0].toUpperCase()).join("");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 py-4 backdrop-blur-sm bg-white/80 shadow-md border-b border-amber-200">
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
            {/* Using a Lucide icon for consistency */}
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

        {/* Right Side - Links + Profile */}
        <div className="flex items-center gap-6">
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

          {/* Profile / Login Button */}
          {isClient && session?.user ? (
            <button
              onClick={() => router.push("/customer/profile")}
              className="flex items-center gap-2 px-3 py-2 rounded-full hover:bg-amber-50 transition-all duration-200"
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
              className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-semibold transition-all duration-200 shadow-md"
            >
              Login
            </button>
          )}

          {/* Shopping Cart Icon */}
          <div className="relative">
            <ShoppingBag className="w-6 h-6 text-gray-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
