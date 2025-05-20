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
  const [state, setState] = useState<NavState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
    }
  }, []);

  const nav = defaultNav
    .filter((i) => !state.hidden?.includes(i.id))
    .sort((a, b) => {
      // If we have a complete order array, use it
      if (state.order?.length === defaultNav.length) {
        return state.order.indexOf(a.id) - state.order.indexOf(b.id);
      }
      const aIndex = state.order?.indexOf(a.id) ?? -1;
      const bIndex = state.order?.indexOf(b.id) ?? -1;
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return defaultNav.indexOf(a) - defaultNav.indexOf(b);
    });

  const update = (s: NavState) => {
    if (s.order) {
      const visibleItems = defaultNav
        .filter((i) => !s.hidden?.includes(i.id))
        .map((i) => i.id);
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

  if (!mounted) return null;

  return <Ctx.Provider value={{ nav, update, reset }}>{children}</Ctx.Provider>;
};

export const useNav = () => useContext(Ctx);
