'use client';
import { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import Icon from '../../components/Icon';

const DMG_URL = 'https://storage.googleapis.com/mes_dmg/latest/Mac_Excel_Shortcuts.dmg';
const ADDITIONAL_DATA_KEY = 'mes_visitor_additional_data';

function buildEmailTemplate(companyName) {
  const company = companyName ? ` at ${companyName}` : '';
  return `Subject: Requesting admin access to install Mac Excel Shortcuts

Hi,

I'd like to install Mac Excel Shortcuts on my company-issued MacBook${company}. It's a lightweight menu bar app that brings the Windows Excel keyboard shortcuts I already know to Mac.

Installing it — and enabling Accessibility permissions it needs to work — requires local admin rights on this machine. Could you either grant me admin access or install it on my behalf?

App: https://macexcelshortcuts.com

Thanks!`;
}

export default function AdminRequiredClient() {
  const [companyName, setCompanyName] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(sessionStorage.getItem(ADDITIONAL_DATA_KEY));
      if (stored?.company_name) setCompanyName(stored.company_name);
    } catch {}
  }, []);

  const emailTemplate = buildEmailTemplate(companyName);

  const copyTemplate = async () => {
    try {
      await navigator.clipboard.writeText(emailTemplate);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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

            <div className="copy-block">
              <pre className="copy-block-text">{emailTemplate}</pre>
              <button className="copy-block-btn" onClick={copyTemplate}>
                <Icon id={copied ? 'check' : 'copy'} size={16} />
                {copied ? 'Copied' : 'Copy'}
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
