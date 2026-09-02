import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import AssistantFloater from '../../../components/AssistantFloater'
import Reveal from '../../../components/Reveal'
import Icon from '../../../components/Icon'
import FAQ from '../../../components/FAQ'
import { getBrandAffiliates } from '../../../lib/datocms'
import { faqs } from '../../../lib/faqs'

const PAGE_QUESTIONS = [
  'How to make Find... work in Mac Excel Shortcuts app?',
  'How to make Replace... work in Mac Excel Shortcuts app?',
  'How to make Go To... work in Mac Excel Shortcuts app?',
  'How to make Filter work in Mac Excel Shortcuts app?',
  'How to make Sort A to Z work in Mac Excel Shortcuts app?',
  'How to make Sort Z to A work in Mac Excel Shortcuts app?',
]

export const metadata = {
  title: 'Excel Navigation & Data Shortcuts for Mac',
  description:
    'Alt+Enter, fill handle, filter, sort, freeze panes, insert rows, merge cells, and switch sheets — the Windows Excel navigation and data shortcuts you already know, running natively on your Mac.',
  alternates: { canonical: '/lp/navigation-shortcuts-mac' },
  openGraph: {
    title: 'Excel Navigation & Data Shortcuts for Mac | MacCove',
    description:
      'Alt+Enter, fill handle, filter, sort, freeze panes, insert rows, merge cells, and switch sheets — Windows Excel navigation shortcuts, running natively on your Mac.',
    url: '/lp/navigation-shortcuts-mac',
  },
}

export default async function NavigationShortcutsLandingPage() {
  const brandAffiliates = await getBrandAffiliates({ first: 5 })
  const pageFaqs = faqs.filter((faq) => PAGE_QUESTIONS.includes(faq.q))

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pageFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to get Excel navigation shortcuts working on Mac',
    description: 'Get Windows Excel navigation and data shortcuts working natively on your Mac in under a minute.',
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Download the App',
        text: 'Download the DMG directly. Installation takes seconds and requires zero setup.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Provide Permissions',
        text: 'Grant Accessibility and Input Monitoring so your keyboard shortcuts can reach Excel.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Open Excel and Navigate',
        text: 'Open Excel and use your Windows navigation shortcuts exactly as before.',
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maccove.com/' },
      { '@type': 'ListItem', position: 2, name: 'Excel Navigation & Data Shortcuts for Mac', item: 'https://maccove.com/lp/navigation-shortcuts-mac' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
              Alt+Enter for a new line, the fill handle, filtering, sorting, freezing panes,
              inserting rows, merging cells, and switching between sheets &mdash; the Windows
              Excel navigation and data shortcuts you already know, working natively on your Mac.
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

      <section className="section launch-partners-section" id="launch-partners">
        <div className="container">
          <Reveal className="launch-partners-inner">
            <div className="launch-partners-label">Launch Partners</div>
            <div className="launch-partners-row">
              <a
                href="https://www.tinystartups.com/startup/maccoves-mac-excel-shortcuts"
                target="_blank"
                rel="noopener"
                className="launch-partner-badge"
              >
                <svg width="40" height="40" viewBox="0 0 100 100">
                  <defs>
                    <linearGradient id="tsg" x1=".1" y1="0" x2=".9" y2="1">
                      <stop offset="0%" stopColor="#3525E6" />
                      <stop offset="55%" stopColor="#D81FE0" />
                      <stop offset="100%" stopColor="#22B8F0" />
                    </linearGradient>
                  </defs>
                  <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg)" />
                </svg>
                <span className="launch-partner-badge-text">
                  <span className="launch-partner-badge-eyebrow">Launched on</span>
                  <span className="launch-partner-badge-name">Tiny Startups</span>
                  <span className="launch-partner-badge-url">tinystartups.com</span>
                </span>
              </a>
              <a href="https://openhunts.com" target="_blank" rel="noopener" title="OpenHunts Club">
                <img
                  alt="OpenHunts Club Member"
                  height="105"
                  src="https://cdn.openhunts.com/badges/club.webp"
                  width="486"
                  className="openhunts-badge"
                />
              </a>
              <a href="https://twelve.tools" target="_blank" rel="noopener" title="Featured on Twelve Tools">
                <img
                  src="https://twelve.tools/badge0-light.svg"
                  alt="Featured on Twelve Tools"
                  width="200"
                  height="54"
                  className="twelve-tools-badge twelve-tools-badge-light"
                />
                <img
                  src="https://twelve.tools/badge0-dark.svg"
                  alt="Featured on Twelve Tools"
                  width="200"
                  height="54"
                  className="twelve-tools-badge twelve-tools-badge-dark"
                />
              </a>
              <a href="https://wired.business" target="_blank" rel="noopener" title="Featured on Wired Business">
                <img
                  src="https://wired.business/badge0-white.svg"
                  alt="Featured on Wired Business"
                  width="200"
                  height="54"
                  className="wired-business-badge wired-business-badge-light"
                />
                <img
                  src="https://wired.business/badge0-dark.svg"
                  alt="Featured on Wired Business"
                  width="200"
                  height="54"
                  className="wired-business-badge wired-business-badge-dark"
                />
              </a>
              <a
                href="https://startupbase.io/products/mac-excel-shortcuts?utm_source=startupbase&utm_medium=badge&utm_campaign=launch-badge-light"
                target="_blank"
                rel="noopener noreferrer"
                title="Launched on StartupBase"
              >
                <img
                  src="https://statics.startupbase.io/site/badges/launched-on-sb.svg"
                  alt="Launched on StartupBase"
                  height="55"
                  className="startupbase-badge"
                />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Navigation & Data Shortcuts on Mac</h2>
            <p className="text-body">Move through, edit, and organize your data without reaching for the mouse.</p>
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
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Ctrl</kbd><span>+</span><kbd>+</kbd>
              </div>
              <div className="security-card-title">Insert Row</div>
              <div className="security-card-desc">Insert a new row above the selected cell, same combination as Windows Excel.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>H</kbd><span>+</span><kbd>M</kbd><span>+</span><kbd>C</kbd>
              </div>
              <div className="security-card-title">Merge &amp; Center Cells</div>
              <div className="security-card-desc">Merge the selected cells and center their contents, without touching the Home tab.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Ctrl</kbd><span>+</span><kbd>Page&#8595;</kbd>
              </div>
              <div className="security-card-title">Switch Between Sheets</div>
              <div className="security-card-desc">Move to the next sheet tab. Add Shift to move to the previous one.</div>
            </div>
          </div>
          <Reveal>
            <p className="text-body" style={{ textAlign: 'center', marginTop: '2rem' }}>
              Looking for more? See the{' '}
              <a href="/lp/excel-shortcuts-mac">full list of Excel shortcuts on Mac</a>{' '}
              &mdash; Paste Special, AutoSum, formatting, and everything else, in one place.
            </p>
          </Reveal>
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
          <FAQ items={pageFaqs} />
        </div>
      </section>

      <section className="section security-section" id="security">
        <div className="container">
          <Reveal className="callout-banner">
            <Icon id="shield" size={22} />
            <div>
              <strong>Your usage data never leaves your device.</strong> Zero data collection, local-first
              processing, Apple notarized. See the full{' '}
              <a href="/lp/excel-shortcuts-mac#security">security &amp; privacy details</a>.
            </div>
          </Reveal>
        </div>
      </section>

      {brandAffiliates.length > 0 && (
        <section className="section brand-section" id="brand-affiliates">
          <div className="container">
            <Reveal className="callout-banner">
              <Icon id="award" size={22} />
              <div>
                <strong>We partner with brands the MacCove community trusts.</strong>{' '}
                <a href="/brand-affiliates">See all affiliates</a>.
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <AssistantFloater />

      <Footer />
    </>
  )
}
