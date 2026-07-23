'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import NavBar from '../../components/NavBar';
import Icon from '../../components/Icon';
import { fetchDownloadToken } from '../../lib/attribution';

const DMG_URL = 'https://storage.googleapis.com/mes_dmg/latest/Mac_Excel_Shortcuts.dmg';
const COUNTDOWN_SECONDS = 5;

export default function DownloadClient() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const tokenRef = useRef(null);

  // Pre-fetch the attribution token as soon as the page loads, well before the download
  // fires. navigator.clipboard.writeText() must be called synchronously within the user
  // gesture / countdown handler to reliably succeed (Safari rejects it otherwise) — so the
  // network round-trip cannot happen in between the trigger and the write.
  useEffect(() => {
    fetchDownloadToken()
      .then((token) => { tokenRef.current = token; })
      .catch(() => {});
  }, []);

  // Fires the actual download + clipboard hand-off. Called once automatically when the
  // countdown ends, and again on every "Download Now" click thereafter — the button is a
  // real manual retry (e.g. if the automatic navigation got blocked), not a dead no-op.
  const startDownload = useCallback(() => {
    setStarted(true);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'dmg_download_start', file: 'Mac_Excel_Shortcuts.dmg' });
    }
    // Best-effort: hand the app a signed attribution token via the clipboard, since a direct
    // DMG download has no OS-level install-referrer channel. Never blocks the download.
    if (tokenRef.current) {
      try { navigator.clipboard?.writeText(tokenRef.current); } catch {}
    }
    window.location.href = DMG_URL;
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      // Guards only the automatic trigger against firing twice (e.g. React StrictMode's
      // double effect invocation in dev) — manual clicks on the button always go straight
      // through startDownload, unguarded, once it's enabled.
      if (!startedRef.current) {
        startedRef.current = true;
        startDownload();
      }
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, startDownload]);

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;

  return (
    <>
      <NavBar />
      <section className="status-section" id="download-redirect">
        <div className="container">
          <div className="status-card glass">
            <div className="status-icon-wrap" style={{ background: 'var(--apple-blue)' }}>
              <Icon id="download" size={32} />
            </div>
            <h1 className="text-h2">{started ? 'Your download has started' : 'Preparing your download'}</h1>
            <p className="text-body">
              {started
                ? "If your download didn't start automatically, use the button below to download it directly."
                : `Mac Excel Shortcuts will start downloading automatically in ${secondsLeft} second${secondsLeft === 1 ? '' : 's'}.`}
            </p>

            {!started && (
              <>
                <div className="status-progress">
                  <div className="status-progress-fill" style={{ width: `${progress}%` }} />
                </div>
                <div className="status-countdown">{secondsLeft}s</div>
              </>
            )}

            <div className="status-actions">
              <button
                className="btn btn-primary"
                onClick={startDownload}
                disabled={!started}
                aria-disabled={!started}
              >
                <Icon id="download" size={20} />
                {started ? 'Download Now' : `Download Now (${secondsLeft}s)`}
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
