// app/api/menu/route.ts
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import MenuItem from "../../../models/MenuItem";

const uri = process.env.MONGODB_URI as string;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { dbName: "test" });
  }
}

// ✅ Categories allowed in UI
const ALLOWED_CATEGORIES = ["Coffee", "Cafe", "Burgers", "Desserts"];

export async function GET() {
  try {
    await connectDB();
    const items = await MenuItem.find({});
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // ✅ Normalize fields
    const normalizedData = {
      ...data,
      image: data.image || data.imageUrl || "", // ensure `image` always set
      category: normalizeCategory(data.category),
    };

    if (!normalizedData.image) {
      return NextResponse.json(
        { error: "Image is required" },
        { status: 400 }
      );
    }

    if (!ALLOWED_CATEGORIES.includes(normalizedData.category)) {
      return NextResponse.json(
        { error: `Category must be one of: ${ALLOWED_CATEGORIES.join(", ")}` },
        { status: 400 }
      );
    }

    const newItem = await MenuItem.create(normalizedData);
    return NextResponse.json(newItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ✅ Helper: fix category casing / plural
function normalizeCategory(category: string): string {
  if (!category) return "Cafe"; // fallback
  const lower = category.toLowerCase();
  if (lower.startsWith("coffee")) return "Coffee";
  if (lower.startsWith("cafe")) return "Cafe";
  if (lower.startsWith("burger")) return "Burgers";
  if (lower.startsWith("dessert")) return "Desserts";
  return category; // unknown → saved as is
}
