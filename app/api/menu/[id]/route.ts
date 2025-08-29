import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import MenuItem from "@/models/MenuItem";

const uri = process.env.MONGODB_URI as string;

async function connectDB() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(uri, { dbName: "test" });
  }
}

// -------------------- PUT → Update a menu item --------------------
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const body = await req.json();

    const updatedItem = await MenuItem.findByIdAndUpdate(id, body, { new: true });

    if (!updatedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// -------------------- DELETE → Remove a menu item --------------------
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;

    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Item deleted successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
