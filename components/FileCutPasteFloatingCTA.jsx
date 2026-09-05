'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import { APP_STORE_URL } from './FileCutPasteNav';

// Mirrors FloatingDownloadCTA (homepage) — slides up once the reader has scrolled
// past the first viewport, so we can drop repeated mid-page CTA buttons.
export default function FileCutPasteFloatingCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`floating-download-cta${shown ? ' is-visible' : ''}`} aria-hidden={!shown}>
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-primary floating-download-cta-btn"
      >
        <Icon id="apple" size={18} /> Download from App Store
      </a>
    </div>
  );
}
