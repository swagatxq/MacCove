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
  const isSafariRef = useRef(false);

  // Pre-fetch the attribution token as soon as the page loads, well before the download
  // fires. navigator.clipboard.writeText() must be called synchronously within the user
  // gesture / countdown handler to reliably succeed (Safari rejects it otherwise) — so the
  // network round-trip cannot happen in between the trigger and the write.
  useEffect(() => {
    fetchDownloadToken()
      .then((token) => { tokenRef.current = token; })
      .catch(() => {});
    // Safari only grants clipboard-write "transient activation" inside a direct user
    // gesture (a click) — a setTimeout-fired auto-download doesn't qualify, so the
    // clipboard hand-off silently fails there and attribution is lost. Chrome/Firefox
    // allow it from the timer, so only Safari needs the manual-click requirement.
    isSafariRef.current = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
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
      // In Safari the download must be triggered by the "Download Now" click itself (the
      // only way the clipboard write counts as user-gesture-initiated) — so once the
      // countdown ends we just leave the button enabled and wait, instead of auto-firing.
      // Guards the auto-trigger against firing twice (e.g. React StrictMode's double
      // effect invocation in dev) — manual clicks always go straight through
      // startDownload, unguarded, once the button is enabled.
      if (!isSafariRef.current && !startedRef.current) {
        startedRef.current = true;
        startDownload();
      }
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft, startDownload]);

  const progress = ((COUNTDOWN_SECONDS - secondsLeft) / COUNTDOWN_SECONDS) * 100;
  const countdownDone = secondsLeft <= 0;
  const awaitingSafariClick = countdownDone && isSafariRef.current && !started;

  return (
    <>
      <NavBar />
      <section className="status-section" id="download-redirect">
        <div className="container">
          <div className="status-card glass">
            <div className="status-icon-wrap" style={{ background: 'var(--apple-blue)' }}>
              <Icon id="download" size={32} />
            </div>
            <h1 className="text-h2">
              {started ? 'Your download has started' : awaitingSafariClick ? "You're ready to download" : 'Preparing your download'}
            </h1>
            <p className="text-body">
              {started
                ? "If your download didn't start automatically, use the button below to download it directly."
                : awaitingSafariClick
                ? 'Click the button below to download Mac Excel Shortcuts.'
                : `Mac Excel Shortcuts will start downloading automatically in ${secondsLeft} second${secondsLeft === 1 ? '' : 's'}.`}
            </p>

            {!countdownDone && (
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
                disabled={!countdownDone}
                aria-disabled={!countdownDone}
              >
                <Icon id="download" size={20} />
                {countdownDone ? 'Download Now' : `Download Now (${secondsLeft}s)`}
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
