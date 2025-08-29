import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import Staff from "@/models/staff";
import { dbConnect } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { name, email, password, role, designation, phoneNumber } = await req.json();

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Block admin registration
    if (role === "admin") {
      return NextResponse.json(
        { error: "Admin cannot be registered. Use hardcoded credentials." },
        { status: 403 }
      );
    }

    // Staff registration
    if (role === "staff") {
      const existingStaff = await Staff.findOne({ email });
      if (existingStaff) {
        return NextResponse.json(
          { error: "Staff already exists" },
          { status: 400 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const staff = await Staff.create({
        name,
        email,
        phone: phoneNumber,   // ✅ required by schema
        password: hashedPassword,
        role: designation     // ✅ role comes from designation (Manager, Chef, etc.)
      });

      return NextResponse.json(
        { message: "Staff registered successfully", staff },
        { status: 201 }
      );
    }

    // Default → Customer registration
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "customer",
    });

    return NextResponse.json(
      { message: "User registered successfully", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
