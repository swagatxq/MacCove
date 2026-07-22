// Ad-click attribution: captures gclid/UTM params on landing, persists a visitor_id,
// and reports it to the backend so it can later be linked to an app install
// (see mes/be/routers/visitors.py, mes/be/routers/install.py).

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://api.maccove.com';
const VISITOR_COOKIE = 'mes_visitor_id';
const VISITOR_COOKIE_DAYS = 90;

const ATTRIBUTION_PARAMS = ['gclid', 'li_fat_id', 'rdt_cid', 'twclid', 'utm_source', 'utm_medium', 'utm_campaign'];

function readCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function writeCookie(name, value, days) {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function generateVisitorId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  return `vis-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function getVisitorId() {
  let id = readCookie(VISITOR_COOKIE);
  if (!id) {
    id = generateVisitorId();
    writeCookie(VISITOR_COOKIE, id, VISITOR_COOKIE_DAYS);
  }
  return id;
}

// Records this visit's ad-click attribution against the visitor_id. Safe to call on every
// page load — the backend upserts by visitor_id, and re-posting with no new params is a no-op.
export function recordVisitorAttribution() {
  if (typeof window === 'undefined') return;
  const visitorId = getVisitorId();
  const params = new URLSearchParams(window.location.search);

  const body = { visitor_id: visitorId };
  for (const key of ATTRIBUTION_PARAMS) {
    const value = params.get(key);
    if (value) body[key] = value;
  }
  if (document.referrer) body.referrer = document.referrer;
  body.landing_page = window.location.pathname;

  fetch(`${API_BASE_URL}/api/v1/visitors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    keepalive: true,
  }).catch(() => {});
}

// Fetches a signed, short-lived token binding this visitor_id, to be handed off to the app
// (via clipboard) so first-launch attribution can complete without any OS-level install
// referrer mechanism. Best-effort — download must proceed even if this fails.
export async function fetchDownloadToken() {
  const visitorId = getVisitorId();
  const res = await fetch(`${API_BASE_URL}/api/v1/visitors/${visitorId}/download-token`, {
    method: 'POST',
  });
  if (!res.ok) throw new Error(`download-token request failed: ${res.status}`);
  const data = await res.json();
  return data.token;
}
