import FileCutPasteNav from '../../../components/FileCutPasteNav';
import FileCutPasteFooter from '../../../components/FileCutPasteFooter';

export const metadata = {
  title: 'Terms & Conditions — FileCutPaste',
  description: 'The terms that govern your use of FileCutPaste.',
  alternates: { canonical: '/FileCutPasteApp/terms' },
};

export default function FileCutPasteTermsPage() {
  return (
    <>
      <FileCutPasteNav />
      <section className="section legal-section">
        <div className="container">
          <div className="legal-content">
            <h1 className="text-h1">Terms &amp; Conditions</h1>
            <p className="legal-meta">Last updated: August 22, 2026</p>

            <p>
              These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to and use of the FileCutPaste
              application (the &quot;App&quot;) and its marketing pages on maccove.com (the &quot;Site&quot;),
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
              The App is free to download and includes 10 free cuts to try the core Cut &amp; Paste functionality.
              Continued access beyond the free cuts requires an upgrade to a paid subscription.
            </p>

            <h2>3. Subscriptions</h2>
            <p>
              Continued use of the App is available on a monthly or yearly auto-renewing subscription, purchased and
              billed through the Apple App Store. Subscriptions renew automatically until cancelled. You may cancel
              at any time through your Apple ID subscription settings; access continues until the end of the current
              billing period. Pricing is set and displayed by the App Store at the time of purchase and may vary by
              region.
            </p>

            <h2>4. Refunds</h2>
            <p>
              All purchases are processed by Apple through the App Store. Refund requests are handled by Apple in
              accordance with Apple&apos;s own refund policies. We are unable to issue refunds directly.
            </p>

            <h2>5. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Reverse engineer, decompile, or attempt to extract the source code of the App, except as permitted by law;</li>
              <li>Redistribute, resell, or sublicense the App or your subscription to any third party;</li>
              <li>Use the App to violate any applicable law or the rights of any third party;</li>
              <li>Circumvent or attempt to circumvent free trial or subscription restrictions.</li>
            </ul>

            <h2>6. Permissions Required</h2>
            <p>
              FileCutPaste requires Accessibility permission to detect ⌘X and ⌘V keystrokes while Finder is active,
              and drives Finder&apos;s own move operation to relocate files. It does not read, modify, or transmit the
              contents of your files.
            </p>

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
              App or Site, including any file loss or misplacement.
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
      <FileCutPasteFooter />
    </>
  );
}
