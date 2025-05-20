"use client";
import Link from "next/link";
import { useNav } from "../nav-context";
import { usePathname } from "next/navigation";
import { Menu, Plus, HelpCircle, User } from "lucide-react";

export function TopBar() {
  const { nav } = useNav();
  const path = usePathname();

  return (
    <header className="w-full bg-blue-600 text-white shadow flex items-center h-14 px-4">
      {/* Company Dropdown (placeholder) */}
      <div className="relative mr-8">
        <button className="flex items-center gap-2 font-semibold text-white hover:bg-blue-700 px-3 py-1 rounded">
          Hornblower Enterprises
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
      </div>
      {/* Nav Tabs */}
      <nav className="flex gap-2 flex-1">
        {nav.map((i) => (
          <Link
            key={i.id}
            href={`/${i.id}`}
            className={`px-3 py-2 rounded font-medium transition-colors text-sm ${
              path === `/${i.id}`
                ? "bg-white text-blue-700 shadow"
                : "hover:bg-blue-500 hover:text-white text-white/90"
            }`}
          >
            {i.label}
          </Link>
        ))}
      </nav>
      {/* Right Icons */}
      <div className="flex items-center gap-3 ml-4">
        <button className="hover:bg-blue-500 p-2 rounded" title="Add">
          <Plus className="w-5 h-5" />
        </button>
        <button className="hover:bg-blue-500 p-2 rounded" title="Help">
          <HelpCircle className="w-5 h-5" />
        </button>
        <button className="hover:bg-blue-500 p-2 rounded-full" title="Account">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-400 text-white font-bold rounded-full">
            HE
          </span>
        </button>
        {/* Hamburger menu for mobile or extra options */}
        <button
          className="ml-2 hover:bg-blue-500 p-2 rounded md:hidden"
          title="Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
