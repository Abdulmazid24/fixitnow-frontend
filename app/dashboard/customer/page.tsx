"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  CreditCard,
  XCircle,
  Star,
  CheckCircle2,
  DollarSign,
  Receipt,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export interface BookingRecord {
  id: string;
  serviceTitle: string;
  category: string;
  technicianName: string;
  scheduledDate: string;
  timeSlot: string;
  address: string;
  totalPrice: number;
  status: BookingStatus;
  hasReview?: boolean;
}

interface PaymentRecord {
  id: string;
  bookingId: string;
  serviceTitle: string;
  technicianName: string;
  amount: number;
  method: "Stripe" | "SSLCommerz";
  transactionId: string;
  paidAt: string;
  status: "SUCCESS" | "REFUNDED";
}

const INITIAL_CUSTOMER_BOOKINGS: BookingRecord[] = [
  {
    id: "bk-1001",
    serviceTitle: "Emergency Pipe Leak Repair & Unclogging",
    category: "Plumbing & Piping",
    technicianName: "David Miller",
    scheduledDate: "2026-08-26",
    timeSlot: "09:00 AM - 11:00 AM",
    address: "123 Broadway, Apt 5B, New York, NY",
    totalPrice: 80,
    status: "ACCEPTED",
  },
  {
    id: "bk-1002",
    serviceTitle: "Complete Home Electrical Inspection",
    category: "Electrical Services",
    technicianName: "Alex Rivera",
    scheduledDate: "2026-08-20",
    timeSlot: "01:30 PM - 03:30 PM",
    address: "123 Broadway, Apt 5B, New York, NY",
    totalPrice: 65,
    status: "COMPLETED",
    hasReview: false,
  },
  {
    id: "bk-1003",
    serviceTitle: "Split AC Servicing & Gas Refill",
    category: "AC & Appliances",
    technicianName: "Michael Chen",
    scheduledDate: "2026-08-28",
    timeSlot: "11:00 AM - 01:00 PM",
    address: "123 Broadway, Apt 5B, New York, NY",
    totalPrice: 75,
    status: "REQUESTED",
  },
];

const MOCK_PAYMENTS: PaymentRecord[] = [
  {
    id: "pay-001",
    bookingId: "bk-1002",
    serviceTitle: "Complete Home Electrical Inspection",
    technicianName: "Alex Rivera",
    amount: 65,
    method: "Stripe",
    transactionId: "txn_1Q2wRKLs3vKa9VjB",
    paidAt: "2026-08-19 02:15 PM",
    status: "SUCCESS",
  },
  {
    id: "pay-002",
    bookingId: "bk-0990",
    serviceTitle: "Bathroom Tile Repair",
    technicianName: "Jordan Lee",
    amount: 120,
    method: "SSLCommerz",
    transactionId: "SSLCZ_TXN_882934",
    paidAt: "2026-08-10 11:42 AM",
    status: "SUCCESS",
  },
];

type ActiveTab = "bookings" | "payments";

export default function CustomerDashboardPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>("bookings");
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_CUSTOMER_BOOKINGS);
  const [reviewModalBooking, setReviewModalBooking] = useState<BookingRecord | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);

  const handleCancelBooking = (bookingId: string) => {
    if (confirm("Are you sure you want to cancel this booking request?")) {
      setBookings((prev) =>
        prev.map((b) => (b.id === bookingId ? { ...b, status: "CANCELLED" } : b))
      );
      toast.success("Booking request cancelled successfully.");
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please enter a short review comment.");
      return;
    }
    setSubmittingReview(true);
    setTimeout(() => {
      if (reviewModalBooking) {
        setBookings((prev) =>
          prev.map((b) => (b.id === reviewModalBooking.id ? { ...b, hasReview: true } : b))
        );
      }
      toast.success("Thank you! Your review has been published.");
      setReviewModalBooking(null);
      setComment("");
      setRating(5);
      setSubmittingReview(false);
    }, 600);
  };

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "REQUESTED":
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">REQUESTED</span>;
      case "ACCEPTED":
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">ACCEPTED (Pay Now)</span>;
      case "PAID":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">PAID</span>;
      case "IN_PROGRESS":
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">IN PROGRESS</span>;
      case "COMPLETED":
        return <span className="bg-gray-500/10 text-gray-700 border border-gray-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">COMPLETED</span>;
      case "DECLINED":
        return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">DECLINED</span>;
      case "CANCELLED":
        return <span className="bg-red-900/10 text-red-800 border border-red-900/20 px-2.5 py-0.5 rounded-full text-xs font-semibold">CANCELLED</span>;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Top Banner */}
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Customer Dashboard
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Welcome back, <strong className="text-foreground">{user?.name || "Valued Client"}</strong>. Track your bookings and payment history.
          </p>
        </div>
        <Link href="/services">
          <Button size="sm" className="gap-2">
            Book New Service
          </Button>
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 border-b border-border">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "bookings"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-3.5 w-3.5" />
          My Bookings
          <span className="ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 text-[10px] font-bold">
            {bookings.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab("payments")}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition-colors ${
            activeTab === "payments"
              ? "border-primary text-primary"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          <Receipt className="h-3.5 w-3.5" />
          Payment History
          <span className="ml-1 rounded-full bg-primary/10 text-primary px-1.5 py-0.5 text-[10px] font-bold">
            {MOCK_PAYMENTS.length}
          </span>
        </button>
      </div>

      {/* ─── TAB: MY BOOKINGS ─── */}
      {activeTab === "bookings" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Your Service Appointments</h2>
            <span className="text-xs text-muted-foreground">Total: {bookings.length}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-4 py-3">Service & Category</th>
                  <th className="px-4 py-3">Technician</th>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {bookings.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3.5 space-y-0.5">
                      <div className="font-bold text-foreground">{item.serviceTitle}</div>
                      <div className="text-[10px] text-primary font-medium">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">{item.technicianName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <div className="flex items-center gap-1"><Calendar className="h-3 w-3" />{item.scheduledDate}</div>
                      <div className="flex items-center gap-1 text-[10px] mt-0.5"><Clock className="h-3 w-3" />{item.timeSlot}</div>
                    </td>
                    <td className="px-4 py-3 font-bold text-foreground">${item.totalPrice}</td>
                    <td className="px-4 py-3">{getStatusBadge(item.status)}</td>
                    <td className="px-4 py-3 text-right space-x-2">
                      {/* Pay Now */}
                      {item.status === "ACCEPTED" && (
                        <Link href={`/dashboard/customer/bookings/${item.id}/pay`}>
                          <Button size="xs" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-[11px] h-7">
                            <CreditCard className="h-3 w-3" /> Pay Now (${item.totalPrice})
                          </Button>
                        </Link>
                      )}
                      {/* Cancel — only before IN_PROGRESS */}
                      {(item.status === "REQUESTED") && (
                        <Button
                          size="xs"
                          variant="destructive"
                          className="text-[11px] h-7 gap-1"
                          onClick={() => handleCancelBooking(item.id)}
                        >
                          <XCircle className="h-3 w-3" /> Cancel
                        </Button>
                      )}
                      {/* Leave Review */}
                      {item.status === "COMPLETED" && (
                        item.hasReview ? (
                          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 justify-end">
                            <CheckCircle2 className="h-3.5 w-3.5" /> Reviewed
                          </span>
                        ) : (
                          <Button
                            size="xs"
                            variant="outline"
                            className="text-[11px] h-7 gap-1"
                            onClick={() => setReviewModalBooking(item)}
                          >
                            <Star className="h-3 w-3 text-amber-500 fill-current" /> Leave Review
                          </Button>
                        )
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── TAB: PAYMENT HISTORY ─── */}
      {activeTab === "payments" && (
        <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-foreground">Payment History</h2>
            <span className="text-xs text-muted-foreground">
              Total paid: <strong className="text-foreground">${MOCK_PAYMENTS.reduce((s, p) => s + p.amount, 0)}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Technician</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Gateway</th>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">Paid At</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {MOCK_PAYMENTS.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/40 transition-colors">
                    <td className="px-4 py-3.5 font-bold text-foreground max-w-[180px]">
                      <div className="truncate">{payment.serviceTitle}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{payment.technicianName}</td>
                    <td className="px-4 py-3 font-bold text-emerald-600 text-sm">
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-3.5 w-3.5" />{payment.amount}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        payment.method === "Stripe"
                          ? "bg-violet-500/10 text-violet-700 border-violet-500/20"
                          : "bg-green-500/10 text-green-700 border-green-500/20"
                      }`}>
                        {payment.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[10px] text-muted-foreground">{payment.transactionId}</td>
                    <td className="px-4 py-3 text-muted-foreground">{payment.paidAt}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        payment.status === "SUCCESS"
                          ? "bg-emerald-500/10 text-emerald-700 border-emerald-500/20"
                          : "bg-red-500/10 text-red-700 border-red-500/20"
                      }`}>
                        {payment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Leave Review Modal */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <h3 className="font-bold text-base text-foreground">Leave a Service Review</h3>
              <button onClick={() => setReviewModalBooking(null)} className="text-muted-foreground hover:text-foreground">
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <span className="text-xs text-muted-foreground">Service</span>
                <div className="font-semibold text-sm text-foreground">{reviewModalBooking.serviceTitle}</div>
                <div className="text-xs text-primary font-medium">Technician: {reviewModalBooking.technicianName}</div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Rating Score</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1 text-amber-500 hover:scale-110 transition-transform"
                    >
                      <Star className={`h-6 w-6 ${starVal <= rating ? "fill-current" : ""}`} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-foreground ml-2">{rating} / 5 Stars</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground">Review Comment</label>
                <textarea
                  rows={3}
                  className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs outline-none"
                  placeholder="Share your experience regarding punctuality, work quality, and communication..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setReviewModalBooking(null)}>
                  Cancel
                </Button>
                <Button type="submit" size="sm" disabled={submittingReview}>
                  {submittingReview ? "Publishing..." : "Submit Review"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
