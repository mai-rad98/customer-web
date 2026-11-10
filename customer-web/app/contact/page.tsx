import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import QuoteWizard from "@/components/quote/QuoteWizard";
import PageHero from "@/components/ui/PageHero";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a Free Quote — MoveRight Moving & Relocation",
  description: "Tell us about your move in Gaborone and get a clear, itemised quote within one business day.",
};

const contactItems = [
  { icon: Phone, label: "Phone", value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: "Email", value: contact.email, href: contact.emailHref },
  { icon: MapPin, label: "Location", value: contact.location },
  { icon: Clock, label: "Hours", value: contact.hours },
];

const nextSteps = [
  "We review your move details",
  "We calculate a clear, itemised quote",
  "We send it to you within 1 business day",
  "You accept and we confirm your booking",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="05 — FREE QUOTE"
        eyebrow="Free quote"
        title="Get in Touch"
        subtitle="Fill in your move details and we'll get back to you with a clear quote within one business day."
      />

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl items-start gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
          <QuoteWizard />

          <aside className="space-y-6 lg:sticky lg:top-28">
            {/* Contact details */}
            <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-6 sm:p-8">
              <div className="absolute -right-16 -bottom-16 -z-10 size-56 rounded-full bg-orange/25 blur-[70px]" aria-hidden />
              <h2 className="text-lg font-semibold text-white">Prefer to talk?</h2>
              <p className="mt-1 text-sm text-white/60">Call or email — a real person will answer.</p>
              <ul className="mt-6 space-y-3">
                {contactItems.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <>
                      <span className="glass flex size-10 shrink-0 items-center justify-center rounded-xl" aria-hidden>
                        <Icon className="size-4 text-orange" />
                      </span>
                      <span>
                        <span className="block font-mono text-[0.62rem] tracking-[0.16em] text-white/40 uppercase">{label}</span>
                        <span className="block text-sm font-medium text-white">{value}</span>
                      </span>
                    </>
                  );
                  return (
                    <li key={label}>
                      {href ? (
                        <a href={href} className="-mx-2 flex items-center gap-3 rounded-xl p-2 transition-colors hover:bg-white/5">
                          {inner}
                        </a>
                      ) : (
                        <div className="-mx-2 flex items-center gap-3 p-2">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* What happens next */}
            <div className="rounded-3xl bg-white p-6 ring-1 ring-line sm:p-8">
              <h2 className="font-semibold text-ink">What Happens Next?</h2>
              <ol className="relative mt-5 space-y-4">
                <span className="absolute top-3 bottom-3 left-3 w-px bg-line" aria-hidden />
                {nextSteps.map((text, i) => (
                  <li key={text} className="relative flex items-center gap-3">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[0.65rem] text-orange ring-4 ring-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-muted">{text}</span>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
