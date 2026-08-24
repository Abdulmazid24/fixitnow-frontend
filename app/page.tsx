"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Wrench, Zap, Droplet, Wind, Hammer, Paintbrush,
  Search, CheckCircle2, Star, ShieldCheck, Clock,
  ArrowRight, MapPin, UserCheck, Sparkles, Phone, TrendingUp,
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
      case "Zap": return <Zap className="h-6 w-6" />;
      case "Droplet": return <Droplet className="h-6 w-6" />;
      case "Wind": return <Wind className="h-6 w-6" />;
      case "Hammer": return <Hammer className="h-6 w-6" />;
      default: return <Paintbrush className="h-6 w-6" />;
    }
  };

  const categoryColors: Record<string, string> = {
    Zap: "bg-amber-500/10 text-amber-600 group-hover:bg-amber-500/20",
    Droplet: "bg-blue-500/10 text-blue-600 group-hover:bg-blue-500/20",
    Wind: "bg-teal-500/10 text-teal-600 group-hover:bg-teal-500/20",
    Hammer: "bg-orange-500/10 text-orange-600 group-hover:bg-orange-500/20",
    default: "bg-purple-500/10 text-purple-600 group-hover:bg-purple-500/20",
  };

  const stats = [
    { label: "Verified Technicians", value: "2,400+", icon: UserCheck, color: "text-primary" },
    { label: "Services Completed", value: "18,000+", icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Average Rating", value: "4.9 ★", icon: Star, color: "text-amber-500" },
    { label: "Cities Covered", value: "120+", icon: MapPin, color: "text-blue-600" },
  ];

  return (
    <div className="space-y-20 pb-20">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-orange-50/50 to-amber-50/30 -z-10" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-amber-400/8 blur-3xl -z-10" />

        <div className="container mx-auto px-4 sm:px-6 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="max-w-4xl mx-auto text-center space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-4 py-1.5 text-xs font-semibold text-primary shadow-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Bangladesh&apos;s #1 Trusted Home Service Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground leading-[1.1]">
              Fast Repairs &amp;{" "}
              <span className="relative inline-block">
                <span className="text-primary">Home Services</span>
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-primary/30 rounded-full" />
              </span>
              <br className="hidden sm:inline" /> On Demand
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Book certified electricians, plumbers, HVAC specialists &amp; carpenters near you — with upfront pricing, live tracking, and guaranteed quality work.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-2xl border border-border shadow-xl ring-1 ring-primary/10">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search (e.g. AC Repair, Plumbing, Electrical)..."
                    className="pl-12 h-12 border-0 bg-transparent text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button type="submit" size="lg" className="h-12 px-8 rounded-xl gap-2 font-semibold shadow-sm">
                  <Search className="h-4 w-4" /> Search
                </Button>
              </div>
            </form>

            {/* Trust Pills */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: CheckCircle2, text: "Background Verified", color: "text-emerald-600" },
                { icon: Clock, text: "Same-Day Booking", color: "text-blue-600" },
                { icon: ShieldCheck, text: "No Hidden Charges", color: "text-primary" },
                { icon: Phone, text: "24/7 Support", color: "text-purple-600" },
              ].map(({ icon: Icon, text, color }) => (
                <div key={text} className="flex items-center gap-1.5 bg-white/80 border border-border rounded-full px-3 py-1.5 text-xs font-medium shadow-sm">
                  <Icon className={`h-3.5 w-3.5 ${color}`} />
                  <span className="text-foreground">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM STATS ─── */}
      <section className="container mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-border p-5 shadow-sm text-center space-y-2 hover:shadow-md transition-shadow">
              <Icon className={`h-6 w-6 mx-auto ${color}`} />
              <div className="text-2xl font-extrabold text-foreground">{value}</div>
              <div className="text-xs text-muted-foreground font-medium">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SERVICE CATEGORIES ─── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">What We Offer</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Popular Service Categories
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Explore qualified professionals across our core service domains.
            </p>
          </div>
          <Link href="/services">
            <Button variant="ghost" className="gap-1.5 text-primary font-semibold hidden sm:flex">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/services?category=${encodeURIComponent(cat.name)}`}>
              <div className="group h-full p-5 rounded-2xl border border-border bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-200 space-y-3 cursor-pointer">
                <div className={`p-3 rounded-xl w-fit transition-colors ${categoryColors[cat.iconName] || categoryColors.default}`}>
                  {getCategoryIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-primary">
                  <TrendingUp className="h-3 w-3" />
                  {cat.serviceCount}+ services
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─── FEATURED SERVICES ─── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Top Picks</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Featured Home Services
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Book top-rated service packages by certified technicians.
            </p>
          </div>
          <Link href="/services">
            <Button variant="outline" size="sm" className="gap-1.5 hidden sm:flex">
              Explore All <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MOCK_SERVICES.map((srv) => (
            <div key={srv.id} className="group rounded-2xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col">
              {/* Card top accent bar */}
              <div className="h-1 bg-gradient-to-r from-primary to-amber-400 w-full" />
              <div className="p-5 flex flex-col flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {srv.category}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{srv.rating}</span>
                    <span className="text-muted-foreground font-normal">({srv.reviewCount})</span>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                  {srv.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed flex-1">
                  {srv.description}
                </p>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                  <span>{srv.location}</span>
                </div>
              </div>

              <div className="px-5 py-4 border-t border-border/60 flex items-center justify-between bg-muted/20">
                <div>
                  <span className="text-[10px] text-muted-foreground">Starting from</span>
                  <div className="text-lg font-extrabold text-foreground">${srv.price}</div>
                </div>
                <Link href={`/technicians/${srv.technicianId}`}>
                  <Button size="sm" className="gap-1 rounded-xl font-semibold">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TOP TECHNICIANS ─── */}
      <section className="bg-gradient-to-b from-muted/30 to-muted/10 border-y border-border py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center space-y-2 mb-10 max-w-2xl mx-auto">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider">Our Experts</p>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Meet Top Rated Technicians
            </h2>
            <p className="text-sm text-muted-foreground">
              Directly hire certified specialists with verified reviews and proven track records.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_TECHNICIANS.map((tech) => (
              <div key={tech.id} className="group rounded-2xl border border-border bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="relative">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-extrabold text-lg shadow-sm">
                        {tech.name.charAt(0)}
                      </div>
                      <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white" title="Available" />
                    </div>
                    <div className="flex items-center gap-1 bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded-lg text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      <span>{tech.rating}</span>
                      <span className="text-muted-foreground font-normal">({tech.reviewCount})</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{tech.name}</h3>
                      <span title="Verified Professional">
                        <UserCheck className="h-4 w-4 text-emerald-500" />
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {tech.location} · {tech.experienceYears} yrs exp.
                    </p>
                  </div>

                  <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                    {tech.bio}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {tech.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="text-[10px] bg-muted px-2 py-0.5 rounded-md font-medium text-foreground">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-muted-foreground">Hourly Rate</span>
                    <div className="text-base font-extrabold text-foreground">
                      ${tech.hourlyRate}<span className="text-xs font-normal text-muted-foreground">/hr</span>
                    </div>
                  </div>
                  <Link href={`/technicians/${tech.id}`}>
                    <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-colors">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" size="lg" className="gap-2 font-semibold">
                View All Technicians <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="text-center space-y-2 mb-12 max-w-2xl mx-auto">
          <p className="text-xs font-semibold text-primary uppercase tracking-wider">Simple Process</p>
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How FixItNow Works
          </h2>
          <p className="text-sm text-muted-foreground">
            Get your home issues fixed in 3 simple steps — fast, easy, and guaranteed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.7%+16px)] right-[calc(16.7%+16px)] h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 z-0" />

          {[
            {
              step: "01",
              title: "Browse & Select",
              desc: "Search by service type or browse technician profiles filtered by ratings, pricing, and location.",
              color: "bg-primary text-primary-foreground",
            },
            {
              step: "02",
              title: "Book a Time Slot",
              desc: "Pick an available date and time directly on the technician's interactive calendar scheduler.",
              color: "bg-amber-500 text-white",
            },
            {
              step: "03",
              title: "Pay & Review",
              desc: "After technician accepts, pay securely via Stripe or SSLCommerz and leave a rating post-job.",
              color: "bg-emerald-500 text-white",
            },
          ].map(({ step, title, desc, color }) => (
            <div key={step} className="relative z-10 p-6 rounded-2xl border border-border bg-white shadow-sm hover:shadow-md transition-shadow space-y-4 text-center">
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl font-extrabold text-base mx-auto shadow-sm ${color}`}>
                {step}
              </div>
              <h3 className="font-bold text-lg text-foreground">{title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── TECHNICIAN CTA BANNER ─── */}
      <section className="container mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-orange-500 to-amber-500 text-white p-8 md:p-14 shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 blur-3xl -translate-y-1/2 translate-x-1/4" />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-black/10 blur-2xl translate-y-1/2 -translate-x-1/4" />

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold">
                <Wrench className="h-3.5 w-3.5" /> For Professionals
              </div>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
                Are You a Skilled Professional?
              </h2>
              <p className="text-sm opacity-90 leading-relaxed">
                Join 2,400+ technicians growing their client base on FixItNow. Set your own hours, get paid fast, and build your reputation.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start pt-1">
                {["Flexible Hours", "Instant Payouts", "Free Profile"].map((pill) => (
                  <span key={pill} className="bg-white/15 border border-white/25 rounded-full px-3 py-1 text-xs font-medium">
                    ✓ {pill}
                  </span>
                ))}
              </div>
            </div>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="font-bold px-10 h-13 rounded-2xl text-primary shadow-xl hover:shadow-2xl transition-shadow whitespace-nowrap">
                Register as Technician →
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
