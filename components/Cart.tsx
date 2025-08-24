"use client";

import React from "react";

export default function Cart({ cartItems, onPurchase }: { cartItems: any[]; onPurchase: () => void }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <ul className="space-y-3">
          {cartItems.map((item, index) => (
            <li key={index} className="flex justify-between border p-3 rounded-lg">
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button
          onClick={onPurchase}
          className="mt-4 px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Buy Now
        </button>
      )}
    </div>
  );
}
