"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import { FaCoffee, FaCookieBite, FaMugHot } from "react-icons/fa";

// Define the types for your data
export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

// Define a type for items in the cart, which includes quantity
type CartItem = MenuItem & {
  quantity: number;
};

export default function CustomerPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1. Load cart from localStorage on initial component mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // 2. Function to update state and save to localStorage
  const updateCartAndSave = (updatedCart: CartItem[]) => {
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
      image: "http://www.erinnudi.com/wp-content/uploads/2016/03/Cappuccino_at_Sightglass_Coffee.jpg",
    },
    {
      id: 2,
      name: "Latte 🥛",
      price: 4.49,
      description: "Smooth espresso with creamy steamed milk",
      category: "Coffee",
      image: "https://midwestniceblog.com/wp-content/uploads/2022/09/homemade-dirty-chai-latte-recipe.jpg",
    },
    {
      id: 3,
      name: "Espresso ⚡",
      price: 2.99,
      description: "Pure, intense shot of premium coffee",
      category: "Coffee",
      image: "https://tse4.mm.bing.net/th/id/OIP.cLgUxNF8eljza6H1GqNYlQHaFj?pid=Api&P=0&h=180",
    },
    {
      id: 4,
      name: "Americano 🌊",
      price: 3.29,
      description: "Bold espresso with hot water for a clean taste",
      category: "Coffee",
      image: "https://www.foodandwine.com/thmb/9JyfZPcxlV9ubEeuSznhO-M4q0w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Americano-FT-BLOG0523-b8e18cc340574cc9bed536cceeec7082.jpg",
    },
    {
      id: 5,
      name: "Macchiato 🍮",
      price: 3.59,
      description: "Espresso 'marked' with a dollop of foamed milk",
      category: "Coffee",
      image: "https://tse4.mm.bing.net/th/id/OIP.3HPqKm-Zf9GkXU8J2kcANQHaE8?pid=Api&P=0&h=180",
    },
    {
      id: 6,
      name: "Mocha 🍫",
      price: 4.99,
      description: "Espresso with chocolate and steamed milk",
      category: "Coffee",
      image: "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg",
    },
  ];

  const handleAddToCart = (item: MenuItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    let updatedCart;
    if (existingItem) {
      updatedCart = cartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
    } else {
      updatedCart = [...cartItems, { ...item, quantity: 1 }];
    }
    updateCartAndSave(updatedCart);
  };

  const handleIncrementQuantity = (itemId: number) => {
    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartAndSave(updatedCart);
  };

  const handleDecrementQuantity = (itemId: number) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === itemId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
    updateCartAndSave(updatedCart);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fffaf6]">
      <Navbar cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} />
      <Hero />
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-[#5a3e2b]">
            Our Signature Menu 🍵
          </h2>
          <div className="w-28 h-1 bg-gradient-to-r from-amber-400 to-amber-500 mx-auto mb-4 rounded-full shadow-sm"></div>
          <p className="text-lg text-[#7a5a40] max-w-3xl mx-auto leading-relaxed">
            Discover our carefully crafted selection of premium coffee beverages, made with
            the finest beans and expert brewing techniques at BIZ Nest Cafe. Enjoy every sip! 🌟
          </p>
        </div>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pb-6">
            {menuItems.map((item) => {
              const cartItem = cartItems.find((cart) => cart.id === item.id);
              return (
                <div key={item.id} className="flex-shrink-0 w-72">
                  <MenuCard
                    item={item}
                    quantity={cartItem ? cartItem.quantity : 0}
                    onIncrement={() => handleIncrementQuantity(item.id)}
                    onDecrement={() => handleDecrementQuantity(item.id)}
                    onAdd={() => handleAddToCart(item)}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#5a3e2b]">
            Why Choose BIZ Nest? ✨
          </h3>
          <div className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-8 pb-6 justify-center">
              <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-64 hover:scale-105 transition-transform duration-300">
                <FaCoffee size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">Premium Coffee Beans</h4>
                <p className="text-gray-600 text-sm text-center">
                  Only the finest beans sourced globally for rich flavor and aroma.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-64 hover:scale-105 transition-transform duration-300">
                <FaMugHot size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">Expert Brewing</h4>
                <p className="text-gray-600 text-sm text-center">
                  Each cup brewed with precision for the perfect taste and aroma.
                </p>
              </div>
              <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md w-64 hover:scale-105 transition-transform duration-300">
                <FaCookieBite size={48} className="text-amber-500 mb-3" />
                <h4 className="font-semibold text-lg mb-2">Delicious Snacks</h4>
                <p className="text-gray-600 text-sm text-center">
                  Freshly baked treats to perfectly complement your coffee experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}