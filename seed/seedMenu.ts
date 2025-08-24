// seed/seedMenu.ts
import mongoose from "mongoose";
import MenuItem, { IMenuItem } from "../models/MenuItem";

const MONGO_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/cafe";

const menuItems: Partial<IMenuItem>[] = [
  {
    name: "Cappuccino",
    description: "Rich espresso with steamed milk and foam.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    name: "Latte",
    description: "Smooth blend of espresso and steamed milk.",
    price: 170,
    imageUrl: "https://images.unsplash.com/photo-1511920170033-f8396924c348",
  },
  {
    name: "Mocha",
    description: "Espresso with chocolate and steamed milk.",
    price: 180,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
  },
  {
    name: "Americano",
    description: "Espresso with hot water for a smooth flavor.",
    price: 120,
    imageUrl: "https://images.unsplash.com/photo-1527168027773-0cc890c4f62f",
  },
  {
    name: "Espresso",
    description: "Strong and rich coffee shot.",
    price: 100,
    imageUrl: "https://images.unsplash.com/photo-1515442261605-65987783cb6c",
  },
  {
    name: "Macchiato",
    description: "Espresso topped with a dash of milk foam.",
    price: 130,
    imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  },
  {
    name: "Flat White",
    description: "Velvety espresso and steamed milk.",
    price: 160,
    imageUrl: "https://images.unsplash.com/photo-1527168027773-0cc890c4f62f",
  },
  {
    name: "Iced Coffee",
    description: "Cold brew served over ice.",
    price: 140,
    imageUrl: "https://images.unsplash.com/photo-1541167760496-1628856ab772",
  },
  {
    name: "Frappuccino",
    description: "Blended iced coffee with whipped cream.",
    price: 200,
    imageUrl: "https://images.unsplash.com/photo-1527168027773-0cc890c4f62f",
  },
  {
    name: "Hot Chocolate",
    description: "Rich chocolate drink topped with cream.",
    price: 150,
    imageUrl: "https://images.unsplash.com/photo-1515442261605-65987783cb6c",
  },
];

async function seedMenu() {
  try {
    await mongoose.connect(MONGO_URI, { dbName: "cafe" });
    console.log("✅ Connected to MongoDB");

    await MenuItem.deleteMany({});
    await MenuItem.insertMany(menuItems);

    console.log("✅ Menu items seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding menu items:", err);
    process.exit(1);
  }
}

seedMenu();
