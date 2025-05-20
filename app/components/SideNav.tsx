"use client";
import { useNav } from "../nav-context";

export function SideNav() {
  const { nav } = useNav();
  return (
    <aside className="w-48 border-r p-4 space-y-2">
      {nav.map((i) => (
        <a key={i.id} href="#" className="block hover:underline">
          {i.label}
        </a>
      ))}
    </aside>
  );
}
