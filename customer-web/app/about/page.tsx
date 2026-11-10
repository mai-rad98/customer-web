import Image from "next/image";
import type { Metadata } from "next";
import { Clock, Headset, HeartHandshake, MapPin, MessageCircle, Package, ShieldCheck, Truck } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Button from "@/components/ui/Button";
import IconBadge from "@/components/ui/IconBadge";
import PageHero from "@/components/ui/PageHero";
import SectionHeader, { Eyebrow } from "@/components/ui/SectionHeader";
import { serviceAreas } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — MoveRight Moving & Relocation",
  description: "Learn about MoveRight — Gaborone's professional moving and relocation company. Our story, values, and the team behind your move.",
};

const values = [
  {
    icon: HeartHandshake,
    title: "Respect",
    desc: "We treat every home, office, and belonging with the same respect we'd want for our own. Your space is not just a job site.",
  },
  {
    icon: Clock,
    title: "Reliability",
    desc: "We arrive when we say we will. Every estimate is honest. Every commitment is kept.",
  },
  {
    icon: ShieldCheck,
    title: "Care",
    desc: "We wrap it, protect it, and handle it carefully. Damage is not acceptable on any job, regardless of size.",
  },
  {
    icon: MessageCircle,
    title: "Communication",
    desc: "You're never left wondering what's happening. We keep you informed from booking to completion.",
  },
];

const team = [
  { icon: Headset, name: "Operations Team", role: "Scheduling & Customer Service" },
  { icon: Truck, name: "Driver Crew", role: "Transport & Logistics" },
  { icon: Package, name: "Moving Crew", role: "Loading, Packing & Placement" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        index="03 — ABOUT"
        eyebrow="Our story"
        title="About MoveRight"
        subtitle="A Botswana-born moving company built on the belief that a great move starts with a great team."
      />

      {/* Story */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Why we started</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-ink sm:text-4xl">Moving should be straightforward.</h2>
            <div className="mt-6 space-y-5 leading-relaxed text-muted">
              <p>
                Moving in Gaborone should be straightforward — but for too many people, it isn&apos;t. Unreliable crews, hidden costs,
                furniture that arrives damaged, and no communication from start to finish. We started MoveRight because we believed
                people deserved better.
              </p>
              <p>
                We&apos;re a small, professional team based in Gaborone. We operate one enclosed truck, a trained crew, and a simple
                principle: do the job properly or don&apos;t take it at all.
              </p>
              <p>
                Every booking gets our full attention. We&apos;re not the biggest moving company — but we&apos;re building a reputation
                for being the most reliable one.
              </p>
            </div>
          </div>

          {/* Mission card */}
          <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-8 sm:p-10">
            <div className="absolute -top-20 -left-20 -z-10 size-72 rounded-full bg-orange/25 blur-[90px]" aria-hidden />

            <div className="flex items-center gap-4">
              <Image src="/logo.png" alt="" width={56} height={56} className="rounded-full ring-2 ring-orange/60" />
              <div>
                <p className="font-mono text-[0.68rem] tracking-[0.16em] text-white/40">{"// MISSION"}</p>
                <h3 className="text-xl font-semibold text-white">Our Mission</h3>
              </div>
            </div>
            <p className="mt-6 text-lg leading-relaxed text-white/80">
              To make every move in Gaborone and surrounding areas a stress-free, professional experience — so that families and
              businesses can focus on what comes next, not on the logistics of getting there.
            </p>
            <p className="mt-8 border-t border-white/10 pt-6 text-xl font-semibold text-gradient">&ldquo;Moving people, not just things.&rdquo;</p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="relative isolate px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader eyebrow="How we operate" title="Our Values" />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-white p-6 ring-1 ring-line">
                <IconBadge icon={v.icon} />
                <h3 className="mt-6 text-lg font-semibold text-ink">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="The people"
            title="The Team Behind Your Move"
            subtitle="Every person on the MoveRight team is vetted, trained, and uniformed. We don't send strangers — we send professionals."
          />
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {team.map((t, i) => (
              <div key={t.name} className="flex items-center gap-4 rounded-2xl bg-surface p-5 ring-1 ring-line">
                <IconBadge icon={t.icon} size="lg" />
                <div>
                  <p className="font-mono text-[0.62rem] tracking-widest text-muted">UNIT {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="font-semibold text-ink">{t.name}</h3>
                  <p className="text-sm text-muted">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage area */}
      <section className="px-4 pt-16 sm:px-6 sm:pt-24">
        <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-14 sm:px-12">
          <div className="absolute -right-24 -top-24 -z-10 size-80 rounded-full bg-navy blur-[90px]" aria-hidden />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeader
                align="left"
                tone="dark"
                eyebrow="Coverage"
                title="Where We Operate"
                subtitle="We're based in Gaborone and currently serve the greater Gaborone area and surrounding neighbourhoods. Long-distance moves are available on request."
              />
              <Button href="/contact" size="lg" arrow className="mt-8">
                Check Your Area — Get a Quote
              </Button>
            </div>
            <ul className="flex flex-wrap gap-2.5">
              {serviceAreas.map((area) => (
                <li key={area} className="glass inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm text-white/85">
                  <MapPin className="size-3.5 text-orange" aria-hidden />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand title="Let's plan your move together." subtitle="Tell us where you're going — we'll handle the rest." />
    </>
  );
}
