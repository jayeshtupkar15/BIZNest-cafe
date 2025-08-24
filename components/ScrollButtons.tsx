"use client";

import React, { RefObject, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollButtonsProps {
  scrollRef: RefObject<HTMLDivElement>;
}

export default function ScrollButtons({ scrollRef }: ScrollButtonsProps) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    const scrollContainer = scrollRef.current?.querySelector('.overflow-x-auto') as HTMLElement;
    if (!scrollContainer) return;

    const checkScrollability = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    };

    checkScrollability();
    scrollContainer.addEventListener('scroll', checkScrollability);
    
    return () => scrollContainer.removeEventListener('scroll', checkScrollability);
  }, [scrollRef]);

  const scroll = (direction: 'left' | 'right') => {
    const scrollContainer = scrollRef.current?.querySelector('.overflow-x-auto') as HTMLElement;
    if (!scrollContainer) return;

    const scrollAmount = 320; // Width of card + gap
    const newScrollLeft = direction === 'left' 
      ? scrollContainer.scrollLeft - scrollAmount 
      : scrollContainer.scrollLeft + scrollAmount;

    scrollContainer.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl hover:scale-110"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
      )}

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg rounded-full p-3 transition-all duration-200 hover:shadow-xl hover:scale-110"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      )}
    </>
  );
}