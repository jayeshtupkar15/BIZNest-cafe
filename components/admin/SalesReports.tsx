"use client";

import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { month: "Jan", sales: 1200, profit: 400 },
  { month: "Feb", sales: 2100, profit: 700 },
  { month: "Mar", sales: 1800, profit: 600 },
  { month: "Apr", sales: 2500, profit: 900 },
  { month: "May", sales: 3000, profit: 1200 },
];

export default function SalesReports() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-amber-700">📊 Sales Reports</h2>

      {/* Sales Bar Chart */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="font-semibold text-lg mb-3">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#f59e0b" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Profit Line Chart */}
      <div className="bg-white shadow rounded-2xl p-4">
        <h3 className="font-semibold text-lg mb-3">Profit Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="profit" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
