"use client";

import React, { useEffect } from "react";
import { X, Plus, Minus, Flame, Leaf, AlertTriangle, Clock, Star } from "lucide-react";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  dietary?: string[];
};

interface ItemModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export default function ItemModal({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart, 
  quantity, 
  onIncrement, 
  onDecrement 
}: ItemModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !item) return null;

  const getDietaryBadgeColor = (dietary: string) => {
    const colors: { [key: string]: string } = {
      'Vegan': 'bg-green-100 text-green-800 border-green-200',
      'Vegetarian': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'Gluten-Free': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'High Protein': 'bg-blue-100 text-blue-800 border-blue-200',
      'Spicy': 'bg-red-100 text-red-800 border-red-200',
      'Healthy Choice': 'bg-lime-100 text-lime-800 border-lime-200',
      'Indulgent': 'bg-purple-100 text-purple-800 border-purple-200',
      'Classic': 'bg-amber-100 text-amber-800 border-amber-200',
    };
    return colors[dietary] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getCalorieLevel = (calories: number) => {
    if (calories < 200) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
    if (calories < 500) return { level: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'High', color: 'text-red-600', bg: 'bg-red-100' };
  };

  const calorieInfo = item.calories ? getCalorieLevel(item.calories) : null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-modal-enter">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-200 shadow-lg hover:scale-110"
        >
          <X size={24} className="text-gray-600" />
        </button>

        {/* Image Section */}
        <div className="relative h-80 overflow-hidden rounded-t-3xl">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=60";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
          
          {/* Category Badge */}
          <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
            <span className="text-sm font-bold text-gray-800">{item.category}</span>
          </div>

          {/* Rating (Mock) */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-3 py-2">
            <Star size={16} className="text-yellow-500 fill-current" />
            <span className="text-sm font-bold text-gray-800">4.8</span>
            <span className="text-sm text-gray-600">(124 reviews)</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Main Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-black text-gray-900 mb-4 leading-tight">
                {item.name}
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {item.description}
              </p>

              {/* Price and Calories */}
              <div className="flex items-center gap-6 mb-8">
                <div className="text-4xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                  ₹{item.price}
                </div>
                {item.calories && calorieInfo && (
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${calorieInfo.bg}`}>
                    <Flame size={18} className={calorieInfo.color} />
                    <span className={`font-bold ${calorieInfo.color}`}>
                      {item.calories} cal
                    </span>
                    <span className={`text-sm ${calorieInfo.color}`}>
                      ({calorieInfo.level})
                    </span>
                  </div>
                )}
              </div>

              {/* Dietary Information */}
              {item.dietary && item.dietary.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Leaf size={20} className="text-green-600" />
                    Dietary Information
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {item.dietary.map((diet, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-sm font-medium border ${getDietaryBadgeColor(diet)}`}
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Ingredients */}
              {item.ingredients && item.ingredients.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Ingredients</h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="bg-white px-3 py-1 rounded-full text-sm text-gray-700 border border-gray-200"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Allergens */}
              {item.allergens && item.allergens.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <AlertTriangle size={20} className="text-orange-600" />
                    Allergen Information
                  </h3>
                  <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                    <p className="text-sm text-orange-800 mb-2 font-medium">
                      Contains: {item.allergens.join(", ")}
                    </p>
                    <p className="text-xs text-orange-600">
                      Please inform staff of any allergies before ordering.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Order Section */}
            <div className="lg:w-80">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Order Details</h3>
                
                {/* Preparation Time */}
                <div className="flex items-center gap-2 mb-6 text-gray-600">
                  <Clock size={18} />
                  <span className="text-sm">Preparation: 12-15 mins</span>
                </div>

                {/* Quantity Controls */}
                <div className="mb-6">
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Quantity
                  </label>
                  <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-amber-200">
                    <button
                      onClick={onDecrement}
                      className="bg-amber-100 hover:bg-amber-200 rounded-full p-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={quantity <= 1}
                    >
                      <Minus size={18} className="text-amber-700" />
                    </button>
                    <span className="text-2xl font-bold text-amber-700">
                      {quantity}
                    </span>
                    <button
                      onClick={onIncrement}
                      className="bg-amber-100 hover:bg-amber-200 rounded-full p-2 transition-all duration-200"
                    >
                      <Plus size={18} className="text-amber-700" />
                    </button>
                  </div>
                </div>

                {/* Total Price */}
                <div className="flex justify-between items-center mb-6 p-3 bg-white rounded-xl border border-amber-200">
                  <span className="text-lg font-medium text-gray-700">Total:</span>
                  <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
                    ₹{(item.price * quantity).toLocaleString()}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => onAddToCart(item)}
                  className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold py-4 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Add to Cart - ₹{(item.price * quantity).toLocaleString()}
                </button>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Free delivery on orders above ₹500
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes modal-enter {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}