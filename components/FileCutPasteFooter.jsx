import Image from 'next/image'
import Icon from './Icon'
import { APP_STORE_URL } from './FileCutPasteNav'

export default function FileCutPasteFooter() {
  return (
    <footer className="footer" id="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="/FileCutPasteApp" className="footer-logo">
              <div className="logo-icon" style={{ overflow: 'hidden', padding: 4, background: 'var(--apple-blue)' }}>
                <Icon id="copy" size={18} />
              </div>
              FileCutPaste
            </a>
            <div className="footer-powered-by">
              Powered by
              <Image src="/Group 61.webp" alt="Xquantum" width={16} height={16} className="footer-powered-by-logo" />
              Quantum
            </div>
            <p className="footer-desc">Windows-style ⌘X / ⌘V cut &amp; paste for Finder on Mac. Native, local-first, and notarized by Apple.</p>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Product</div>
            <a href="/FileCutPasteApp#how-it-works">How it works</a>
            <a href="/FileCutPasteApp/blog">Blog</a>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">Download</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Support</div>
            <a href="mailto:support@maccove.com">Contact support</a>
            <a href="https://maccove.com">MacCove home</a>
          </div>
          <div className="footer-col">
            <div className="footer-col-title">Company</div>
            <a href="/FileCutPasteApp/terms">Terms</a>
            <a href="/FileCutPasteApp/privacy">Privacy</a>
          </div>
        </div>
        <div className="footer-divider"></div>
        <div className="footer-bottom">
          <div className="footer-copyright">© 2026 Xquantum Pvt Ltd. All rights reserved.</div>
        </div>
      </div>
    </footer>
  )
}
