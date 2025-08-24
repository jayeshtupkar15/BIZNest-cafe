"use client";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import MenuCard from "../components/MenuCard";
import Footer from "../components/Footer";
import { FaCoffee, FaCookieBite, FaMugHot } from "react-icons/fa";

export default function CustomerPage() {
  const menuItems = [
    {
      key: "cappuccino",
      title: "Cappuccino ☕",
      price: "$3.99",
      description: "Rich espresso with velvety steamed milk foam",
      image: "http://www.erinnudi.com/wp-content/uploads/2016/03/Cappuccino_at_Sightglass_Coffee.jpg",
    },
    {
      key: "latte",
      title: "Latte 🥛",
      price: "$4.49",
      description: "Smooth espresso with creamy steamed milk",
      image: "https://midwestniceblog.com/wp-content/uploads/2022/09/homemade-dirty-chai-latte-recipe.jpg",
    },
    {
      key: "espresso",
      title: "Espresso ⚡",
      price: "$2.99",
      description: "Pure, intense shot of premium coffee",
      image: "https://tse4.mm.bing.net/th/id/OIP.cLgUxNF8eljza6H1GqNYlQHaFj?pid=Api&P=0&h=180",
    },
    {
      key: "americano",
      title: "Americano 🌊",
      price: "$3.29",
      description: "Bold espresso with hot water for a clean taste",
      image: "https://www.foodandwine.com/thmb/9JyfZPcxlV9ubEeuSznhO-M4q0w=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Partners-Americano-FT-BLOG0523-b8e18cc340574cc9bed536cceeec7082.jpg",
    },
    {
      key: "macchiato",
      title: "Macchiato 🍮",
      price: "$3.59",
      description: "Espresso 'marked' with a dollop of foamed milk",
      image: "https://tse4.mm.bing.net/th/id/OIP.3HPqKm-Zf9GkXU8J2kcANQHaE8?pid=Api&P=0&h=180",
    },
    {
      key: "mocha",
      title: "Mocha 🍫",
      price: "$4.99",
      description: "Espresso with chocolate and steamed milk",
      image: "https://gatherforbread.com/wp-content/uploads/2014/10/Dark-Chocolate-Mocha-Square.jpg",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-[#fffaf6]">
      <Navbar cartCount={0} /> {/* Bright Navbar with Login button redirecting to /login */}
      <Hero /> {/* Hero section with background image */}

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-16">
        {/* Section Header */}
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

        {/* Menu Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {menuItems.map((item) => (
            <MenuCard
              key={item.key}
              item={{
                id: parseInt(item.key, 10), // Convert key to number
                name: item.title, // Map title to name
                description: item.description,
                price: parseFloat(item.price), // Convert price to number
                category: "Miscellaneous", // Default category
                image: item.image, // Map imageUrl to image
              }}
              quantity={1} // Default quantity
              onIncrement={() => {}}
              onDecrement={() => {}}
              onAdd={() => {}}
            />
          ))}
        </div>

        {/* Special Highlights Section */}
        <div className="mt-20 text-center">
          <h3 className="text-3xl font-bold mb-6 text-[#5a3e2b]">
            Why Choose BIZ Nest? ✨
          </h3>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
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
      </main>

      <Footer />
    </div>
  );
}