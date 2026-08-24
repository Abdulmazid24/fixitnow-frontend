"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Wrench, Mail, Lock, ArrowRight, ShieldAlert } from "lucide-react";
import { toast } from "sonner";

function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password.");
      return;
    }

    setLoading(true);
    try {
      const user = await login({ email, password });
      toast.success(`Welcome back, ${user.name}!`);

      if (redirect) {
        router.push(redirect);
      } else {
        switch (user.role) {
          case "ADMIN":
            router.push("/dashboard/admin");
            break;
          case "TECHNICIAN":
            router.push("/dashboard/technician");
            break;
          default:
            router.push("/dashboard/customer");
            break;
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to log in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const quickFill = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword("password123");
  };

  return (
    <div className="w-full max-w-md space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
          <Wrench className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Sign in to FixItNow</h1>
        <p className="text-sm text-muted-foreground">
          Access your account dashboard to manage services and bookings.
        </p>
      </div>

      {/* Login Form Card */}
      <div className="rounded-xl border border-border bg-card p-6 shadow-sm space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-foreground">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="name@example.com"
                className="pl-9"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-foreground">Password</label>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="••••••••"
                className="pl-9"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2 mt-2" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </form>

        {/* Quick Credentials Helper for Testing */}
        <div className="pt-4 border-t border-border space-y-2">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <ShieldAlert className="h-3.5 w-3.5" />
            <span>Quick Login Credentials (Demo):</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="text-[11px] h-7"
              onClick={() => quickFill("customer@example.com")}
            >
              Customer
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="text-[11px] h-7"
              onClick={() => quickFill("technician@example.com")}
            >
              Technician
            </Button>
            <Button
              type="button"
              variant="outline"
              size="xs"
              className="text-[11px] h-7"
              onClick={() => quickFill("admin@example.com")}
            >
              Admin
            </Button>
          </div>
        </div>
      </div>

      {/* Footer link */}
      <p className="text-center text-xs text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href="/auth/register" className="font-semibold text-primary hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-center py-8 text-muted-foreground">Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
