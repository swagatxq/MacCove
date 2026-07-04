import NavBar from '../../components/NavBar';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'The terms that govern your use of Mac Excel Shortcuts.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <>
      <NavBar />
      <section className="section legal-section">
        <div className="container">
          <div className="legal-content">
            <h1 className="text-h1">Terms &amp; Conditions</h1>
            <p className="legal-meta">Last updated: July 4, 2026</p>

            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the Mac Excel
              Shortcuts application (the &quot;App&quot;) and the maccove.com website (the &quot;Site&quot;),
              provided by Xquantum Pvt Ltd (&quot;MacCove&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
              By downloading, installing, or using the App, you agree to these Terms.
            </p>

            <h2>1. License to Use</h2>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to install and
              use the App on a Mac that you own or control, for your personal or internal business use. Each license
              covers a single Mac.
            </p>

            <h2>2. Free Trial</h2>
            <p>
              The App is free to download and use subject to trial usage limits or a 7-day trial period, whichever
              applies. During the trial, shortcuts run locally on your device for up to 24 hours of active use without
              an internet connection.
              Continued access to unlimited shortcuts, advanced actions, cloud sync, and team sharing requires an
              upgrade.
            </p>

            <h2>3. Paid Subscriptions &amp; Lifetime Licenses</h2>
            <p>
              Upgrades are available on a $4.99/month subscription or a $49.99 one-time lifetime license. Subscription
              plans renew automatically until cancelled. You may cancel at any time; access continues until the end
              of the current billing period. Lifetime licenses are a one-time purchase covering a single Mac.
            </p>

            <h2>4. Referral Discounts</h2>
            <p>
              From time to time we offer referral incentives, such as 50% off an upgrade when you refer two people to
              Mac Excel Shortcuts. Referral promotions may be modified or withdrawn at our discretion and are subject
              to any additional terms posted at the time of the offer.
            </p>

            <h2>5. Refunds</h2>
            <p>
              Refund requests are handled on a case-by-case basis in accordance with applicable law and the policies
              of our payment processor. Contact us if you believe you are entitled to a refund.
            </p>

            <h2>6. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the App, except as permitted by law;</li>
              <li>Redistribute, resell, or sublicense the App or your license key to any third party;</li>
              <li>Use the App to violate any applicable law or the rights of any third party;</li>
              <li>Circumvent or attempt to circumvent trial or license restrictions.</li>
            </ul>

            <h2>7. Intellectual Property</h2>
            <p>
              The App, the Site, and all associated branding, logos, and content are owned by Xquantum Pvt Ltd and
              protected by intellectual property laws. These Terms do not grant you any rights to our trademarks or
              branding beyond what is necessary to use the App.
            </p>

            <h2>8. No Warranty</h2>
            <p>
              The App is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind,
              express or implied, including but not limited to warranties of merchantability, fitness for a
              particular purpose, and non-infringement.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Xquantum Pvt Ltd shall not be liable for any indirect,
              incidental, special, consequential, or punitive damages arising out of or related to your use of the
              App or Site.
            </p>

            <h2>10. Termination</h2>
            <p>
              We may suspend or terminate your license if you breach these Terms. You may stop using the App and
              uninstall it at any time.
            </p>

            <h2>11. Changes to These Terms</h2>
            <p>
              We may update these Terms from time to time. Material changes will be reflected by updating the
              &quot;Last updated&quot; date above. Continued use of the App or Site after changes take effect
              constitutes acceptance of the revised Terms.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              Questions about these Terms can be sent to{' '}
              <a href="mailto:support@maccove.com">support@maccove.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
