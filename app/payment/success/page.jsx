'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import NavBar from '../../../components/NavBar';
import Icon from '../../../components/Icon';

const APP_DEEPLINK = 'mes://payment/success';

export default function PaymentSuccessPage() {
  const [attempted, setAttempted] = useState(false);
  const attemptedRef = useRef(false);

  const openApp = useCallback(() => {
    attemptedRef.current = true;
    setAttempted(true);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'payment_success_deeplink' });
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
      <section className="status-section" id="payment-success">
        <div className="container">
          <div className="status-card glass">
            <div className="status-icon-wrap" style={{ background: 'var(--apple-green)' }}>
              <Icon id="check-circle" size={32} />
            </div>
            <h1 className="text-h2">Payment successful</h1>
            <p className="text-body">
              Thanks for upgrading Mac Excel Shortcuts. We&apos;re redirecting you back to the app
              {attempted ? " — if nothing happened, use the button below." : "…"}
            </p>

            <div className="status-actions">
              <button className="btn btn-primary" onClick={openApp}>
                <Icon id="zap" size={20} /> Open Mac Excel Shortcuts
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
