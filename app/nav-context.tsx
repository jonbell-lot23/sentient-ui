"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultNav, NavItem } from "@/lib/nav-items";

interface NavState {
  order: string[];
  hidden: string[];
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
    .sort(
      (a, b) =>
        (state.order?.indexOf(a.id) ?? 999) -
        (state.order?.indexOf(b.id) ?? 999)
    );

  const update = (s: NavState) => {
    setState(s);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({ order: [], hidden: [] });
  };

  return <Ctx.Provider value={{ nav, update, reset }}>{children}</Ctx.Provider>;
};

export const useNav = () => useContext(Ctx);
