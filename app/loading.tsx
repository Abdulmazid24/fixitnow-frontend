import React from "react";

export default function LoadingPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center space-y-4">
      <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      <p className="text-xs font-semibold text-muted-foreground animate-pulse">
        Loading FixItNow Services...
      </p>
    </div>
  );
}
