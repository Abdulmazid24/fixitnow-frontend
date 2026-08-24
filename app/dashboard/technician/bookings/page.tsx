"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Play,
  MapPin,
  Calendar,
  Clock,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { BookingRecord, BookingStatus } from "../../customer/page";

const TECHNICIAN_BOOKINGS: BookingRecord[] = [
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
  {
    id: "bk-2004",
    serviceTitle: "Full Home Paint Touch-Up",
    category: "Painting & Renovation",
    technicianName: "Alex Rivera (You)",
    scheduledDate: "2026-08-15",
    timeSlot: "10:00 AM - 02:00 PM",
    address: "22 Wall St, Suite 5, New York, NY",
    totalPrice: 200,
    status: "COMPLETED",
  },
  {
    id: "bk-2005",
    serviceTitle: "Bathroom Faucet Replacement",
    category: "Plumbing & Piping",
    technicianName: "Alex Rivera (You)",
    scheduledDate: "2026-08-29",
    timeSlot: "03:00 PM - 05:00 PM",
    address: "55 Park Place, Brooklyn, NY",
    totalPrice: 55,
    status: "DECLINED",
  },
];

export default function TechnicianBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingRecord[]>(TECHNICIAN_BOOKINGS);
  const [filterStatus, setFilterStatus] = useState<BookingStatus | "ALL">("ALL");

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
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">ACCEPTED</span>;
      case "PAID":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">PAID — Ready to Start</span>;
      case "IN_PROGRESS":
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">IN PROGRESS</span>;
      case "COMPLETED":
        return <span className="bg-gray-500/10 text-gray-700 border border-gray-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">COMPLETED</span>;
      case "DECLINED":
      case "CANCELLED":
        return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">{status}</span>;
    }
  };

  const statusOptions: Array<BookingStatus | "ALL"> = [
    "ALL", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED", "DECLINED",
  ];

  const filtered = filterStatus === "ALL" ? bookings : bookings.filter((b) => b.status === filterStatus);

  const pendingCount = bookings.filter((b) => b.status === "REQUESTED").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Back button */}
      <Button variant="ghost" size="xs" onClick={() => router.back()} className="gap-1 text-xs">
        <ArrowLeft className="h-3.5 w-3.5" /> Back to Workspace
      </Button>

      {/* Header */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Booking Management</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review incoming requests and manage job status transitions.
          </p>
        </div>
        {pendingCount > 0 && (
          <div className="flex items-center gap-2 rounded-full bg-amber-500/10 border border-amber-500/20 px-4 py-2 text-xs font-semibold text-amber-700">
            <AlertCircle className="h-4 w-4" />
            {pendingCount} pending request{pendingCount > 1 ? "s" : ""} need action
          </div>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {statusOptions.map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-colors ${
              filterStatus === s
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-muted text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {s === "ALL" ? `All (${bookings.length})` : s}
          </button>
        ))}
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h2 className="text-sm font-bold text-foreground">
            {filterStatus === "ALL" ? "All Bookings" : `${filterStatus} Bookings`}
          </h2>
          <span className="text-xs text-muted-foreground">Showing {filtered.length} of {bookings.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
              <tr>
                <th className="px-4 py-3">Service & Category</th>
                <th className="px-4 py-3">Client Address</th>
                <th className="px-4 py-3">Scheduled</th>
                <th className="px-4 py-3">Payout</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-muted-foreground text-xs">
                    No bookings found for this status.
                  </td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3.5 space-y-0.5">
                      <div className="font-bold text-foreground">{item.serviceTitle}</div>
                      <div className="text-[10px] text-primary font-medium">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 max-w-[180px]">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        <span className="truncate">{item.address}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{item.scheduledDate}</div>
                      <div className="flex items-center gap-1 text-[10px] mt-0.5"><Clock className="h-3 w-3" />{item.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-emerald-600">${item.totalPrice}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5 flex-wrap">
                        {/* REQUESTED → Accept / Decline */}
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
                        {/* PAID → Start Job */}
                        {item.status === "PAID" && (
                          <Button
                            size="xs"
                            className="bg-blue-600 hover:bg-blue-700 text-white text-[11px] h-7 gap-1"
                            onClick={() => handleUpdateStatus(item.id, "IN_PROGRESS")}
                          >
                            <Play className="h-3 w-3" /> Mark In-Progress
                          </Button>
                        )}
                        {/* IN_PROGRESS → Complete */}
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
                        {(item.status === "DECLINED" || item.status === "CANCELLED") && (
                          <span className="text-[11px] text-red-500 font-semibold">{item.status}</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
