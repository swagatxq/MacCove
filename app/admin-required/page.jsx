import AdminRequiredClient from './AdminRequiredClient';

export const metadata = {
  title: 'Admin Access Required — Mac Excel Shortcuts',
  description: 'Mac Excel Shortcuts requires admin permissions to install on a company-managed MacBook.',
  alternates: { canonical: '/admin-required' },
  robots: { index: false, follow: false },
};

export default function AdminRequiredPage() {
  return <AdminRequiredClient />;
}
