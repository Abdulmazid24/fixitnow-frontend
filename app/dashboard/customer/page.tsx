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
  UserCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
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
  method: "Stripe";
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
    method: "Stripe",
    transactionId: "txn_1Q2xMNRs7vLb4WpC",
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
        return <span className="bg-amber-500/10 text-amber-600 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Clock className="h-3 w-3" /> REQUESTED</span>;
      case "ACCEPTED":
        return <span className="bg-blue-500/10 text-blue-600 border border-blue-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> ACCEPTED (Pay Now)</span>;
      case "PAID":
        return <span className="bg-purple-500/10 text-purple-600 border border-purple-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> PAID</span>;
      case "IN_PROGRESS":
        return <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><TrendingUp className="h-3 w-3" /> IN PROGRESS</span>;
      case "COMPLETED":
        return <span className="bg-gray-500/10 text-gray-700 border border-gray-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> COMPLETED</span>;
      case "DECLINED":
        return <span className="bg-red-500/10 text-red-600 border border-red-500/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><XCircle className="h-3 w-3" /> DECLINED</span>;
      case "CANCELLED":
        return <span className="bg-red-900/10 text-red-800 border border-red-900/20 px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1"><XCircle className="h-3 w-3" /> CANCELLED</span>;
    }
  };

  const totalSpent = MOCK_PAYMENTS.reduce((s, p) => s + p.amount, 0);
  const activeBookingsCount = bookings.filter(b => b.status === "REQUESTED" || b.status === "ACCEPTED" || b.status === "PAID" || b.status === "IN_PROGRESS").length;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-8 space-y-8">

      {/* ─── PREMIUM HEADER BANNER ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-card via-card to-primary/5 border border-border p-6 md:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-extrabold text-2xl shadow-md">
                {(user?.name || "Client").charAt(0).toUpperCase()}
              </div>
              <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" title="Active">✓</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
                  Welcome back, {user?.name || "Valued Client"}! 👋
                </h1>
                <span className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider">
                  Customer
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage your appointments, track live service status, and inspect billing history.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/services">
              <Button size="lg" className="gap-2 font-bold shadow-md rounded-xl h-11 px-6">
                <Sparkles className="h-4 w-4" /> Book New Service
              </Button>
            </Link>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 mt-6 border-t border-border/60">
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-border/80 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Total Bookings</div>
              <div className="text-lg font-extrabold text-foreground">{bookings.length} Appointments</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-border/80 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Active Requests</div>
              <div className="text-lg font-extrabold text-foreground">{activeBookingsCount} Ongoing</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-border/80 shadow-2xs">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground font-medium">Total Paid</div>
              <div className="text-lg font-extrabold text-emerald-600">${totalSpent}.00</div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex items-center gap-2 p-1.5 bg-muted/60 rounded-2xl w-fit border border-border/80">
        <button
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "bookings"
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <BookOpen className="h-4 w-4" />
          My Appointments
          <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-extrabold">
            {bookings.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("payments")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === "payments"
              ? "bg-white text-primary shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Receipt className="h-4 w-4" />
          Payment History
          <span className="rounded-full bg-primary/10 text-primary px-2 py-0.5 text-[11px] font-extrabold">
            {MOCK_PAYMENTS.length}
          </span>
        </button>
      </div>

      {/* ─── TAB: MY BOOKINGS ─── */}
      {activeTab === "bookings" && (
        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">Service Appointments</h2>
              <p className="text-xs text-muted-foreground">Track booking status, make payments, or leave reviews.</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-muted text-muted-foreground">
              Total: {bookings.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-5 py-3.5 rounded-l-xl">Service &amp; Category</th>
                  <th className="px-4 py-3.5">Technician</th>
                  <th className="px-4 py-3.5">Scheduled Time</th>
                  <th className="px-4 py-3.5">Price</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right rounded-r-xl">Actions</th>
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

                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xs">
                          {item.technicianName.charAt(0)}
                        </div>
                        <span className="font-semibold text-foreground">{item.technicianName}</span>
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
                      {/* Pay Now Button */}
                      {item.status === "ACCEPTED" && (
                        <Link href={`/dashboard/customer/bookings/${item.id}/pay`}>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold gap-1.5 text-xs h-9 px-4 rounded-xl shadow-sm">
                            <CreditCard className="h-3.5 w-3.5" /> Pay Now (${item.totalPrice})
                          </Button>
                        </Link>
                      )}

                      {/* Cancel — only for REQUESTED */}
                      {item.status === "REQUESTED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 text-xs h-9 px-3 rounded-xl gap-1"
                          onClick={() => handleCancelBooking(item.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" /> Cancel Request
                        </Button>
                      )}

                      {/* Leave Review Button */}
                      {item.status === "COMPLETED" && (
                        item.hasReview ? (
                          <span className="text-xs text-emerald-600 font-bold flex items-center gap-1 justify-end">
                            <CheckCircle2 className="h-4 w-4" /> Review Published
                          </span>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs h-9 px-3 rounded-xl gap-1.5 font-semibold hover:border-amber-400 hover:text-amber-600"
                            onClick={() => setReviewModalBooking(item)}
                          >
                            <Star className="h-3.5 w-3.5 text-amber-500 fill-current" /> Leave Review
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
        <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm space-y-4 p-6 md:p-8">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h2 className="text-lg font-bold text-foreground">Billing &amp; Payment Receipts</h2>
              <p className="text-xs text-muted-foreground">Detailed history of settled transactions processed via Stripe.</p>
            </div>
            <div className="flex items-center gap-2 bg-emerald-500/10 text-emerald-700 px-3 py-1 rounded-full text-xs font-extrabold border border-emerald-500/20">
              <ShieldCheck className="h-3.5 w-3.5" />
              Total Settled: ${totalSpent}.00
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider font-semibold text-[10px]">
                <tr>
                  <th className="px-5 py-3.5 rounded-l-xl">Service Description</th>
                  <th className="px-4 py-3.5">Technician</th>
                  <th className="px-4 py-3.5">Amount Paid</th>
                  <th className="px-4 py-3.5">Gateway</th>
                  <th className="px-4 py-3.5">Transaction ID</th>
                  <th className="px-4 py-3.5">Date &amp; Time</th>
                  <th className="px-5 py-3.5 text-right rounded-r-xl">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {MOCK_PAYMENTS.map((payment) => (
                  <tr key={payment.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-5 py-4 font-bold text-sm text-foreground max-w-[220px]">
                      <div className="truncate">{payment.serviceTitle}</div>
                    </td>

                    <td className="px-4 py-4 font-medium text-foreground">
                      {payment.technicianName}
                    </td>

                    <td className="px-4 py-4 font-extrabold text-sm text-emerald-600">
                      ${payment.amount}.00
                    </td>

                    <td className="px-4 py-4">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-violet-500/10 text-violet-700 border border-violet-500/20 inline-flex items-center gap-1">
                        <CreditCard className="h-3 w-3" /> Stripe
                      </span>
                    </td>

                    <td className="px-4 py-4 font-mono text-[11px] text-muted-foreground">
                      {payment.transactionId}
                    </td>

                    <td className="px-4 py-4 text-muted-foreground">
                      {payment.paidAt}
                    </td>

                    <td className="px-5 py-4 text-right">
                      <span className="px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 inline-flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3" /> SUCCESS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ─── REVIEW MODAL ─── */}
      {reviewModalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="font-bold text-base text-foreground flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500 fill-current" />
                Leave a Service Review
              </h3>
              <button
                onClick={() => setReviewModalBooking(null)}
                className="h-8 w-8 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center text-muted-foreground text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div className="p-3.5 rounded-2xl bg-muted/40 border border-border space-y-1">
                <div className="text-[11px] text-muted-foreground font-medium">Service Package</div>
                <div className="font-bold text-sm text-foreground">{reviewModalBooking.serviceTitle}</div>
                <div className="text-xs text-primary font-semibold pt-0.5">Technician: {reviewModalBooking.technicianName}</div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-foreground">Rating Score</label>
                <div className="flex items-center gap-2 p-2 bg-muted/20 rounded-2xl border border-border/60 justify-center">
                  {[1, 2, 3, 4, 5].map((starVal) => (
                    <button
                      key={starVal}
                      type="button"
                      onClick={() => setRating(starVal)}
                      className="p-1.5 text-amber-500 hover:scale-125 transition-transform"
                    >
                      <Star className={`h-7 w-7 ${starVal <= rating ? "fill-current" : ""}`} />
                    </button>
                  ))}
                </div>
                <div className="text-center text-xs font-bold text-amber-600">
                  {rating === 5 ? "⭐⭐⭐⭐⭐ Exceptional Service!" : rating === 4 ? "⭐⭐⭐⭐ Great Experience" : `${rating} / 5 Stars`}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground">Your Review Comment *</label>
                <textarea
                  rows={3}
                  className="w-full rounded-xl border border-input bg-transparent px-3.5 py-2.5 text-xs outline-none focus:ring-2 focus:ring-primary/20"
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
                <Button type="submit" size="sm" className="font-bold px-6" disabled={submittingReview}>
                  {submittingReview ? "Publishing..." : "Submit Review →"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
