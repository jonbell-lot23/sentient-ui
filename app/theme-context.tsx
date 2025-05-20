"use client";
import { createContext, useContext, useEffect, useState } from "react";

export interface ThemeState {
  mode?: "light" | "dark";
  foreground?: string;
  background?: string;
}

const defaultTheme: ThemeState = {
  mode: "light",
  foreground: "#000000",
  background: "#ffffff",
};

const STORAGE_KEY = "custom-theme";

const Ctx = createContext<{
  theme: ThemeState;
  update: (t: ThemeState) => void;
  reset: () => void;
}>({ theme: defaultTheme, update: () => {}, reset: () => {} });

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<ThemeState>(() => {
    if (typeof window === "undefined") return defaultTheme;
    return { ...defaultTheme, ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
  });

  const update = (t: ThemeState) => {
    setTheme((prev) => ({ ...prev, ...t }));
  };

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    setTheme(defaultTheme);
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
    const root = document.documentElement;
    if (theme.mode === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    if (theme.foreground)
      root.style.setProperty("--foreground-rgb", hexToRgb(theme.foreground));
    if (theme.background) {
      const rgb = hexToRgb(theme.background);
      root.style.setProperty("--background-start-rgb", rgb);
      root.style.setProperty("--background-end-rgb", rgb);
    }
  }, [theme]);

  return (
    <Ctx.Provider value={{ theme, update, reset }}>{children}</Ctx.Provider>
  );
};

export const useTheme = () => useContext(Ctx);

function hexToRgb(hex: string) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const num = parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r}, ${g}, ${b}`;
}
