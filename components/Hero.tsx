"use client";
import React from "react";

export default function Hero() {
  return (
    <section
      className="relative text-center py-32 flex flex-col items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=60')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Welcome to BIZ Nest Cafe ☕
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-6">
          At BIZ Nest, come put your mind to the test, and enjoy coffee that's truly the best.
        </p>
        <button className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition">
          Order Now
        </button>
      </div>
    </section>
  );
}
