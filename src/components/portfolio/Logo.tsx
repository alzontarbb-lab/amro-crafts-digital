type Variant = "wordmark" | "stamp" | "avatar";

export function Logo({ variant = "wordmark" }: { variant?: Variant }) {
  if (variant === "avatar") {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: "#0a0a0a" }}
      >
        <span
          className="text-4xl md:text-5xl font-bold"
          style={{
            fontFamily: "var(--font-arabic)",
            color: "#f0ede6",
            direction: "rtl",
            unicodeBidi: "isolate",
            lineHeight: 1,
            display: "inline-block",
          }}
        >
          عمرو
        </span>
      </div>
    );
  }

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
