"use client";

import React, { useRef, useState, useEffect, RefObject } from "react";

// Components
import Navbar from "../../../components/Navbar";
import CategoryBar from "../../../components/MenuPage/CategoryBar";
import MenuCard from "../../../components/MenuPage/MenuCard";
import ItemModal from "../../../components/MenuPage/ItemModal";
import ScrollButtons from "../../../components/MenuPage/ScrollButtons";
import Toast from "../../../components/MenuPage/Toast";
import Footer from "../../../components/Footer";

// Data
import { MenuItem, seedItems } from "../../data/menuItems";

// -------------------- Helper --------------------
function numericIdFromString(s: string, offset = 200000): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + offset;
}

// -------------------- Main --------------------
export default function MenuPage() {
  // Category Refs
  const categoryRefs: { [key: string]: RefObject<HTMLDivElement> } = {
    Coffee: useRef<HTMLDivElement>(null!),
    Cafe: useRef<HTMLDivElement>(null!),
    Burgers: useRef<HTMLDivElement>(null!),
    Desserts: useRef<HTMLDivElement>(null!),
  };

  // State
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DB state
  const [dbItems, setDbItems] = useState<MenuItem[]>([]);
  const [isLoadingDb, setIsLoadingDb] = useState(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // -------------------- CART HANDLING --------------------
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);
      const initialQuantities: { [key: number]: number } = {};
      parsedCart.forEach((c: any) => {
        initialQuantities[numericIdFromString(c.item.name)] = c.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), 2000);
  };

  const addToCart = (item: MenuItem) => {
    const localId = numericIdFromString(item.name);
    setCart((prev) => {
      const existing = prev.find((c) => c.item.name === item.name);
      let newCart;
      if (existing) {
        newCart = prev.map((c) =>
          c.item.name === item.name
            ? { ...c, quantity: c.quantity + 1 }
            : c
        );
      } else {
        newCart = [...prev, { item, quantity: 1 }];
      }
      setQuantities((q) => ({
        ...q,
        [localId]: (q[localId] || 0) + 1,
      }));
      return newCart;
    });
    showToast(`${item.name} added to cart!`);
  };

  const removeFromCart = (item: MenuItem) => {
    const localId = numericIdFromString(item.name);
    setCart((prev) => {
      const existing = prev.find((c) => c.item.name === item.name);
      if (!existing) return prev;

      let newCart;
      if (existing.quantity > 1) {
        newCart = prev.map((c) =>
          c.item.name === item.name
            ? { ...c, quantity: c.quantity - 1 }
            : c
        );
      } else {
        newCart = prev.filter((c) => c.item.name !== item.name);
      }
      setQuantities((q) => ({
        ...q,
        [localId]: (q[localId] || 1) - 1,
      }));
      return newCart;
    });
    showToast(`${item.name} removed from cart!`);
  };

  // -------------------- DB FETCH --------------------
  useEffect(() => {
    async function fetchItems() {
      try {
        setIsLoadingDb(true);
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Failed to fetch items");
        const data = await res.json();
        setDbItems(data);
      } catch (err: any) {
        setDbError(err.message || "Unknown error");
      } finally {
        setIsLoadingDb(false);
      }
    }
    fetchItems();
  }, []);

  // -------------------- ITEMS --------------------
  const combinedItems: MenuItem[] = [...seedItems, ...dbItems];

  const renderCategory = (category: string, ref: RefObject<HTMLDivElement>) => {
    const items = combinedItems.filter((i) => i.category === category);
    if (!items.length) return null;

    return (
      <section
        id={category.toLowerCase()}
        ref={ref}
        className="max-w-7xl mx-auto px-6 py-16 scroll-mt-40"
      >
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-amber-600 to-orange-600 text-transparent bg-clip-text">
          {category}
        </h2>
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar">
            {items.map((item) => {
              const localId = numericIdFromString(item.name);
              return (
                <div key={localId} className="snap-center shrink-0">
                  <MenuCard
                    item={item}
                    quantity={quantities[localId] || 0}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item)}
                    onOpenModal={() => {
                      setSelectedItem(item);
                      setIsModalOpen(true);
                    }}
                  />
                </div>
              );
            })}
          </div>
          <ScrollButtons containerRef={ref} />
        </div>
      </section>
    );
  };

  // -------------------- RENDER --------------------
  return (
    <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 min-h-screen">
      <Navbar cartCount={cart.reduce((sum, cur) => sum + cur.quantity, 0)} />

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-amber-100 via-orange-100 to-amber-50 py-24 text-center">
        <h1 className="text-5xl font-extrabold text-amber-800 mb-6 drop-shadow-sm">
          Our Menu
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700">
          Discover our delicious range of Coffee, Cafe Treats, Burgers, and Desserts.
        </p>
      </section>

      <CategoryBar categoryRefs={categoryRefs} />

      {renderCategory("Coffee", categoryRefs.Coffee)}
      {renderCategory("Cafe", categoryRefs.Cafe)}
      {renderCategory("Burgers", categoryRefs.Burgers)}
      {renderCategory("Desserts", categoryRefs.Desserts)}

      {selectedItem && (
        <ItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          item={selectedItem}
          onAdd={addToCart}
          onRemove={removeFromCart}
          quantity={quantities[numericIdFromString(selectedItem.name)] || 0}
        />
      )}

      <Toast message={toast.message} isVisible={toast.isVisible} />
      <Footer />
    </div>
  );
}
