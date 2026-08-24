"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Play,
  UserCheck,
  Star,
  Sliders,
  AlertCircle,
  Briefcase,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
import { BookingRecord, BookingStatus } from "../customer/page";

const INITIAL_TECHNICIAN_BOOKINGS: BookingRecord[] = [
  {
    id: "bk-2001",
    serviceTitle: "Split AC Servicing & Gas Refill",
    category: "AC & Appliances",
    technicianName: "Alex Rivera (You)",
    scheduledDate: "2026-08-28",
    timeSlot: "11:00 AM - 01:00 PM",
    address: "456 Park Ave, Apt 12A, New York, NY",
    totalPrice: 75,
    status: "REQUESTED",
  },
  {
    id: "bk-2002",
    serviceTitle: "Emergency Pipe Leak Repair",
    category: "Plumbing & Piping",
    technicianName: "Alex Rivera (You)",
    scheduledDate: "2026-08-26",
    timeSlot: "09:00 AM - 11:00 AM",
    address: "123 Broadway, Apt 5B, New York, NY",
    totalPrice: 80,
    status: "PAID",
  },
  {
    id: "bk-2003",
    serviceTitle: "Complete Home Electrical Inspection",
    category: "Electrical Services",
    technicianName: "Alex Rivera (You)",
    scheduledDate: "2026-08-25",
    timeSlot: "01:30 PM - 03:30 PM",
    address: "789 5th Ave, House #3, New York, NY",
    totalPrice: 65,
    status: "IN_PROGRESS",
  },
];

export default function TechnicianDashboardPage() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_TECHNICIAN_BOOKINGS);

  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking status updated to ${newStatus}.`);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "REQUESTED":
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Clock className="h-3 w-3" /> REQUESTED</span>;
      case "ACCEPTED":
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> ACCEPTED (Awaiting Pay)</span>;
      case "PAID":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> PAID (Ready to Start)</span>;
      case "IN_PROGRESS":
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" /> IN PROGRESS</span>;
      case "COMPLETED":
        return <span className="bg-gray-500/10 text-gray-700 border border-gray-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> COMPLETED</span>;
      case "DECLINED":
      case "CANCELLED":
        return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><XCircle className="h-3 w-3" /> {status}</span>;
    }
  };

  const totalEarnings = bookings
    .filter((b) => b.status === "PAID" || b.status === "IN_PROGRESS" || b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingRequestsCount = bookings.filter((b) => b.status === "REQUESTED").length;
  const activeJobsCount = bookings.filter((b) => b.status === "PAID" || b.status === "IN_PROGRESS").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ─── WORKSPACE HEADER BANNER ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-blue-500/5 border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white font-extrabold text-2xl shadow-md">
                {(user?.name || "Technician").charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" title="Available">✓</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Technician Workspace
                </h1>
                <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <UserCheck className="h-3 w-3" /> Verified Specialist
                </span>
                <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded-md text-[11px] font-bold flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current text-amber-500" /> 4.9 Rating
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Welcome back, <strong className="text-foreground">{user?.name || "Alex Rivera"}</strong>. Manage incoming client bookings and set availability hours.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <Link href="/dashboard/technician/bookings">
              <Button size="lg" className="gap-2 font-bold shadow-md rounded-xl h-11 px-5">
                <Briefcase className="h-4 w-4" /> Manage Bookings
              </Button>
            </Link>
            <Link href="/dashboard/technician/availability">
              <Button size="lg" variant="outline" className="gap-2 font-bold rounded-xl h-11 px-4">
                <Calendar className="h-4 w-4 text-primary" /> Availability
              </Button>
            </Link>
            <Link href="/dashboard/technician/profile">
              <Button size="lg" variant="ghost" className="gap-2 rounded-xl h-11 px-4 text-xs font-bold">
                <Sliders className="h-4 w-4" /> Profile Setup
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ─── PENDING REQUEST ALERT BANNER ─── */}
      {pendingRequestsCount > 0 && (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-center justify-between text-amber-700 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/20 text-amber-700">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs font-bold">You have {pendingRequestsCount} pending booking request(s)!</div>
              <div className="text-[11px] text-amber-600">Review client requests and click Accept or Decline to confirm the schedule.</div>
            </div>
          </div>
          <Link href="/dashboard/technician/bookings">
            <Button size="xs" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs gap-1 rounded-xl h-8 px-3">
              Review Now <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      )}

      {/* ─── KPI CARDS ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Total Earnings</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600">${totalEarnings}.00</div>
          <div className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" /> Settled &amp; queued payouts
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Pending Requests</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">{pendingRequestsCount}</div>
          <div className="text-[11px] text-amber-600 font-semibold">Requires Accept / Decline action</div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Active &amp; Upcoming Jobs</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600">
              <Briefcase className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">{activeJobsCount}</div>
          <div className="text-[11px] text-blue-600 font-semibold">Ready to start or in-progress</div>
        </div>

        <div className="p-5 rounded-3xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground font-medium">
            <span>Rating Score</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600">
              <Star className="h-4 w-4 text-purple-600 fill-current" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-foreground">4.9 ★</div>
          <div className="text-[11px] text-purple-600 font-semibold">Based on 128 client reviews</div>
        </div>
      </div>

      {/* ─── INCOMING BOOKINGS TABLE ─── */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6 md:p-8">
        <div className="flex items-center justify-between pb-2 border-b border-border">
          <div>
            <h2 className="text-lg font-bold text-foreground">Incoming Booking Requests &amp; Active Jobs</h2>
            <p className="text-xs text-muted-foreground">Manage client appointments, start paid jobs, and complete orders.</p>
          </div>
          <Link href="/dashboard/technician/bookings">
            <Button variant="outline" size="sm" className="gap-1.5 text-xs font-semibold rounded-xl">
              View All Bookings <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-5 py-3.5 rounded-l-xl">Service &amp; Category</th>
                <th className="px-4 py-3.5">Client Location</th>
                <th className="px-4 py-3.5">Scheduled Date/Time</th>
                <th className="px-4 py-3.5">Payout</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right rounded-r-xl">Job Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-4 space-y-1">
                    <div className="font-bold text-sm text-foreground">{item.serviceTitle}</div>
                    <div className="text-[11px] text-primary font-semibold flex items-center gap-1">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {item.category}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-medium text-foreground max-w-xs">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-muted-foreground space-y-0.5">
                    <div className="flex items-center gap-1.5 font-medium text-foreground">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      {item.scheduledDate}
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {item.timeSlot}
                    </div>
                  </td>

                  <td className="px-4 py-4 font-extrabold text-sm text-foreground">
                    ${item.totalPrice}
                  </td>

                  <td className="px-4 py-4">
                    {getStatusBadge(item.status)}
                  </td>

                  <td className="px-5 py-4 text-right space-x-2">
                    {/* REQUESTED -> Accept / Decline */}
                    {item.status === "REQUESTED" && (
                      <>
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-3 rounded-xl gap-1"
                          onClick={() => handleUpdateStatus(item.id, "ACCEPTED")}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" /> Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 border-red-200 hover:bg-red-50 text-xs h-9 px-3 rounded-xl gap-1"
                          onClick={() => handleUpdateStatus(item.id, "DECLINED")}
                        >
                          <XCircle className="h-3.5 w-3.5" /> Decline
                        </Button>
                      </>
                    )}

                    {/* PAID -> Start Job */}
                    {item.status === "PAID" && (
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs h-9 px-4 rounded-xl gap-1.5"
                        onClick={() => handleUpdateStatus(item.id, "IN_PROGRESS")}
                      >
                        <Play className="h-3.5 w-3.5" /> Start Job
                      </Button>
                    )}

                    {/* IN_PROGRESS -> Mark Completed */}
                    {item.status === "IN_PROGRESS" && (
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs h-9 px-4 rounded-xl gap-1.5"
                        onClick={() => handleUpdateStatus(item.id, "COMPLETED")}
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> Mark Completed
                      </Button>
                    )}

                    {item.status === "COMPLETED" && (
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 justify-end">
                        <CheckCircle2 className="h-4 w-4" /> Completed ✓
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
