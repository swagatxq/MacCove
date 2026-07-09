'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import NavBar from '../../components/NavBar';
import Icon from '../../components/Icon';

const DMG_URL = 'https://storage.googleapis.com/mes_dmg/latest/Mac_Excel_Shortcuts.dmg';
const COUNTDOWN_SECONDS = 5;

export default function DownloadClient() {
  const [secondsLeft, setSecondsLeft] = useState(COUNTDOWN_SECONDS);
  const [started, setStarted] = useState(false);
  const startedRef = useRef(false);

  const startDownload = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    setStarted(true);
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'dmg_download_start', file: 'Mac_Excel_Shortcuts.dmg' });
    }
    window.location.href = DMG_URL;
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      startDownload();
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
              <button className="btn btn-primary" onClick={startDownload}>
                <Icon id="download" size={20} /> Download Now
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
