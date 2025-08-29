"use client";

import React from "react";
import { MenuItem } from "../../app/data/menuItems";

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onOpenModal: () => void;
}

export default function MenuCard({
  item,
  quantity,
  onAdd,
  onRemove,
  onOpenModal,
}: MenuCardProps) {
  return (
    <div className="w-72 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-4 flex flex-col">
      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-40 object-cover rounded-xl cursor-pointer"
        onClick={onOpenModal}
      />

      {/* Title + Description */}
      <h3 className="mt-4 text-lg font-semibold text-[#5a3e2b]">
        {item.name}
      </h3>
      <p className="text-gray-600 text-sm flex-1">{item.description}</p>

      {/* Price */}
      <p className="text-amber-700 font-bold mt-2">
        ${item.price.toFixed(2)}
      </p>

      {/* Actions */}
      <div className="mt-4 flex items-center gap-3">
        {quantity > 0 ? (
          <>
            <button
              onClick={onRemove}
              className="px-3 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition"
            >
              –
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={onAdd}
              className="px-3 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600 transition"
            >
              +
            </button>
          </>
        ) : (
          <button
            onClick={onAdd}
            className="w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600 transition"
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}
