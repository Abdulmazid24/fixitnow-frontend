import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import type { IRole } from "@/lib/types";
import { decodeToken } from "./utils/jwt";

const AUTH_ROUTES = ["/login", "/register", "/auth/login", "/auth/register"];

const ROUTE_ROLES: Record<string, IRole[]> = {
  "/dashboard/customer": ["CUSTOMER", "ADMIN"],
  "/dashboard/technician": ["TECHNICIAN", "ADMIN"],
  "/dashboard/admin": ["ADMIN"],
};

const matches = (pathname: string, route: string) =>
  pathname === route || pathname.startsWith(`${route}/`);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const goTo = (path: string) => NextResponse.redirect(new URL(path, request.url));

  // The role comes off the token or cookie
  const token = request.cookies.get("accessToken")?.value || request.cookies.get("auth_token")?.value;
  const decodedRole = decodeToken(token)?.role;
  const cookieRole = request.cookies.get("user_role")?.value as IRole | undefined;
  const role = decodedRole || cookieRole;

  // Signed-in users have no reason to see the login page
  if (AUTH_ROUTES.includes(pathname)) {
    if (role) {
      if (role === "ADMIN") return goTo("/dashboard/admin");
      if (role === "TECHNICIAN") return goTo("/dashboard/technician");
      return goTo("/dashboard/customer");
    }
    return NextResponse.next();
  }

  const allowedRoles = Object.entries(ROUTE_ROLES).find(([route]) =>
    matches(pathname, route)
  )?.[1];

  if (!allowedRoles) return NextResponse.next();

  // Signed out -> login, and remember where they were headed
  if (!role) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Signed in but wrong role
  if (!allowedRoles.includes(role)) {
    if (role === "ADMIN") return goTo("/dashboard/admin");
    if (role === "TECHNICIAN") return goTo("/dashboard/technician");
    return goTo("/dashboard/customer");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)"],
};
