import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  // Public pages that anyone can access
  const publicPaths = [
    "/login",
    "/admin/login",
    "/staff/login",
    "/signup",
    "/admin/signup",
    "/staff/signup",
    "/api/auth"
  ];

  if (publicPaths.some(path => pathname.startsWith(path)) || pathname === "/") {
    return NextResponse.next();
  }

  // Check JWT token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Role-based protection
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  if (pathname.startsWith("/staff") && token.role !== "staff") {
    return NextResponse.redirect(new URL("/unauthorized", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/customer/:path*"
  ],
};
