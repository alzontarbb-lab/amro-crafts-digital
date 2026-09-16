import { createContext, useContext, useEffect, type ReactNode } from "react";

type Theme = "dark";
const ThemeCtx = createContext<{ theme: Theme; toggle: () => void }>({
  theme: "dark",
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme: "dark", toggle: () => {} }}>{children}</ThemeCtx.Provider>
  );
}

export const useTheme = () => useContext(ThemeCtx);
