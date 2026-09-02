import Image from 'next/image'
import NavBar from '../../../components/NavBar'
import Footer from '../../../components/Footer'
import AssistantFloater from '../../../components/AssistantFloater'
import Reveal from '../../../components/Reveal'
import Icon from '../../../components/Icon'
import FAQ from '../../../components/FAQ'
import { getBrandAffiliates } from '../../../lib/datocms'
import { getBrandPrimaryLink } from '../../../lib/format'
import { faqs } from '../../../lib/faqs'

const PAGE_QUESTIONS = [
  'What is Mac Excel Shortcuts app?',
  'How do I install it?',
  'What permissions does it need, and why?',
  'Does it work with Google Sheets or Numbers?',
  'What platforms does Mac Excel Shortcuts app support?',
  'Is there a free version?',
]

export const metadata = {
  title: 'Excel Keyboard Shortcuts for Mac (Full List + Cheat Sheet)',
  description:
    'The full list of Excel keyboard shortcuts for Mac, plus a printable cheat sheet, running exactly like they do on Windows. Paste Special, AutoSum, navigation, formatting, and more, in one app.',
  alternates: { canonical: '/lp/excel-shortcuts-mac' },
  openGraph: {
    title: 'Excel Keyboard Shortcuts for Mac (Full List + Cheat Sheet) | MacCove',
    description:
      'The full list of Excel keyboard shortcuts for Mac, plus a printable cheat sheet, running exactly like they do on Windows, in one app.',
    url: '/lp/excel-shortcuts-mac',
  },
}

export default async function ExcelShortcutsLandingPage() {
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
    name: 'How to get Excel shortcuts working on Mac',
    description: 'Get Windows Excel keyboard shortcuts working natively on your Mac in under a minute.',
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
        text: 'Grant Accessibility and Input Monitoring permissions so your keyboard shortcuts can reach Excel.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Open Excel and Start Using',
        text: 'Open Excel and start using your shortcuts, exactly like on Windows.',
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://maccove.com/' },
      { '@type': 'ListItem', position: 2, name: 'Excel Keyboard Shortcuts for Mac', item: 'https://maccove.com/lp/excel-shortcuts-mac' },
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
                <Icon id="file-text" size={20} /> Get the Printable Cheat Sheet
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-row">
              <div className="hero-image hero-image-side hero-image-left">
                <Image
                  src="/PasteSpecial.webp"
                  alt="Paste Special shortcuts in Mac Excel Shortcuts app"
                  width={2202}
                  height={1650}
                />
              </div>
              <div className="hero-image hero-image-side hero-image-right">
                <Image
                  src="/Formatting.webp"
                  alt="Formatting shortcuts in Mac Excel Shortcuts app"
                  width={2166}
                  height={1636}
                />
              </div>
            </div>
            <div className="hero-image hero-image-main">
              <Image
                src="/AppScreenshot.webp"
                alt="Mac Excel Shortcuts app screenshot"
                width={2206}
                height={1186}
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
              <a href="/blog/mac-excel-shortcut-cheat-sheet">full Mac Excel shortcuts cheat sheet</a>{' '}
              &mdash; every shortcut on this page, plus Paste Special, navigation, insert row, merge
              cells, and switching sheets, in one printable list.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">How It Works</h2>
            <p className="text-body">Get started with Mac Excel Shortcuts app in three simple steps. From download to full automation in under 1 minute.</p>
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
          <FAQ items={pageFaqs} />
        </div>
      </section>

      <section className="section security-section" id="security">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Security & Privacy</h2>
            <p className="text-body">Your usage data never leaves your device.</p>
          </Reveal>

          <Reveal className="security-badges">
            <div className="security-badge">
              <Icon id="award" size={20} /> No data collection
            </div>
            <div className="security-badge">
              <Icon id="shield" size={20} /> No data transmission
            </div>
            <div className="security-badge">
              <Icon id="lock" size={20} /> Apple Notarized
            </div>
            <div className="security-badge">
              <Icon id="file-text" size={20} /> Just functional
            </div>
          </Reveal>

          <div className="security-grid stagger-children">
            <div className="security-card glass-tinted-rose">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-rose)' }}>
                <Icon id="x" size={24} />
              </div>
              <div className="security-card-title">Zero Data Collection</div>
              <div className="security-card-desc">We don&apos;t track what you use, sell your data, or run analytics. What you automate is your business &mdash; not ours.</div>
              <div className="security-card-meta">Privacy Policy <Icon id="chevron-right" size={12} /></div>
            </div>
            <div className="security-card glass">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-green)' }}>
                <Icon id="monitor" size={24} />
              </div>
              <div className="security-card-title">Local-First Processing</div>
              <div className="security-card-desc">Shortcuts run entirely on your device. Cloud is required only license management.</div>
              <div className="security-card-meta">Architecture <Icon id="chevron-right" size={12} /></div>
            </div>
            <div className="security-card glass-tinted-blue">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-cyan)' }}>
                <Icon id="check-circle" size={24} />
              </div>
              <div className="security-card-title">Apple Notarized</div>
              <div className="security-card-desc">Every MacCove release is scanned and notarized by Apple. No malware, no tampering, no unsigned code ever reaches your Mac.</div>
              <div className="security-card-meta">Verify <Icon id="chevron-right" size={12} /></div>
            </div>
          </div>
        </div>
      </section>

      {brandAffiliates.length > 0 && (
        <section className="section brand-section" id="brand-affiliates">
          <div className="container">
            <Reveal className="brand-header">
              <div className="brand-header-left">
                <h2 className="text-h2">Brand Affiliates</h2>
                <p className="text-body">Brands we partner with and recommend to the MacCove community.</p>
              </div>
              <a href="/brand-affiliates" className="brand-link">
                See all affiliates
                <Icon id="chevron-right" size={16} className="arrow" />
              </a>
            </Reveal>
            <div className="brand-grid stagger-children">
              {brandAffiliates.map((brand) => {
                const primaryLink = getBrandPrimaryLink(brand)
                const CardTag = primaryLink ? 'a' : 'div'
                return (
                  <CardTag
                    key={brand.id}
                    className="brand-card glass"
                    {...(primaryLink ? { href: primaryLink, target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    <div className="brand-card-identity">
                      {brand.logo && (
                        <img
                          className="brand-card-logo"
                          src={brand.logo.url}
                          alt={brand.logo.alt || `${brand.name} logo`}
                          loading="lazy"
                        />
                      )}
                      <div className="brand-card-name">{brand.name}</div>
                    </div>
                    {brand.image && (
                      <div className="brand-card-image-wrap">
                        <img
                          className="brand-card-image"
                          src={brand.image.url}
                          alt={brand.image.alt || brand.name}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="brand-card-links">
                      {brand.website && (
                        <span className="brand-card-link" aria-label={`${brand.name} website`}>
                          <Icon id="globe" size={16} />
                        </span>
                      )}
                      {brand.twitter && (
                        <span className="brand-card-link" aria-label={`${brand.name} on Twitter`}>
                          <Icon id="x" size={16} />
                        </span>
                      )}
                      {brand.youtube && (
                        <span className="brand-card-link" aria-label={`${brand.name} on YouTube`}>
                          <Icon id="play" size={16} />
                        </span>
                      )}
                      {brand.telegram && (
                        <span className="brand-card-link" aria-label={`${brand.name} on Telegram`}>
                          <Icon id="send" size={16} />
                        </span>
                      )}
                    </div>
                  </CardTag>
                )
              })}
            </div>
          </div>
        </section>
      )}

      <AssistantFloater />

      <Footer />
    </>
  )
}
