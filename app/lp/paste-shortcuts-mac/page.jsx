import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import Reveal from '../../../components/Reveal'
import Icon from '../../../components/Icon'
import FAQ from '../../../components/FAQ'

export const metadata = {
  title: 'Paste Special Shortcuts for Excel on Mac',
  description:
    'Paste Special, Paste Values, and Paste Formats — the exact Windows Excel paste shortcuts, working natively on your Mac. No relearning required.',
  alternates: { canonical: '/lp/paste-shortcuts-mac' },
  openGraph: {
    title: 'Paste Special Shortcuts for Excel on Mac | MacCove',
    description:
      'Paste Special, Paste Values, and Paste Formats — the exact Windows Excel paste shortcuts, working natively on your Mac.',
    url: '/lp/paste-shortcuts-mac',
  },
}

export default function PasteShortcutsLandingPage() {
  return (
    <>
      <NavBar />

      <section className="hero" id="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="dot"></div>
              Available for Mac OS
            </div>
            <h1 className="text-hero">Paste Special<br />Shortcuts on Mac</h1>
            <p className="hero-subtitle">
              Alt+E+S+V for Paste Special. Alt+E+S+T for formats only. The Windows Excel paste
              shortcuts you already know, running natively on your Mac &mdash; no menus, no relearning.
            </p>
            <div className="hero-ctas">
              <a href="/download" className="btn btn-primary">
                <Icon id="download" size={20} /> Download .dmg for Mac
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image hero-image-main">
              <Image
                src="/PasteSpecial.webp"
                alt="Paste Special shortcuts in Mac Excel Shortcuts"
                width={2202}
                height={1650}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Every Paste Shortcut, Working on Mac</h2>
            <p className="text-body">The exact key combinations from Windows Excel, now native on macOS.</p>
          </Reveal>
          <div className="security-grid stagger-children">
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>V</kbd>
              </div>
              <div className="security-card-title">Paste Values</div>
              <div className="security-card-desc">Paste only the values from a copied cell, dropping formulas and formatting.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>T</kbd>
              </div>
              <div className="security-card-title">Paste Formats</div>
              <div className="security-card-desc">Paste only the formatting from the copied cell, leaving its values and formulas untouched.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>F</kbd>
              </div>
              <div className="security-card-title">Paste Formulas</div>
              <div className="security-card-desc">Paste only the formula from the copied cell, recalculated for the new location.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>W</kbd>
              </div>
              <div className="security-card-title">Paste Column Widths</div>
              <div className="security-card-desc">Match the column width of the source cells without changing any content.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>M</kbd>
              </div>
              <div className="security-card-title">Paste and Add</div>
              <div className="security-card-desc">Add the copied values to the existing values in the destination cells.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8984;</kbd><span>+</span><kbd>V</kbd>
              </div>
              <div className="security-card-title">Standard Paste</div>
              <div className="security-card-desc">Regular paste still works exactly as expected &mdash; nothing changes for your normal workflow.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Get Paste Special Working in Under a Minute</h2>
            <p className="text-body">No configuration, no remapping keyboard layouts by hand.</p>
          </Reveal>
          <div className="how-to-steps stagger-children">
            <div className="how-to-step glass">
              <div className="how-to-step-number">1</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="download" size={24} />
              </div>
              <div className="how-to-step-title">Download the App</div>
              <div className="how-to-step-desc">Download the DMG directly. Installation takes seconds and requires zero setup.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">2</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="sliders" size={24} />
              </div>
              <div className="how-to-step-title">Provide Permissions</div>
              <div className="how-to-step-desc">Grant Accessibility and Input Monitoring so your keyboard shortcuts can reach Excel.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="zap" size={24} />
              </div>
              <div className="how-to-step-title">Open Excel and Paste</div>
              <div className="how-to-step-desc">Open Excel and use Alt+E+S+V exactly like you would on Windows.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="faq-header">
            <h2 className="text-h2">Questions &amp; Answers</h2>
            <p className="text-body">Everything you need to know about running Paste Special shortcuts on your Mac.</p>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <Footer />
    </>
  )
}
