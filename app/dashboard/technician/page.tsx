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
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">REQUESTED</span>;
      case "ACCEPTED":
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">ACCEPTED (Awaiting Payment)</span>;
      case "PAID":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">PAID (Ready to Start)</span>;
      case "IN_PROGRESS":
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">IN PROGRESS</span>;
      case "COMPLETED":
        return <span className="bg-gray-500/10 text-gray-700 border border-gray-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">COMPLETED</span>;
      case "DECLINED":
      case "CANCELLED":
        return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const totalEarnings = bookings
    .filter((b) => b.status === "PAID" || b.status === "IN_PROGRESS" || b.status === "COMPLETED")
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const pendingRequestsCount = bookings.filter((b) => b.status === "REQUESTED").length;
  const activeJobsCount = bookings.filter((b) => b.status === "PAID" || b.status === "IN_PROGRESS").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Technician Workspace</h1>
            <UserCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Logged in as <strong className="text-foreground">{user?.name || "Service Professional"}</strong>. Manage incoming jobs and set availability.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/dashboard/technician/availability">
            <Button size="sm" variant="outline" className="gap-1.5 text-xs">
              <Calendar className="h-4 w-4" /> Availability Scheduler
            </Button>
          </Link>
          <Link href="/dashboard/technician/profile">
            <Button size="sm" className="gap-1.5 text-xs">
              <Sliders className="h-4 w-4" /> Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Total Earnings</span>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">${totalEarnings}</div>
          <span className="text-[11px] text-emerald-600 font-medium">Verified payout queue</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Pending Booking Requests</span>
            <Clock className="h-4 w-4 text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{pendingRequestsCount}</div>
          <span className="text-[11px] text-amber-600 font-medium">Requires Accept / Decline action</span>
        </div>

        <div className="p-5 rounded-2xl border border-border bg-card space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Active & Upcoming Jobs</span>
            <Briefcase className="h-4 w-4 text-blue-500" />
          </div>
          <div className="text-2xl font-extrabold text-foreground">{activeJobsCount}</div>
          <span className="text-[11px] text-blue-600 font-medium">Ready to start or in-progress</span>
        </div>
      </div>

      {/* Incoming Bookings Management Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-foreground">Incoming Booking Requests & Jobs</h2>
          <span className="text-xs text-muted-foreground">Total: {bookings.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Service & Category</th>
                <th className="px-4 py-3">Client Address</th>
                <th className="px-4 py-3">Scheduled Time</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Job Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((item) => (
                <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                  <td className="px-4 py-3.5 space-y-0.5">
                    <div className="font-bold text-foreground">{item.serviceTitle}</div>
                    <div className="text-[10px] text-primary font-medium">{item.category}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground max-w-xs">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-muted-foreground shrink-0" />
                      <span className="truncate">{item.address}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{item.scheduledDate}</div>
                    <div className="text-[10px]">{item.timeSlot}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-foreground">${item.totalPrice}</td>
                  <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                  <td className="px-4 py-3 text-right space-x-2">
                    {/* REQUESTED -> Accept / Decline Buttons */}
                    {item.status === "REQUESTED" && (
                      <>
                        <Button
                          size="xs"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 gap-1"
                          onClick={() => handleUpdateStatus(item.id, "ACCEPTED")}
                        >
                          <CheckCircle2 className="h-3 w-3" /> Accept
                        </Button>
                        <Button
                          size="xs"
                          variant="destructive"
                          className="text-[11px] h-7 gap-1"
                          onClick={() => handleUpdateStatus(item.id, "DECLINED")}
                        >
                          <XCircle className="h-3 w-3" /> Decline
                        </Button>
                      </>
                    )}

                    {/* PAID -> Start Job Button */}
                    {item.status === "PAID" && (
                      <Button
                        size="xs"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 gap-1"
                        onClick={() => handleUpdateStatus(item.id, "IN_PROGRESS")}
                      >
                        <Play className="h-3 w-3" /> Start Job
                      </Button>
                    )}

                    {/* IN_PROGRESS -> Complete Job Button */}
                    {item.status === "IN_PROGRESS" && (
                      <Button
                        size="xs"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] h-7 gap-1"
                        onClick={() => handleUpdateStatus(item.id, "COMPLETED")}
                      >
                        <CheckCircle2 className="h-3 w-3" /> Mark Completed
                      </Button>
                    )}

                    {item.status === "COMPLETED" && (
                      <span className="text-[11px] text-muted-foreground font-semibold">Done ✓</span>
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
