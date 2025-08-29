"use client";

import { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Plus, Pencil, Trash2, Coffee } from "lucide-react";

type MenuItem = {
  _id?: string;
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

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<Partial<MenuItem>>({});
  const [loading, setLoading] = useState(false);

  // Fetch items
  useEffect(() => {
    async function fetchItems() {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenuItems(data);
    }
    fetchItems();
  }, []);

  // Open Modal
  const openModal = (item?: MenuItem) => {
    setEditingItem(item || null);
    setForm(item || {});
    setIsOpen(true);
  };

  // Save (Add / Update)
  const saveItem = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        editingItem ? `/api/menu/${editingItem._id}` : "/api/menu",
        {
          method: editingItem ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      if (!res.ok) throw new Error("Failed to save item");
      const newItem = await res.json();

      if (editingItem) {
        setMenuItems((prev) =>
          prev.map((item) => (item._id === editingItem._id ? newItem : item))
        );
      } else {
        setMenuItems((prev) => [...prev, newItem]);
      }
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Delete
  const deleteItem = async (id?: string) => {
    if (!id) return;
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    setMenuItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <div className="p-6 bg-gradient-to-br from-[#3e2723] via-[#4e342e] to-[#6d4c41] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-extrabold flex items-center gap-2">
          <Coffee size={30} /> Cafe Menu Manager
        </h2>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          <Plus size={18} /> Add Item
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <div
            key={item._id}
            className="bg-white text-black rounded-xl shadow-md hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 overflow-hidden"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="font-bold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.category}</p>
              <p className="text-green-700 font-bold mt-2">₹{item.price}</p>
              <p className="text-xs text-gray-600 mt-1 line-clamp-2">{item.description}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openModal(item)}
                  className="flex-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Pencil size={16} /> Edit
                </button>
                <button
                  onClick={() => deleteItem(item._id)}
                  className="flex-1 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal (Form fields unchanged ✅) */}
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-bold mb-4 text-black">
              {editingItem ? "Edit Item" : "Add Item"}
            </Dialog.Title>

            {/* --- SAME FORM FIELDS --- */}
            <div className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
              <input type="text" placeholder="Item name"
                value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <textarea placeholder="Description"
                value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="number" placeholder="Price"
                value={form.price || ""} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="text" placeholder="Category"
                value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="text" placeholder="Image URL"
                value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="number" placeholder="Calories"
                value={form.calories || ""} onChange={(e) => setForm({ ...form, calories: Number(e.target.value) })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="text" placeholder="Ingredients (comma separated)"
                value={form.ingredients?.join(", ") || ""} onChange={(e) => setForm({ ...form, ingredients: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="text" placeholder="Allergens (comma separated)"
                value={form.allergens?.join(", ") || ""} onChange={(e) => setForm({ ...form, allergens: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
              <input type="text" placeholder="Dietary (comma separated)"
                value={form.dietary?.join(", ") || ""} onChange={(e) => setForm({ ...form, dietary: e.target.value.split(",").map((s) => s.trim()) })}
                className="w-full p-2 border rounded-lg text-black placeholder-gray-600" />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button onClick={() => setIsOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg">
                Cancel
              </button>
              <button onClick={saveItem} disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
}
