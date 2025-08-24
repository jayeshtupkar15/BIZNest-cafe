"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const mockSalesData = [
  { id: 1, date: "2025-08-22", total: 55.75, items: 3 },
  { id: 2, date: "2025-08-21", total: 120.50, items: 7 },
  { id: 3, date: "2025-08-20", total: 88.00, items: 4 },
  { id: 4, date: "2025-08-19", total: 24.00, items: 1 },
];

export default function SalesReport() {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100">
      <h2 className="text-2xl font-semibold text-[#3b2b20] mb-4">Detailed Sales Report</h2>
      <table className="min-w-full table-auto">
        <thead className="border-b-2 border-amber-200">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Order ID</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Date</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Total</th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-600">Items</th>
          </tr>
        </thead>
        <tbody>
          {mockSalesData.map((order) => (
            <tr key={order.id} className="border-b border-amber-100 hover:bg-amber-50 transition-colors">
              <td className="px-4 py-2 text-sm text-gray-800 font-medium">#{order.id}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{order.date}</td>
              <td className="px-4 py-2 text-sm text-gray-600">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2 text-sm text-gray-600">{order.items}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}