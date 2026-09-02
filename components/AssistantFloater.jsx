'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const DISMISS_KEY = 'mes_assistant_floater_dismissed';
const SUPPRESSED_PREFIXES = [
  '/download', '/downloadfull', '/payment', '/admin-required', '/buy',
  '/privacy', '/terms', '/affiliate', '/brand-affiliates', '/FileCutPasteApp',
];

// Unobtrusive helper that bobs in the bottom-right on blog / landing pages and
// routes a curious reader back to the homepage. Session-dismissible.
export default function AssistantFloater() {
  const pathname = usePathname() || '/';
  const [shown, setShown] = useState(false);
  const [dismissed, setDismissed] = useState(true);
  const lottieBox = useRef(null);

  const suppressed =
    pathname === '/' || SUPPRESSED_PREFIXES.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (suppressed) return;
    let wasDismissed = false;
    try {
      wasDismissed = sessionStorage.getItem(DISMISS_KEY) === '1';
    } catch {}
    setDismissed(wasDismissed);
    if (wasDismissed) return;
    const t = setTimeout(() => setShown(true), 3500);
    return () => clearTimeout(t);
  }, [pathname, suppressed]);

  // Load the keyboard-typing Lottie once the floater is visible.
  useEffect(() => {
    if (!shown || !lottieBox.current) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let anim;
    let cancelled = false;
    Promise.all([
      import('lottie-web/build/player/lottie_light'),
      fetch('/KeyboardTyping.json').then((r) => r.json()),
    ])
      .then(([mod, data]) => {
        if (cancelled || !lottieBox.current) return;
        anim = (mod.default || mod).loadAnimation({
          container: lottieBox.current,
          renderer: 'svg',
          loop: !reduce,
          autoplay: !reduce,
          animationData: data,
        });
        if (reduce) anim.goToAndStop(anim.totalFrames - 1, true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
      anim?.destroy();
    };
  }, [shown]);

  if (suppressed || dismissed || !shown) return null;

  const dismiss = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShown(false);
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {}
  };

  return (
    <a href="/" className="assistant-floater" aria-label="Fix Excel on your Mac — go to the homepage">
      <button className="assistant-floater-close" onClick={dismiss} aria-label="Dismiss">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <span className="assistant-floater-bubble">Trying your Alt shortcuts on Excel and not working? Check out our app</span>
      <span className="assistant-floater-avatar" ref={lottieBox} aria-hidden="true" />
    </a>
  );
}
