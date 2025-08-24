"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import {
  Coffee,
  X,
  Plus,
} from "lucide-react";
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
} from "recharts";


// Extend Session type to include the 'role'
interface CustomSession {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
}

// -------------------- Placeholder Components (for a self-contained file) --------------------
// In a real project, these would be in their own files in the `components/` directory.

/**
 * A basic Toast notification component.
 * @param {object} props - The component props.
 * @param {string} props.message - The message to display.
 * @param {boolean} props.isVisible - Whether the toast is visible.
 * @param {function} props.onDismiss - Function to call to dismiss the toast.
 */
const Toast = ({ message, isVisible, onDismiss }: { message: string; isVisible: boolean; onDismiss: () => void }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-xl shadow-xl bg-slate-700 text-white z-[100] transition-all duration-300 animate-slide-in-up">
      <div className="flex items-center space-x-2">
        <span>{message}</span>
        <button onClick={onDismiss} className="text-gray-400 hover:text-white transition-colors">
          <X size={16} />
        </button>
      </div>
      <style jsx>{`
        @keyframes slide-in-up {
          from { transform: translate(-50%, 50%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .animate-slide-in-up { animation: slide-in-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

const cardVariants = {
  initial: { opacity: 0, y: 50, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
  hover: { scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }
};

const containerVariants = {
  animate: { transition: { staggerChildren: 0.1 } }
};

const DashboardCards = () => (
  <motion.div
    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    variants={containerVariants}
    initial="initial"
    animate="animate"
  >
    {/* Card Placeholder 1 */}
    <motion.div
      className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 flex flex-col items-center justify-center space-y-2"
      variants={cardVariants}
      whileHover="hover"
    >
      <span className="text-4xl font-bold text-amber-400">42</span>
      <p className="text-gray-400">Total Orders</p>
    </motion.div>
    {/* Card Placeholder 2 */}
    <motion.div
      className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 flex flex-col items-center justify-center space-y-2"
      variants={cardVariants}
      whileHover="hover"
    >
      <span className="text-4xl font-bold text-amber-400">$1,234</span>
      <p className="text-gray-400">Revenue Today</p>
    </motion.div>
    {/* Card Placeholder 3 */}
    <motion.div
      className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 flex flex-col items-center justify-center space-y-2"
      variants={cardVariants}
      whileHover="hover"
    >
      <span className="text-4xl font-bold text-amber-400">18</span>
      <p className="text-gray-400">Menu Items</p>
    </motion.div>
    {/* Card Placeholder 4 */}
    <motion.div
      className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 flex flex-col items-center justify-center space-y-2"
      variants={cardVariants}
      whileHover="hover"
    >
      <span className="text-4xl font-bold text-amber-400">3</span>
      <p className="text-gray-400">Staff Members</p>
    </motion.div>
  </motion.div>
);

// Dummy data for charts
const salesData = [
  { name: 'Mon', sales: 4000, orders: 2400 },
  { name: 'Tue', sales: 3000, orders: 1398 },
  { name: 'Wed', sales: 2000, orders: 9800 },
  { name: 'Thu', sales: 2780, orders: 3908 },
  { name: 'Fri', sales: 1890, orders: 4800 },
  { name: 'Sat', sales: 2390, orders: 3800 },
  { name: 'Sun', sales: 3490, orders: 4300 },
];

const categoryData = [
  { name: 'Coffee', sales: 400 },
  { name: 'Pastries', sales: 300 },
  { name: 'Sandwiches', sales: 200 },
  { name: 'Drinks', sales: 278 },
  { name: 'Desserts', sales: 189 },
];

const LineChart = () => (
  <div className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 h-96">
    <h3 className="text-xl font-semibold mb-4 text-amber-400">Sales & Orders Trend</h3>
    <ResponsiveContainer width="100%" height="80%">
      <RechartsLineChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  </div>
);

const BarChart = () => (
  <div className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700 h-96">
    <h3 className="text-xl font-semibold mb-4 text-amber-400">Sales by Category</h3>
    <ResponsiveContainer width="100%" height="80%">
      <RechartsBarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
  </div>
);

const SalesReport = () => (
  <div className="bg-slate-800 p-6 rounded-3xl shadow-lg border border-amber-700">
    <h3 className="text-xl font-semibold mb-4 text-amber-400">Detailed Sales Report</h3>
    <div className="overflow-x-auto">
      <table className="w-full text-left table-auto">
        <thead>
          <tr className="bg-amber-900 text-amber-100">
            <th className="p-3 rounded-l-lg">Date</th>
            <th className="p-3">Total Sales</th>
            <th className="p-3">Orders</th>
            <th className="p-3 rounded-r-lg">Top Item</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-700 hover:bg-slate-700 text-gray-300">
            <td className="p-3">2023-10-26</td>
            <td className="p-3">$250.50</td>
            <td className="p-3">12</td>
            <td className="p-3">Espresso</td>
          </tr>
          <tr className="border-b border-gray-700 hover:bg-slate-700 text-gray-300">
            <td className="p-3">2023-10-25</td>
            <td className="p-3">$320.00</td>
            <td className="p-3">18</td>
            <td className="p-3">Cheeseburger</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

// -------------------- New Admin-specific Navbar --------------------
const AdminNavbar = () => {
  const router = useRouter();
  const { data: session } = useSession() as { data: CustomSession | null };

  const handleSignOut = async () => {
    // Implement sign out logic here
    console.log("Signing out...");
    router.push("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full z-20 py-4 backdrop-blur-sm bg-slate-900/80 shadow-lg border-b border-amber-700">
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
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
            <span className="ml-1 text-white">Nest Admin</span>
          </Link>
        </div>
        {/* User Info & Logout Button */}
        <div className="flex items-center gap-4">
          {session?.user?.name && (
            <span className="text-gray-400 font-medium hidden sm:inline">
              Welcome, {session.user.name.split(" ")[0]}!
            </span>
          )}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200 shadow-md"
            onClick={handleSignOut}
          >
            Logout
          </motion.button>
        </div>
      </nav>
    </header>
  );
};


// -------------------- Main Admin Dashboard Component --------------------
export default function AdminDashboard() {
  const { data: session, status } = useSession() as {
    data: CustomSession | null;
    status: "loading" | "authenticated" | "unauthenticated";
  };
  const router = useRouter();

  // ------------------- UI State & Data -------------------
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState({ message: "", isVisible: false });
  // Updated form state to include all original fields
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    calories: "",
    ingredients: "",
    allergens: "",
    dietary: "",
  });

  // ------------------- Data Fetching -------------------
  useEffect(() => {
    const fetchMenu = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("/api/menu");
        if (!res.ok) throw new Error("Failed to fetch menu.");
        const data = await res.json();
        setMenuItems(data);
      } catch (error: any) {
        showToast(`Error: ${error.message}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMenu();
  }, []);

  // ------------------- UI Helpers -------------------
  const showToast = (message: string) => {
    setToast({ message, isVisible: false }); // Reset to trigger animation
    setTimeout(() => setToast({ message, isVisible: true }), 10);
    setTimeout(() => setToast({ message, isVisible: false }), 4000); // Auto-hide
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Re-implementing logic to parse new fields
    const newItem = {
      ...form,
      price: parseFloat(form.price),
      calories: parseInt(form.calories),
      ingredients: form.ingredients.split(",").map((i) => i.trim()),
      allergens: form.allergens.split(",").map((a) => a.trim()),
      dietary: form.dietary.split(",").map((d) => d.trim()),
    };

    try {
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (!res.ok) throw new Error("Failed to add new item.");
      
      const created = await res.json();
      setMenuItems((prev) => [...prev, created]);
      // Resetting form state to include new fields
      setForm({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        calories: "",
        ingredients: "",
        allergens: "",
        dietary: "",
      });
      showToast("Item added successfully! ✅");
    } catch (error: any) {
      showToast(`Error adding item: ${error.message}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      const res = await fetch(`/api/menu/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item.");
      setMenuItems((prev) => prev.filter((item) => item._id !== id));
      showToast("Item deleted successfully! 🗑️");
    } catch (error: any) {
      showToast(`Error deleting item: ${error.message}`);
    }
  };

  // ------------------- Authorization & Loading -------------------
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24 border-t-amber-500 animate-spin"></div>
      </div>
    );
  }

  if (status === "unauthenticated" || session?.user?.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied 🔒</h1>
          <p className="text-lg text-gray-300">
            You do not have administrative privileges to view this page.
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

  // ------------------- Main UI -------------------
  return (
    <div className="bg-slate-900 min-h-screen">
      <AdminNavbar />
      <main className="pt-28 pb-12 px-6 max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-black text-center mb-8 bg-gradient-to-r from-amber-400 via-orange-300 to-red-300 bg-clip-text text-transparent drop-shadow-lg"
        >
          Admin Dashboard 👑
        </motion.h1>

        {/* Section 1: Key Metrics Cards */}
        <DashboardCards />

        {/* Section 2: Sales & Orders Charts */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <LineChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <BarChart />
          </motion.div>
        </div>

        {/* Section 3: Menu Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700"
        >
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Menu Manager 🍽️
          </h2>
          {isLoading ? (
            <p className="text-center text-gray-400">Loading menu items...</p>
          ) : (
            <motion.ul
              className="space-y-3"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              {menuItems.length > 0 ? (
                menuItems.map((item) => (
                  <motion.li
                    key={item._id}
                    className="flex justify-between items-center bg-slate-700 p-3 rounded-lg text-gray-200"
                    variants={cardVariants}
                    whileHover="hover"
                  >
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-sm text-gray-400">{item.category}</p>
                    </div>
                    <motion.button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-400 font-semibold px-3 py-1 rounded-full hover:bg-red-900 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Remove
                    </motion.button>
                  </motion.li>
                ))
              ) : (
                <p className="text-center text-gray-400">No menu items found.</p>
              )}
            </motion.ul>
          )}
        </motion.div>

        {/* Section 4: Add New Menu Item Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700"
        >
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Add New Item ➕
          </h2>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="Item Name"
              required
              className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
            />
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="price"
                type="number"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              />
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              />
              <input
                name="calories"
                type="number"
                value={form.calories}
                onChange={handleChange}
                placeholder="Calories"
                className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              />
              <input
                name="ingredients"
                type="text"
                value={form.ingredients}
                onChange={handleChange}
                placeholder="Ingredients (comma-separated)"
                className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              />
            </div>
            <textarea
              name="allergens"
              value={form.allergens}
              onChange={handleChange}
              placeholder="Allergens (comma-separated)"
              className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              rows={2}
            />
            <textarea
              name="dietary"
              value={form.dietary}
              onChange={handleChange}
              placeholder="Dietary (e.g., Vegetarian, Vegan, GF - comma-separated)"
              className="w-full p-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-shadow bg-slate-900 text-white placeholder-gray-400"
              rows={2}
            />
            <motion.button
              type="submit"
              className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg shadow-md transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Add Item
            </motion.button>
          </form>
        </motion.div>

        {/* Section 5: Staff Manager */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-slate-800 p-6 rounded-3xl shadow-xl border border-amber-700"
        >
          <h2 className="text-3xl font-bold text-amber-400 mb-4">
            Staff Manager 👩‍🍳
          </h2>
          <p className="text-gray-400 italic">
            (Functionality to be implemented, using sample data for UI)
          </p>
          <ul className="space-y-3 mt-4 text-gray-300">
            {[
              { id: 1, name: "Alice Johnson", role: "Barista" },
              { id: 2, name: "Michael Lee", role: "Chef" },
            ].map((s) => (
              <li
                key={s.id}
                className="flex justify-between items-center bg-slate-700 p-3 rounded-lg"
              >
                <span>
                  {s.name} — <span className="text-gray-400">{s.role}</span>
                </span>
                <button className="text-red-400 font-semibold px-3 py-1 rounded-full hover:bg-red-900 transition-colors">
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Toast component */}
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          onDismiss={() => setToast({ ...toast, isVisible: false })}
        />
      </main>
    </div>
  );
}
