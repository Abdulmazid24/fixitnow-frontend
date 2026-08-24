"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Users,
  Wrench,
  DollarSign,
  Calendar,
  ShieldAlert,
  ArrowRight,
  TrendingUp,
  FolderTree,
  UserCheck,
  ShieldCheck,
  Sparkles,
  Activity,
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ─── ADMIN HEADER BANNER ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-red-500/5 border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600 text-white font-extrabold text-2xl shadow-md">
                {(user?.name || "Admin").charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" title="Super Admin">★</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Admin Control Center
                </h1>
                <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="h-3 w-3" /> System Moderator
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Logged in as <strong className="text-foreground">{user?.name || "System Administrator"}</strong>. Real-time platform metrics, user moderation &amp; category management.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link href="/dashboard/admin/users">
              <Button size="lg" className="gap-2 font-bold shadow-md rounded-xl h-11 px-5">
                <Users className="h-4 w-4" /> User Directory
              </Button>
            </Link>
            <Link href="/dashboard/admin/categories">
              <Button size="lg" variant="outline" className="gap-2 font-bold rounded-xl h-11 px-4">
                <FolderTree className="h-4 w-4 text-primary" /> Service Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── OVERVIEW METRIC KPI CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Total Registered Users</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">1,248</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> +14% growth this month
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Active Technicians</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">186</div>
          <div className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
            <ShieldCheck className="h-3 w-3" /> 100% Background Verified
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Total Revenue Handled</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">$48,250</div>
          <div className="text-[11px] text-purple-600 font-bold flex items-center gap-1">
            <Activity className="h-3 w-3" /> Stripe Payment Volume
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Platform Bookings</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">3,890</div>
          <div className="text-[11px] text-amber-600 font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3" /> 98.4% Completion rate
          </div>
        </div>
      </div>

      {/* ─── QUICK ACTION PANELS ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Panel */}
        <div className="group rounded-3xl border border-border bg-card p-7 shadow-sm hover:shadow-md transition-all duration-200 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-600 w-fit">
              <Users className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              User &amp; Technician Moderation
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Inspect user directory across Customer and Technician accounts. Ban violating accounts or restore active access statuses.
            </p>
          </div>
          <Link href="/dashboard/admin/users">
            <Button variant="outline" className="w-full justify-between font-bold text-xs h-11 rounded-2xl group-hover:border-primary group-hover:text-primary transition-colors">
              <span>Open User Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Category Management Panel */}
        <div className="group rounded-3xl border border-border bg-card p-7 shadow-sm hover:shadow-md transition-all duration-200 space-y-5 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 w-fit">
              <FolderTree className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
              Service Category Management
            </h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Add new service domains (e.g. Solar Panel Setup, Appliance Cleaning), edit descriptions, or reorganize categories.
            </p>
          </div>
          <Link href="/dashboard/admin/categories">
            <Button variant="outline" className="w-full justify-between font-bold text-xs h-11 rounded-2xl group-hover:border-primary group-hover:text-primary transition-colors">
              <span>Manage Service Categories</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
