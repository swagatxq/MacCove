'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadGateModal from './DownloadGateModal';

// Wraps any "Download" call-to-action so it opens the laptop-type gate modal instead of
// navigating straight to /download. Used in both the hero CTA and the nav bar CTA.
export default function DownloadCTA({ className, children }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>
      {open && (
        <DownloadGateModal
          onClose={() => setOpen(false)}
          onDone={(destination) => {
            setOpen(false);
            router.push(destination);
          }}
        />
      )}
    </>
  );
}
