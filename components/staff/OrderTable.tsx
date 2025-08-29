"use client";

import { useState } from "react";

interface Order {
  _id: string;
  customerName: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: "Pending" | "In-Progress" | "Completed";
  createdAt: string;
}

interface Props {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
}

export default function OrderTable({ orders, setOrders }: Props) {
  const [loadingId, setLoadingId] = useState<string | null>(null);

  // Update order status
  const updateStatus = async (orderId: string, newStatus: string) => {
    try {
      setLoadingId(orderId);
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error("Failed to update order");

      const updatedOrder = await res.json();

      // Update state instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: updatedOrder.status } : order
        )
      );
    } catch (err) {
      console.error("❌ Failed to update status", err);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-4 border border-amber-200 overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-amber-100 text-[#5a3e2b] font-semibold">
            <th className="p-3">Customer</th>
            <th className="p-3">Items</th>
            <th className="p-3">Total</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={5} className="p-4 text-center text-gray-500">
                No orders yet 🍽️
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr
                key={order._id}
                className="border-b last:border-0 hover:bg-amber-50"
              >
                <td className="p-3 font-medium">{order.customerName}</td>
                <td className="p-3 text-sm text-gray-600">
                  {order.items.map((item, i) => (
                    <div key={i}>
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-3 font-semibold">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      order.status === "Pending"
                        ? "bg-yellow-200 text-yellow-700"
                        : order.status === "In-Progress"
                        ? "bg-blue-200 text-blue-700"
                        : "bg-green-200 text-green-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3">
                  {["Pending", "In-Progress"].includes(order.status) && (
                    <button
                      disabled={loadingId === order._id}
                      onClick={() =>
                        updateStatus(
                          order._id,
                          order.status === "Pending" ? "In-Progress" : "Completed"
                        )
                      }
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loadingId === order._id ? "Updating..." : "Next Stage"}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
