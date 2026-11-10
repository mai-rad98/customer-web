"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { contact, navLinks } from "@/lib/site";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  // Every page opens on a dark hero, so the bar is light-on-dark until it turns solid.
  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={`mx-auto max-w-6xl rounded-2xl transition-all duration-300 ${
          solid ? "glass-light shadow-[0_10px_40px_-15px_rgb(11_18_51/0.35)]" : "bg-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between pr-2 pl-3 sm:pl-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <Image src="/logo.png" alt="" width={40} height={40} className="rounded-full ring-2 ring-white/80" priority />
            <span className="leading-none">
              <span className={`block text-lg font-bold tracking-tight ${solid ? "text-ink" : "text-white"}`}>
                Move<span className="text-orange">Right</span>
              </span>
              <span className={`mt-1 block font-mono text-[0.58rem] tracking-[0.18em] ${solid ? "text-muted" : "text-white/55"}`}>
                MOVING &amp; RELOCATION
              </span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
            {navLinks.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    solid
                      ? active ? "text-ink" : "text-muted hover:text-ink hover:bg-surface"
                      : active ? "text-white" : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {l.label}
                  {active && (
                    <span className="absolute bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-orange shadow-[0_0_8px_#f47920]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden h-10 items-center gap-1.5 rounded-xl bg-orange px-4 text-sm font-semibold text-white shadow-[0_8px_20px_-8px_rgb(244_121_32/0.8)] transition-all hover:-translate-y-0.5 hover:bg-orange-600 md:inline-flex"
            >
              Get a Quote <ArrowRight className="size-4" aria-hidden />
            </Link>

            {/* Mobile actions */}
            <a
              href={contact.phoneHref}
              aria-label={`Call ${contact.phone}`}
              className={`inline-flex size-11 items-center justify-center rounded-xl md:hidden ${
                solid ? "text-ink hover:bg-surface" : "text-white hover:bg-white/10"
              }`}
            >
              <Phone className="size-5" />
            </a>
            <button
              type="button"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              className={`inline-flex size-11 items-center justify-center rounded-xl md:hidden ${
                solid ? "text-ink hover:bg-surface" : "text-white hover:bg-white/10"
              }`}
            >
              {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Mobile" className="border-t border-line px-3 pt-2 pb-4 md:hidden">
            {navLinks.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-medium ${
                    active ? "bg-surface text-ink" : "text-muted hover:bg-surface hover:text-ink"
                  }`}
                >
                  {l.label}
                  {active && <span className="size-1.5 rounded-full bg-orange" />}
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mt-3 flex h-12 items-center justify-center gap-2 rounded-xl bg-orange font-semibold text-white"
            >
              Get a Free Quote <ArrowRight className="size-4" aria-hidden />
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
