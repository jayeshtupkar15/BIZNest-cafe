"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

interface Order {
  id: string;
  items: { name: string; quantity: number }[];
  total: number;
  status: "pending" | "preparing" | "completed" | "cancelled";
  placedAt: string;
}

export default function SalesReport() {
  // === Dummy Orders Data ===
  const orders: Order[] = [
    {
      id: "ORD001",
      items: [
        { name: "Cappuccino", quantity: 2 },
        { name: "Cookie", quantity: 1 },
      ],
      total: 350,
      status: "completed",
      placedAt: "2025-08-27T10:30:00",
    },
    {
      id: "ORD002",
      items: [{ name: "Latte", quantity: 1 }],
      total: 180,
      status: "preparing",
      placedAt: "2025-08-27T11:10:00",
    },
    {
      id: "ORD003",
      items: [{ name: "Espresso", quantity: 3 }],
      total: 240,
      status: "completed",
      placedAt: "2025-08-27T12:45:00",
    },
    {
      id: "ORD004",
      items: [{ name: "Brownie", quantity: 2 }],
      total: 300,
      status: "pending",
      placedAt: "2025-08-27T13:15:00",
    },
  ];

  // === Dummy Chart Data ===
  const chartData = [
    { date: "Aug 25", total: 420 },
    { date: "Aug 26", total: 680 },
    { date: "Aug 27", total: 1070 },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-[#5a3e2b]">📊 Sales Report</h2>

      {/* === Orders Table === */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border border-gray-200 rounded-lg">
          <thead className="bg-[#fff5eb] text-[#5a3e2b]">
            <tr>
              <th className="p-3">Order ID</th>
              <th className="p-3">Items</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Placed At</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t">
                <td className="p-3">{order.id}</td>
                <td className="p-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      {item.name} × {item.quantity}
                    </div>
                  ))}
                </td>
                <td className="p-3 font-semibold">₹{order.total}</td>
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "preparing"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.status === "pending"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-3 text-sm">
                  {new Date(order.placedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* === Sales Chart === */}
      <div className="h-64 mt-8">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#d97706" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
