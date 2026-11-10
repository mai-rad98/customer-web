"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";
import { ArrowLeft, ArrowRight, CircleCheck, CircleHelp, Loader2, PencilLine } from "lucide-react";
import { services } from "@/lib/site";

const serviceOptions = [
  ...services.map((s) => ({ value: s.title, icon: s.icon })),
  { value: "Not sure yet", icon: CircleHelp },
];

const propertySizes = [
  "Single item / small load",
  "Studio / 1-bedroom",
  "2-bedroom",
  "3-bedroom",
  "4+ bedroom / large office",
];

const steps = [
  { label: "Your move", title: "What are you moving?", hint: "Pick the service that fits best — you can change it later." },
  { label: "Where & when", title: "Where are you moving?", hint: "A suburb and plot number is enough for now." },
  { label: "Your details", title: "How can we reach you?", hint: "We'll send your quote here within one business day." },
  { label: "Review", title: "Check your details", hint: "Everything look right? Send it and we'll get to work." },
];

type Form = {
  name: string;
  email: string;
  phone: string;
  service: string;
  propertySize: string;
  pickup: string;
  destination: string;
  date: string;
  message: string;
};
type Errors = Partial<Record<keyof Form, string>>;

/** YYYY-MM-DD in the visitor's timezone, comparable with <input type="date"> values */
function localToday() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function validate(step: number, form: Form): Errors {
  const errors: Errors = {};
  if (step === 0 && !form.service) errors.service = "Choose a service so we know what to quote for.";
  if (step === 1) {
    if (!form.pickup.trim()) errors.pickup = "Tell us where we're collecting from.";
    if (!form.destination.trim()) errors.destination = "Tell us where everything is going.";
    if (form.date && form.date < localToday()) errors.date = "Pick a date from today onwards.";
  }
  if (step === 2) {
    if (!form.name.trim()) errors.name = "Please enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) errors.email = "Enter a valid email, e.g. you@example.com.";
    if (form.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a phone number we can call.";
  }
  return errors;
}

const inputClasses =
  "w-full rounded-xl border border-line bg-white px-4 text-[0.95rem] text-ink transition placeholder:text-muted/60 hover:border-navy/30 focus:border-orange focus:ring-4 focus:ring-orange/15 focus:outline-none focus-visible:outline-none aria-invalid:border-red-500 aria-invalid:focus:ring-red-500/15";

function Field({
  id,
  label,
  optional,
  error,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between text-sm font-medium text-ink">
        {label}
        {optional && <span className="font-mono text-[0.65rem] tracking-wider text-muted">OPTIONAL</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export default function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    phone: "",
    service: "",
    propertySize: "",
    pickup: "",
    destination: "",
    date: "",
    message: "",
  });

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasMounted = useRef(false);

  // Move focus to the new step's heading so keyboard and screen-reader users land in the right place.
  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    headingRef.current?.focus();
  }, [step, submitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof Form;
    setForm((prev) => ({ ...prev, [name]: e.target.value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const fieldProps = (name: keyof Form) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `${name}-error` : undefined,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      const stepErrors = validate(step, form);
      setErrors(stepErrors);
      if (Object.keys(stepErrors).length === 0) setStep(step + 1);
      return;
    }
    setLoading(true);
    // Static site: simulate submission delay; wire to API in Phase 2
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const errorCount = Object.values(errors).filter(Boolean).length;

  if (submitted) {
    return (
      <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-line sm:p-12">
        <div className="mx-auto flex size-20 animate-fade-up items-center justify-center rounded-full bg-orange/10 text-orange ring-8 ring-orange/5">
          <CircleCheck className="size-10" strokeWidth={1.75} aria-hidden />
        </div>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-2xl font-bold tracking-tight text-ink focus:outline-none">
          Request Received!
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-muted">
          Thank you, {form.name}. We&apos;ll review your move details and send you a quote within one business day.
        </p>
        <p className="mt-4 text-sm text-muted">
          We&apos;ll reach out to you at <strong className="text-ink">{form.email}</strong> or{" "}
          <strong className="text-ink">{form.phone}</strong>.
        </p>
        <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 font-mono text-xs tracking-wider text-muted ring-1 ring-line">
          {form.service.toUpperCase()} · {form.pickup.toUpperCase()} → {form.destination.toUpperCase()}
        </div>
      </div>
    );
  }

  const current = steps[step];

  return (
    <form onSubmit={handleSubmit} noValidate className="overflow-hidden rounded-3xl bg-white ring-1 ring-line">
      {/* Progress */}
      <div className="border-b border-line px-6 pt-6 pb-5 sm:px-8">
        <div className="flex items-center justify-between font-mono text-[0.68rem] tracking-[0.16em]">
          <span className="text-orange-700">STEP {Math.min(step + 1, 3)} / 3</span>
          <span className="text-muted uppercase">{current.label}</span>
        </div>
        <ol className="mt-3 grid grid-cols-4 gap-1.5" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s.label} aria-current={i === step ? "step" : undefined}>
              <span className="sr-only">
                {s.label} {i < step ? "(done)" : i === step ? "(current)" : ""}
              </span>
              <span
                className={`block h-1.5 rounded-full transition-colors duration-500 ${
                  i < step ? "bg-orange" : i === step ? "bg-linear-to-r from-orange to-orange/40" : "bg-line"
                }`}
                aria-hidden
              />
            </li>
          ))}
        </ol>
      </div>

      <div className="px-6 py-8 sm:px-8">
        <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-bold tracking-tight text-ink focus:outline-none">
          {current.title}
        </h2>
        <p className="mt-1.5 text-sm text-muted">{current.hint}</p>

        <p aria-live="polite" className="sr-only">
          {errorCount > 0 ? `Please fix ${errorCount} ${errorCount === 1 ? "field" : "fields"} before continuing.` : ""}
        </p>

        <div key={step} className="mt-7 animate-fade-up space-y-6">
          {/* Step 1 — service + size */}
          {step === 0 && (
            <>
              <fieldset aria-describedby={errors.service ? "service-error" : undefined}>
                <legend className="mb-3 text-sm font-medium text-ink">Service</legend>
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {serviceOptions.map(({ value, icon: Icon }) => (
                    <label
                      key={value}
                      className="group relative flex cursor-pointer flex-col gap-3 rounded-2xl border border-line p-4 transition hover:border-navy/30 hover:bg-surface has-checked:border-orange has-checked:bg-orange-50 has-checked:shadow-[0_0_0_3px_rgb(244_121_32/0.15)] has-focus-visible:ring-2 has-focus-visible:ring-orange"
                    >
                      <input
                        type="radio"
                        name="service"
                        value={value}
                        checked={form.service === value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <Icon className="size-6 text-muted transition-colors group-has-checked:text-orange-700" strokeWidth={1.75} aria-hidden />
                      <span className="text-sm leading-tight font-medium text-ink">{value}</span>
                      <span
                        className="absolute top-3 right-3 size-4 rounded-full border border-line bg-white transition group-has-checked:border-[5px] group-has-checked:border-orange"
                        aria-hidden
                      />
                    </label>
                  ))}
                </div>
                {errors.service && (
                  <p id="service-error" className="mt-2 text-sm text-red-600">
                    {errors.service}
                  </p>
                )}
              </fieldset>

              <fieldset>
                <legend className="mb-3 flex w-full items-baseline justify-between text-sm font-medium text-ink">
                  How much are you moving?
                  <span className="font-mono text-[0.65rem] tracking-wider text-muted">OPTIONAL</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {propertySizes.map((size) => (
                    <label
                      key={size}
                      className="cursor-pointer rounded-full border border-line px-4 py-2.5 text-sm text-ink transition hover:border-navy/30 has-checked:border-ink has-checked:bg-ink has-checked:text-white has-focus-visible:ring-2 has-focus-visible:ring-orange has-focus-visible:ring-offset-2"
                    >
                      <input
                        type="radio"
                        name="propertySize"
                        value={size}
                        checked={form.propertySize === size}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </fieldset>
            </>
          )}

          {/* Step 2 — route + date */}
          {step === 1 && (
            <>
              <div className="relative space-y-5 pl-9">
                {/* Route rail */}
                <span className="absolute top-11 bottom-11 left-[11px] w-px border-l-2 border-dashed border-line" aria-hidden />
                <div className="relative">
                  <span className="absolute top-10 -left-9 flex size-6 items-center justify-center rounded-full bg-orange font-mono text-[0.6rem] font-semibold text-white" aria-hidden>
                    A
                  </span>
                  <Field id="pickup" label="Pickup location" error={errors.pickup}>
                    <input {...fieldProps("pickup")} type="text" autoComplete="street-address" placeholder="e.g. Mogoditshane, Plot 123" className={`${inputClasses} h-12`} />
                  </Field>
                </div>
                <div className="relative">
                  <span className="absolute top-10 -left-9 flex size-6 items-center justify-center rounded-full bg-ink font-mono text-[0.6rem] font-semibold text-white" aria-hidden>
                    B
                  </span>
                  <Field id="destination" label="Destination" error={errors.destination}>
                    <input {...fieldProps("destination")} type="text" placeholder="e.g. Block 8, Gaborone" className={`${inputClasses} h-12`} />
                  </Field>
                </div>
              </div>

              <Field id="date" label="Preferred move date" optional error={errors.date}>
                <input {...fieldProps("date")} type="date" className={`${inputClasses} h-12`} />
              </Field>

              <Field id="message" label="Anything we should know?" optional>
                <textarea
                  {...fieldProps("message")}
                  rows={4}
                  placeholder="Special items, access restrictions, stairs, anything we should know…"
                  className={`${inputClasses} resize-y py-3`}
                />
              </Field>
            </>
          )}

          {/* Step 3 — contact */}
          {step === 2 && (
            <>
              <Field id="name" label="Full name" error={errors.name}>
                <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Your full name" className={`${inputClasses} h-12`} />
              </Field>
              <div className="grid gap-6 sm:grid-cols-2">
                <Field id="email" label="Email" error={errors.email}>
                  <input {...fieldProps("email")} type="email" autoComplete="email" placeholder="you@example.com" className={`${inputClasses} h-12`} />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone}>
                  <input {...fieldProps("phone")} type="tel" autoComplete="tel" placeholder="+267 7X XXX XXX" className={`${inputClasses} h-12`} />
                </Field>
              </div>
            </>
          )}

          {/* Review */}
          {step === 3 && (
            <dl className="divide-y divide-line rounded-2xl bg-surface ring-1 ring-line">
              {[
                { label: "Service", value: [form.service, form.propertySize].filter(Boolean).join(" · "), step: 0 },
                { label: "Route", value: `${form.pickup} → ${form.destination}`, step: 1 },
                { label: "Date", value: form.date || "Flexible", step: 1 },
                { label: "Notes", value: form.message || "—", step: 1 },
                { label: "Contact", value: `${form.name} · ${form.email} · ${form.phone}`, step: 2 },
              ].map((row) => (
                <div key={row.label} className="flex items-start gap-4 px-5 py-4">
                  <dt className="w-16 shrink-0 pt-0.5 sm:w-20 font-mono text-[0.68rem] tracking-[0.14em] text-muted uppercase">{row.label}</dt>
                  <dd className="min-w-0 flex-1 text-sm wrap-break-word text-ink">{row.value}</dd>
                  <button
                    type="button"
                    onClick={() => setStep(row.step)}
                    className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-orange-700 hover:bg-orange-50"
                  >
                    <PencilLine className="size-3.5" aria-hidden />
                    <span className="hidden sm:inline">Edit</span>
                    <span className="sr-only">Edit {row.label}</span>
                  </button>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3 border-t border-line bg-surface/60 px-6 py-5 sm:px-8">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => {
              setErrors({});
              setStep(step - 1);
            }}
            className="inline-flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-semibold text-muted transition hover:bg-white hover:text-ink"
          >
            <ArrowLeft className="size-4" aria-hidden /> Back
          </button>
        ) : (
          <span className="text-xs text-muted">Takes about 2 minutes</span>
        )}

        <button
          type="submit"
          disabled={loading}
          className="group inline-flex h-12 items-center gap-2 whitespace-nowrap rounded-xl bg-orange px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(244_121_32/0.7)] transition-all hover:-translate-y-0.5 hover:bg-orange-600 disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              {step === 3 ? "Send Quote Request" : step === 2 ? "Review details" : "Continue"}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </>
          )}
        </button>
      </div>

      <p className="px-6 pb-5 text-center text-xs text-muted sm:px-8">We respond within 1 business day. Your information is kept private.</p>
    </form>
  );
}
