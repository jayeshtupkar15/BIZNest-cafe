import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import Order from "@/models/Order"; // Order schema should have status enum: ["Pending","In-Progress","Completed"]

// GET → fetch all orders
export async function GET() {
  try {
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }); // latest first
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("❌ Fetch Orders Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// POST → place a new order (called from customer checkout page)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const { customerName, items, total } = body;

    if (!customerName || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Invalid order data" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      customerName,
      items,
      total,
      status: "Pending", // default status
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("❌ Create Order Error:", error);
    return NextResponse.json(
      { error: "Failed to place order" },
      { status: 500 }
    );
  }
}
