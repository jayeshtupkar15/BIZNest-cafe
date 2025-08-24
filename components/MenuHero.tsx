"use client";
import React, { useEffect } from "react";

export default function MenuHero() {
  useEffect(() => {
    const parallax = document.querySelector('[data-parallax]') as HTMLElement;
    if (parallax) {
      const handleScroll = () => {
        const y = window.scrollY * 0.5;
        parallax.style.setProperty('--y', `${y}px`);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="relative h-[650px] md:h-[700px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-100 ease-linear"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1600&q=60')",
          transform: "translateY(var(--y))",
          '--y': '0px',
        } as React.CSSProperties}
        data-parallax
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative max-w-5xl mx-6 text-center text-white z-10">
        <p className="text-xl md:text-2xl font-semibold tracking-wider animate-slide-up-1">Our Delicious Menu</p>
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mt-2 animate-slide-up-2">
          Freshly Made, Just For You.
        </h1>
      </div>
    </section>
  );
}
