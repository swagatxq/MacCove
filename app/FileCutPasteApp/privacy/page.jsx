import FileCutPasteNav from '../../../components/FileCutPasteNav';
import FileCutPasteFooter from '../../../components/FileCutPasteFooter';

export const metadata = {
  title: 'Privacy Policy — FileCutPaste',
  description: 'How MacCove and FileCutPaste handle your data.',
  alternates: { canonical: '/FileCutPasteApp/privacy' },
};

export default function FileCutPastePrivacyPage() {
  return (
    <>
      <FileCutPasteNav />
      <section className="section legal-section">
        <div className="container">
          <div className="legal-content">
            <h1 className="text-h1">Privacy Policy</h1>
            <p className="legal-meta">Last updated: August 22, 2026</p>

            <p>
              This Privacy Policy explains how Xquantum Pvt Ltd (&quot;MacCove&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
              handles information in connection with the FileCutPaste application (the &quot;App&quot;) and its
              marketing pages on maccove.com (the &quot;Site&quot;). FileCutPaste is built to be local-first — this
              policy reflects that design.
            </p>

            <h2>1. The App Does Not Read or Transmit Your Files</h2>
            <p>
              FileCutPaste detects when you press ⌘X and ⌘V in Finder and asks Finder itself to move the selected
              files. It does not read, copy, upload, or otherwise transmit the contents of your files anywhere. All
              processing happens locally on your Mac and does not require an internet connection to function.
            </p>

            <h2>2. Accessibility Permission</h2>
            <p>
              The App requires macOS Accessibility permission to detect keyboard shortcuts while Finder is the active
              application. This permission is used solely to observe ⌘X / ⌘V key presses and is never used to log,
              record, or transmit other keystrokes or on-screen content.
            </p>

            <h2>3. Subscription &amp; Account Information</h2>
            <p>
              Subscriptions are purchased and managed entirely through the Apple App Store using your Apple ID. We do
              not collect or store your payment details — Apple handles billing in accordance with its own privacy
              policy. We may receive limited, non-identifying purchase status information from Apple to unlock
              subscription features within the App.
            </p>

            <h2>4. Product Usage</h2>
            <p>
              We count basic, on-device usage such as the number of cuts performed, so the App can show you your own
              usage and manage the free trial limit. This information is stored locally on your Mac and is not
              transmitted to us.
            </p>

            <h2>5. Website Analytics</h2>
            <p>
              The maccove.com marketing pages for FileCutPaste use standard web analytics to understand aggregate
              traffic (for example, page views and App Store click-throughs). This applies only to your browsing of
              the website — it is separate from, and does not collect any data from, the FileCutPaste app installed
              on your Mac. You can control cookies through your browser settings.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              Because the App does not transmit file contents or usage data to us, there is no on-device usage
              history for us to retain or delete on your behalf. Subscription records are retained by Apple in
              accordance with their own policies.
            </p>

            <h2>7. Your Rights</h2>
            <p>
              Depending on your jurisdiction, you may have rights regarding personal information associated with your
              App Store account, which are governed by Apple&apos;s privacy policy. For any questions about data we
              hold directly, contact us using the details below.
            </p>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              FileCutPaste is not directed to children under 13, and we do not knowingly collect personal information
              from children.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Material changes will be reflected by updating the
              &quot;Last updated&quot; date above. Continued use of the App or Site after changes take effect
              constitutes acceptance of the revised policy.
            </p>

            <h2>10. Contact Us</h2>
            <p>
              Questions about this Privacy Policy can be sent to{' '}
              <a href="mailto:support@maccove.com">support@maccove.com</a>.
            </p>
          </div>
        </div>
      </section>
      <FileCutPasteFooter />
    </>
  );
}
