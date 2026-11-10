import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock, HeartHandshake, MapPin, ShieldCheck, Smartphone, Users, Zap } from "lucide-react";
import ServiceCard from "@/components/ServiceCard";
import RouteTracker from "@/components/RouteTracker";
import CtaBand from "@/components/CtaBand";
import Button from "@/components/ui/Button";
import IconBadge from "@/components/ui/IconBadge";
import SectionHeader, { Eyebrow } from "@/components/ui/SectionHeader";
import { services } from "@/lib/site";

/* ─── Data ─────────────────────────────────────────────────── */

const whyUs = [
  { icon: Users, title: "Professional & Trained Team", desc: "Every crew member is vetted, trained, and uniformed. Your belongings are in capable hands." },
  { icon: Clock, title: "On-Time Service", desc: "We show up when we say we will. Time-wasting is not part of how we operate." },
  { icon: ShieldCheck, title: "Secure", desc: "We handle your items with care. Every belonging is treated as if it were our own." },
  { icon: MapPin, title: "Gaborone & Beyond", desc: "We serve Gaborone and surrounding areas including Mogoditshane, Tlokweng, Phakalane and more." },
];

const stats = [
  { value: "100+", label: "Happy customers" },
  { value: "5★", label: "Average rating" },
  { value: "Same day", label: "Response time" },
  { value: "With care", label: "Every item handled" },
];

const steps = [
  { number: "01", title: "Request a Quote", desc: "Fill in your move details — origin, destination, service type, date. We review and get back to you within one business day." },
  { number: "02", title: "Confirm Your Booking", desc: "Accept your quote, pay a small deposit, and you're booked. We confirm your crew and truck assignment." },
  { number: "03", title: "Moving Day", desc: "Our uniformed crew arrives on time, handles everything carefully, and keeps you updated throughout the move." },
  { number: "04", title: "Settled & Done", desc: "Once everything is in place and you're happy, we close the job. Pay the balance and you're home." },
];

const testimonials = [
  {
    name: "Lesedi M.",
    location: "Mogoditshane",
    text: "MoveRight made our house move completely stress-free. The team was professional, careful with our furniture, and finished ahead of schedule.",
    rating: 5,
  },
  {
    name: "Thabo K.",
    location: "Phakalane, Gaborone",
    text: "We moved our office in one day with zero disruption. They planned everything in advance and executed it perfectly. Highly recommended for businesses.",
    rating: 5,
  },
  {
    name: "Boipelo S.",
    location: "Block 8, Gaborone",
    text: "Reasonably priced, polite crew, and they wrapped every piece of furniture before loading. My new flat was set up exactly how I asked.",
    rating: 5,
  },
];

/* ─── Page ──────────────────────────────────────────────────── */

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-ink pt-32 pb-20 sm:pt-40 lg:pb-28">
        <div className="absolute -top-32 left-1/2 -z-10 size-[640px] -translate-x-1/2 rounded-full bg-navy/60 blur-[120px]" aria-hidden />
        <div className="absolute right-[-8%] bottom-[-20%] -z-10 size-[520px] rounded-full bg-orange/25 blur-[120px]" aria-hidden />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-px bg-linear-to-r from-transparent via-orange/50 to-transparent" aria-hidden />

        <div className="mx-auto grid max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
          <div className="animate-fade-up">
            <span className="glass inline-flex items-center gap-2 rounded-full px-3 py-1.5">
              <Eyebrow tone="dark">Gaborone &amp; surrounds · Now booking</Eyebrow>
            </span>

            <h1 className="mt-6 text-5xl leading-[1.02] font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Your Move.
              <br />
              <span className="text-gradient">Our Priority.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-pretty text-white/65">
              Professional moving and relocation services across Gaborone. Safe, reliable, and stress-free — every time.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" arrow>
                Get a Free Quote
              </Button>
              <Button href="/services" size="lg" variant="secondary">
                Our Services
              </Button>
            </div>

            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                { icon: HeartHandshake, label: "Handled with care" },
                { icon: BadgeCheck, label: "Vetted, uniformed crew" },
                { icon: Zap, label: "Quotes within 1 business day" },
              ].map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon className="size-4 text-orange" aria-hidden />
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="animate-fade-up [animation-delay:200ms]">
            <RouteTracker />
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ──────────────────────────────────────── */}
      <section className="relative z-10 -mt-px border-b border-line bg-white">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 divide-line px-4 sm:px-6 lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-7 text-center lg:px-6">
              <dt className="font-mono text-[0.68rem] tracking-[0.16em] text-muted uppercase">{s.label}</dt>
              <dd className="mt-1.5 text-2xl font-bold tracking-tight text-ink sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* ── SERVICES ─────────────────────────────────────────── */}
      <section className="relative isolate px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="What we do"
            title="Our Services"
            subtitle="From a single piece of furniture to a full office relocation — we have the right service for your move."
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.slug} title={s.title} desc={s.summary} icon={s.icon} href={`/services#${s.slug}`} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-orange-700"
            >
              View all services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* ── WHY US ───────────────────────────────────────────── */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionHeader
              align="left"
              eyebrow="Why choose us"
              title={
                <>
                  Moving People,
                  <br />
                  Not Just Things.
                </>
              }
              subtitle="We understand that moving is about more than boxes and furniture — it's one of the biggest moments in your life. MoveRight is built around treating every move with that level of care."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {whyUs.map((w) => (
                <div key={w.title}>
                  <IconBadge icon={w.icon} size="sm" />
                  <h3 className="mt-3 font-semibold text-ink">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard panel */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-6 sm:p-10">
            <div className="absolute -top-20 -right-20 -z-10 size-72 rounded-full bg-orange/25 blur-[90px]" aria-hidden />

            <p className="font-mono text-[0.68rem] tracking-[0.16em] text-white/40">{"// PERFORMANCE"}</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <div className="text-3xl font-bold tracking-tight text-orange">{stat.value}</div>
                  <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>

            <figure className="mt-8 border-t border-white/10 pt-8">
              <blockquote className="text-lg leading-relaxed text-white/85">
                &ldquo;Every single job gets our full attention — no matter how big or small the move.&rdquo;
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full ring-2 ring-orange/60" />
                <div>
                  <div className="text-sm font-semibold text-white">MoveRight Team</div>
                  <div className="text-xs text-white/50">Gaborone, Botswana</div>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Simple process" title="How It Works" subtitle="Four simple steps from enquiry to a completed move." />

          <ol className="relative mt-16 grid gap-10 lg:grid-cols-4 lg:gap-6">
            {/* Connecting line: vertical on mobile, horizontal on desktop */}
            <span
              className="absolute top-2 bottom-2 left-6 w-px bg-linear-to-b from-orange via-line to-line lg:top-6 lg:right-[12%] lg:bottom-auto lg:left-[12%] lg:h-px lg:w-auto lg:bg-linear-to-r"
              aria-hidden
            />
            {steps.map((step) => (
              <li key={step.number} className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center">
                <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-ink font-mono text-sm font-medium text-orange shadow-[0_0_0_6px_var(--color-surface)] ring-1 ring-orange/40">
                  {step.number}
                </span>
                <div className="lg:mt-5">
                  <h3 className="font-semibold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-14 text-center">
            <Button href="/contact" size="lg" arrow>
              Start Your Move
            </Button>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS (hidden until launch) ───────────────
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="Customer reviews" title="What Our Customers Say" />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-surface p-6 ring-1 ring-line">
                <div className="text-orange">{"★".repeat(t.rating)}</div>
                <blockquote className="mt-3 leading-relaxed text-ink">&ldquo;{t.text}&rdquo;</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-semibold text-ink">{t.name}</span>
                  <span className="text-muted"> · {t.location}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      ── */}

      {/* ── APP COMING SOON ──────────────────────────────────── */}
      <section className="px-4 sm:px-6">
        <div className="relative isolate mx-auto grid max-w-6xl items-center gap-10 overflow-hidden rounded-3xl bg-white px-6 py-10 ring-1 ring-line sm:px-12 sm:py-14 md:grid-cols-2">
          <div>
            <Eyebrow>Something new is on the move</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              The MoveRight app is <span className="text-orange-700">coming soon.</span>
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-muted">
              Your move. Our priority. Now in your pocket — get quotes, follow your checklist and track moving day from your phone.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 font-mono text-xs tracking-wider text-muted ring-1 ring-line">
              <Smartphone className="size-3.5 text-orange" aria-hidden /> iOS &amp; ANDROID
            </p>
          </div>
          <div className="flex justify-center">
            <Image
              src="/app-coming-soon.png"
              alt="Preview of the MoveRight mobile app home screen"
              width={733}
              height={935}
              className="h-auto w-full max-w-72 sm:max-w-80"
            />
          </div>
        </div>
      </section>

      <CtaBand title="Ready for a Stress-Free Move?" subtitle="Tell us about your move and we'll send a clear, itemised quote within one business day." />
    </>
  );
}
