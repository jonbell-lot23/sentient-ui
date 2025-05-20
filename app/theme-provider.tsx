"use client";
import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "light" | "dark";

const ThemeCtx = createContext<{ theme: Theme; setTheme: (t: Theme) => void }>({
  theme: "light",
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as Theme | null;
    if (stored) {
      setThemeState(stored);
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", t);
      document.documentElement.classList.toggle("dark", t === "dark");
    }
  };

  return (
    <ThemeCtx.Provider value={{ theme, setTheme }}>{children}</ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
