"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Star,
  MapPin,
  DollarSign,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { MOCK_SERVICES, FEATURED_CATEGORIES } from "@/lib/marketplace-data";

function ServicesContent() {
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "ALL";

  const [search, setSearch] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [maxPrice, setMaxPrice] = useState<number>(150);
  const [minRating, setMinRating] = useState<number>(0);

  const filteredServices = useMemo(() => {
    return MOCK_SERVICES.filter((srv) => {
      const matchesSearch =
        srv.title.toLowerCase().includes(search.toLowerCase()) ||
        srv.description.toLowerCase().includes(search.toLowerCase()) ||
        srv.technicianName.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || srv.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchesPrice = srv.price <= maxPrice;

      const matchesRating = srv.rating >= minRating;

      return matchesSearch && matchesCategory && matchesPrice && matchesRating;
    });
  }, [search, selectedCategory, maxPrice, minRating]);

  const clearFilters = () => {
    setSearch("");
    setSelectedCategory("ALL");
    setMaxPrice(150);
    setMinRating(0);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Browse Home Services & Technicians
        </h1>
        <p className="text-sm text-muted-foreground">
          Discover verified professionals, compare prices, and book time slots instantly.
        </p>
      </div>

      {/* Main Grid: Sidebar Filters + Services Directory */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters */}
        <aside className="rounded-2xl border border-border bg-card p-5 space-y-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <div className="flex items-center gap-2 font-bold text-sm">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Filters</span>
            </div>
            {(search || selectedCategory !== "ALL" || maxPrice < 150 || minRating > 0) && (
              <button
                onClick={clearFilters}
                className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
              >
                <X className="h-3 w-3" /> Reset
              </button>
            )}
          </div>

          {/* Search Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Keyword Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search services..."
                className="pl-9 text-xs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-foreground">Category</label>
            <div className="space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  selectedCategory === "ALL"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                All Categories
              </button>
              {FEATURED_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    selectedCategory.toLowerCase() === cat.name.toLowerCase()
                      ? "bg-primary text-primary-foreground font-semibold"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span>Max Price</span>
              <span className="text-primary font-bold">${maxPrice}</span>
            </div>
            <input
              type="range"
              min="30"
              max="200"
              step="5"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>$30</span>
              <span>$200</span>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="space-y-2 pt-2 border-t border-border">
            <label className="text-xs font-semibold text-foreground">Minimum Rating</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[0, 4.5, 4.8].map((ratingVal) => (
                <button
                  key={ratingVal}
                  type="button"
                  onClick={() => setMinRating(ratingVal)}
                  className={`py-1.5 px-2 rounded-lg text-xs font-medium flex items-center justify-center gap-1 border transition-all ${
                    minRating === ratingVal
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-border hover:bg-muted"
                  }`}
                >
                  <Star className="h-3 w-3 fill-current text-amber-500" />
                  {ratingVal === 0 ? "All" : `${ratingVal}+`}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Services Listings Grid */}
        <main className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Showing <strong className="text-foreground">{filteredServices.length}</strong> services available</span>
          </div>

          {filteredServices.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center space-y-3 bg-card">
              <Search className="mx-auto h-8 w-8 text-muted-foreground" />
              <h3 className="text-base font-bold text-foreground">No services found</h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                No matching home services found for your current filter options. Try adjusting your search query or reset filters.
              </p>
              <Button size="sm" variant="outline" onClick={clearFilters}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredServices.map((srv) => (
                <div
                  key={srv.id}
                  className="group rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                >
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

                    <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        <span>{srv.location}</span>
                      </div>
                      <span className="font-medium text-foreground">By {srv.technicianName}</span>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-border/60 flex items-center justify-between mt-4">
                    <div>
                      <span className="text-[10px] text-muted-foreground">Starting from</span>
                      <div className="text-lg font-extrabold text-foreground">${srv.price}</div>
                    </div>
                    <Link href={`/technicians/${srv.technicianId}`}>
                      <Button size="sm" className="gap-1">
                        View & Book
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center text-muted-foreground">Loading services directory...</div>}>
      <ServicesContent />
    </Suspense>
  );
}
