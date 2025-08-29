"use client";

import { useState, useEffect } from "react";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";

// -------------------- Types --------------------
// Base type from MenuPage for compatibility
type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

// Flattened type for use within this page's state
type CartItem = MenuItem & {
  quantity: number;
};

// Type for the nested structure stored in localStorage by MenuPage
type StoredCartEntry = {
  item: MenuItem;
  quantity: number;
};

// -------------------- Components --------------------
const Modal = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9999]">
      <div className="bg-white rounded-lg p-8 shadow-xl text-center max-w-sm mx-4">
        <div className="text-4xl mb-4">
          {message.includes("placed") ? "🎉" : "🛒"}
        </div>
        <p className="text-xl font-semibold mb-4">{message}</p>
        <button
          onClick={onClose}
          className="px-8 py-3 bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default function OrdersPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // ✅ CORRECTED: Load and transform data from localStorage
  useEffect(() => {
    try {
      const savedCartJSON = localStorage.getItem("cart");
      if (savedCartJSON) {
        const savedCart: StoredCartEntry[] = JSON.parse(savedCartJSON);
        // Transform the nested structure to the flat structure this page uses
        const transformedCart = savedCart.map((entry) => ({
          ...entry.item,
          quantity: entry.quantity,
        }));
        setCart(transformedCart);
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // ✅ CORRECTED: Transform data back before saving to localStorage
  const updateCart = (newCart: CartItem[]) => {
    // Update the state for this page's UI
    setCart(newCart);

    // Transform the flat structure back to the nested one for MenuPage compatibility
    const cartToSave: StoredCartEntry[] = newCart.map(
      ({ quantity, ...itemData }) => ({
        item: itemData,
        quantity: quantity,
      })
    );

    localStorage.setItem("cart", JSON.stringify(cartToSave));
  };

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(itemId);
    } else {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      );
      updateCart(updatedCart);
    }
  };

  const removeItem = (itemId: number) => {
    const updatedCart = cart.filter((cartItem) => cartItem.id !== itemId);
    updateCart(updatedCart);
  };

  const handlePurchase = async () => {
  if (cart.length === 0) {
    setModalMessage("Your cart is empty! Add some delicious items first.");
    setShowModal(true);
    return;
  }

  try {
    const orderData = {
      customerName: "Guest User", // later: session.user?.name
      items: cart.map((c) => ({
        name: c.name,
        price: c.price,
        quantity: c.quantity,
      })),
      total, // ✅ matches your API schema
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    if (!res.ok) throw new Error("Failed to place order");

    setModalMessage("Order placed successfully! We'll prepare it fresh for you.");
    setShowModal(true);
    setCart([]);
    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Order placement failed", error);
    setModalMessage("Something went wrong while placing your order. Try again!");
    setShowModal(true);
  }
};



  // Calculate billing details with a safety check
  const subtotal = cart.reduce((total, cartItem) => {
    // The price is now correctly accessed from the flattened cartItem
    if (cartItem && typeof cartItem.price === "number") {
      return total + cartItem.price * cartItem.quantity;
    }
    return total;
  }, 0);

  const tax = subtotal * 0.18; // 18% GST (changed to float for accuracy)
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal + tax + deliveryFee;

  return (
    <div className="bg-gradient-to-br from-[#fcf8f3] to-[#f5f1ec] min-h-screen text-[#3b2b20] font-sans">
      <Navbar cartCount={cart.reduce((sum, cur) => sum + cur.quantity, 0)} />
      
      <header className="relative py-6 bg-white/30 backdrop-blur-sm mt-20 border-b border-white/20">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <a 
            href="/customer/menu" 
            className="flex items-center gap-2 text-lg font-semibold text-[#3b2b20] hover:text-[#8b4513] transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Menu
          </a>
          <h1 className="text-3xl font-bold">Your Order</h1>
          <div className="w-24"></div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto p-6 animate-fade-in-delay">
        {cart.length === 0 ? (
          <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center mt-12 border border-white/20">
            <div className="text-6xl mb-4">🛒</div>
            <h3 className="text-3xl font-bold mb-4 text-[#3b2b20]">Your cart is empty</h3>
            <p className="text-lg text-[#5d4e41] mb-8">Discover our delicious menu and add some items!</p>
            <a 
              href="/customer/menu"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Browse Menu
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Items */}
            <div className="lg:col-span-2">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Order Items ({cart.length})
                </h2>
                
                <div className="space-y-4">
                  {cart
                    .filter(
                      (cartItem): cartItem is CartItem =>
                        !!cartItem &&
                        typeof cartItem.id === "number" &&
                        typeof cartItem.image === "string" &&
                        typeof cartItem.name === "string" &&
                        typeof cartItem.price === "number" &&
                        typeof cartItem.quantity === "number"
                    )
                    .map((cartItem) => (
                      <div key={cartItem.id} className="flex items-center gap-4 p-4 bg-white/30 rounded-xl border border-white/10">
                        <img
                          src={cartItem.image}
                          alt={cartItem.name}
                          className="w-20 h-20 object-cover rounded-xl shadow-md"
                        />
                        <div className="flex-1">
                          <h3 className="text-lg font-bold">{cartItem.name}</h3>
                          <p className="text-sm text-[#5d4e41] mt-1">{cartItem.description}</p>
                          <p className="text-lg font-semibold text-[#8b4513] mt-2">₹{cartItem.price} each</p>
                        </div>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity - 1)}
                            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#8b4513] font-bold hover:bg-gray-50 transition"
                          >
                            -
                          </button>
                          <span className="w-8 text-center font-semibold">{cartItem.quantity}</span>
                          <button
                            onClick={() => updateQuantity(cartItem.id, cartItem.quantity + 1)}
                            className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-[#8b4513] font-bold hover:bg-gray-50 transition"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-bold">₹{cartItem.price * cartItem.quantity}</p>
                          <button
                            onClick={() => removeItem(cartItem.id)}
                            className="text-red-500 text-sm hover:text-red-700 transition mt-1"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20 sticky top-28">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Bill Summary
                </h2>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold">₹{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-semibold">₹{tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span className="font-semibold">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  
                  {deliveryFee > 0 && subtotal > 0 && (
                    <p className="text-xs text-[#5d4e41]">
                      Free delivery on orders above ₹500
                    </p>
                  )}
                  
                  <div className="border-t border-[#8b4513]/20 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span>Total</span>
                      <span className="text-[#8b4513]">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handlePurchase}
                  className="w-full mt-6 bg-gradient-to-r from-[#8b4513] to-[#cd853f] text-white font-semibold py-4 rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5-5M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                  </svg>
                  Place Order - ₹{total.toFixed(2)}
                </button>
                
                <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-700 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Estimated delivery: 25-30 minutes
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showModal && <Modal message={modalMessage} onClose={() => setShowModal(false)} />}
      <Footer />
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out forwards 0.3s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}