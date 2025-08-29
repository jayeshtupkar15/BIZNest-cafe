import { NextResponse } from "next/server";
import Staff from "@/models/staff";
import { dbConnect } from "@/lib/db";

export async function GET() {
  await dbConnect();
  const staff = await Staff.find().select("-password"); // don’t return password
  return NextResponse.json(staff);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const { id } = await req.json();
  await Staff.findByIdAndDelete(id);
  return NextResponse.json({ message: "Staff deleted" });
}
