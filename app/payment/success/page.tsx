"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, ShieldCheck, Download } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") || "bk-1001";
  const provider = searchParams.get("provider") || "STRIPE";
  const txnId = `TXN-${Math.floor(10000000 + Math.random() * 90000000)}`;

  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Payment Successful!</h1>
          <p className="text-xs text-muted-foreground">
            Your transaction has been processed and verified via <strong className="text-foreground">{provider}</strong>.
          </p>
        </div>

        <div className="rounded-xl bg-muted/40 border border-border p-4 text-xs space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Booking Reference</span>
            <span className="font-mono font-semibold text-foreground">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Transaction ID</span>
            <span className="font-mono font-semibold text-foreground">{txnId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Status</span>
            <span className="text-emerald-600 font-bold">PAID</span>
          </div>
        </div>

        <div className="pt-2 space-y-3">
          <Link href="/dashboard/customer">
            <Button className="w-full gap-2 h-11 text-xs font-bold">
              Go to Customer Dashboard <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-muted-foreground">Processing payment outcome...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
