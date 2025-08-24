"use client";

import React, { RefObject } from "react";

interface CategoryBarProps {
  refs: { [key: string]: RefObject<HTMLDivElement> };
}

export default function CategoryBar({ refs }: CategoryBarProps) {
  const categories = [
    { name: "Coffee", icon: "☕", color: "from-amber-600 to-orange-500" },
    { name: "Cafe", icon: "🥪", color: "from-emerald-600 to-green-500" },
    { name: "Burgers", icon: "🍔", color: "from-red-600 to-pink-500" },
    { name: "Desserts", icon: "🍰", color: "from-purple-600 to-indigo-500" },
  ];

  const scrollToCategory = (category: string) => {
    const ref = refs[category];
    if (ref?.current) {
      const offsetTop = ref.current.offsetTop - 180; // Account for fixed header
      window.scrollTo({ 
        top: offsetTop,
        behavior: "smooth" 
      });
    }
  };

  return (
    <div className="sticky top-20 left-0 w-full z-30 bg-white/95 backdrop-blur-md border-b border-amber-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-center gap-6 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => scrollToCategory(category.name)}
              className={`group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r ${category.color} text-white font-bold hover:shadow-2xl transform hover:scale-105 transition-all duration-300 whitespace-nowrap min-w-fit relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="text-xl relative z-10">{category.icon}</span>
              <span className="relative z-10 text-lg">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}