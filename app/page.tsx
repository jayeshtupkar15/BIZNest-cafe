"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import { FaCoffee, FaCookieBite, FaMugHot } from "react-icons/fa";

// -------------------- Types --------------------
// ✅ UNIFIED: Using the same types as the other pages
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

// ✅ UNIFIED: This is the consistent structure for localStorage
type StoredCartEntry = {
  item: MenuItem;
  quantity: number;
};

// -------------------- Page Component --------------------
export default function CustomerPage() {
  // ✅ CHANGED: State now uses the nested structure to match localStorage
  const [cartItems, setCartItems] = useState<StoredCartEntry[]>([]);

  // ✅ CORRECTED: Loads the cart data directly into the state
  useEffect(() => {
    try {
      const savedCartJSON = localStorage.getItem("cart");
      if (savedCartJSON) {
        setCartItems(JSON.parse(savedCartJSON));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // ✅ CORRECTED: Saves the cart in the correct nested format
  const updateCartAndSave = (updatedCart: StoredCartEntry[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Cappuccino ☕",
      price: 3.99,
      description: "Rich espresso with velvety steamed milk foam",
      category: "Coffee",
      image:
        "http://www.erinnudi.com/wp-content/uploads/2016/03/Cappuccino_at_Sightglass_Coffee.jpg",
    },
    {
      id: 2,
      name: "Latte 🥛",
      price: 4.49,
      description: "Smooth espresso with creamy steamed milk",
      category: "Coffee",
      image:
        "https://midwestniceblog.com/wp-content/uploads/2022/09/homemade-dirty-chai-latte-recipe.jpg",
    },
    {
      id: 3,
      name: "Espresso ⚡",
      price: 2.99,
      description: "Pure, intense shot of premium coffee",
      category: "Coffee",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.cLgUxNF8eljza6H1GqNYlQHaFj?pid=Api&P=0&h=180",
    },
    {
      id: 4,
      name: "Americano 🌊",
      price: 3.29,
      description: "Bold espresso with hot water for a clean taste",
      category: "Coffee",
      image:
        "https://www.foodandwine.com/thmb/9JyfZPcxlV9ubEeuSznhO-M4q0w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Americano-FT-BLOG0523-b8e18cc340574cc9bed536cceeec7082.jpg",
    },
    {
      id: 5,
      name: "Macchiato 🍮",
      price: 3.59,
      description: "Espresso 'marked' with a dollop of foamed milk",
      category: "Coffee",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.3HPqKm-Zf9GkXU8J2kcANQHaE8?pid=Api&P=0&h=180",
    },
    {
      id: 6,
      name: "Mocha 🍫",
      price: 4.99,
      description: "Espresso with chocolate and steamed milk",
      category: "Coffee",
      image:
        "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg",
    },
  ];

  // ✅ CHANGED: Logic now works with the nested { item, quantity } structure
  const handleAddToCart = (itemToAdd: MenuItem) => {
    const existingEntry = cartItems.find(
      (entry) => entry.item.id === itemToAdd.id
    );

    let updatedCart;
    if (existingEntry) {
      updatedCart = cartItems.map((entry) =>
        entry.item.id === itemToAdd.id
          ? { ...entry, quantity: entry.quantity + 1 }
          : entry
      );
    } else {
      updatedCart = [...cartItems, { item: itemToAdd, quantity: 1 }];
    }
    updateCartAndSave(updatedCart);
  };

  // ✅ CHANGED: Logic now works with the nested structure
  const handleIncrementQuantity = (itemId: number) => {
    const updatedCart = cartItems.map((entry) =>
      entry.item.id === itemId
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry
    );
    updateCartAndSave(updatedCart);
  };

  // ✅ CHANGED: Logic now works with the nested structure and removes item correctly
  const handleDecrementQuantity = (itemId: number) => {
    const existingEntry = cartItems.find((entry) => entry.item.id === itemId);
    
    // If item doesn't exist or quantity is already 1, remove it
    if (existingEntry && existingEntry.quantity <= 1) {
      const updatedCart = cartItems.filter((entry) => entry.item.id !== itemId);
      updateCartAndSave(updatedCart);
    } else {
      // Otherwise, just decrement the quantity
      const updatedCart = cartItems.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
      updateCartAndSave(updatedCart);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fffaf6]">
      <Navbar
        // ✅ CORRECTED: Calculation updated for the nested structure
        cartCount={cartItems.reduce((sum, entry) => sum + entry.quantity, 0)}
      />
      <Hero />
      <main className="flex-1 container mx-auto px-4 py-16">
        {/* === Menu Section === */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#5a3e2b]">
            Our Signature Menu 🍵
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-lg text-[#7a5a40] max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium coffee
            beverages, made with the finest beans and expert brewing techniques
            at BIZ Nest Cafe. Enjoy every sip! 🌟
          </p>
        </div>

        {/* Menu Cards - scrollable on mobile */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-6">
            {menuItems.map((item) => {
              // ✅ CORRECTED: Finds the nested entry and extracts quantity
              const cartEntry = cartItems.find(
                (entry) => entry.item.id === item.id
              );
              const quantity = cartEntry ? cartEntry.quantity : 0;
              
              return (
                <div key={item.id} className="flex-shrink-0 w-72">
                  <MenuCard
                    item={item}
                    quantity={quantity}
                    onIncrement={() => handleIncrementQuantity(item.id)}
                    onDecrement={() => handleDecrementQuantity(item.id)}
                    onAdd={() => handleAddToCart(item)}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* === Why Choose Section === */}
        <div className="mt-20 text-center px-4">
          <h3 className="text-3xl font-bold mb-10 text-[#5a3e2b]">
            Why Choose BIZ Nest? ✨
          </h3>

          {/* Mobile: horizontal scroll, Desktop: grid */}
          <div className="block lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 pb-6">
              {/* Card 1 */}
              <div className="flex-shrink-0 w-72 flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
                <FaCoffee size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">
                  Premium Coffee Beans
                </h4>
                <p className="text-gray-600 text-sm text-center">
                  Only the finest beans sourced globally for rich flavor and aroma.
                </p>
              </div>

              {/* Card 2 */}
              <div className="flex-shrink-0 w-72 flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
                <FaMugHot size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">Expert Brewing</h4>
                <p className="text-gray-600 text-sm text-center">
                  Each cup brewed with precision for the perfect taste and aroma.
                </p>
              </div>

              {/* Card 3 */}
              <div className="flex-shrink-0 w-72 flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
                <FaCookieBite size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">Delicious Snacks</h4>
                <p className="text-gray-600 text-sm text-center">
                  Freshly baked treats to perfectly complement your coffee
                  experience.
                </p>
              </div>
            </div>
          </div>

          {/* Desktop view */}
          <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Card 1 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <FaCoffee size={48} className="text-amber-500 mb-3" />
              <h4 className="font-semibold text-lg mb-2">
                Premium Coffee Beans
              </h4>
              <p className="text-gray-600 text-sm text-center">
                Only the finest beans sourced globally for rich flavor and aroma.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <FaMugHot size={48} className="text-amber-500 mb-3" />
              <h4 className="font-semibold text-lg mb-2">Expert Brewing</h4>
              <p className="text-gray-600 text-sm text-center">
                Each cup brewed with precision for the perfect taste and aroma.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md hover:scale-105 transition-transform duration-300">
              <FaCookieBite size={48} className="text-amber-500 mb-3" />
              <h4 className="font-semibold text-lg mb-2">Delicious Snacks</h4>
              <p className="text-gray-600 text-sm text-center">
                Freshly baked treats to perfectly complement your coffee
                experience.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}