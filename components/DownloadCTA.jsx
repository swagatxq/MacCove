'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadGateModal from './DownloadGateModal';
import EmailDownloadModal from './EmailDownloadModal';
import Icon from './Icon';
import { isMacOS } from '../lib/device';

// Wraps any "Download" call-to-action. On a Mac it opens the laptop-type gate modal and then
// navigates to /download, same as before. On any other device (Windows/Linux/iOS) there's
// nothing to install locally, so the CTA switches to collecting an email address and having
// the backend send the .dmg link there instead.
export default function DownloadCTA({ className, children }) {
  const [open, setOpen] = useState(false);
  // Defaults to true (the Mac path) so server-rendered and first-paint markup match; flips
  // to false right after mount if device detection says otherwise.
  const [isMac, setIsMac] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMac(isMacOS());
  }, []);

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {isMac ? children : (
          <>
            <Icon id="mail" size={20} />
            Email Download Link to Myself
          </>
        )}
      </button>
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
