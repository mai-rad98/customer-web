import { Phone } from "lucide-react";
import Button from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/SectionHeader";
import { contact } from "@/lib/site";

type CtaBandProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: string;
};

export default function CtaBand({ eyebrow = "Ready when you are", title, subtitle, cta = "Get a Free Quote" }: CtaBandProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="relative isolate mx-auto max-w-6xl overflow-hidden rounded-3xl bg-ink px-6 py-14 sm:px-14 sm:py-16">
        <div className="absolute -right-24 -bottom-32 -z-10 size-96 rounded-full bg-orange/30 blur-[100px]" aria-hidden />
        <div className="absolute top-0 left-10 right-10 -z-10 h-px bg-linear-to-r from-transparent via-orange/60 to-transparent" aria-hidden />

        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <Eyebrow tone="dark">{eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance text-white sm:text-4xl">{title}</h2>
            {subtitle && <p className="mt-3 text-base leading-relaxed text-white/65">{subtitle}</p>}
          </div>
          <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto sm:flex-row">
            <Button href="/contact" size="lg" arrow>
              {cta}
            </Button>
            <Button href={contact.phoneHref} variant="secondary" size="lg" icon={<Phone className="size-4" aria-hidden />}>
              Call {contact.phone}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
