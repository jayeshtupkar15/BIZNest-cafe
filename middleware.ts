import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // ✅ Public routes (no login required)
const publicPaths = [
  "/login",
  "/signup",
  "/admin/login",
  "/staff/login",
  "/staff/signup",     // ✅ allow staff signup
  "/customer/login",
  "/customer/signup",  // ✅ allow customer signup
  "/menu",
  "/api/auth"
];


  if (publicPaths.some(path => pathname.startsWith(path)) || pathname === "/") {
    return NextResponse.next();
  }

  // ✅ Validate token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // ✅ Role-based protection
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/staff") && token.role !== "staff") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/customer") && token.role !== "customer") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/customer/:path*",
    "/menu",
  ],
};
