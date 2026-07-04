'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import NavBar from '../../../components/NavBar';
import Icon from '../../../components/Icon';

const APP_DEEPLINK = 'mes://payment/cancel';

export default function PaymentFailurePage() {
  const [attempted, setAttempted] = useState(false);
  const attemptedRef = useRef(false);

  const openApp = useCallback(() => {
    attemptedRef.current = true;
    setAttempted(true);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'payment_failure_deeplink' });
    }
    window.location.href = APP_DEEPLINK;
  }, []);

  useEffect(() => {
    const timer = setTimeout(openApp, 800);
    return () => clearTimeout(timer);
  }, [openApp]);

  return (
    <>
      <NavBar />
      <section className="status-section" id="payment-failure">
        <div className="container">
          <div className="status-card glass">
            <div className="status-icon-wrap" style={{ background: 'var(--accent-rose)' }}>
              <Icon id="x" size={32} />
            </div>
            <h1 className="text-h2">Payment failed</h1>
            <p className="text-body">
              Your payment couldn&apos;t be completed. We&apos;re redirecting you back to the app
              {attempted ? " — if nothing happened, use the button below." : "…"}
            </p>

            <div className="status-actions">
              <button className="btn btn-primary" onClick={openApp}>
                <Icon id="zap" size={20} /> Return to Mac Excel Shortcuts
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
