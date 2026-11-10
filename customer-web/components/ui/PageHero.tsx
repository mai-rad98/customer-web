import { Eyebrow } from "./SectionHeader";

type PageHeroProps = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  children?: React.ReactNode;
};

/** Dark "command-center" hero used at the top of every inner page. */
export default function PageHero({ index, eyebrow, title, subtitle, children }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-ink pt-32 pb-16 sm:pt-40 sm:pb-20">
      <div
        className="absolute -top-40 right-[-10%] -z-10 size-[520px] rounded-full bg-orange/20 blur-[120px]"
        aria-hidden
      />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-px bg-linear-to-r from-transparent via-orange/50 to-transparent" aria-hidden />

      <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 font-mono text-xs tracking-widest text-white/40">{`// ${index}`}</p>
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-balance text-white sm:text-5xl lg:text-6xl">{title}</h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-white/65 sm:text-lg">{subtitle}</p>
        </div>
        {children && <div className="animate-fade-up [animation-delay:150ms]">{children}</div>}
      </div>
    </section>
  );
}
