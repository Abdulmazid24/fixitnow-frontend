"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";

function CancelContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "bk-1001";

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/10 text-amber-600">
          <XCircle className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Payment Cancelled</h1>
          <p className="text-xs text-muted-foreground">
            You cancelled the checkout process. No funds were debited for booking <span className="font-mono text-foreground font-semibold">{bookingId}</span>.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link href={`/dashboard/customer/bookings/${bookingId}/pay`}>
            <Button className="w-full gap-2 h-11 text-xs font-bold">
              <RefreshCw className="h-4 w-4" /> Retry Payment
            </Button>
          </Link>
          <Link href="/dashboard/customer">
            <Button variant="outline" className="w-full gap-2 text-xs">
              <ArrowLeft className="h-4 w-4" /> Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Loading payment outcome...</div>}>
      <CancelContent />
    </Suspense>
  );
}
