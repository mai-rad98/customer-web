import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { contact, navLinks, services } from "@/lib/site";

const contactItems = [
  { icon: MapPin, value: contact.location },
  { icon: Phone, value: contact.phone, href: contact.phoneHref },
  { icon: Mail, value: contact.email, href: contact.emailHref },
  { icon: Clock, value: contact.hours },
];

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-mono text-[0.7rem] tracking-[0.16em] text-orange">{children}</h3>;
}

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-ink text-white/70">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-orange/50 to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-16 pb-12 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="" width={44} height={44} className="rounded-full" />
            <span className="text-xl font-bold tracking-tight text-white">
              Move<span className="text-orange">Right</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Gaborone&apos;s trusted moving and relocation partner. Professional, careful, and always on time.
          </p>
          <p className="mt-4 font-mono text-xs tracking-wider text-white/40">&ldquo;YOUR MOVE. OUR PRIORITY.&rdquo;</p>
        </div>

        <div>
          <ColumnTitle>OUR SERVICES</ColumnTitle>
          <ul className="mt-5 space-y-3 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services#${s.slug}`} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>QUICK LINKS</ColumnTitle>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>CONTACT US</ColumnTitle>
          <ul className="mt-5 space-y-3.5 text-sm">
            {contactItems.map(({ icon: Icon, value, href }) => (
              <li key={value} className="flex items-center gap-3">
                <span className="glass inline-flex size-8 shrink-0 items-center justify-center rounded-lg" aria-hidden>
                  <Icon className="size-3.5 text-orange" />
                </span>
                {href ? (
                  <a href={href} className="transition-colors hover:text-white">
                    {value}
                  </a>
                ) : (
                  <span>{value}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 font-mono text-[0.68rem] tracking-wider text-white/40 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© 2026 MOVERIGHT MOVING &amp; RELOCATION SERVICES</span>
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
            GABORONE, BOTSWANA
          </span>
        </div>
      </div>
    </footer>
  );
}
