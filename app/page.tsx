"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuPage/MenuCard";
import Footer from "../components/Footer";
import { FaCoffee, FaCookieBite, FaMugHot } from "react-icons/fa";
import { MenuItem } from "./data/menuItems"; // shared type

// -------------------- Types --------------------
type StoredCartEntry = {
  item: MenuItem;
  quantity: number;
};

// -------------------- Page Component --------------------
export default function CustomerPage() {
  const [cartItems, setCartItems] = useState<StoredCartEntry[]>([]);

  // ✅ Load cart from localStorage when page mounts
  useEffect(() => {
    try {
      const savedCartJSON = localStorage.getItem("cart");
      if (savedCartJSON) {
        setCartItems(JSON.parse(savedCartJSON));
      }
    } catch (error) {
      console.error("❌ Failed to parse cart from localStorage", error);
    }
  }, []);

  // ✅ Helper to update both state + localStorage
  const updateCartAndSave = (updatedCart: StoredCartEntry[]) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // -------------------- Menu Items --------------------
  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Cappuccino ☕",
      price: 3.99,
      description: "Rich espresso with velvety steamed milk foam",
      category: "Coffee",
      image:
        "http://www.erinnudi.com/wp-content/uploads/2016/03/Cappuccino_at_Sightglass_Coffee.jpg",
      calories: 80,
      ingredients: ["Espresso", "Steamed Milk", "Foam"],
      allergens: ["milk"],
      dietary: ["vegetarian"],
    },
    {
      id: 2,
      name: "Latte 🥛",
      price: 4.49,
      description: "Smooth espresso with creamy steamed milk",
      category: "Coffee",
      image:
        "https://midwestniceblog.com/wp-content/uploads/2022/09/homemade-dirty-chai-latte-recipe.jpg",
      calories: 120,
      ingredients: ["Espresso", "Steamed Milk"],
      allergens: ["milk"],
      dietary: ["vegetarian"],
    },
    {
      id: 3,
      name: "Espresso ⚡",
      price: 2.99,
      description: "Pure, intense shot of premium coffee",
      category: "Coffee",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.cLgUxNF8eljza6H1GqNYlQHaFj?pid=Api&P=0&h=180",
      calories: 5,
      ingredients: ["Espresso"],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 4,
      name: "Americano 🌊",
      price: 3.29,
      description: "Bold espresso with hot water for a clean taste",
      category: "Coffee",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/4/45/A_small_cup_of_coffee.JPG",
      calories: 10,
      ingredients: ["Espresso", "Hot Water"],
      allergens: [],
      dietary: ["vegan", "vegetarian", "gluten-free"],
    },
    {
      id: 5,
      name: "Macchiato 🍮",
      price: 3.59,
      description: "Espresso 'marked' with a dollop of foamed milk",
      category: "Coffee",
      image:
        "https://tse4.mm.bing.net/th/id/OIP.3HPqKm-Zf9GkXU8J2kcANQHaE8?pid=Api&P=0&h=180",
      calories: 35,
      ingredients: ["Espresso", "Foamed Milk"],
      allergens: ["milk"],
      dietary: ["vegetarian"],
    },
    {
      id: 6,
      name: "Mocha 🍫",
      price: 4.99,
      description: "Espresso with chocolate and steamed milk",
      category: "Coffee",
      image:
        "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg",
      calories: 180,
      ingredients: ["Espresso", "Chocolate", "Steamed Milk"],
      allergens: ["milk"],
      dietary: ["vegetarian"],
    },
  ];

  // -------------------- Cart Logic --------------------
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

  const handleIncrementQuantity = (itemId: number) => {
    const updatedCart = cartItems.map((entry) =>
      entry.item.id === itemId
        ? { ...entry, quantity: entry.quantity + 1 }
        : entry
    );
    updateCartAndSave(updatedCart);
  };

  const handleDecrementQuantity = (itemId: number) => {
    const existingEntry = cartItems.find((entry) => entry.item.id === itemId);

    if (existingEntry && existingEntry.quantity <= 1) {
      const updatedCart = cartItems.filter((entry) => entry.item.id !== itemId);
      updateCartAndSave(updatedCart);
    } else {
      const updatedCart = cartItems.map((entry) =>
        entry.item.id === itemId
          ? { ...entry, quantity: entry.quantity - 1 }
          : entry
      );
      updateCartAndSave(updatedCart);
    }
  };

  // -------------------- Render --------------------
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fffaf6]">
      <Navbar
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
            Discover our carefully crafted selection of premium coffee beverages,
            made with the finest beans and expert brewing techniques at BIZ Nest
            Cafe. Enjoy every sip! 🌟
          </p>
        </div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-6">
            {menuItems.map((item) => {
              const cartEntry = cartItems.find(
                (entry) => entry.item.id === item.id
              );
              const quantity = cartEntry ? cartEntry.quantity : 0;

              return (
                <div key={item.id} className="flex-shrink-0 w-72">
                  <MenuCard
                    item={item}
                    quantity={quantity}
                    onAdd={() => handleAddToCart(item)}
                    onRemove={() => handleDecrementQuantity(item.id)} // ✅ FIXED
                    onOpenModal={() => {}}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* === Why Choose Section === */}
        {/* (unchanged) */}
      </main>

      <Footer />
    </div>
  );
}
