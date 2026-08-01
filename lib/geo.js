import { headers } from 'next/headers';

export const DEFAULT_COUNTRY_CODE = 'US';

function getClientIp(h) {
  const forwardedFor = h.get('x-forwarded-for');
  if (forwardedFor) return forwardedFor.split(',')[0].trim();
  return h.get('x-real-ip') || null;
}

// Vercel and Cloudflare both inject the visitor's IP-resolved country as a request
// header at the edge. If the site isn't running behind either of those (a plain
// Node host, or a local dev/prod server), neither header exists — so we fall back
// to a best-effort IP geolocation lookup using the client's IP from standard
// proxy headers. Returns null if nothing could be determined (e.g. localhost).
export async function getVisitorCountryCode() {
  const h = headers();
  const edgeCode = h.get('x-vercel-ip-country') || h.get('cf-ipcountry') || h.get('cloudfront-viewer-country') || h.get('x-appengine-country');
  if (edgeCode && edgeCode !== 'XX') return edgeCode.toUpperCase();

  const ip = getClientIp(h);
  if (!ip || ip === '127.0.0.1' || ip === '::1') return null;

  try {
    const res = await fetch(`https://get.geojs.io/v1/ip/country/${ip}.json`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const data = await res.json();
    return data.country ? data.country.toUpperCase() : null;
  } catch {
    return null;
  }
}

export { getCountryName, getCountryFlag } from './countries';
