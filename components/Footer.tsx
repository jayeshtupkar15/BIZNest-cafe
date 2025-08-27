import React from "react";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#fff8f0] text-[#5a3e2b] py-12 mt-20 border-t border-amber-200/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* === Top: About the company (centered) === */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h4 className="font-extrabold text-2xl tracking-wide">
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
              BIZ
            </span>
            <span className="ml-1">Nest</span>
            <span className="ml-2 text-amber-500">Cafe ☕</span>
          </h4>
          <p className="text-sm text-[#7a5a40] leading-relaxed">
            Brewing happiness, one cup at a time ✨ <br />
            Your perfect spot for coffee, comfort, and conversations.
          </p>

          {/* Socials */}
          <div className="flex justify-center gap-4 text-[#7a5a40]">
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200"
              aria-label="Instagram"
            >
              <FaInstagram size={20} />
            </a>
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200"
              aria-label="Twitter"
            >
              <FaTwitter size={20} />
            </a>
            <a
              href="#"
              className="hover:text-amber-500 transition-colors duration-200"
              aria-label="Facebook"
            >
              <FaFacebookF size={20} />
            </a>
          </div>
        </div>

        {/* === Middle: Quick Links + Contact === */}
        <div className="mt-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-center md:text-left">
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-amber-500">
                Quick Links
              </h5>
              <ul className="space-y-2 text-[#7a5a40]">
                <li>
                  <a
                    href="/customer"
                    className="hover:text-amber-500 transition-colors duration-200"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/customer/menu"
                    className="hover:text-amber-500 transition-colors duration-200"
                  >
                    Menu
                  </a>
                </li>
                <li>
                  <a
                    href="/customer/orders"
                    className="hover:text-amber-500 transition-colors duration-200"
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href="/customer/profile"
                    className="hover:text-amber-500 transition-colors duration-200"
                  >
                    Profile
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h5 className="text-lg font-semibold mb-3 text-amber-500">
                Contact Us
              </h5>
              <ul className="space-y-3 text-[#7a5a40]">
                <li className="flex justify-center md:justify-start items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0" />
                  <span>123 Coffee Street, Coffee City, USA</span>
                </li>
                <li className="flex justify-center md:justify-start items-start gap-3">
                  <FaPhoneAlt className="mt-1 shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex justify-center md:justify-start items-start gap-3">
                  <FaEnvelope className="mt-1 shrink-0" />
                  <span>contact@biznestcafe.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* === Bottom: Copyright === */}
        <div className="border-t border-amber-200/30 mt-10" />
        <p className="text-center text-xs text-[#7a5a40] mt-4">
          © {new Date().getFullYear()} BIZ Nest Cafe. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
