'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import Icon from './Icon';
import { fetchDownloadToken } from '../lib/attribution';

const DMG_URL = 'https://storage.googleapis.com/mes_dmg/latest/Mac_Excel_Shortcuts.dmg';
const COUNTDOWN_SECONDS = 3;

// Hero-embedded version of the /download auto-download flow (see app/download/DownloadClient.jsx)
// — same logic, dropped into the hero-right slot instead of its own full status-section page.
export default function DownloadHeroPanel() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);
  const tokenRef = useRef(null);
  const isSafariRef = useRef(false);

  useEffect(() => {
    fetchDownloadToken()
      .then((token) => { tokenRef.current = token; })
      .catch(() => {});
    isSafariRef.current = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }, []);

  const startDownload = useCallback(() => {
    setStarted(true);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'dmg_download_start', file: 'Mac_Excel_Shortcuts.dmg' });
    }
    if (tokenRef.current) {
      try { navigator.clipboard?.writeText(tokenRef.current); } catch {}
    }
    window.location.href = DMG_URL;
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
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
      </div>
    </div>
  );
}
