"use client";

import React, { RefObject } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  containerRef: RefObject<HTMLDivElement>;
};

export default function ScrollButtons({ containerRef }: Props) {
  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;
    const amount = 300;
    containerRef.current.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4">
      <button
        onClick={() => scroll("left")}
        className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => scroll("right")}
        className="bg-white/80 p-2 rounded-full shadow hover:bg-white"
      >
        <ChevronRight />
      </button>
    </div>
  );
}
