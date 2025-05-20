"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultNav, NavItem } from "@/lib/nav-items";

interface NavState {
  order?: string[];
  hidden?: string[];
}
const STORAGE_KEY = "custom-nav";

const Ctx = createContext<{
  nav: NavItem[];
  update: (s: NavState) => void;
  reset: () => void;
}>({ nav: defaultNav, update: () => {}, reset: () => {} });

export const NavProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<NavState>(() => {
    if (typeof window === "undefined") return { order: [], hidden: [] };
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  });

  const nav = defaultNav
    .filter((i) => !state.hidden?.includes(i.id))
    .sort((a, b) => {
      // If we have a complete order array, use it
      if (state.order?.length === defaultNav.length) {
        return state.order.indexOf(a.id) - state.order.indexOf(b.id);
      }

      // Otherwise, maintain original order for items not in the order array
      const aIndex = state.order?.indexOf(a.id) ?? -1;
      const bIndex = state.order?.indexOf(b.id) ?? -1;

      if (aIndex !== -1 && bIndex !== -1) {
        return aIndex - bIndex;
      }

      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return defaultNav.indexOf(a) - defaultNav.indexOf(b);
    });

  const update = (s: NavState) => {
    // If we're updating the order, ensure it includes all visible items
    if (s.order) {
      const visibleItems = defaultNav
        .filter((i) => !s.hidden?.includes(i.id))
        .map((i) => i.id);

      // Add any missing visible items to the end of the order
      const missingItems = visibleItems.filter((id) => !s.order?.includes(id));
      s.order = [...s.order, ...missingItems];
    }

    const newState = { ...state, ...s };
    setState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({});
  };

  return <Ctx.Provider value={{ nav, update, reset }}>{children}</Ctx.Provider>;
};

export const useNav = () => useContext(Ctx);
