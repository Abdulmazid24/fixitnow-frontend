import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Search, Home, ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-lg space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary font-extrabold text-xl">
          404
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Page Not Found</h1>
          <p className="text-xs text-muted-foreground">
            The page or requested resource you are looking for does not exist or has been moved.
          </p>
        </div>

        <div className="pt-2 space-y-3">
          <Link href="/">
            <Button className="w-full gap-2 h-11 text-xs font-bold">
              <Home className="h-4 w-4" /> Return to Home
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" className="w-full gap-2 text-xs">
              <Search className="h-4 w-4" /> Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
