import { Suspense } from 'react';
import BuyClient from './BuyClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Redirecting…',
  robots: { index: false, follow: false, nocache: true },
};

export default function BuyPage() {
  return (
    <Suspense fallback={null}>
      <BuyClient />
    </Suspense>
  );
}
