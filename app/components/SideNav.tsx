"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "../nav-context";

export function SideNav() {
  const { nav } = useNav();
  const path = usePathname();
  
  return (
    <aside className="w-56 bg-gray-50 border-r h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="space-y-2 nav-items-container">
          {nav.map((i, index) => {
            const active = path === `/${i.id}`;
            
            return (
              <Link
                key={i.id}
                href={`/${i.id}`}
                data-item-id={`sidebar-${i.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 transition-all duration-300 ease-out ${
                  active ? "bg-gray-100 font-medium" : ""
                }`}
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <i.Icon className="w-5 h-5" />
                <span>{i.label}</span>
              </Link>
            );
          })}
        </div>
        <hr className="my-4 border-gray-200" />
      </div>
    </aside>
  );
}
