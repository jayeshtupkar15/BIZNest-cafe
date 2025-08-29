"use client";

import React, { RefObject } from "react";
import { MenuItem } from "../../app/data/menuItems";
import MenuCard from "./MenuCard";
import ScrollButtons from "./ScrollButtons";

type Props = {
  title: string;
  items: MenuItem[];
  cart: { item: MenuItem; quantity: number }[];
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
  onItemClick: (item: MenuItem) => void;
  sectionRef: RefObject<HTMLDivElement>;
};

export default function CategorySection({
  title,
  items,
  cart,
  onAdd,
  onRemove,
  onItemClick,
  sectionRef,
}: Props) {
  if (!items.length) return null;

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-6 py-16 scroll-mt-40"
    >
      <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text">
        {title}
      </h2>

      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
          {items.map((item) => {
            const quantity =
              cart.find((c) => c.item.id === item.id)?.quantity || 0;
            return (
              <div key={item.id} className="snap-center shrink-0">
                <MenuCard
                  item={item}
                  quantity={quantity}
                  onAdd={() => onAdd(item)}
                  onRemove={() => onRemove(item)}
                  onOpenModal={() => onItemClick(item)}
                />
              </div>
            );
          })}
        </div>
        <ScrollButtons containerRef={sectionRef} />
      </div>
    </section>
  );
}
