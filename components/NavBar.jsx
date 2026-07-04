import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';

export default function NavBar() {
  return (
    <nav className="nav-bar">
      <div className="container nav-inner">
        <a href="/" className="nav-logo">
          <div className="logo-icon" style={{overflow: 'hidden', padding: 4}}>
             <svg viewBox="0 0 145 115" width="28" height="22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display: 'block'}}>
               <polygon points="0,0 35,0 35,80 0,80" fill="currentColor" opacity="0.9"/>
               <polygon points="0,80 35,80 105,115 70,115" fill="currentColor" opacity="0.7"/>
               <polygon points="35,0 75,0 105,80 70,80" fill="currentColor" opacity="0.9"/>
               <polygon points="75,0 110,0 145,115 110,115" fill="currentColor" opacity="0.7"/>
               <rect x="5" y="10" width="25" height="50" rx="2" fill="white" opacity="0.15"/>
               <line x1="8" y1="20" x2="25" y2="20" stroke="white" strokeWidth="2" opacity="0.6"/>
               <line x1="8" y1="28" x2="20" y2="28" stroke="white" strokeWidth="2" opacity="0.4"/>
               <line x1="8" y1="36" x2="22" y2="36" stroke="white" strokeWidth="2" opacity="0.3"/>
             </svg>
          </div>
          MacCove
          <span className="nav-powered-by">
            Powered by
            <Image src="/Group 61.png" alt="Xquantum" width={14} height={14} />
            Quantum
          </span>
        </a>
        <div className="nav-links">
          <a href="#features" className="active"><Icon id="box" size={16} /> Product</a>
          <a href="/blog"><Icon id="file-text" size={16} /> Blog</a>
          <a href="https://github.com/swagatxq/MacCove" target="_blank" rel="noopener noreferrer"><Icon id="book" size={16} /> Docs</a>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <a href="/download" className="nav-cta"><Icon id="download" size={16} /> Download App</a>
          <ThemeToggle />
          <button className="mobile-menu-btn" aria-label="Open menu">
            <Icon id="menu" size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
}
