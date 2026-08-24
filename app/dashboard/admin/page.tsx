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
} from "lucide-react";

export default function AdminDashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Control Center</h1>
            <ShieldAlert className="h-5 w-5 text-primary" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Logged in as <strong className="text-foreground">{user?.name || "System Administrator"}</strong>. Platform health overview & user moderation.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/admin/users">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Users className="h-4 w-4" /> Manage Users
            </Button>
          </Link>
          <Link href="/dashboard/admin/categories">
            <Button size="sm" className="gap-1.5 text-xs">
              <FolderTree className="h-4 w-4" /> Service Categories
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Registered Users</span>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">1,248</div>
          <span className="text-[11px] text-emerald-600 font-medium">+14% this month</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Active Technicians</span>
            <UserCheck className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">186</div>
          <span className="text-[11px] text-emerald-600 font-medium">Verified service providers</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Revenue Handled</span>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">$48,250</div>
          <span className="text-[11px] text-purple-600 font-medium">Stripe Payment Volume</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Platform Bookings</span>
            <Calendar className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">3,890</div>
          <span className="text-[11px] text-amber-600 font-medium">98.4% Completion rate</span>
        </div>
      </div>

      {/* Quick Action Navigation Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Panel */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base font-bold text-foreground">
              <Users className="h-5 w-5 text-primary" />
              <span>User & Technician Moderation</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Inspect user profiles across Customer and Technician accounts. Ban violating accounts or restore active statuses.
            </p>
          </div>
          <Link href="/dashboard/admin/users">
            <Button variant="outline" className="w-full justify-between text-xs font-semibold">
              <span>Open User Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Category Management Panel */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-base font-bold text-foreground">
              <FolderTree className="h-5 w-5 text-primary" />
              <span>Service Category Management</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Add new service domains (e.g. Solar Panel Installation, Appliance Cleaning), edit descriptions, or reorganize categories.
            </p>
          </div>
          <Link href="/dashboard/admin/categories">
            <Button variant="outline" className="w-full justify-between text-xs font-semibold">
              <span>Manage Service Categories</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
