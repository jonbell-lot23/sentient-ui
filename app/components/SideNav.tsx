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
      </div>
      <div className="flex flex-col items-start">
        <button
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 hover:bg-gray-200 p-2 rounded"
          onClick={() => setModalOpen(true)}
          title="Customize navigation"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Customize</span>
        </button>
      </div>
      <CustomiseModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </aside>
  );
}
