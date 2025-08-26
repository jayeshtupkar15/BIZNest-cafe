"use client";

import { Plus, Minus } from "lucide-react";

export type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
};

interface MenuCardProps {
  item: MenuItem;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onAdd: () => void;
  onClick?: () => void;
}

export default function MenuCard({ item, quantity, onIncrement, onDecrement, onAdd, onClick }: MenuCardProps) {
  // Add null/undefined checks
  if (!item) {
    return null;
  }

  // Provide fallback values for missing properties
  const {
    id,
    name = "Unknown Item",
    description = "No description available",
    price = 0,
    category = "Miscellaneous",
    image = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=60" // fallback image
  } = item;

  return (
    <div
  className="flex-shrink-0 w-full sm:w-80 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 sm:hover:-translate-y-4 hover:scale-102 border border-white/50 cursor-pointer group"
  style={{ scrollSnapAlign: "start" }}
  onClick={onClick}
>
      <div className="h-56 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=60";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent group-hover:from-black/20 transition-all duration-300"></div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-sm font-bold text-gray-800">₹{price}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col h-72">
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors duration-300">{name}</h3>
        <p className="text-gray-600 text-sm flex-grow leading-relaxed mb-4">{description}</p>
        
        <div className="mt-auto space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-black bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
              ₹{price}
            </span>
            <div className="flex items-center gap-3 bg-gray-50 rounded-full px-3 py-2">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onDecrement();
                }}
                className="bg-white hover:bg-gray-100 rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-sm"
                disabled={quantity <= 1}
              >
                <Minus size={14} className="text-gray-600" />
              </button>
              <span className="font-bold w-8 text-center text-amber-600">
                {quantity || 1}
              </span>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  onIncrement();
                }}
                className="bg-white hover:bg-gray-100 rounded-full p-2 transition-all duration-200 hover:scale-110 shadow-sm"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAdd();
            }}
            className="w-full bg-gradient-to-r from-amber-600 to-orange-500 text-white font-bold py-3 rounded-xl hover:from-amber-700 hover:to-orange-600 transition-all duration-300 active:scale-95 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}