import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Variant = "primary" | "secondary" | "ghost" | "dark";
type Size = "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-orange text-white shadow-[0_8px_24px_-8px_rgb(244_121_32/0.7)] hover:bg-orange-600 hover:shadow-[0_12px_32px_-8px_rgb(244_121_32/0.8)]",
  secondary: "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/15 hover:ring-white/35 backdrop-blur",
  ghost: "bg-white text-navy ring-1 ring-line hover:ring-navy/30 hover:bg-white",
  dark: "bg-ink text-white hover:bg-navy",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-13 px-7 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className = "") {
  return `group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${variants[variant]} ${sizes[size]} ${className}`;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  icon?: React.ReactNode;
  className?: string;
};

export default function Button({ href, children, variant = "primary", size = "md", arrow, icon, className }: ButtonProps) {
  const classes = buttonClasses(variant, size, className);
  const content = (
    <>
      {icon}
      {children}
      {arrow && <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
    </>
  );

  // tel:/mailto: links are not routes
  if (!href.startsWith("/")) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
