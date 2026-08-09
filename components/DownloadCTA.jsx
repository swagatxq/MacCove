'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadGateModal from './DownloadGateModal';
import EmailDownloadModal from './EmailDownloadModal';
import Icon from './Icon';
import { isMacOS, isMobileDevice } from '../lib/device';

const HOME_URL = 'https://maccove.com';

// Wraps any "Download" call-to-action. On a Mac it opens the laptop-type gate modal and then
// navigates to /download, same as before. On any other device (Windows/Linux/iOS) there's
// nothing to install locally, so the CTA switches to collecting an email address and having
// the backend send the .dmg link there instead.
export default function DownloadCTA({ className, children }) {
  const [open, setOpen] = useState(false);
  // Defaults to true (the Mac path) so server-rendered and first-paint markup match; flips
  // to false right after mount if device detection says otherwise.
  const [isMac, setIsMac] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMac(isMacOS());
    setIsMobile(isMobileDevice());
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(HOME_URL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url: HOME_URL, title: 'Mac Excel Shortcuts' });
      } catch {
        // user cancelled the share sheet — nothing to do
      }
    } else {
      copyLink();
    }
  };

  return (
    <>
      <div className="download-cta-row">
        <button type="button" className={className} onClick={() => setOpen(true)}>
          {isMac ? children : (
            <>
              <Icon id="mail" size={20} />
              Email Download Link to Myself
            </>
          )}
        </button>
        {isMobile && (
          <div className="download-cta-secondary">
            <button type="button" className="btn-mini" onClick={copyLink}>
              <Icon id="copy" size={12} />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button type="button" className="btn-mini" onClick={shareLink}>
              <Icon id="share" size={12} />
              Share Link
            </button>
          </div>
        )}
      </div>
      {open && isMac && (
        <DownloadGateModal
          onClose={() => setOpen(false)}
          onDone={(destination) => {
            setOpen(false);
            router.push(destination);
          }}
        />
      )}
      {open && !isMac && <EmailDownloadModal onClose={() => setOpen(false)} />}
    </>
  );
}
