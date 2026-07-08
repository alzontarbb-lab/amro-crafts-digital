import { useEffect, useState } from "react";
import { useTheme } from "@/lib/theme";

export function Spotlight() {
  const { theme } = useTheme();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (theme !== "dark") return;
    const move = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      setVisible(true);
    };
    const leave = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", leave);
    };
  }, [theme]);

  if (theme !== "dark") return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] transition-opacity duration-500"
      style={{
        opacity: visible ? 1 : 0,
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, color-mix(in oklab, var(--foreground) 10%, transparent), transparent 70%)`,
      }}
    />
  );
}
