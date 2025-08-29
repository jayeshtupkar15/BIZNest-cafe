"use client";

import React from "react";
import { MenuItem } from "../../app/data/menuItems";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  quantity: number;
  onAdd: (item: MenuItem) => void;
  onRemove: (item: MenuItem) => void;
};

export default function ItemModal({
  isOpen,
  onClose,
  item,
  quantity,
  onAdd,
  onRemove,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-60 object-cover rounded-xl"
        />
        <h2 className="text-2xl font-bold mt-4 text-[#5a3e2b]">{item.name}</h2>
        <p className="text-gray-600 mt-2">{item.description}</p>
        <p className="text-amber-700 font-bold mt-4 text-lg">
          ${item.price.toFixed(2)}
        </p>

        <div className="mt-6 flex items-center gap-3">
          {quantity > 0 ? (
            <>
              <button
                onClick={() => onRemove(item)}
                className="px-3 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600"
              >
                -
              </button>
              <span className="font-medium">{quantity}</span>
              <button
                onClick={() => onAdd(item)}
                className="px-3 py-1 bg-amber-500 text-white rounded-full hover:bg-amber-600"
              >
                +
              </button>
            </>
          ) : (
            <button
              onClick={() => onAdd(item)}
              className="w-full bg-amber-500 text-white py-2 rounded-xl hover:bg-amber-600"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
