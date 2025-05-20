"use client";
import { useNav } from "./nav-context";

export default function Home() {
  // You can add dashboard-specific content here if needed
  return (
    <section className="space-y-4 max-w-xl">
      <header className="mb-2">
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </header>
      <p className="text-gray-700">
        Welcome to your main dashboard. A quick overview of metrics would appear
        here.
      </p>
    </section>
  );
}
