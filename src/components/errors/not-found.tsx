"use client";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-medium">Page not found</h2>
      <p className="mt-2 text-muted-foreground">
        The page you requested may not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="min-w-[120px]" onClick={() => router.back()}>
          Previous page
        </Button>
        <Button
          className="bg-primary text-primary-foreground min-w-[120px]"
          onClick={() => router.push("/")}
        >
          Go to home
        </Button>
      </div>
    </div>
  );
}
