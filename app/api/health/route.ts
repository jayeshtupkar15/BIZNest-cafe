import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";

export async function GET() {
  await dbConnect();
  return NextResponse.json({ status: "ok", message: "API and DB working ✅" });
}
