"use client";
import { useState, ChangeEvent, FormEvent } from "react";

export default function MenuManager() {
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: "",
    calories: "",
    ingredients: "",
    allergens: "",
    dietary: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();

    const item = {
      name: newItem.name,
      description: newItem.description,
      price: parseFloat(newItem.price),
      category: newItem.category,
      image: newItem.image,
      calories: parseInt(newItem.calories),
      ingredients: newItem.ingredients.split(",").map((i) => i.trim()),
      allergens: newItem.allergens.split(",").map((a) => a.trim()),
      dietary: newItem.dietary.split(",").map((d) => d.trim()),
    };

    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
    });

    const data = await res.json();
    setMenuItems([...menuItems, data]);
    setNewItem({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      calories: "",
      ingredients: "",
      allergens: "",
      dietary: "",
    });
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100">
      <h2 className="text-2xl font-semibold text-[#3b2b20] mb-4">Menu Management</h2>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="space-y-3 mb-6">
        <input name="name" value={newItem.name} onChange={handleChange} placeholder="Name" required className="w-full p-2 border rounded text-black" />
        <textarea name="description" value={newItem.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded text-black" />
        <input name="price" type="number" step="0.01" value={newItem.price} onChange={handleChange} placeholder="Price" required className="w-full p-2 border rounded text-black" />
        <input name="category" value={newItem.category} onChange={handleChange} placeholder="Category" className="w-full p-2 border rounded text-black" />
        <input name="image" value={newItem.image} onChange={handleChange} placeholder="Image URL" className="w-full p-2 border rounded text-black" />
        <input name="calories" type="number" value={newItem.calories} onChange={handleChange} placeholder="Calories" className="w-full p-2 border rounded text-black" />
        <input name="ingredients" value={newItem.ingredients} onChange={handleChange} placeholder="Ingredients (comma-separated)" className="w-full p-2 border rounded text-black" />
        <input name="allergens" value={newItem.allergens} onChange={handleChange} placeholder="Allergens (comma-separated)" className="w-full p-2 border rounded text-black" />
        <input name="dietary" value={newItem.dietary} onChange={handleChange} placeholder="Dietary (comma-separated)" className="w-full p-2 border rounded text-black" />

        <button type="submit" className="w-full bg-amber-500 text-white font-bold py-2 rounded-lg">
          Add Item
        </button>
      </form>

      {/* List */}
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {menuItems.map((item) => (
          <li key={item._id} className="flex justify-between items-center bg-amber-50 p-3 rounded-lg border border-amber-100">
            <span className="text-black">{item.name} - ₹{item.price}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
