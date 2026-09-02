'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import Icon from './Icon';
import DownloadCTA from './DownloadCTA';

export default function NavBar() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith('/blog');
  const isProduct = pathname === '/';
  const isShop = pathname.startsWith('/shop');
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Lock body scroll + close on Escape while the menu is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

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
            <Image src="/Group 61.webp" alt="Xquantum" width={14} height={14} />
            Quantum
          </span>
        </a>
        <div className="nav-links">
          <a href="/#features" className={isProduct ? 'active' : ''}><Icon id="box" size={16} /> Apps</a>
          <a href="/shop" className={isShop ? 'active' : ''}><Icon id="shopping-bag" size={16} /> Shop</a>
          <a href="/blog" className={isBlog ? 'active' : ''}><Icon id="file-text" size={16} /> Blog</a>
          <a href="https://github.com/swagatxq/MacCove" target="_blank" rel="noopener noreferrer"><Icon id="book" size={16} /> Docs</a>
        </div>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <DownloadCTA className="nav-cta"><Icon id="download" size={16} /> Get the Excel Shortcuts app</DownloadCTA>
          <div className="theme-toggle-desktop"><ThemeToggle /></div>
          <button
            className="mobile-menu-btn"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <Icon id={menuOpen ? 'x' : 'menu'} size={24} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <>
          <div className="mobile-menu-backdrop" onClick={() => setMenuOpen(false)} />
          <div className="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
            <a href="/#features" className={isProduct ? 'active' : ''} onClick={() => setMenuOpen(false)}><Icon id="box" size={18} /> Apps</a>
            <a href="/shop" className={isShop ? 'active' : ''} onClick={() => setMenuOpen(false)}><Icon id="shopping-bag" size={18} /> Shop</a>
            <a href="/blog" className={isBlog ? 'active' : ''} onClick={() => setMenuOpen(false)}><Icon id="file-text" size={18} /> Blog</a>
            <a href="https://github.com/swagatxq/MacCove" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}><Icon id="book" size={18} /> Docs</a>
            <DownloadCTA className="mobile-menu-cta"><Icon id="download" size={16} /> Get the Excel Shortcuts app</DownloadCTA>
            <div className="mobile-menu-theme">
              <span>Appearance</span>
              <ThemeToggle />
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
