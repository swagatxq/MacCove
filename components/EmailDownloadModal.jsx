'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Icon from './Icon';
import { sendDownloadEmail } from '../lib/attribution';
import { isValidEmail } from '../lib/validate';

// Shown instead of DownloadGateModal on non-Mac devices: collects an email address and asks
// the backend to send the .dmg download link there, since there's nothing useful to download
// on this device directly.
export default function EmailDownloadModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const close = (e) => {
    e?.stopPropagation();
    onClose();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Enter a valid email address.');
      return;
    }
    setError('');
    setSubmitting(true);
    const result = await sendDownloadEmail(email);
    setSubmitting(false);
    if (!result.success) {
      setError(result.reason || 'Could not send the download link. Please try again.');
      return;
    }
    setSent(true);
  };

  return createPortal(
    <div className="download-gate-backdrop" onClick={close} role="dialog" aria-modal="true" aria-label="Email yourself the download link">
      <div className="download-gate-modal glass" onClick={(e) => e.stopPropagation()}>
        <button className="video-lightbox-close download-gate-close" onClick={close} aria-label="Close">
          <Icon id="x" size={20} />
        </button>

        {sent ? (
          <div className="download-gate-step">
            <h2 className="text-h3">Check your inbox</h2>
            <p className="text-body">We've sent the download link to {email}. Open it on your Mac to install Mac Excel Shortcuts.</p>
          </div>
        ) : (
          <form className="download-gate-step" onSubmit={submit}>
            <h2 className="text-h3">Email yourself the download link</h2>
            <p className="text-body">Mac Excel Shortcuts only runs on macOS. We'll send the .dmg link to your inbox so you can open it on your Mac.</p>

            <div className="form-field">
              <label htmlFor="ed-email">Email address</label>
              <input
                id="ed-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
              {error && <span className="form-error">{error}</span>}
            </div>

            <div className="download-gate-actions">
              <button type="submit" className="btn btn-primary" disabled={submitting}>
                <Icon id="send" size={18} />
                {submitting ? 'Sending…' : 'Send Download Link'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}
