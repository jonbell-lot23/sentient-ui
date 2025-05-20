"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultHamburgerNav, NavItem } from "@/lib/nav-items";

interface NavState {
  order?: string[];
  hidden?: string[];
}
const STORAGE_KEY = "custom-hamburger-nav";

const Ctx = createContext<{
  nav: NavItem[];
  update: (s: NavState) => void;
  reset: () => void;
}>({ nav: defaultHamburgerNav, update: () => {}, reset: () => {} });

export const HamburgerNavProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<NavState>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
    }
  }, []);

  const nav = defaultHamburgerNav
    .filter((i) => !state.hidden?.includes(i.id))
    .sort((a, b) => {
      if (state.order?.length === defaultHamburgerNav.length) {
        return state.order.indexOf(a.id) - state.order.indexOf(b.id);
      }
      const aIndex = state.order?.indexOf(a.id) ?? -1;
      const bIndex = state.order?.indexOf(b.id) ?? -1;
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;
      return defaultHamburgerNav.indexOf(a) - defaultHamburgerNav.indexOf(b);
    });

  const update = (s: NavState) => {
    if (s.order) {
      const visibleItems = defaultHamburgerNav
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
