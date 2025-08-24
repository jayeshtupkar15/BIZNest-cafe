"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  LayoutDashboard,
  TrendingUp,
  ListOrdered,
  Package,
  PiggyBank,
  FileText,
  LogOut,
  Coffee,
  DollarSign,
  ShoppingCart,
  Percent,
} from "lucide-react";


// Extend Session type to include the 'role'
interface CustomSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

// -------------------- DUMMY DATA --------------------
// This data simulates what would come from your backend API
const KpiData = {
  totalSalesToday: 15200.50,
  totalOrdersToday: 78,
  averageOrderValue: 194.88,
  topSellingItem: "Cappuccino",
};

const salesTrendData = [
  { name: 'Mon', sales: 12000, orders: 55 },
  { name: 'Tue', sales: 15000, orders: 65 },
  { name: 'Wed', sales: 11000, orders: 50 },
  { name: 'Thu', sales: 18000, orders: 80 },
  { name: 'Fri', sales: 22000, orders: 95 },
  { name: 'Sat', sales: 25000, orders: 110 },
  { name: 'Sun', sales: 19000, orders: 85 },
];

const categorySalesData = [
  { name: 'Beverages', sales: 6500 },
  { name: 'Food', sales: 4500 },
  { name: 'Desserts', sales: 3000 },
  { name: 'Other', sales: 1200 },
];

const recentOrdersData = [
  { id: '#001', customer: 'Alex Johnson', items: 'Latte, Croissant', price: 350.50, status: 'Paid', time: '10:30 AM' },
  { id: '#002', customer: 'Walk-in', items: 'Iced Tea', price: 150.00, status: 'Paid', time: '10:32 AM' },
  { id: '#003', customer: 'Sarah Miller', items: 'Sandwich, Coffee', price: 420.00, status: 'Pending', time: '10:35 AM' },
  { id: '#004', customer: 'Walk-in', items: 'Muffin', price: 180.00, status: 'Paid', time: '10:40 AM' },
];

const bestSellingItems = [
  { name: "Cappuccino", salesCount: 50, revenue: 10000 },
  { name: "Latte", salesCount: 45, revenue: 9000 },
  { name: "Chocolate Cake", salesCount: 30, revenue: 6000 },
  { name: "Espresso", salesCount: 25, revenue: 4000 },
  { name: "Croissant", salesCount: 20, revenue: 2000 },
];

const slowSellingItems = [
  { name: "Iced Mocha", salesCount: 3, revenue: 600 },
  { name: "Decaf Coffee", salesCount: 5, revenue: 800 },
  { name: "Vegan Muffin", salesCount: 7, revenue: 1050 },
  { name: "Fruit Smoothie", salesCount: 9, revenue: 1350 },
  { name: "Grilled Sandwich", salesCount: 11, revenue: 2200 },
];

const paymentMethodData = [
  { name: 'UPI', value: 7000 },
  { name: 'Card', value: 5000 },
  { name: 'Cash', value: 3200 },
];

const PIE_CHART_COLORS = ['#f59e0b', '#d97706', '#b45309', '#92400e'];


// -------------------- UI COMPONENTS --------------------

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  hover: { scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }
};

const KPIItem = ({ title, value, icon, subValue }: { title: string; value: string; icon: React.ReactNode; subValue?: string }) => (
  <motion.div
    className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 flex items-center justify-between"
    variants={cardVariants}
    whileHover="hover"
  >
    <div className="flex flex-col">
      <p className="text-gray-400 text-sm">{title}</p>
      <span className="text-3xl font-bold text-amber-400">{value}</span>
      {subValue && <p className="text-gray-500 text-xs mt-1">{subValue}</p>}
    </div>
    <div className="text-amber-500">{icon}</div>
  </motion.div>
);

const SectionTitle = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
  <motion.div
    className="flex items-center space-x-3 mb-6"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md">
      {icon}
    </div>
    <h2 className="text-3xl font-bold text-amber-400">{title}</h2>
  </motion.div>
);

const ChartCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700"
    variants={itemVariants}
    initial="initial"
    animate="animate"
  >
    <h3 className="text-xl font-semibold mb-4 text-amber-400">{title}</h3>
    <div className="h-72">
      {children}
    </div>
  </motion.div>
);

const TableCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <motion.div
    className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700"
    variants={itemVariants}
    initial="initial"
    animate="animate"
  >
    <h3 className="text-xl font-semibold mb-4 text-amber-400">{title}</h3>
    <div className="overflow-x-auto">
      {children}
    </div>
  </motion.div>
);

// -------------------- SIDEBAR NAVIGATION --------------------
const Sidebar = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const navItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/dashboard" },
    { name: "Trends", icon: <TrendingUp size={20} />, href: "/dashboard#trends" },
    { name: "Orders", icon: <ListOrdered size={20} />, href: "/dashboard#orders" },
    { name: "Top/Bottom Items", icon: <Package size={20} />, href: "/dashboard#items" },
    { name: "Revenue", icon: <PiggyBank size={20} />, href: "/dashboard#revenue" },
    { name: "Reports", icon: <FileText size={20} />, href: "/dashboard#reports" },
  ];

  return (
    <div className="w-64 bg-slate-800 text-gray-200 p-6 flex flex-col justify-between fixed h-full border-r border-amber-700">
      <div>
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-md">
            <Coffee className="w-5 h-5 text-white" />
          </div>
          <Link
            href="/admin"
            className="font-bold text-xl tracking-wider hover:text-amber-500 transition-colors duration-200"
          >
            <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent font-extrabold">
              BIZ
            </span>
            <span className="ml-1 text-white">Nest</span>
          </Link>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-xl hover:bg-slate-700 hover:text-amber-400 transition-colors"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-slate-700 pt-4">
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-3 p-3 rounded-xl w-full text-left hover:bg-slate-700 hover:text-amber-400 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};


// -------------------- MAIN DASHBOARD COMPONENT --------------------
export default function SalesDashboard() {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 border-t-amber-500 animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "staff") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied 🔒</h1>
          <p className="text-lg text-gray-300">
            You do not have staff privileges to view this page.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="mt-6 px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-full shadow-md transition-colors"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen flex">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 space-y-12 text-gray-200">
        
        {/* Section 1: Overview Metrics */}
        <motion.section
          id="overview"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Overview" icon={<LayoutDashboard size={20} />} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPIItem title="Total Sales Today" value={`₹${KpiData.totalSalesToday.toLocaleString('en-IN')}`} icon={<DollarSign size={24} />} />
            <KPIItem title="Total Orders Today" value={KpiData.totalOrdersToday.toString()} icon={<ShoppingCart size={24} />} />
            <KPIItem title="Average Order Value" value={`₹${KpiData.averageOrderValue.toFixed(2)}`} icon={<Percent size={24} />} />
            <KPIItem title="Top Selling Item" value={KpiData.topSellingItem} icon={<Coffee size={24} />} />
          </div>
        </motion.section>

        {/* Section 2: Sales Trends */}
        <motion.section
          id="trends"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Sales Trends" icon={<TrendingUp size={20} />} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Daily Sales & Orders (Last 7 Days)">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={salesTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#f59e0b" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="orders" stroke="#ef4444" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Orders by Category">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={categorySalesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                  <Bar dataKey="sales" fill="#f59e0b" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </motion.section>

        {/* Section 3: Recent Orders Table */}
        <motion.section
          id="orders"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Recent Orders" icon={<ListOrdered size={20} />} />
          <TableCard title="">
            <table className="w-full text-left table-auto">
              <thead>
                <tr className="bg-amber-900 text-amber-100">
                  <th className="p-3 rounded-tl-lg">Order ID</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Items Purchased</th>
                  <th className="p-3">Total Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 rounded-tr-lg">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentOrdersData.map((order, index) => (
                  <tr key={index} className="border-b border-gray-700 hover:bg-slate-700">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.items}</td>
                    <td className="p-3">₹{order.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status === 'Paid' ? 'bg-green-600 text-green-100' : 'bg-red-600 text-red-100'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3">{order.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TableCard>
        </motion.section>

        {/* Section 4: Best & Worst Performing Items */}
        <motion.section
          id="items"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Item Performance" icon={<Package size={20} />} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TableCard title="Top 5 Best-Selling Items">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-amber-900 text-amber-100">
                    <th className="p-3 rounded-tl-lg">Item</th>
                    <th className="p-3">Sales Count</th>
                    <th className="p-3 rounded-tr-lg">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {bestSellingItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-slate-700">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.salesCount}</td>
                      <td className="p-3">₹{item.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
            <TableCard title="Bottom 5 Slow-Selling Items">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-amber-900 text-amber-100">
                    <th className="p-3 rounded-tl-lg">Item</th>
                    <th className="p-3">Sales Count</th>
                    <th className="p-3 rounded-tr-lg">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {slowSellingItems.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-slate-700">
                      <td className="p-3">{item.name}</td>
                      <td className="p-3">{item.salesCount}</td>
                      <td className="p-3">₹{item.revenue.toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TableCard>
          </div>
        </motion.section>

        {/* Section 5: Revenue Breakdown */}
        <motion.section
          id="revenue"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Revenue Breakdown" icon={<PiggyBank size={20} />} />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Sales by Payment Method">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentMethodData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {paymentMethodData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name]}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
            <ChartCard title="Sales by Category">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categorySalesData}
                    dataKey="sales"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label={({ name, percent }) => `${name} ${(percent ?? 0 * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {categorySalesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_CHART_COLORS[index % PIE_CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number, name: string) => [`₹${value.toLocaleString('en-IN')}`, name]}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                    itemStyle={{ color: '#cbd5e1' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        </motion.section>

        {/* Section 6: Export & Reports */}
        <motion.section
          id="reports"
          className="space-y-6"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <SectionTitle title="Export & Reports" icon={<FileText size={20} />} />
          <div className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex-1 w-full md:w-auto">
              <p className="text-sm text-gray-400 mb-2">Filter by Date Range:</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <input type="date" className="p-2 rounded-lg bg-slate-900 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
                <input type="date" className="p-2 rounded-lg bg-slate-900 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg transition-colors shadow-md w-full">
                Download CSV
              </button>
              <button className="px-6 py-3 bg-slate-600 hover:bg-slate-700 text-white font-bold rounded-lg transition-colors shadow-md w-full">
                Download PDF
              </button>
            </div>
          </div>
        </motion.section>

      </main>
    </div>
  );
}
