"use client";

import React from "react";
import { X, CheckCircle } from "lucide-react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onDismiss: () => void;
}

export default function Toast({ message, isVisible, onDismiss }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-slide-in-right">
      <div className="bg-white/95 backdrop-blur-sm border border-green-200 rounded-lg shadow-lg p-4 flex items-center gap-3 min-w-80">
        <div className="flex items-center gap-3 flex-1">
          <CheckCircle size={20} className="text-green-500 flex-shrink-0" />
          <p className="text-gray-800 font-medium">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}