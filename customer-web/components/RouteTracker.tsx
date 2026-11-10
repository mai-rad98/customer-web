import { Clock, HeartHandshake, Truck, Users, Zap } from "lucide-react";

/** Decorative "live move" card for the home hero — a preview of in-app tracking. */
export default function RouteTracker() {
  return (
    <div className="relative mx-auto w-full max-w-md" aria-hidden>
      {/* Floating chips */}
      <div className="glass absolute -top-5 -left-3 z-10 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white shadow-xl animate-float sm:-left-8">
        <Zap className="size-3.5 text-orange" />
        Quote sent in 10 minutes
      </div>
      <div className="glass absolute -right-2 -bottom-5 z-10 flex items-center gap-2 rounded-xl px-3 py-2 text-xs text-white shadow-xl animate-float [animation-delay:-3s] sm:-right-6">
        <HeartHandshake className="size-3.5 text-orange" />
        Handled with care
      </div>

      <div className="glass relative overflow-hidden rounded-3xl p-5 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="font-mono text-[0.68rem] tracking-widest text-white/50">LIVE MOVE · MR-2041</p>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-orange/15 px-2.5 py-1 font-mono text-[0.65rem] tracking-wider text-orange ring-1 ring-orange/30">
            <span className="size-1.5 rounded-full bg-orange animate-pulse-dot" />
            IN TRANSIT
          </span>
        </div>

        {/* Map */}
        <div className="relative mt-4 h-40 overflow-hidden rounded-2xl bg-ink-2/80 ring-1 ring-white/10">
          <svg viewBox="0 0 320 160" className="absolute inset-0 size-full" fill="none">
            <path d="M30 120 C 90 120, 90 50, 160 60 S 250 40, 290 36" stroke="rgb(255 255 255 / 0.12)" strokeWidth="6" strokeLinecap="round" />
            <path d="M30 120 C 90 120, 90 50, 160 60" stroke="#f47920" strokeWidth="3" strokeLinecap="round" />
            <path
              d="M160 60 S 250 40, 290 36"
              stroke="#f47920"
              strokeOpacity="0.6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="6 6"
              className="animate-dash"
            />
            <circle cx="30" cy="120" r="6" fill="#0b1233" stroke="#f47920" strokeWidth="3" />
            <circle cx="290" cy="36" r="6" fill="#0b1233" stroke="#fff" strokeOpacity="0.7" strokeWidth="3" />
            <circle cx="160" cy="60" r="14" fill="#f47920" fillOpacity="0.18" />
          </svg>
          {/* Truck marker sits on the route at (160, 60) of a 320×160 viewBox */}
          <div className="absolute top-[37.5%] left-1/2 flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-orange text-white shadow-[0_0_24px_rgb(244_121_32/0.8)]">
            <Truck className="size-4" />
          </div>
          <span className="absolute bottom-3 left-3 font-mono text-[0.6rem] tracking-wider text-white/50">A</span>
          <span className="absolute top-3 right-3 font-mono text-[0.6rem] tracking-wider text-white/50">B</span>
        </div>

        {/* Addresses */}
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-3 text-sm">
          <span className="mt-1.5 size-2 rounded-full bg-orange" />
          <div>
            <p className="font-mono text-[0.62rem] tracking-widest text-white/40">PICKUP</p>
            <p className="font-medium text-white">Mogoditshane, Plot 123</p>
          </div>
          <span className="mt-1.5 size-2 rounded-full ring-2 ring-white/60" />
          <div>
            <p className="font-mono text-[0.62rem] tracking-widest text-white/40">DROP-OFF</p>
            <p className="font-medium text-white">Block 8, Gaborone</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="flex justify-between font-mono text-[0.62rem] tracking-widest text-white/40">
            <span>PROGRESS</span>
            <span className="text-white/70">62%</span>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[62%] rounded-full bg-linear-to-r from-orange-600 to-orange" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-4 grid grid-cols-3 divide-x divide-white/10 rounded-xl bg-white/[0.04] ring-1 ring-white/10">
          {[
            { icon: Clock, label: "ETA", value: "14:20" },
            { icon: Users, label: "CREW", value: "3 movers" },
            { icon: Truck, label: "TRUCK", value: "Enclosed" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="px-3 py-2.5">
              <p className="flex items-center gap-1 font-mono text-[0.58rem] tracking-widest text-white/40">
                <Icon className="size-3" /> {label}
              </p>
              <p className="mt-0.5 text-sm font-semibold text-white">{value}</p>
            </div>
          ))}
        </div>

        <p className="mt-3 text-center font-mono text-[0.6rem] tracking-wider text-white/30">PREVIEW · LIVE TRACKING COMING WITH THE APP</p>
      </div>
    </div>
  );
}
