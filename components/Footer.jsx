import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/" className="footer-logo">
              <div className="logo-icon" style={{ overflow: 'hidden', padding: 4 }}>
                <svg viewBox="0 0 145 115" width="28" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
                  <polygon points="0,0 35,0 35,80 0,80" fill="currentColor" opacity="0.9" />
                  <polygon points="0,80 35,80 105,115 70,115" fill="currentColor" opacity="0.7" />
                  <polygon points="35,0 75,0 105,80 70,80" fill="currentColor" opacity="0.9" />
                  <polygon points="75,0 110,0 145,115 110,115" fill="currentColor" opacity="0.7" />
                  <rect x="5" y="10" width="25" height="50" rx="2" fill="white" opacity="0.15" />
                  <line x1="8" y1="20" x2="25" y2="20" stroke="white" strokeWidth="2" opacity="0.6" />
                  <line x1="8" y1="28" x2="20" y2="28" stroke="white" strokeWidth="2" opacity="0.4" />
                  <line x1="8" y1="36" x2="22" y2="36" stroke="white" strokeWidth="2" opacity="0.3" />
                </svg>
              </div>
              MacCove
            </a>
            <div className="footer-powered-by">
              Powered by
              <Image src="/Group 61.webp" alt="Xquantum" width={16} height={16} className="footer-powered-by-logo" />
              Quantum
            </div>
            <p className="footer-desc">The most powerful automation platform for macOS, iOS, and iPadOS. Build shortcuts, automate workflows, and control your entire Apple ecosystem.</p>
            <div className="footer-socials">
              <a href="#" className="footer-social" title="Twitter" target="_blank" rel="noopener noreferrer">
                <span className="icon icon-20"><svg><use href="#i-x" /></svg></span>
              </a>
              <a href="#" className="footer-social" title="GitHub" target="_blank" rel="noopener noreferrer">
                <span className="icon icon-20"><svg><use href="#i-command" /></svg></span>
              </a>
              <a href="#" className="footer-social" title="Discord" target="_blank" rel="noopener noreferrer">
                <span className="icon icon-20"><svg><use href="#i-message-circle" /></svg></span>
              </a>
              <a href="#" className="footer-social" title="YouTube" target="_blank" rel="noopener noreferrer">
                <span className="icon icon-20"><svg><use href="#i-play" /></svg></span>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <a href="/#features">Features</a>
            <a href="/download">Download</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Resources</div>
            <a href="https://github.com/swagatxq/MacCove" target="_blank" rel="noopener noreferrer">Documentation</a>
            <a href="/affiliate">Become an affiliate</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="/terms">Terms</a>
            <a href="/privacy">Privacy</a>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-launch-partners">
          <div className="footer-col-title">Launch Partners</div>
          <a
            href="https://www.tinystartups.com/startup/maccoves-mac-excel-shortcuts"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 24px 16px 20px',
              borderRadius: 14,
              textDecoration: 'none',
              fontFamily: "'Inter',system-ui,sans-serif",
              background: 'linear-gradient(135deg,#3525E6,#D81FE0,#22B8F0)',
              color: '#fff',
            }}
          >
            <svg width="56" height="56" viewBox="0 0 100 100">
              <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="#ffffff" />
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
              <span
                style={{
                  fontFamily: 'monospace',
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.75)',
                }}
              >
                Launched on
              </span>
              <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.025em', color: '#fff' }}>
                Tiny Startups
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.75)', marginTop: 4 }}>
                tinystartups.com
              </span>
            </span>
          </a>
        </div>
        <br></br>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 Xquantum Pvt Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
