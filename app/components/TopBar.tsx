"use client";
import { useState } from "react";
import { defaultNav } from "@/lib/nav-items";
import Link from "next/link";

const iconPaths = [
  <path key="1" d="M2 2h6v6H2z" />, // square
  <circle key="2" cx="5" cy="5" r="3" />, // circle
  <path key="3" d="M2 7l3-5 3 5H2z" />, // triangle
  <path key="4" d="M5 2v6M2 5h6" />, // plus
  <path key="5" d="M2 2l6 6M8 2L2 8" />, // cross
];

export function TopBar() {
  const [open, setOpen] = useState(false);
  const icons = defaultNav.slice(0, 5);
  const menuItems = [
    { label: "Dashboard", icon: "\uD83D\uDCC8", href: "#" },
    { label: "Reports", icon: "\uD83D\uDCCA", href: "#" },
    { label: "Contacts", icon: "\uD83D\uDC65", href: "#" },
    { label: "Settings", icon: "\u2699\uFE0F", href: "#" },
    { label: "Files", icon: "\uD83D\uDCC1", href: "#" },
    { label: "Help", icon: "\u2753", href: "#" },
    { label: "Customize this menu", icon: "\u2728", href: "/customize-menu" },
  ];

  return (
    <div className="relative flex items-center justify-between bg-[#13B5EA] text-white px-4 py-2">
      <div className="flex space-x-4">
        {icons.map((i, idx) => (
          <Link
            key={i.id}
            href="#"
            title={i.label}
            className="hover:underline"
          >
            <svg
              viewBox="0 0 10 10"
              className="w-5 h-5 fill-current"
            >
              {iconPaths[idx]}
            </svg>
          </Link>
        ))}
      </div>
      <div className="relative">
        <button
          className="p-2"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 20 20">
            <path d="M2 4h16M2 10h16M2 16h16" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
