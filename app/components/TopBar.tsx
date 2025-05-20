"use client";
import Link from "next/link";
import { useNav } from "../nav-context";
import { usePathname } from "next/navigation";
import { Menu, Plus, HelpCircle, User, Settings } from "lucide-react";
import { useState } from "react";
import { Modal } from "./Modal";

export function TopBar() {
  const { nav } = useNav();
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="w-full bg-blue-600 text-white shadow flex items-center h-14 px-4 relative">
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
      {/* Nav Tabs (hidden on mobile) */}
      <nav className="gap-2 flex-1 hidden md:flex">
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
        <div className="relative md:hidden">
          <button
            className="ml-2 hover:bg-blue-500 p-2 rounded"
            title="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 rounded shadow-2xl z-[100] animate-fadeIn">
              <div className="flex flex-col divide-y divide-gray-100">
                {nav.map((i) => (
                  <Link
                    key={i.id}
                    href={`/${i.id}`}
                    className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-100 ${
                      path === `/${i.id}` ? "font-semibold text-blue-700" : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <i.Icon className="w-5 h-5" />
                    <span>{i.label}</span>
                  </Link>
                ))}
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => {
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                >
                  <Settings className="w-5 h-5" />
                  <span>Customize</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">Customize Navigation</h2>
          <button
            onClick={() => setModalOpen(false)}
            className="text-gray-400 hover:text-gray-700 p-1"
          >
            ✕
          </button>
        </div>
        <div>Customize your navigation here.</div>
      </Modal>
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.18s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </header>
  );
}
