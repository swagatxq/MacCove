import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import Reveal from '../../../components/Reveal'
import Icon from '../../../components/Icon'
import FAQ from '../../../components/FAQ'

export const metadata = {
  title: 'Excel Keyboard Shortcuts for Mac (Full List)',
  description:
    'The full list of Excel keyboard shortcuts for Mac, running exactly like they do on Windows. Paste Special, AutoSum, navigation, formatting, and more, in one app.',
  alternates: { canonical: '/lp/excel-shortcuts-mac' },
  openGraph: {
    title: 'Excel Keyboard Shortcuts for Mac (Full List) | MacCove',
    description:
      'The full list of Excel keyboard shortcuts for Mac, running exactly like they do on Windows, in one app.',
    url: '/lp/excel-shortcuts-mac',
  },
}

export default function ExcelShortcutsLandingPage() {
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
            <h1 className="text-hero">Excel Keyboard<br />Shortcuts for Mac</h1>
            <p className="hero-subtitle">
              Every Excel shortcut key you learned on Windows &mdash; Paste Special, AutoSum,
              formatting, navigation &mdash; running natively on your Mac. One app, zero relearning.
            </p>
            <div className="hero-ctas">
              <a href="/download" className="btn btn-primary">
                <Icon id="download" size={20} /> Download .dmg for Mac
              </a>
              <a href="/blog/mac-excel-shortcut-cheat-sheet" className="btn btn-secondary">
                View the Full Cheat Sheet
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-row">
              <div className="hero-image hero-image-side hero-image-left">
                <Image
                  src="/PasteSpecial.png"
                  alt="Paste Special shortcuts in Mac Excel Shortcuts"
                  width={2202}
                  height={1650}
                />
              </div>
              <div className="hero-image hero-image-side hero-image-right">
                <Image
                  src="/Formatting.png"
                  alt="Formatting shortcuts in Mac Excel Shortcuts"
                  width={2166}
                  height={1636}
                />
              </div>
            </div>
            <div className="hero-image hero-image-main">
              <Image
                src="/AppScreenshot.png"
                alt="Mac Excel Shortcuts app screenshot"
                width={2206}
                height={1186}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">The Excel Shortcuts Mac Users Miss Most</h2>
            <p className="text-body">The Windows Excel shortcuts you already know, now working natively on your Mac.</p>
          </Reveal>
          <div className="security-grid stagger-children">
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>V</kbd>
              </div>
              <div className="security-card-title">Paste Special</div>
              <div className="security-card-desc">Paste values, formulas, or formatting only &mdash; without carrying over the rest of the copied cell.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>=</kbd>
              </div>
              <div className="security-card-title">AutoSum</div>
              <div className="security-card-desc">Insert a SUM formula for the selected cells without typing it out.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>H</kbd><span>+</span><kbd>O</kbd><span>+</span><kbd>I</kbd>
              </div>
              <div className="security-card-title">AutoFit Column Width</div>
              <div className="security-card-desc">Resize the selected columns to fit their contents automatically.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>Enter</kbd>
              </div>
              <div className="security-card-title">New Line in Cell</div>
              <div className="security-card-desc">Start a new line within the same cell instead of moving to the next one.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Ctrl</kbd><span>+</span><kbd>1</kbd>
              </div>
              <div className="security-card-title">Format Cells</div>
              <div className="security-card-desc">Open the Format Cells dialog exactly like the Windows shortcut, without hunting through menus.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8984;</kbd><span>+</span><kbd>Alt</kbd><span>+</span><kbd>F</kbd>
              </div>
              <div className="security-card-title">Freeze Panes</div>
              <div className="security-card-desc">Lock the selected rows and columns in place while you scroll through large sheets.</div>
            </div>
          </div>
          <Reveal>
            <p className="text-body" style={{ textAlign: 'center', marginTop: '2rem' }}>
              Want the complete, printable reference? Read the{' '}
              <a href="/blog/mac-excel-shortcut-cheat-sheet">full Mac Excel shortcut cheat sheet</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">How It Works</h2>
            <p className="text-body">Get started with Mac Excel Shortcuts in three simple steps. From download to full automation in under 1 minute.</p>
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
              <div className="how-to-step-desc">We need two permissions, Accessibility to access Excel, and Input Monitoring to connect your keyboard to Excel.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="zap" size={24} />
              </div>
              <div className="how-to-step-title">Open Excel and Start Using</div>
              <div className="how-to-step-desc">Open Excel and start using your shortcuts, exactly like on Windows.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="faq-header">
            <h2 className="text-h2">Questions &amp; Answers</h2>
            <p className="text-body">Everything you need to know about Excel keyboard shortcuts on your Mac.</p>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <Footer />
    </>
  )
}
