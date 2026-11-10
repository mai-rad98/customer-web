import type { Metadata } from "next";
import { Check, ChevronDown, ReceiptText, ShieldCheck, Sparkles } from "lucide-react";
import CtaBand from "@/components/CtaBand";
import Button from "@/components/ui/Button";
import PageHero from "@/components/ui/PageHero";
import SectionHeader from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Pricing — MoveRight Moving & Relocation",
  description: "Transparent, fair pricing for moving and relocation services in Gaborone. No hidden fees.",
};

const pricingTiers = [
  {
    name: "Small Move",
    desc: "Single items, studio apartments, or small loads",
    from: "P 800",
    includes: [
      "Up to 2 hours of crew time",
      "1–2 trained movers",
      "Furniture protection wrapping",
      "Single-level loading and unloading",
    ],
    examples: "Single furniture item, studio flat, small bedroom",
    highlight: false,
  },
  {
    name: "Standard Home Move",
    desc: "1–2 bedroom properties",
    from: "P 1,800",
    includes: [
      "3–5 hours of crew time",
      "2–3 trained movers",
      "Full furniture wrapping",
      "Loading, transport, and placement",
      "Fragile item handling",
    ],
    examples: "1–2 bedroom flat or house, moderate volume",
    highlight: true,
  },
  {
    name: "Large Home Move",
    desc: "3+ bedroom properties",
    from: "P 3,500",
    includes: [
      "Full-day crew allocation",
      "3–4 trained movers",
      "Complete furniture protection",
      "Multi-room loading and placement",
      "Heavy items and appliances",
    ],
    examples: "3+ bedroom house, high volume, appliances included",
    highlight: false,
  },
];

const extras = [
  { item: "Packing service (per room)", price: "P 300–500" },
  { item: "Packing materials (boxes, wrap, tape)", price: "P 150–350" },
  { item: "Appliance disconnection/reconnection", price: "By quote" },
  { item: "Furniture assembly/disassembly", price: "P 100–300" },
  { item: "Waiting time (per hour beyond estimate)", price: "P 250" },
  { item: "Stairs surcharge (per floor above 1)", price: "P 150" },
  { item: "After-hours service", price: "By quote" },
  { item: "Long-distance move", price: "By quote" },
];

const faqs = [
  {
    q: "Are the prices fixed or estimates?",
    a: "The prices shown are starting-from guides based on typical jobs. Your actual quote will be itemised based on your specific requirements — distance, volume, stairs, appliances, and any extras. We don't charge more than your accepted quote.",
  },
  {
    q: "Is there a deposit required?",
    a: "Yes. We require a small deposit to confirm your booking. The balance is settled on completion of the move.",
  },
  {
    q: "Are there any hidden fees?",
    a: "No. Your quote will clearly list every item. If anything changes on moving day that wasn't in the original quote, we discuss it with you before proceeding.",
  },
  {
    q: "What if my move takes longer than estimated?",
    a: "If the move takes longer than quoted, we charge at an agreed hourly rate for the extra time. This is discussed upfront and listed in your quote.",
  },
  {
    q: "Do you charge for the initial quote?",
    a: "No. Quotes are free and carry no obligation.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        index="04 — PRICING"
        eyebrow="Transparent pricing"
        title="Simple, Fair Pricing"
        subtitle="No hidden fees. No surprises. Every quote is itemised so you know exactly what you're paying for."
      >
        <ul className="glass space-y-3 rounded-2xl p-5 text-sm text-white/80">
          {[
            { icon: ReceiptText, text: "Itemised quote, line by line" },
            { icon: ShieldCheck, text: "Never more than your accepted quote" },
            { icon: Sparkles, text: "Free, no-obligation quotes" },
          ].map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-center gap-3">
              <Icon className="size-4 shrink-0 text-orange" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Pricing tiers */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeader
            eyebrow="Starting prices"
            title="Pick the size that fits"
            subtitle="Prices are guides. Your exact quote is calculated from your specific job details."
          />

          <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-3">
            {pricingTiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative isolate flex flex-col overflow-hidden rounded-3xl p-7 sm:p-8 ${
                  tier.highlight ? "bg-ink text-white glow-orange lg:-my-4 lg:py-12" : "bg-white ring-1 ring-line"
                }`}
              >
                {tier.highlight && (
                  <>
                    <div className="absolute -top-24 -right-24 -z-10 size-64 rounded-full bg-orange/30 blur-[80px]" aria-hidden />
                    <span className="absolute top-6 right-6 rounded-full bg-orange px-2.5 py-1 font-mono text-[0.62rem] tracking-widest text-white">
                      MOST POPULAR
                    </span>
                  </>
                )}

                <h3 className={`text-xl font-semibold ${tier.highlight ? "text-white" : "text-ink"}`}>{tier.name}</h3>
                <p className={`mt-1 text-sm ${tier.highlight ? "text-white/60" : "text-muted"}`}>{tier.desc}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className={`font-mono text-xs tracking-widest ${tier.highlight ? "text-white/50" : "text-muted"}`}>FROM</span>
                  <span className={`font-mono text-4xl font-semibold tracking-tight ${tier.highlight ? "text-orange" : "text-ink"}`}>
                    {tier.from}
                  </span>
                </div>

                <ul className={`mt-7 flex-1 space-y-3 border-t pt-7 text-sm ${tier.highlight ? "border-white/10 text-white/80" : "border-line text-ink"}`}>
                  {tier.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-orange" strokeWidth={2.5} aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>

                <p className={`mt-6 text-xs leading-relaxed ${tier.highlight ? "text-white/50" : "text-muted"}`}>
                  <span className="font-semibold">Examples:</span> {tier.examples}
                </p>

                <Button href="/contact" variant={tier.highlight ? "primary" : "dark"} arrow className="mt-6 w-full">
                  Get an Exact Quote
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extras */}
      <section className="bg-white px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <SectionHeader eyebrow="Extras" title="Optional Add-Ons" subtitle="Add any of these to your quote as needed." />

          <dl className="mt-12 grid gap-x-10 sm:grid-cols-2">
            {extras.map((e) => (
              <div key={e.item} className="flex items-baseline gap-3 border-b border-line py-4 text-sm">
                <dt className="text-ink">{e.item}</dt>
                <span className="min-w-4 flex-1 translate-y-[-3px] border-b border-dotted border-muted/40" aria-hidden />
                <dd className={`shrink-0 font-mono font-medium ${e.price === "By quote" ? "text-muted" : "text-ink"}`}>{e.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <SectionHeader eyebrow="Good to know" title="Pricing FAQs" />
          <div className="mt-12 space-y-3">
            {faqs.map((faq, i) => (
              <details
                key={faq.q}
                open={i === 0}
                className="group rounded-2xl bg-white ring-1 ring-line transition-shadow open:shadow-[0_12px_40px_-20px_rgb(27_43_107/0.35)] open:ring-orange/30"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-semibold text-ink">
                  {faq.q}
                  <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180 group-open:text-orange" aria-hidden />
                </summary>
                <p className="px-6 pb-6 -mt-1 leading-relaxed text-muted">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        eyebrow="Your exact price"
        title="Get Your Itemised Quote"
        subtitle="Tell us about your move and we'll send a clear, detailed quote within one business day."
        cta="Request a Quote"
      />
    </>
  );
}
