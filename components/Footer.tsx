import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#fff8f0] text-[#5a3e2b] py-12 mt-20 border-t border-amber-200/30">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand & Tagline */}
        <div className="space-y-4">
          <h4 className="font-extrabold text-xl tracking-wide">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              BIZ
            </span>
            <span className="ml-1">Nest</span>
            <span className="ml-2 text-amber-500">Cafe ☕</span>
          </h4>
          <p className="text-sm text-[#7a5a40] max-w-sm">
            Brewing happiness, one cup at a time ✨ <br />
            Your perfect spot for coffee, comfort, and conversations.
          </p>
          {/* Social Media Icons */}
          <div className="flex justify-center md:justify-start gap-4 text-[#7a5a40] mt-2">
            <a href="#" className="hover:text-amber-500 transition-colors duration-200">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-200">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-amber-500 transition-colors duration-200">
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2">
          <h5 className="text-lg font-semibold mb-2 text-amber-500">Quick Links</h5>
          <ul className="space-y-1 text-[#7a5a40]">
            <li>
              <a href="/customer" className="hover:text-amber-500 transition-colors duration-200">
                Home
              </a>
            </li>
            <li>
              <a href="/customer/menu" className="hover:text-amber-500 transition-colors duration-200">
                Menu
              </a>
            </li>
            <li>
              <a href="/customer/orders" className="hover:text-amber-500 transition-colors duration-200">
                Orders
              </a>
            </li>
            <li>
              <a href="/customer/profile" className="hover:text-amber-500 transition-colors duration-200">
                Profile
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Details */}
        <div className="space-y-2">
          <h5 className="text-lg font-semibold mb-2 text-amber-500">Contact Us</h5>
          <p className="text-[#7a5a40]">📍 123 Coffee Street, Coffee City, USA</p>
          <p className="text-[#7a5a40]">📞 +1 (555) 123-4567</p>
          <p className="text-[#7a5a40]">✉️ contact@biznestcafe.com</p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-amber-200/30 mt-8"></div>

      {/* Copyright */}
      <p className="text-center text-xs text-[#7a5a40] mt-4">
        © {new Date().getFullYear()} BIZ Nest Cafe. All rights reserved.
      </p>
    </footer>
  );
}
