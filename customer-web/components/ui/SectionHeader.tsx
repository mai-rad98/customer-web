type SectionHeaderProps = {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function Eyebrow({ children, tone = "light" }: { children: React.ReactNode; tone?: "light" | "dark" }) {
  return (
    <span className={`eyebrow ${tone === "dark" ? "text-orange" : "text-orange-700"}`}>
      <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" aria-hidden />
      {children}
    </span>
  );
}

export default function SectionHeader({ eyebrow, title, subtitle, align = "center", tone = "light", className = "" }: SectionHeaderProps) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className}`}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-4 text-3xl font-bold tracking-tight text-balance sm:text-4xl ${tone === "dark" ? "text-white" : "text-ink"}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-base leading-relaxed text-pretty sm:text-lg ${tone === "dark" ? "text-white/65" : "text-muted"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
