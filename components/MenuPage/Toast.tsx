"use client";

import React from "react";

type Props = {
  message: string;
  isVisible: boolean;
};

export default function Toast({ message, isVisible }: Props) {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 bg-amber-500 text-white px-4 py-2 rounded-xl shadow-lg animate-fadeIn">
      {message}
    </div>
  );
}
