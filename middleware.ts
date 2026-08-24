import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const role = request.cookies.get("user_role")?.value;

  const { pathname } = request.nextUrl;

  // Protected Dashboard Routes
  if (pathname.startsWith("/dashboard")) {
    if (!token || !role) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Customer role restriction
    if (pathname.startsWith("/dashboard/customer") && role !== "CUSTOMER") {
      const redirectUrl = role === "ADMIN" ? "/dashboard/admin" : "/dashboard/technician";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Technician role restriction
    if (pathname.startsWith("/dashboard/technician") && role !== "TECHNICIAN") {
      const redirectUrl = role === "ADMIN" ? "/dashboard/admin" : "/dashboard/customer";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Admin role restriction
    if (pathname.startsWith("/dashboard/admin") && role !== "ADMIN") {
      const redirectUrl = role === "TECHNICIAN" ? "/dashboard/technician" : "/dashboard/customer";
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }
  }

  // Auth pages redirect if already logged in
  if ((pathname === "/auth/login" || pathname === "/auth/register") && token && role) {
    let dashboardPath = "/dashboard/customer";
    if (role === "TECHNICIAN") dashboardPath = "/dashboard/technician";
    if (role === "ADMIN") dashboardPath = "/dashboard/admin";
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/login", "/auth/register"],
};
