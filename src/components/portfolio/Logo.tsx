type Variant = "wordmark" | "stamp";

export function Logo({ variant = "wordmark" }: { variant?: Variant }) {
  if (variant === "stamp") {
    return (
      <div
        style={{
          background: "#0a0a0a",
          color: "#f0ede6",
          padding: "18px 32px",
          fontFamily: "var(--font-arabic)",
          fontSize: 72,
          fontWeight: 700,
          direction: "rtl",
          unicodeBidi: "isolate",
          lineHeight: 1,
          display: "inline-block",
        }}
      >
        عمرو
      </div>
    );
  }

  return (
    <span
      style={{
        fontFamily: "var(--font-arabic)",
        fontSize: 30,
        fontWeight: 700,
        direction: "rtl",
        unicodeBidi: "isolate",
        lineHeight: 1,
        display: "inline-block",
      }}
    >
      عمرو
    </span>
  );
}
