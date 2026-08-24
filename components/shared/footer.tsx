import React from "react";
import Link from "next/link";
import { Wrench } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/40 text-muted-foreground">
      <div className="container mx-auto px-4 py-12 sm:px-6 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Wrench className="h-4 w-4" />
              </div>
              <span>FixItNow</span>
            </Link>
            <p className="text-sm">
              Your trusted home service platform connecting qualified professionals with homeowners for fast, reliable, and transparent repairs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Electrical Repairs
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Plumbing & Piping
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  AC & Appliance Service
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Carpentry & Renovations
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auth/register" className="hover:text-foreground transition-colors">
                  Become a Technician
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Book a Technician
                </Link>
              </li>
              <li>
                <Link href="/auth/login" className="hover:text-foreground transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact / Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Support & Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Help & FAQs
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="hover:text-foreground transition-colors cursor-pointer">
                  Terms of Service
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} FixItNow Home Services Platform. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
