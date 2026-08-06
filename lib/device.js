// Detects whether the visitor is on a real Mac (as opposed to Windows/Linux/iOS/iPadOS).
// iPadOS 13+ reports "Macintosh" in its UA to get desktop sites, so it's disambiguated via
// touch support (real Macs don't have >1 touch point).
export function isMacOS() {
  if (typeof navigator === 'undefined') return true;
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return false;
  if (/Macintosh/.test(ua) && navigator.maxTouchPoints > 1) return false;
  return /Macintosh/.test(ua);
}
