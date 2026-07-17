import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import Reveal from '../../../components/Reveal'
import Icon from '../../../components/Icon'
import FAQ from '../../../components/FAQ'

export const metadata = {
  title: 'Excel Navigation & Data Shortcuts for Mac',
  description:
    'Alt+Enter, fill handle, filter, sort, and freeze panes — the Windows Excel navigation and data shortcuts you already know, running natively on your Mac.',
  alternates: { canonical: '/lp/navigation-shortcuts-mac' },
  openGraph: {
    title: 'Excel Navigation & Data Shortcuts for Mac | MacCove',
    description:
      'Alt+Enter, fill handle, filter, sort, and freeze panes — Windows Excel navigation shortcuts, running natively on your Mac.',
    url: '/lp/navigation-shortcuts-mac',
  },
}

export default function NavigationShortcutsLandingPage() {
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
            <h1 className="text-hero">Navigate Excel<br />Like You Do on Windows</h1>
            <p className="hero-subtitle">
              Alt+Enter for a new line, the fill handle, filtering, sorting, freezing panes &mdash;
              the Windows Excel navigation and data shortcuts you already know, working natively
              on your Mac.
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
                src="/AppScreenshot.webp"
                alt="Mac Excel Shortcuts app screenshot"
                width={2206}
                height={1186}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Navigation & Data Shortcuts on Mac</h2>
            <p className="text-body">Move through and organize your data without reaching for the mouse.</p>
          </Reveal>
          <div className="security-grid stagger-children">
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>Enter</kbd>
              </div>
              <div className="security-card-title">New Line in Cell</div>
              <div className="security-card-desc">Start a new line within the same cell instead of moving to the next one.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8984;</kbd><span>+</span><kbd>&#8679;</kbd><span>+</span><kbd>F</kbd>
              </div>
              <div className="security-card-title">Toggle Filter Arrows</div>
              <div className="security-card-desc">Turn column filter arrows on or off for the selected data range.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8997;</kbd><span>+</span><kbd>&#8595;</kbd>
              </div>
              <div className="security-card-title">Open Filter List</div>
              <div className="security-card-desc">Open the filter dropdown for the active column header.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8984;</kbd><span>+</span><kbd>Alt</kbd><span>+</span><kbd>F</kbd>
              </div>
              <div className="security-card-title">Freeze Panes</div>
              <div className="security-card-desc">Lock the selected rows and columns in place while you scroll through large sheets.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>&#8984;</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>L</kbd>
              </div>
              <div className="security-card-title">Sort Ascending</div>
              <div className="security-card-desc">Sort the selected range without breaking adjacent table columns.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Ctrl</kbd><span>+</span><kbd>D</kbd>
              </div>
              <div className="security-card-title">Fill Down</div>
              <div className="security-card-desc">Fill the selected cells with the content from the cell above, same as the fill handle.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Set It Up in Under a Minute</h2>
            <p className="text-body">From download to full native navigation shortcuts, in three steps.</p>
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
              <div className="how-to-step-title">Open Excel and Navigate</div>
              <div className="how-to-step-desc">Open Excel and use your Windows navigation shortcuts exactly as before.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="faq-header">
            <h2 className="text-h2">Questions &amp; Answers</h2>
            <p className="text-body">Everything you need to know about Excel navigation shortcuts on your Mac.</p>
          </Reveal>
          <FAQ />
        </div>
      </section>

      <Footer />
    </>
  )
}
