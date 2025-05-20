"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "../nav-context";
import { useAutoAnimate } from "../../lib/useAutoAnimate";

export function SideNav() {
  const { nav } = useNav();
  const path = usePathname();
  const parent = useAutoAnimate([nav]);
  return (
    <aside ref={parent} className="w-56 bg-gray-50 border-r h-screen p-4 space-y-1">
      {nav.map((i) => {
        const active = path === `/${i.id}`;
        return (
          <Link
            key={i.id}
            href={`/${i.id}`}
            data-id={i.id}
            className={`flex items-center gap-3 px-3 py-2 rounded transition-all hover:bg-gray-200 ${active ? "bg-gray-200 font-medium" : ""}`}
          >
            <i.Icon className="w-5 h-5" />
            <span>{i.label}</span>
          </Link>
        );
      })}
    </aside>
  );
}
