"use client";

import React from "react";

type Props = {
  categoryRefs: { [key: string]: React.RefObject<HTMLDivElement> };
};

export default function CategoryBar({ categoryRefs }: Props) {
  const scrollToCategory = (category: string) => {
    const ref = categoryRefs[category];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const categories = Object.keys(categoryRefs);

  return (
    <nav className="sticky top-0 z-20 bg-white shadow-sm py-3 px-6 flex gap-6 overflow-x-auto no-scrollbar">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => scrollToCategory(cat)}
          className="text-[#5a3e2b] font-semibold hover:text-amber-600 transition-colors"
        >
          {cat}
        </button>
      ))}
    </nav>
  );
}
