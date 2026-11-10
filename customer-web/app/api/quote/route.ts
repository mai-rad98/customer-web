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

// Diagnostic log lines, one per stage, readable in Vercel → Logs (filter "[quote]").
// They never contain the key or the customer's details.
const log = (id: string, stage: string, info: Record<string, unknown> = {}) => console.log("[quote]", id, stage, JSON.stringify(info));
const logError = (id: string, stage: string, info: Record<string, unknown> = {}) => console.error("[quote]", id, stage, JSON.stringify(info));

// Where QUOTES_API_URL points, without anything secret (it holds no secrets, but stay tidy)
function describeUrl(raw: string | undefined) {
  if (!raw) return { set: false };
  try {
    const u = new URL(raw.trim());
    return { set: true, origin: u.origin, path: u.pathname, hasWhitespace: raw !== raw.trim() };
  } catch {
    return { set: true, valid: false, length: raw.length, startsWith: raw.slice(0, 12) };
  }
}

export async function POST(request: Request) {
  const id = crypto.randomUUID().slice(0, 8);
  const api = process.env.QUOTES_API_URL;
  const key = process.env.WEBSITE_API_KEY;
  log(id, "received", { forwardedFor: !!request.headers.get("x-forwarded-for") });
  log(id, "config", {
    QUOTES_API_URL: describeUrl(api),
    WEBSITE_API_KEY: key ? { set: true, length: key.length, hasWhitespace: key !== key.trim() } : { set: false },
  });
  if (!api || !key) {
    logError(id, "stop: missing config");
    return fail("Quotes are temporarily unavailable.", 503);
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) {
    logError(id, "stop: rate limited");
    return fail("Too many requests. Please wait a few minutes or call us.", 429);
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    logError(id, "stop: body is not JSON");
    return fail("Invalid request.", 400);
  }

  // Only pass on the fields we expect; the backend checks them again
  const quote: Record<string, string> = {};
  for (const f of FIELDS) quote[f] = String(body[f] ?? "").trim();
  quote.company = String(body.company ?? "");

  if (!quote.service || !quote.pickup || !quote.destination || !quote.name || !/^\S+@\S+\.\S+$/.test(quote.email)) {
    const missing = ["service", "pickup", "destination", "name"].filter((f) => !quote[f]);
    logError(id, "stop: validation", { missing, emailValid: /^\S+@\S+\.\S+$/.test(quote.email) });
    return fail("Some details are missing. Please check the form.", 400);
  }
  log(id, "validation passed");

  const target = backendUrl("/api/public/quotes");
  const started = Date.now();
  log(id, "backend request", { url: target, timeoutMs: BACKEND_TIMEOUT_MS });
  try {
    const res = await fetch(target, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-website-key": key },
      body: JSON.stringify(quote),
      signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
    });
    // Read as text first: if the backend sends an HTML error page, we still see what it was
    const text = await res.text();
    let data: { error?: string; ref?: string | null } = {};
    try {
      data = JSON.parse(text);
    } catch {}
    const info = {
      status: res.status,
      ms: Date.now() - started,
      contentType: res.headers.get("content-type"),
      backendError: data.error ?? null,
      ...(!data.error && !res.ok && { bodyStart: text.slice(0, 200) }),
    };
    if (!res.ok) {
      logError(id, "backend response: rejected", info);
      // The backend's validation messages are safe to show; anything else stays generic
      return fail(res.status === 400 && data.error ? data.error : "We couldn't send your request.", res.status === 400 ? 400 : 502);
    }
    log(id, "backend response: ok", { ...info, ref: data.ref ?? null });
    return Response.json({ ref: data.ref ?? null }, { status: 201 });
  } catch (e) {
    const err = e as Error & { cause?: { code?: string; message?: string } };
    logError(id, "backend unreachable", {
      name: err.name,
      message: err.message,
      causeCode: err.cause?.code ?? null,
      causeMessage: err.cause?.message ?? null,
      ms: Date.now() - started,
      url: target,
    });
    return fail("We couldn't send your request.", 502);
  }
}
