'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DownloadGateModal from './DownloadGateModal';
import EmailDownloadModal from './EmailDownloadModal';
import { isMacOS } from '../lib/device';

// Makes any element (card, row, table row) open the download flow on click, without adding
// extra wrapper DOM the way DownloadCTA's button does — needed so it can drop into grids/tables
// as a direct child without breaking nth-child/grid-item CSS.
export default function DownloadTrigger({ as: Tag = 'div', className, children, ...props }) {
  const [open, setOpen] = useState(false);
  const [isMac, setIsMac] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setIsMac(isMacOS());
  }, []);

  const openModal = () => {
    try { sessionStorage.setItem('mes_download_intent', '1'); } catch {}
    setOpen(true);
  };

  return (
    <>
      <Tag
        className={className}
        role="button"
        tabIndex={0}
        onClick={openModal}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openModal();
          }
        }}
        {...props}
      >
        {children}
      </Tag>
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
