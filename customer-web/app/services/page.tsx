import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services — MoveRight Moving & Relocation",
  description: "Residential moves, office relocations, furniture delivery, appliance moving, packing, and labour-only services in Gaborone.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        index="02 — SERVICES"
        eyebrow="What we offer"
        title="Our Services"
        subtitle="From a single piece of furniture to a full office relocation — every job receives the same level of professionalism."
      />

      {/* Quick-jump chips */}
      <nav aria-label="Services" className="sticky top-[5.5rem] z-30 px-4 pt-6 sm:top-24 sm:px-6">
        <div className="glass-light mx-auto flex max-w-6xl gap-1.5 overflow-x-auto rounded-2xl p-1.5 shadow-[0_8px_30px_-15px_rgb(11_18_51/0.3)] [scrollbar-width:none]">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.slug}
                href={`#${s.slug}`}
                className="flex shrink-0 items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-white hover:text-ink"
              >
                <Icon className="size-4 text-orange" aria-hidden />
                {s.title}
              </Link>
            );
          })}
        </div>
      </nav>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.slug}
                id={s.slug}
                className="grid scroll-mt-44 overflow-hidden rounded-3xl bg-white ring-1 ring-line md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]"
              >
                {/* Icon panel */}
                <div className={`relative isolate flex min-h-48 flex-col justify-between overflow-hidden bg-ink p-6 sm:p-8 ${i % 2 ? "md:order-2" : ""}`}>
                  <div className="absolute -right-16 -bottom-16 -z-10 size-56 rounded-full bg-orange/25 blur-[70px]" aria-hidden />
                  <Icon className="absolute top-1/2 -right-10 -z-10 size-64 -translate-y-1/2 text-white/[0.05]" strokeWidth={1} aria-hidden />
                  <span className="font-mono text-xs tracking-widest text-white/40">{String(i + 1).padStart(2, "0")} / 06</span>
                  <span className="glass flex size-20 items-center justify-center rounded-3xl text-orange shadow-[0_0_40px_-8px_rgb(244_121_32/0.6)]" aria-hidden>
                    <Icon className="size-9" strokeWidth={1.5} />
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-10">
                  <p className="font-mono text-xs tracking-widest text-orange-700 uppercase">{s.tagline}</p>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted">{s.desc}</p>

                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-ink">
                        <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-orange/12 text-orange-700" aria-hidden>
                          <Check className="size-3" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-7 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted">
                      <span className="font-semibold text-ink">Ideal for:</span> {s.ideal}
                    </p>
                    <Button href="/contact" variant="ghost" arrow className="shrink-0">
                      Get a quote
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <CtaBand
        eyebrow="Need advice?"
        title="Not Sure Which Service You Need?"
        subtitle="Contact us and we'll recommend the right option for your move."
      />
    </>
  );
}
