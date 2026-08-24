import React from "react";
import Link from "next/link";
import { Wrench, Phone, Mail, MapPin, Star } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const services = [
    "Electrical Repairs",
    "Plumbing & Piping",
    "AC & Appliance Service",
    "Carpentry & Renovation",
    "Painting & Finishing",
  ];

  const platform = [
    { label: "Browse Services", href: "/services" },
    { label: "Become a Technician", href: "/auth/register" },
    { label: "Customer Portal", href: "/auth/login" },
    { label: "Book Now", href: "/services" },
  ];

  return (
    <footer className="border-t border-border bg-foreground text-white">
      <div className="container mx-auto px-4 sm:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">

          {/* Brand */}
          <div className="space-y-5 sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-white shadow-sm">
                <Wrench className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight">
                FixIt<span className="text-primary">Now</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              Bangladesh&apos;s trusted home service marketplace — connecting verified professionals with homeowners for fast, transparent repairs.
            </p>
            {/* Rating badge */}
            <div className="flex items-center gap-2 bg-white/8 rounded-xl px-3 py-2 w-fit border border-white/10">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-3.5 w-3.5 text-amber-400 fill-current" />
                ))}
              </div>
              <span className="text-xs font-semibold text-white/80">4.9 / 5 — 18k+ Reviews</span>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <Link href="/services" className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-primary/60 flex-shrink-0" />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5">
              {platform.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/60 hover:text-primary transition-colors flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-primary/60 flex-shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                +880 1700-123456
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                support@fixitnow.com
              </li>
              <li className="flex items-center gap-2 text-sm text-white/60">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                Dhaka, Bangladesh
              </li>
            </ul>

            <div className="pt-2">
              <h5 className="text-xs font-bold text-white/50 uppercase tracking-wider mb-2">Legal</h5>
              <div className="flex flex-col gap-1.5 text-xs text-white/50">
                <span className="hover:text-white/80 transition-colors cursor-pointer">Privacy Policy</span>
                <span className="hover:text-white/80 transition-colors cursor-pointer">Terms of Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <span>© {year} FixItNow Home Services Platform. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              All systems operational
            </span>
            <span>Made with ❤️ in Bangladesh</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
