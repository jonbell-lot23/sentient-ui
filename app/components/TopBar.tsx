"use client";
import { useState } from "react";
import {
  Menu,
  Plus,
  HelpCircle,
  User,
  Settings,
  Sparkles,
  Rocket,
  Zap,
} from "lucide-react";
import { CustomiseModal } from "./CustomiseModal";

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <header className="w-full bg-blue-600 text-white shadow flex items-center h-14 px-4 relative z-50">
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
      {/* Spacer to push icons right */}
      <div className="flex-1" />
      {/* Right: Distinctive icons, user avatar, customize, and hamburger */}
      <div className="flex items-center gap-3 ml-4">
        <button className="hover:bg-blue-500 p-2 rounded" title="Sparkles">
          <Sparkles className="w-5 h-5" stroke="currentColor" />
        </button>
        <button className="hover:bg-blue-500 p-2 rounded" title="Rocket">
          <Rocket className="w-5 h-5" stroke="currentColor" />
        </button>
        <button className="hover:bg-blue-500 p-2 rounded" title="Zap">
          <Zap className="w-5 h-5" stroke="currentColor" />
        </button>
        <button className="hover:bg-blue-500 p-2 rounded-full" title="Account">
          <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-400 text-white font-bold rounded-full">
            HE
          </span>
        </button>
        {/* Hamburger menu always visible for now */}
        <div className="relative">
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
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => {
                    setMenuOpen(false);
                    setModalOpen(true);
                  }}
                >
                  <Settings className="w-5 h-5" stroke="currentColor" />
                  <span>Customize</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <Settings className="w-5 h-5" stroke="currentColor" />
                  <span>Settings</span>
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700"
                  onClick={() => setMenuOpen(false)}
                >
                  <HelpCircle className="w-5 h-5" stroke="currentColor" />
                  <span>Help</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <CustomiseModal open={modalOpen} onClose={() => setModalOpen(false)} />
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
