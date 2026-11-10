// Receives the quote wizard and forwards it to the MoveRight backend.
// Runs on the server so WEBSITE_API_KEY never reaches the browser and the backend needs no CORS changes.
import { after, connection } from "next/server";

// The backend (Render free tier) sleeps when idle and can take ~30 s to wake, so allow for that
export const maxDuration = 60;
const BACKEND_TIMEOUT_MS = 50_000;

const backendUrl = (path: string) => `${(process.env.QUOTES_API_URL ?? "").replace(/\/$/, "")}${path}`;

const FIELDS = ["name", "email", "phone", "service", "propertySize", "pickup", "destination", "date", "message"] as const;

// Small per-visitor limit so the form can't be used to flood the support inbox (resets when the server restarts)
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > MAX_PER_WINDOW;
}

const fail = (error: string, status: number) => Response.json({ error }, { status });

// Called when the quote form opens: wakes the backend while the visitor fills in the steps.
// connection() makes this run on every request (otherwise it would be prerendered once at build time).
export async function GET() {
  await connection();
  if (process.env.QUOTES_API_URL) {
    after(() => fetch(backendUrl("/api/public/health"), { signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS) }).catch(() => {}));
  }
  return new Response(null, { status: 204 });
}

export async function POST(request: Request) {
  const api = process.env.QUOTES_API_URL;
  const key = process.env.WEBSITE_API_KEY;
  if (!api || !key) {
    console.error("Quote form: QUOTES_API_URL and WEBSITE_API_KEY must be set");
    return fail("Quotes are temporarily unavailable.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return fail("Too many requests. Please wait a few minutes or call us.", 429);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return fail("Invalid request.", 400);
  }

  // Only pass on the fields we expect; the backend checks them again
  const quote: Record<string, string> = {};
  for (const f of FIELDS) quote[f] = String(body[f] ?? "").trim();
  quote.company = String(body.company ?? "");

  if (!quote.service || !quote.pickup || !quote.destination || !quote.name || !/^\S+@\S+\.\S+$/.test(quote.email)) {
    return fail("Some details are missing. Please check the form.", 400);
  }

  try {
    const res = await fetch(backendUrl("/api/public/quotes"), {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": key },
      body: JSON.stringify(quote),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      // The backend's validation messages are safe to show; anything else stays generic
      return fail(res.status === 400 && data.error ? data.error : "We couldn't send your request.", res.status === 400 ? 400 : 502);
    }
    return Response.json({ ref: data.ref ?? null }, { status: 201 });
  } catch (e) {
    console.error("Quote form: backend unreachable", e);
    return fail("We couldn't send your request.", 502);
  }
}
