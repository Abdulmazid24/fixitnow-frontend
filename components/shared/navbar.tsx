"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Wrench, LogOut, LayoutDashboard, Menu, X } from "lucide-react";

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => setMobileMenuOpen(false), [pathname]);

  const getDashboardLink = () => {
    if (!user) return "/auth/login";
    if (user.role === "ADMIN") return "/dashboard/admin";
    if (user.role === "TECHNICIAN") return "/dashboard/technician";
    return "/dashboard/customer";
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Browse Services" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const roleColor: Record<string, string> = {
    ADMIN: "bg-red-500/10 text-red-600",
    TECHNICIAN: "bg-blue-500/10 text-blue-600",
    CUSTOMER: "bg-emerald-500/10 text-emerald-600",
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-white/80 backdrop-blur border-b border-border/50"
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm group-hover:shadow-md transition-shadow">
            <Wrench className="h-5 w-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
            FixIt<span className="text-primary">Now</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? "text-primary bg-primary/8"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {label}
              {isActive(href) && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-0.5 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link href={getDashboardLink()}>
                <Button variant="outline" size="sm" className="gap-2 h-9">
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  Dashboard
                </Button>
              </Link>
              <div className="flex items-center gap-2 pl-2 border-l border-border">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-sm">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold leading-tight">{user.name}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-bold capitalize w-fit ${roleColor[user.role] || "bg-muted text-muted-foreground"}`}>
                    {user.role.toLowerCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={logout}
                title="Log Out"
                className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="h-9">Log In</Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="h-9 px-5 font-semibold shadow-sm">
                  Get Started →
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-white/98 backdrop-blur-md px-4 pt-3 pb-6 space-y-1 shadow-lg">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(href)
                  ? "bg-primary/8 text-primary font-semibold"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-3 border-t border-border space-y-2 mt-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{user.name}</div>
                    <div className={`text-[10px] px-1.5 py-0.5 rounded font-bold w-fit capitalize ${roleColor[user.role] || ""}`}>
                      {user.role.toLowerCase()}
                    </div>
                  </div>
                </div>
                <Link href={getDashboardLink()}>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Button>
                </Link>
                <Button variant="destructive" className="w-full justify-start gap-2" onClick={logout}>
                  <LogOut className="h-4 w-4" /> Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">Log In</Button>
                </Link>
                <Link href="/auth/register">
                  <Button className="w-full font-semibold">Get Started →</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
