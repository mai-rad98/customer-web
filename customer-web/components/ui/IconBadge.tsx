import type { LucideIcon } from "lucide-react";

type IconBadgeProps = {
  icon: LucideIcon;
  tone?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const boxes = { sm: "size-9 rounded-lg", md: "size-12 rounded-xl", lg: "size-16 rounded-2xl" };
const glyphs = { sm: "size-4", md: "size-5", lg: "size-7" };

export default function IconBadge({ icon: Icon, tone = "light", size = "md", className = "" }: IconBadgeProps) {
  const toneClasses =
    tone === "dark"
      ? "glass text-orange"
      : "bg-linear-to-br from-orange-50 to-white text-orange-700 ring-1 ring-orange/20";
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${boxes[size]} ${toneClasses} ${className}`} aria-hidden>
      <Icon className={glyphs[size]} strokeWidth={1.75} />
    </span>
  );
}
