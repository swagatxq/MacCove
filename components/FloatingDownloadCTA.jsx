'use client';
import { useEffect, useState } from 'react';
import DownloadCTA from './DownloadCTA';
import Icon from './Icon';

// Elegant, gently-bobbing download CTA that slides up from the bottom once the
// reader has scrolled past the first viewport. Lets us drop the repeated
// mid-page "Save 25 Hours"-style CTA buttons.
export default function FloatingDownloadCTA() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className={`floating-download-cta${shown ? ' is-visible' : ''}`} aria-hidden={!shown}>
      <DownloadCTA className="btn btn-primary floating-download-cta-btn">
        <Icon id="download" size={18} /> Download Excel Shortcuts App
      </DownloadCTA>
    </div>
  );
}
