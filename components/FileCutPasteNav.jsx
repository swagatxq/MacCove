import Image from 'next/image'
import Icon from './Icon'

// TODO: swap in the real App Store listing URL once FileCutPaste is live.
export const APP_STORE_URL = 'https://apps.apple.com/in/app/file-cut-paste/id6803948443?mt=12'

export default function FileCutPasteNav() {
  return (
    <nav className="nav-bar">
      <div className="container nav-inner">
        <a href="/FileCutPasteApp" className="nav-logo">
          <div className="logo-icon" style={{ overflow: 'hidden', padding: 4, background: 'var(--apple-blue)' }}>
            <Icon id="copy" size={18} />
          </div>
          FileCutPaste
          <span className="nav-powered-by">
            by
            <Image src="/Group 61.webp" alt="Xquantum" width={14} height={14} />
            MacCove
          </span>
        </a>
        <div className="nav-links">
          <a href="/FileCutPasteApp#how-it-works"><Icon id="zap" size={16} /> How it works</a>
          <a href="/FileCutPasteApp/blog"><Icon id="file-text" size={16} /> Blog</a>
          <a href="/FileCutPasteApp#support"><Icon id="mail" size={16} /> Support</a>
          <a href="https://maccove.com"><Icon id="home" size={16} /> MacCove</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary nav-cta">
            <Icon id="download" size={16} /> Get it on the App Store
          </a>
        </div>
      </div>
    </nav>
  )
}
