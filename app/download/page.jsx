import DownloadClient from './DownloadClient';

export const metadata = {
  title: 'Download Mac Excel Shortcuts',
  description: 'Download Mac Excel Shortcuts for macOS. Run the Windows Excel shortcuts you already know, natively on your Mac.',
  alternates: { canonical: '/download' },
  robots: { index: false, follow: false },
};

export default function DownloadPage() {
  return <DownloadClient />;
}
