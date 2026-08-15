'use client';
import { useState } from 'react';
import NavBar from '../../components/NavBar';
import Icon from '../../components/Icon';

const DMG_URL = 'https://storage.googleapis.com/mes_dmg/latest/Mac_Excel_Shortcuts.dmg';

const EMAIL_SUBJECT = 'Requesting approval to install Mac Excel Shortcuts';

const EMAIL_BODY = `Hi IT Team,

I would like to request approval to install Mac Excel Shortcuts on my workstation for Automating my workflows on Excel to boost my productivity.

The app is signed, notarized by Apple, and provides an IT Deployment guide specifically formatted for MDM management.

Technical App Details:
App Name: Mac Excel Shortcuts
Vendor: Xquantum Pvt Ltd
Bundle ID: com.xquantum.macexcelshortcuts
Installer (.gmd): https://yourcompany.com/downloads/enterprise
IT Documentation: https://yourcompany.com/it-deployment-guide
Mac Excel Shortcuts requires Accessibility to perform automate Excel shortcuts. The vendor has provided the code requirement strings for deploying a MDM PPPC profile if needed.

Please let me know if you need any additional security documentation or if this can be pushed to my device via Jamf or Intune or Kandji.`;

export default function AdminRequiredClient() {
  const [copiedSubject, setCopiedSubject] = useState(false);
  const [copiedBody, setCopiedBody] = useState(false);

  const copySubject = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_SUBJECT);
      setCopiedSubject(true);
      setTimeout(() => setCopiedSubject(false), 2000);
    } catch {}
  };

  const copyBody = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL_BODY);
      setCopiedBody(true);
      setTimeout(() => setCopiedBody(false), 2000);
    } catch {}
  };

  const downloadDirect = () => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({ event: 'dmg_download_admin_required', file: 'Mac_Excel_Shortcuts.dmg' });
    }
    window.location.href = DMG_URL;
  };

  return (
    <>
      <NavBar />
      <section className="status-section" id="admin-required">
        <div className="container">
          <div className="status-card glass admin-required-card">
            <div className="status-icon-wrap" style={{ background: 'var(--apple-orange)' }}>
              <Icon id="shield" size={32} />
            </div>
            <h1 className="text-h2">Admin access is required</h1>
            <p className="text-body">
              Mac Excel Shortcuts needs admin permissions to install and to enable the Accessibility
              access it uses to replicate keyboard shortcuts. Send the message below to your IT admin
              to request access.
            </p>

            <div className="copy-block copy-block-subject">
              <div className="copy-block-label">Subject</div>
              <pre className="copy-block-text">{EMAIL_SUBJECT}</pre>
              <button className="copy-block-btn" onClick={copySubject}>
                <Icon id={copiedSubject ? 'check' : 'copy'} size={16} />
                {copiedSubject ? 'Copied' : 'Copy'}
              </button>
            </div>

            <div className="copy-block">
              <div className="copy-block-label">Body</div>
              <pre className="copy-block-text">{EMAIL_BODY}</pre>
              <button className="copy-block-btn" onClick={copyBody}>
                <Icon id={copiedBody ? 'check' : 'copy'} size={16} />
                {copiedBody ? 'Copied' : 'Copy'}
              </button>
            </div>

            <p className="text-body admin-required-followup">Once you have access, you can download the app directly.</p>

            <div className="status-actions">
              <button className="btn btn-primary" onClick={downloadDirect}>
                <Icon id="download" size={20} /> Download Now
              </button>
              <a href="/" className="status-link">Back to home</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
