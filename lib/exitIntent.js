'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { isMobileDevice } from './device';

const SEEN_KEY = 'mes_exit_survey_seen';        // sessionStorage — one per session
const STATE_KEY = 'mes_exit_survey';            // localStorage — { state, ts }
const DOWNLOAD_INTENT_KEY = 'mes_download_intent';
const ADDITIONAL_DATA_KEY = 'mes_visitor_additional_data';
const DISMISS_SUPPRESS_MS = 7 * 24 * 60 * 60 * 1000;

const SUPPRESSED_PREFIXES = [
  '/download', '/downloadfull', '/payment', '/admin-required', '/buy',
  '/privacy', '/terms', '/affiliate', '/brand-affiliates', '/FileCutPasteApp',
];

const MIN_TIME_MS = 12000;
const MIN_SCROLL_DEPTH = 0.35;

function readJSON(store, key) {
  try {
    return JSON.parse(store.getItem(key)) || null;
  } catch {
    return null;
  }
}

export function markSurveyState(state) {
  try {
    localStorage.setItem(STATE_KEY, JSON.stringify({ state, ts: Date.now() }));
  } catch {}
}

function isEligible(pathname) {
  if (!pathname) return false;
  if (SUPPRESSED_PREFIXES.some((p) => pathname.startsWith(p))) return false;
  if (typeof navigator !== 'undefined' && navigator.webdriver) return false;
  try {
    if (sessionStorage.getItem(SEEN_KEY) === '1') return false;
    if (sessionStorage.getItem(DOWNLOAD_INTENT_KEY) === '1') return false;
    if (sessionStorage.getItem(ADDITIONAL_DATA_KEY)) return false;
  } catch {}
  const saved = readJSON(localStorage, STATE_KEY);
  if (saved?.state === 'answered') return false;
  if (saved?.state === 'dismissed' && Date.now() - (saved.ts || 0) < DISMISS_SUPPRESS_MS) return false;
  return true;
}

// Watches time-on-page + scroll depth, then a desktop mouse-exit-to-top or a fast
// mobile scroll-up, and calls onFire({ trigger, device, scrollDepth, timeOnPageMs }) once.
export function useExitIntent(onFire) {
  const pathname = usePathname();
  const fired = useRef(false);
  const onFireRef = useRef(onFire);
  onFireRef.current = onFire;

  useEffect(() => {
    fired.current = false;
    if (!isEligible(pathname)) return;

    const mountedAt = Date.now();
    let maxScroll = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    const mobile = isMobileDevice() || window.matchMedia('(pointer: coarse)').matches;

    const gatePassed = () => {
      const timeOk = Date.now() - mountedAt >= MIN_TIME_MS;
      const shortPage = document.documentElement.scrollHeight <= window.innerHeight * 1.2;
      return timeOk && (shortPage || maxScroll >= MIN_SCROLL_DEPTH);
    };

    const fire = (trigger) => {
      if (fired.current || !gatePassed()) return;
      fired.current = true;
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {}
      markSurveyState('pending');
      cleanup();
      onFireRef.current({
        trigger,
        device: mobile ? 'mobile' : 'desktop',
        scrollDepth: Number(maxScroll.toFixed(2)),
        timeOnPageMs: Date.now() - mountedAt,
      });
    };

    const onScroll = () => {
      const y = window.scrollY;
      const depth = (y + window.innerHeight) / document.documentElement.scrollHeight;
      if (depth > maxScroll) maxScroll = depth;
      if (mobile) {
        const now = performance.now();
        const dt = now - lastT;
        if (dt > 0 && y < lastY && y > window.innerHeight) {
          const v = (lastY - y) / dt;
          if (v > 1.1) fire('scroll_up_velocity');
        }
        lastY = y;
        lastT = now;
      }
    };

    const onMouseOut = (e) => {
      if (!e.relatedTarget && e.clientY <= 8) fire('mouseout_top');
    };

    const cleanup = () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('mouseout', onMouseOut);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    if (!mobile) document.addEventListener('mouseout', onMouseOut);
    return cleanup;
  }, [pathname]);
}
