import NavBar from '../../components/NavBar';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How MacCove and Mac Excel Shortcuts handle your data.',
  alternates: { canonical: '/privacy' },
};

export default function PrivacyPage() {
  return (
    <>
      <NavBar />
      <section className="section legal-section">
        <div className="container">
          <div className="legal-content">
            <h1 className="text-h1">Privacy Policy</h1>
            <p className="legal-meta">Last updated: July 4, 2026</p>

            <p>
              This Privacy Policy explains how Xquantum Pvt Ltd (&quot;MacCove&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              handles information in connection with the Mac Excel Shortcuts application (the &quot;App&quot;) and the
              maccove.com website (the &quot;Site&quot;). We built Mac Excel Shortcuts to be local-first — this policy
              reflects that design.
            </p>

            <h2>1. The App Collects No Usage Data</h2>
            <p>
              Mac Excel Shortcuts runs entirely on your device. We do not track which shortcuts you use, log your
              keystrokes, collect analytics from within the App, or transmit your Excel data anywhere. Shortcut
              processing happens locally and does not require an internet connection to function. We, however, do 
              count the number of shortcuts you have used for product improvement purpose.
            </p>

            <h2>2. License &amp; Account Information</h2>
            <p>
              To activate a paid subscription or lifetime license, we (or our payment processor) collect the minimum
              information required to manage your license, such as your email address, and purchase
              status. This information is used solely for license validation, support, and billing — never sold or
              shared for advertising purposes.
            </p>

            <h2>3. Payments</h2>
            <p>
              Payments are processed by a third-party payment processor. We do not store your full payment card
              details on our servers. Your payment information is handled directly by our payment processor in
              accordance with their own privacy policy and applicable card network standards.
            </p>

            <h2>4. Website Analytics</h2>
            <p>
              The maccove.com marketing website uses Google Tag Manager to understand aggregate traffic to the Site
              (for example, page views and download conversions). This applies only to your browsing of the website —
              it is separate from, and does not collect any data from, the Mac Excel Shortcuts app installed on your
              Mac. You can control cookies through your browser settings.
            </p>

            <h2>5. Data Retention</h2>
            <p>
              We retain license and billing information for as long as needed to provide support, comply with legal
              and tax obligations, and resolve disputes. Because the App itself does not collect usage data, there is
              no on-device usage history for us to retain or delete on your behalf.
            </p>

            <h2>6. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have the right to access, correct, or delete the personal
              information we hold about your license and billing account. To exercise these rights, contact us using
              the details below. 
            </p>

            <h2>7. Children&apos;s Privacy</h2>
            <p>
              Mac Excel Shortcuts is not directed to children under 13, and we do not knowingly collect personal
              information from children.
            </p>

            <h2>8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be reflected by updating the
              &quot;Last updated&quot; date above. Continued use of the App or Site after changes take effect
              constitutes acceptance of the revised policy.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              Questions about this Privacy Policy can be sent to{' '}
              <a href="mailto:privacy@maccove.com">privacy@maccove.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
