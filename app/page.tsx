"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wrench,
  Zap,
  Droplet,
  Wind,
  Hammer,
  Paintbrush,
  Search,
  CheckCircle2,
  Star,
  ShieldCheck,
  Clock,
  ArrowRight,
  MapPin,
  DollarSign,
  UserCheck,
} from "lucide-react";
import { FEATURED_CATEGORIES, MOCK_SERVICES, MOCK_TECHNICIANS } from "@/lib/marketplace-data";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/services?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push("/services");
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Zap":
        return <Zap className="h-6 w-6 text-amber-500" />;
      case "Droplet":
        return <Droplet className="h-6 w-6 text-blue-500" />;
      case "Wind":
        return <Wind className="h-6 w-6 text-teal-500" />;
      case "Hammer":
        return <Hammer className="h-6 w-6 text-orange-500" />;
      default:
        return <Paintbrush className="h-6 w-6 text-purple-500" />;
    }
  };

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-background to-background pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="container mx-auto px-4 sm:px-6 text-center space-y-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-semibold text-primary">
            <ShieldCheck className="h-4 w-4" />
            <span>Trusted Home Services & Verified Professionals</span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-foreground">
            Fast, Reliable Repairs & <br className="hidden sm:inline" />
            <span className="text-primary">Home Services</span> On Demand
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Book certified electricians, plumbers, HVAC specialists, and carpenters in your area with upfront pricing and guaranteed quality.
          </p>

          {/* Search Bar Widget */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 p-2 bg-card rounded-2xl border border-border shadow-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services (e.g. Electrical Inspection, AC Repair, Plumbing)..."
                className="pl-11 h-12 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button type="submit" size="lg" className="h-12 px-8 rounded-xl gap-2 font-semibold">
              Search Services
            </Button>
          </form>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto text-left">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Background Checked</h4>
                <p className="text-[11px] text-muted-foreground">100% verified technicians</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Flexible Scheduling</h4>
                <p className="text-[11px] text-muted-foreground">Choose exact time slots</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border/60">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-foreground">Transparent Rates</h4>
                <p className="text-[11px] text-muted-foreground">No hidden charges</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Service Categories */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Popular Service Categories
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Explore qualified technicians across our core service domains.
            </p>
          </div>
          <Link href="/services">
            <Button variant="ghost" className="gap-1.5 text-primary">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/services?category=${encodeURIComponent(cat.name)}`}>
              <div className="group h-full p-5 rounded-2xl border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all space-y-3">
                <div className="p-3 rounded-xl bg-muted group-hover:bg-primary/10 transition-colors w-fit">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="font-semibold text-base text-foreground group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                    {cat.description}
                  </p>
                </div>
                <div className="text-[11px] font-medium text-primary">
                  {cat.serviceCount}+ active services
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="container mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Home Services
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Book top-rated service packages provided by certified technicians.
            </p>
          </div>
          <Link href="/services">
            <Button variant="outline" size="sm">
              Explore Market
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SERVICES.map((srv) => (
            <div key={srv.id} className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {srv.category}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{srv.rating}</span>
                    <span className="text-muted-foreground font-normal">({srv.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {srv.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {srv.description}
                </p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground pt-2">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span>{srv.location}</span>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-border/60 flex items-center justify-between mt-4">
                <div>
                  <span className="text-xs text-muted-foreground">Starting from</span>
                  <div className="text-lg font-extrabold text-foreground">${srv.price}</div>
                </div>
                <Link href={`/technicians/${srv.technicianId}`}>
                  <Button size="sm" className="gap-1 rounded-lg">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated Technicians */}
      <section className="bg-muted/30 py-16 border-y border-border">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Meet Top Rated Technicians
            </h2>
            <p className="text-sm text-muted-foreground">
              Directly hire certified specialists with verified work history and client reviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_TECHNICIANS.map((tech) => (
              <div key={tech.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      {tech.name.charAt(0)}
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-md text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{tech.rating}</span>
                      <span className="text-muted-foreground font-normal">({tech.reviewCount})</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-base text-foreground">{tech.name}</h3>
                      <span title="Verified Professional">
                        <UserCheck className="h-4 w-4 text-emerald-500" />
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> {tech.location} • {tech.experienceYears} yrs exp.
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-3">
                    {tech.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {tech.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] bg-muted px-2 py-0.5 rounded-md font-medium text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground">Rate</span>
                    <div className="text-base font-bold text-foreground">${tech.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span></div>
                  </div>
                  <Link href={`/technicians/${tech.id}`}>
                    <Button size="sm" variant="outline">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How FixItNow Works
          </h2>
          <p className="text-sm text-muted-foreground">
            Get your home issues resolved in 3 seamless steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-base">
              1
            </div>
            <h3 className="font-bold text-lg text-foreground">Browse & Select</h3>
            <p className="text-xs text-muted-foreground">
              Search by service type or browse technician profiles filtered by ratings, pricing, and locations.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-base">
              2
            </div>
            <h3 className="font-bold text-lg text-foreground">Schedule Time Slot</h3>
            <p className="text-xs text-muted-foreground">
              Pick an available date and convenient time slot directly on the technician&apos;s interactive scheduler.
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-base">
              3
            </div>
            <h3 className="font-bold text-lg text-foreground">Pay & Review</h3>
            <p className="text-xs text-muted-foreground">
              Once the technician accepts, pay securely via Stripe/SSLCommerz and leave a review post job completion.
            </p>
          </div>
        </div>
      </section>

      {/* Technician CTA Banner */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-primary text-primary-foreground p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Are you a Skilled Professional?
            </h2>
            <p className="text-sm opacity-90">
              Join thousands of technicians expanding their client base on FixItNow with flexible hours and direct payouts.
            </p>
          </div>
          <Link href="/auth/register">
            <Button size="lg" variant="secondary" className="font-bold px-8 h-12 rounded-xl">
              Register as Technician
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
