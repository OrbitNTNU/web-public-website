'use client';
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center text-cloud-white">
      <h1 className="mb-2">404 – Page Not Found</h1>
      <p className="text-charcoal-light mb-8 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
          className="flex flex-row gap-2 group cursor-pointer items-center"
          href="/"
        >
          <span className="material-icons text-3xl transition-transform duration-200 group-hover:-translate-x-2">
            chevron_left
          </span>
          <span>Go back to start</span>
        </Link>
    </main>
  );
}
