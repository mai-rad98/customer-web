import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  href?: string;
  index?: number;
}

export default function ServiceCard({ title, desc, icon, href, index }: ServiceCardProps) {
  const body = (
    <>
      <div className="flex items-start justify-between">
        <IconBadge icon={icon} />
        {index !== undefined && (
          <span className="font-mono text-xs tracking-widest text-muted/60">{String(index + 1).padStart(2, "0")}</span>
        )}
      </div>
      <h3 className="mt-6 flex items-center gap-1.5 text-lg font-semibold text-ink">
        {title}
        {href && (
          <ArrowUpRight
            className="size-4 text-orange opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
            aria-hidden
          />
        )}
      </h3>
      <p className="mt-2 text-[0.94rem] leading-relaxed text-muted">{desc}</p>
      {/* Accent line that lights up on hover */}
      <span
        className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-linear-to-r from-transparent via-orange to-transparent transition-transform duration-300 group-hover:scale-x-100"
        aria-hidden
      />
    </>
  );

  const classes =
    "group relative block overflow-hidden rounded-2xl bg-white p-6 ring-1 ring-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgb(27_43_107/0.35)] hover:ring-orange/30";

  return href ? (
    <Link href={href} className={classes}>
      {body}
    </Link>
  ) : (
    <div className={classes}>{body}</div>
  );
}
