"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNav } from "../nav-context";
import { useState } from "react";
import { Settings } from "lucide-react";
import { CustomiseModal } from "./CustomiseModal";

export function SideNav() {
  const { nav } = useNav();
  const path = usePathname();
  const [modalOpen, setModalOpen] = useState(false);
  console.log("[SideNav] nav:", nav);
  return (
    <aside className="w-56 bg-gray-50 border-r h-screen p-4 flex flex-col justify-between">
      <div>
        <div className="space-y-2">
          {nav.map((i) => {
            const active = path === `/${i.id}`;
            return (
              <Link
                key={i.id}
                href={`/${i.id}`}
                className={`flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-200 ${
                  active ? "bg-gray-200 font-medium" : ""
                }`}
              >
                <i.Icon className="w-5 h-5" />
                <span>{i.label}</span>
              </Link>
            );
          })}
        </div>
        <hr className="my-4 border-gray-200" />
        <div className="flex flex-col items-start">
          <button
            className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-800 hover:bg-blue-50 p-2 rounded w-full justify-start"
            onClick={() => setModalOpen(true)}
            title="Customize UI"
          >
            <Settings className="w-5 h-5" />
            <span className="text-sm">Customize UI</span>
          </button>
        </div>
      </div>
      <CustomiseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </aside>
  );
}
