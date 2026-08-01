'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Icon from '../../components/Icon';

const COUNTDOWN_SECONDS = 3;

// Only ever redirect to Amazon's own domains — `to` is a query param, so without this
// check /buy would be an open redirect anyone could point at an arbitrary URL.
function getAllowedDestination(rawUrl) {
  try {
    const url = new URL(rawUrl);
    if (url.protocol !== 'https:') return null;
    const isAmazonDomain = /(^|\.)amazon\.[a-z.]{2,10}$/i.test(url.hostname);
    const isAmazonShortlink = url.hostname === 'amzn.to';
    return isAmazonDomain || isAmazonShortlink ? url.toString() : null;
  } catch {
    return null;
  }
}

export default function BuyClient() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const destination = getAllowedDestination(searchParams.get('to') || '');

  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const redirectedRef = useRef(false);

  const redirectNow = useCallback(() => {
    if (redirectedRef.current || !destination) return;
    redirectedRef.current = true;
    window.location.replace(destination);
  }, [destination]);

  useEffect(() => {
    if (!destination || secondsLeft <= 0) {
      if (secondsLeft <= 0) redirectNow();
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, destination, redirectNow]);

  const handleCancel = () => {
    // Works when this tab was opened via target="_blank"; if the browser refuses to
    // close it (e.g. it wasn't script-opened), fall back to just going back.
    window.close();
    setTimeout(() => {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = '/shop';
      }
    }, 150);
  };

  if (!destination) {
    return (
      <section className="status-section" id="buy-redirect">
        <div className="container">
          <div className="status-card glass">
            <div className="status-icon-wrap" style={{ background: 'var(--apple-red)' }}>
              <Icon id="alert-triangle" size={32} />
            </div>
            <h1 className="text-h2">Link not found</h1>
            <p className="text-body">This buy link is missing or invalid.</p>
            <div className="status-actions">
              <a href="/shop" className="status-link">Back to the shop</a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;

  return (
    <section className="status-section" id="buy-redirect">
      <div className="container">
        <div className="status-card glass">
          <div className="status-icon-wrap" style={{ background: 'var(--apple-orange)' }}>
            <Icon id="shopping-bag" size={32} />
          </div>
          <h1 className="text-h2">Redirecting you to Amazon</h1>
          <p className="text-body">
            {title ? `Taking you to Amazon for ${title}` : 'Taking you to Amazon'} in {secondsLeft} second{secondsLeft === 1 ? '' : 's'}.
          </p>

          <div className="status-progress">
            <div className="status-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="status-countdown">{secondsLeft}s</div>

          <div className="status-actions">
            <button className="btn btn-secondary" onClick={handleCancel}>
              <Icon id="x" size={20} />
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
