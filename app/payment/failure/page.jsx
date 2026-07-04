import PaymentFailureClient from './PaymentFailureClient';

export const metadata = {
  title: 'Payment Failed',
  robots: { index: false, follow: false },
};

export default function PaymentFailurePage() {
  return <PaymentFailureClient />;
}
