import Image from 'next/image'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import Counter from '../../components/Counter'
import FAQ from '../../components/FAQ'
import Reveal from '../../components/Reveal'
import Icon from '../../components/Icon'
import DownloadCTA from '../../components/DownloadCTA'
import ProductCarousel from '../../components/ProductCarousel'
import ShortcutKeysDemo from '../../components/ShortcutKeysDemo'
import DownloadTrigger from '../../components/DownloadTrigger'
import UsecaseCards from '../../components/UsecaseCards'
import PersonaCarousel from '../../components/PersonaCarousel'
import DownloadHeroPanel from '../../components/DownloadHeroPanel'
import { getAllBlogPosts, getBrandAffiliates, getMerchandise } from '../../lib/datocms'
import { formatBlogDate, getBrandPrimaryLink } from '../../lib/format'
import { getVisitorCountryCode } from '../../lib/geo'
import { getCountryName } from '../../lib/countries'
import { faqs, HOMEPAGE_QUESTIONS } from '../../lib/faqs'

export const revalidate = 60

export const metadata = {
  title: 'Download Mac Excel Shortcuts',
  alternates: { canonical: '/downloadfull' },
  robots: { index: false, follow: false },
}

export default async function Home() {
  const latestPosts = await getAllBlogPosts({ first: 3 })
  const brandAffiliates = await getBrandAffiliates({ first: 5 })
  const visitorCountryCode = await getVisitorCountryCode()
  const merchandise = await getMerchandise({ first: 6, country: visitorCountryCode })
  const merchandiseCountryName = merchandise[0] ? getCountryName(merchandise[0].country) : null

  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mac Excel Shortcuts',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'macOS 14.0+',
    url: 'https://maccove.com/',
    description: 'Make Excel work the way it does on Windows, natively on your Mac. No Parallels, no Boot Camp, no VM, no relearning required.',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free trial',
        price: '0',
        priceCurrency: 'USD',
        description: '7-day free trial with usage limits.',
      },
      {
        '@type': 'Offer',
        name: 'Monthly',
        price: '4.99',
        priceCurrency: 'USD',
      },
      {
        '@type': 'Offer',
        name: 'Lifetime',
        price: '49.99',
        priceCurrency: 'USD',
      },
    ],
  }

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs
      .filter((faq) => HOMEPAGE_QUESTIONS.includes(faq.q))
      .map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
  }

  const howToJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to use Windows Excel shortcuts on Mac',
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
        name: 'Provide permissions',
        text: 'Grant Accessibility and Input Monitoring permissions so the app can access Excel and connect your keyboard.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Open Excel and start using',
        text: 'Open Excel and start using your Windows shortcuts, natively.',
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />
      <NavBar />

      {visitorCountryCode === 'IN' && (
        <a href="/shop" className="shop-banner">
          <div className="container shop-banner-inner">
            <span className="shop-banner-text">
              <Icon id="shopping-bag" size={22} />
              Looking for amazing Mac accessories? Look at our curated products.
            </span>
            <span className="shop-banner-cta">
              Shop now <Icon id="chevron-right" size={18} />
            </span>
          </div>
        </a>
      )}

      <section className="hero hero-home" id="hero">
        <div className="container hero-split">
          <div className="hero-left">
            <div className="hero-badge">
              <div className="dot"></div>
              Available for Mac OS
            </div>
            <h1 className="text-hero">The Excel Shortcuts app,<br/>native on your Mac</h1>
            <p className="hero-subtitle">Make Excel actually work on your Mac, natively. No Parallels, no Boot Camp, no VM, no dual-booting. Just your Windows shortcuts, running for real.</p>
            <div className="hero-ctas">
              <DownloadCTA className="btn btn-primary">
                <Icon id="download" size={20} /> Download .dmg for Mac
              </DownloadCTA>
            </div>
          </div>

          <div className="hero-right">
            <DownloadHeroPanel />
          </div>
        </div>

        <div className="container hero-partners" id="launch-partners">
          <Reveal className="launch-partners-inner">
            <div className="launch-partners-label">Launch Partners</div>
            <div className="launch-partners-marquee">
              <div className="launch-partners-track">
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
                <div className="launch-partners-row" aria-hidden="true">
                  <a
                    href="https://www.tinystartups.com/startup/maccoves-mac-excel-shortcuts"
                    target="_blank"
                    rel="noopener"
                    tabIndex={-1}
                    className="launch-partner-badge"
                  >
                    <svg width="40" height="40" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="tsg2" x1=".1" y1="0" x2=".9" y2="1">
                          <stop offset="0%" stopColor="#3525E6" />
                          <stop offset="55%" stopColor="#D81FE0" />
                          <stop offset="100%" stopColor="#22B8F0" />
                        </linearGradient>
                      </defs>
                      <path d="M50 6C52 32 68 48 94 50C68 52 52 68 50 94C48 68 32 52 6 50C32 48 48 32 50 6Z" fill="url(#tsg2)" />
                    </svg>
                    <span className="launch-partner-badge-text">
                      <span className="launch-partner-badge-eyebrow">Launched on</span>
                      <span className="launch-partner-badge-name">Tiny Startups</span>
                      <span className="launch-partner-badge-url">tinystartups.com</span>
                    </span>
                  </a>
                  <a href="https://openhunts.com" target="_blank" rel="noopener" tabIndex={-1} title="OpenHunts Club">
                    <img
                      alt="OpenHunts Club Member"
                      height="105"
                      src="https://cdn.openhunts.com/badges/club.webp"
                      width="486"
                      className="openhunts-badge"
                    />
                  </a>
                  <a href="https://twelve.tools" target="_blank" rel="noopener" tabIndex={-1} title="Featured on Twelve Tools">
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
                  <a href="https://wired.business" target="_blank" rel="noopener" tabIndex={-1} title="Featured on Wired Business">
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
                    tabIndex={-1}
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
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <section className="ticker-strip" id="features">
        <div className="container">
          <div className="ticker-content">
            <div className="ticker-item">
              <div className="ticker-icon">
                <Icon id="download" size={24} />
              </div>
              <div className="ticker-data">
                <div className="ticker-value"><Counter target={1732} /></div>
                <div className="ticker-label">App Installs</div>
                <div className="ticker-change up">
                  <Icon id="trending-up" size={12} /> <span>12.4%</span> this month
                </div>
              </div>
            </div>
            <div className="ticker-item">
              <div className="ticker-icon">
                <Icon id="zap" size={24} />
              </div>
              <div className="ticker-data">
                <div className="ticker-value"><Counter target={148593} duration={2500} /></div>
                <div className="ticker-label">Shortcuts Used</div>
                <div className="ticker-change up">
                  <Icon id="trending-up" size={12} /> <span>8.7%</span> this week
                </div>
              </div>
            </div>
            <div className="ticker-item">
              <div className="ticker-icon">
                <Icon id="star" size={24} />
              </div>
              <div className="ticker-data">
                <div className="ticker-value">4.9</div>
                <div className="ticker-label">App Store Rating</div>
                <div className="ticker-change up">
                  <Icon id="trending-up" size={12} /> <span>2.1K</span> reviews
                </div>
              </div>
            </div>
            <div className="ticker-item">
              <div className="ticker-icon">
                <Icon id="globe" size={24} />
              </div>
              <div className="ticker-data">
                <div className="ticker-value">156</div>
                <div className="ticker-label">Countries</div>
                <div className="ticker-change up">
                  <Icon id="trending-up" size={12} /> <span>+3</span> this month
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">How It Works</h2>
            <p className="text-body">Get started with Mac Excel Shortcuts in four simple steps. From download to full automation in under 1 minute.</p>
          </Reveal>
          <div className="how-to-steps stagger-children">
            <DownloadCTA className="how-to-step how-to-step-download">
              <div className="how-to-step-number">1</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="download" size={28} />
              </div>
              <div className="how-to-step-title">Download the App</div>
              <div className="how-to-step-desc">Download the DMG directly. Installation takes seconds and requires zero setup.</div>
              <div className="how-to-step-download-cta">Get Started <Icon id="chevron-right" size={16} className="arrow" /></div>
            </DownloadCTA>
            <div className="how-to-step">
              <div className="how-to-step-number">2</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="sliders" size={24} />
              </div>
              <div className="how-to-step-title">Provide permissions</div>
              <div className="how-to-step-desc">We need two permissions, Accessibility to access Excel, and Input Monitoring to connect your keyboard to Excel.</div>
            </div>
            <div className="how-to-step">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="zap" size={24} />
              </div>
              <div className="how-to-step-title">Open Excel and start using</div>
              <div className="how-to-step-desc">Open excel and start using your shortcuts.</div>
            </div>
          </div>
        </div>
      </section>

      {/* <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Top 5 Voted Shortcuts</h2>
            <p className="text-body">The 5 most-requested Windows Excel shortcuts, voted by our users — restored natively on your Mac. Dozens more are covered.</p>
          </Reveal>
          <ShortcutKeysDemo />
          <div className="shortcuts-footer">
            <a href="/blog/mac-excel-shortcuts-covered-list" className="section-link">
              See the full list of shortcuts we cover <Icon id="chevron-right" size={16} className="arrow" />
            </a>
          </div>
          <div className="section-cta">
            <DownloadCTA className="btn btn-primary">
              <Icon id="download" size={20} /> Get Started
            </DownloadCTA>
          </div>
        </div>
      </section> */}

      <section className="section whyus-section" id="vs-vm-solutions">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Mac Excel Shortcuts vs. Parallels vs. Boot Camp</h2>
            <p className="text-body">Running a virtual machine or dual-booting Windows just to use Excel shortcuts is overkill. Mac Excel Shortcuts gets you there without the overhead.</p>
          </Reveal>
          <Reveal className="callout-banner">
            <Icon id="zap" size={22} />
            <div><strong>No VM, no reboot, no Windows license.</strong> Parallels and Boot Camp make Excel work by running Windows itself — Mac Excel Shortcuts makes Excel work by staying native to macOS.</div>
          </Reveal>
          <Reveal className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="comparison-highlight-col">Mac Excel Shortcuts</th>
                  <th>Parallels Desktop</th>
                  <th>Boot Camp</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mapping-action">Runs natively on macOS</td>
                  <td className="comparison-highlight-col comparison-yes"><Icon id="check" size={16} /></td>
                  <td className="comparison-no">Runs a full Windows VM</td>
                  <td className="comparison-no">Boots into Windows instead</td>
                </tr>
                <tr>
                  <td className="mapping-action">Windows license required</td>
                  <td className="comparison-highlight-col comparison-yes">None</td>
                  <td className="comparison-no">Yes, extra cost</td>
                  <td className="comparison-no">Yes, extra cost</td>
                </tr>
                <tr>
                  <td className="mapping-action">RAM &amp; disk overhead</td>
                  <td className="comparison-highlight-col comparison-yes">Minimal — no VM</td>
                  <td className="comparison-no">4–8GB+ RAM, 60GB+ disk</td>
                  <td className="comparison-no">60GB+ dedicated partition</td>
                </tr>
                <tr>
                  <td className="mapping-action">Switch between Mac apps &amp; Excel instantly</td>
                  <td className="comparison-highlight-col comparison-yes"><Icon id="check" size={16} /></td>
                  <td>Partial — still a VM under the hood</td>
                  <td className="comparison-no">No — full reboot required</td>
                </tr>
                <tr>
                  <td className="mapping-action">Setup required</td>
                  <td className="comparison-highlight-col comparison-yes">None — install &amp; go</td>
                  <td>Install hypervisor + Windows + Office</td>
                  <td>Partition drive + install Windows + Office</td>
                </tr>
                <tr>
                  <td className="mapping-action">Price</td>
                  <td className="comparison-highlight-col comparison-yes">$49 one-time or $4.99/mo</td>
                  <td>Subscription + Windows license</td>
                  <td>Free app, but needs Windows + Office license</td>
                </tr>
                <tr>
                  <td className="mapping-action">Get it now</td>
                  <td className="comparison-highlight-col">
                    <DownloadCTA className="comparison-download-btn">
                      <Icon id="download" size={14} /> Download
                    </DownloadCTA>
                  </td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </Reveal>
          <p className="usecases-footnote">Feature availability compared as of this page&apos;s last update — check each vendor&apos;s site for current details.</p>
          <Reveal className="comparison-footer">
            <div className="comparison-footer-title">How the alternatives compare</div>
            <div className="comparison-footer-links">
              <a href="https://www.parallels.com" target="_blank" rel="noopener noreferrer" className="comparison-footer-link">
                Parallels Desktop <span>Full Windows virtualization for Mac — powerful, but you're running an entire second OS just for Excel</span> <Icon id="chevron-right" size={14} className="arrow" />
              </a>
              <a href="https://support.apple.com/boot-camp" target="_blank" rel="noopener noreferrer" className="comparison-footer-link">
                Boot Camp <span>Apple's native dual-boot utility — free, but requires a dedicated partition and a full reboot to use Excel</span> <Icon id="chevron-right" size={14} className="arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section mapping-section" id="shortcut-mapping">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Windows Shortcuts vs. Native Excel on Mac</h2>
            <p className="text-body">Excel on Mac remaps almost every shortcut you know. Here&apos;s what changes by default — and what Mac Excel Shortcuts gives back to you.</p>
          </Reveal>
          <Reveal className="mapping-table-wrap">
            <table className="mapping-table">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Windows shortcut</th>
                  <th>Native Excel on Mac</th>
                  <th>With Mac Excel Shortcuts</th>
                </tr>
              </thead>
              <tbody>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Paste Special</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>V</kbd></span></td>
                  <td><span className="shortcut-keys"><kbd>⌃</kbd><span>+</span><kbd>⌘</kbd><span>+</span><kbd>V</kbd></span></td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">AutoSum</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>=</kbd></span></td>
                  <td><span className="shortcut-keys"><kbd>⇧</kbd><span>+</span><kbd>⌘</kbd><span>+</span><kbd>T</kbd></span></td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Fill Down</td>
                  <td><span className="shortcut-keys"><kbd>Ctrl</kbd><span>+</span><kbd>D</kbd></span></td>
                  <td><span className="shortcut-keys"><kbd>⌘</kbd><span>+</span><kbd>D</kbd></span></td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Freeze Panes</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>W</kbd><span>+</span><kbd>F</kbd><span>+</span><kbd>F</kbd></span></td>
                  <td>View menu only</td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Toggle Filter</td>
                  <td><span className="shortcut-keys"><kbd>Ctrl</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>L</kbd></span></td>
                  <td><span className="shortcut-keys"><kbd>⌘</kbd><span>+</span><kbd>Shift</kbd><span>+</span><kbd>L</kbd></span></td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Sort A to Z</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>A</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>A</kbd></span></td>
                  <td>Data menu only</td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Data Validation</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>A</kbd><span>+</span><kbd>V</kbd><span>+</span><kbd>V</kbd></span></td>
                  <td>Data menu only</td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
                <DownloadTrigger as="tr">
                  <td className="mapping-action">Insert Row</td>
                  <td><span className="shortcut-keys"><kbd>Alt</kbd><span>+</span><kbd>H</kbd><span>+</span><kbd>I</kbd><span>+</span><kbd>R</kbd></span></td>
                  <td>Home menu only</td>
                  <td className="mapping-match"><Icon id="check" size={16} /> Same as Windows</td>
                </DownloadTrigger>
              </tbody>
            </table>
          </Reveal>
          <div className="section-cta">
            <DownloadCTA className="btn btn-primary">
              <Icon id="zap" size={20} /> Enable Windows Shortcuts
            </DownloadCTA>
          </div>
          <Reveal>
            <p className="text-body" style={{ textAlign: 'center', marginTop: '2rem' }}>
              Dig deeper: <a href="/lp/excel-shortcuts-mac">the full Excel shortcuts on Mac list</a>,{' '}
              <a href="/lp/navigation-shortcuts-mac">navigation &amp; data shortcuts</a>, or{' '}
              <a href="/lp/paste-shortcuts-mac">Paste Special shortcuts</a>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section usecases-section" id="use-cases">
        <div className="container">
          <Reveal className="usecases-header">
            <h2 className="text-h2">Built for those who never use a mouse for Excel</h2>
            <p className="text-body">Every habit below is one you keep from Windows — hands on the keys, mouse untouched, the way you have always worked.</p>
            <div className="stat-callout">
              <span>Save an average of <strong>25+ hours a month</strong> on typical power-user Excel workflows*</span>
            </div>
          </Reveal>
          <UsecaseCards />
          <p className="usecases-footnote">*Estimate based on typical power-user Excel workflows over a 22-day working month and the number of ribbon/menu trips a Windows shortcut replaces — actual time saved depends on how you use Excel.</p>
          <div className="section-cta">
            <DownloadCTA className="btn btn-primary">
              <Icon id="zap" size={20} /> Save 25 Hours
            </DownloadCTA>
          </div>
        </div>
      </section>

      <section className="section personas-section" id="who-its-for">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Who Uses Mac Excel Shortcuts app</h2>
            <p className="text-body">Anyone who spent years in Excel on Windows and doesn&apos;t want to lose that speed on a Mac.</p>
          </Reveal>
          <Reveal>
            <PersonaCarousel />
          </Reveal>
        </div>
      </section>

      <section className="section migration-section" id="migrating-to-mac">
        <div className="container">
          <Reveal className="security-highlight">
            <div className="security-highlight-visual migration-visual">
              <Image
                src="/MicrosoftVsAppleV2.webp"
                alt="Windows Excel shortcuts compared to Mac Excel shortcuts"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="security-highlight-content">
              <div className="security-highlight-title">Worried Excel Won&apos;t Work the Same on Mac?</div>
              <div className="security-highlight-desc">Switching from Windows to Mac usually means relearning Excel from scratch — Excel on Mac remaps nearly every shortcut you rely on. Mac Excel Shortcuts fixes that by running your existing Windows shortcuts natively inside Excel on your Mac, so the switch is about the hardware, not your workflow.</div>
              <div className="security-checklist">
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  All your Windows Excel shortcuts work out of the box
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  No relearning — same key combos you already know
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Native macOS app, not an emulator or remote desktop
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Free 7-day trial, no risk to try it on your own files
                </div>
              </div>
              <DownloadCTA className="btn btn-secondary migration-cta">
                Already Migrated? <Icon id="chevron-right" size={16} className="arrow" />
              </DownloadCTA>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section whyus-section" id="why-key-remapper">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Why Not Just Use a Key Remapper?</h2>
            <p className="text-body">Generic remapping tools move key presses around. Mac Excel Shortcuts understands Excel.</p>
          </Reveal>
          <Reveal className="callout-banner">
            <Icon id="zap" size={22} />
            <div><strong>Only Mac Excel Shortcuts works instantly, out of the box.</strong> No profiles, no manual configuration — every other option below requires setup before a single shortcut works.</div>
          </Reveal>
          <Reveal className="comparison-table-wrap">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="comparison-highlight-col">Mac Excel Shortcuts</th>
                  <th>Karabiner-Elements</th>
                  <th>BetterTouchTool</th>
                  <th>Keyboard Maestro</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="mapping-action">Excel-native shortcuts, out of the box</td>
                  <td className="comparison-highlight-col comparison-yes"><Icon id="check" size={16} /></td>
                  <td className="comparison-no"><Icon id="x" size={16} /></td>
                  <td className="comparison-no"><Icon id="x" size={16} /></td>
                  <td className="comparison-no"><Icon id="x" size={16} /></td>
                </tr>
                <tr>
                  <td className="mapping-action">Multi-key Access Key sequences (<kbd>Alt</kbd>,<kbd>E</kbd>,<kbd>S</kbd>,<kbd>V</kbd>)</td>
                  <td className="comparison-highlight-col comparison-yes"><Icon id="check" size={16} /></td>
                  <td className="comparison-no"><Icon id="x" size={16} /></td>
                  <td className="comparison-no"><Icon id="x" size={16} /></td>
                  <td>Possible with manual macros</td>
                </tr>
                <tr>
                  <td className="mapping-action">Setup required</td>
                  <td className="comparison-highlight-col comparison-yes">None — install &amp; go</td>
                  <td>Manual key-map config</td>
                  <td>Manual app-specific config</td>
                  <td>Manual macro building</td>
                </tr>
                <tr>
                  <td className="mapping-action">Free trial</td>
                  <td className="comparison-highlight-col comparison-yes">7 days free</td>
                  <td>Free &amp; open source</td>
                  <td className="comparison-yes"><Icon id="check" size={16} /></td>
                  <td className="comparison-yes"><Icon id="check" size={16} /></td>
                </tr>
                <tr>
                  <td className="mapping-action">Get it now</td>
                  <td className="comparison-highlight-col">
                    <DownloadCTA className="comparison-download-btn">
                      <Icon id="download" size={14} /> Download
                    </DownloadCTA>
                  </td>
                  <td>—</td>
                  <td>—</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </Reveal>
          <p className="usecases-footnote">Feature availability compared as of this page&apos;s last update — check each vendor&apos;s site for current details.</p>
          <Reveal className="comparison-footer">
            <div className="comparison-footer-title">How the alternatives compare</div>
            <div className="comparison-footer-links">
              <a href="https://karabiner-elements.pqrs.org" target="_blank" rel="noopener noreferrer" className="comparison-footer-link">
                Karabiner-Elements <span>Free, open-source system-wide key remapper — no Excel awareness</span> <Icon id="chevron-right" size={14} className="arrow" />
              </a>
              <a href="https://folivora.ai" target="_blank" rel="noopener noreferrer" className="comparison-footer-link">
                BetterTouchTool <span>Gesture &amp; shortcut customizer for macOS — general-purpose, not Excel-specific</span> <Icon id="chevron-right" size={14} className="arrow" />
              </a>
              <a href="https://www.keyboardmaestro.com" target="_blank" rel="noopener noreferrer" className="comparison-footer-link">
                Keyboard Maestro <span>Powerful macro automation tool — requires building your own Excel macros</span> <Icon id="chevron-right" size={14} className="arrow" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* <section className="section reviews-section" id="reviews">
        <div className="container">
          <Reveal className="reviews-header">
            <h2 className="text-h2">Loved by Thousands</h2>
            <p className="text-body">See what our users are saying about MacCove. Real reviews from real people who&apos;ve transformed their workflows.</p>
          </Reveal>
          <div className="reviews-grid stagger-children">
            <div className="review-card glass">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;MacCove completely changed how I use my Mac. I built a morning routine that opens all my apps, sets my focus mode, and starts my playlist. It saves me 15 minutes every single day.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>JM</div>
                <div>
                  <div className="review-name">James Mitchell</div>
                  <div className="review-role">Product Designer, Figma</div>
                </div>
              </div>
            </div>

            <div className="review-card glass-tinted-blue">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;As a developer, I love how MacCove integrates with my entire toolchain. One shortcut compiles my code, runs tests, and sends me a notification. It&apos;s like having a personal assistant.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #11998e, #38ef7d)' }}>SK</div>
                <div>
                  <div className="review-name">Sarah Kim</div>
                  <div className="review-role">iOS Engineer, Apple</div>
                </div>
              </div>
            </div>

            <div className="review-card glass">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;I was skeptical at first, but after using MacCove for a week, I can&apos;t imagine going back. The iPhone integration means my shortcuts work seamlessly between my Mac and phone.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #f093fb, #f5576c)' }}>AR</div>
                <div>
                  <div className="review-name">Alex Rivera</div>
                  <div className="review-role">Content Creator, YouTube</div>
                </div>
              </div>
            </div>

            <div className="review-card glass-tinted-rose">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;The interface is gorgeous — it feels like a native Apple app. But more importantly, the automation capabilities are incredibly powerful. I automated my entire invoicing workflow.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #fa709a, #fee140)' }}>LW</div>
                <div>
                  <div className="review-name">Lisa Wong</div>
                  <div className="review-role">Freelance Consultant</div>
                </div>
              </div>
            </div>

            <div className="review-card glass">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;We deployed MacCove across our entire design team. Everyone has their own shortcuts for exporting assets, resizing images, and organizing files. Productivity went up 40%.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #30cfd0, #330867)' }}>MP</div>
                <div>
                  <div className="review-name">Marcus Patel</div>
                  <div className="review-role">Design Lead, Airbnb</div>
                </div>
              </div>
            </div>

            <div className="review-card glass-tinted-blue">
              <div className="review-stars">
                <Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} /><Icon id="star" size={16} />
              </div>
              <p className="review-text">&quot;I use MacCove to control my smart home from my Mac. One shortcut dims the lights, sets the temperature, and starts my Apple TV. It&apos;s the future of home automation.&quot;</p>
              <div className="review-author">
                <div className="review-avatar" style={{ background: 'linear-gradient(135deg, #a8edea, #fed6e3)' }}>ET</div>
                <div>
                  <div className="review-name">Emma Thompson</div>
                  <div className="review-role">Architect, Smart Home Enthusiast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

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
            {/* <div className="security-card glass">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-blue)' }}>
                <Icon id="lock" size={24} />
              </div>
              <div className="security-card-title">End-to-End Encryption</div>
              <div className="security-card-desc">All shortcut data is encrypted with AES-256 before it ever touches disk. Cloud sync uses TLS 1.3 with certificate pinning.</div>
              <div className="security-card-meta">Learn more <Icon id="chevron-right" size={12} /></div>
            </div> */}
            <div className="security-card glass-tinted-rose">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-rose)' }}>
                <Icon id="x" size={24} />
              </div>
              <div className="security-card-title">Zero Data Collection</div>
              <div className="security-card-desc">We don&apos;t track what you use, sell your data, or run analytics. What you automate is your business — not ours.</div>
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
              <div className="security-card-desc">Every Mac Excel Shortcuts release is scanned and notarized by Apple. No malware, no tampering, no unsigned code ever reaches your Mac.</div>
              <div className="security-card-meta">Verify <Icon id="chevron-right" size={12} /></div>
            </div>
            {/* <div className="security-card glass">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-violet)' }}>
                <Icon id="eye" size={24} />
              </div>
              <div className="security-card-title">Open Source Core</div>
              <div className="security-card-desc">The MacCove engine is open source and auditable by anyone. Security researchers welcome — we even run a bug bounty program.</div>
              <div className="security-card-meta">GitHub <Icon id="chevron-right" size={12} /></div>
            </div> */}
            {/* <div className="security-card glass-tinted-violet">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-purple)' }}>
                <Icon id="search" size={24} />
              </div>
              <div className="security-card-title">Quarterly Audits</div>
              <div className="security-card-desc">Independent security firms audit our codebase every quarter. Results are published transparently in our Security Center.</div>
              <div className="security-card-meta">Reports <Icon id="chevron-right" size={12} /></div>
            </div> */}
          </div>

          {/* <div className="security-highlight glass reveal">
            <div className="security-highlight-visual">
              <span className="icon icon-96 shield-icon" style={{ color: 'white', zIndex: 1, position: 'relative' }}>
                <svg><use href="#i-shield" /></svg>
              </span>
            </div>
            <div className="security-highlight-content">
              <div className="security-highlight-title">Your Shortcuts, Your Rules</div>
              <div className="security-highlight-desc">MacCove is built on a zero-trust architecture. Every action, every variable, every API call is sandboxed and permission-gated. You decide exactly what each shortcut can access.</div>
              <div className="security-checklist">
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Biometric unlock for sensitive shortcuts
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Granular per-shortcut permissions
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Auto-expire shared shortcut links
                </div>
                <div className="security-checklist-item">
                  <div className="check"><Icon id="check" size={12} /></div>
                  Audit log of every shortcut execution
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="section founder-section" id="founder">
        <div className="container">
          <Reveal className="founder-inner">
            <div className="founder-avatar">SS</div>
            <p className="founder-quote">&quot;I built Mac Excel Shortcuts after switching to a MacBook and realizing every Excel shortcut I&apos;d used for a decade was suddenly gone. Relearning Excel felt like the wrong problem to solve — so I built the fix instead.&quot;</p>
            <div className="founder-name">Swagat Sarma</div>
            <div className="founder-role">Founder, MacCove</div>
            <a href="https://x.com/swagatsarma" className="founder-social" title="Twitter" target="_blank" rel="noopener noreferrer">
              <Icon id="x" size={18} />
            </a>
          </Reveal>
        </div>
      </section>

      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="faq-header">
            <h2 className="text-h2">Questions &amp; Answers</h2>
            <p className="text-body">Everything you need to know about Mac Excel Shortcuts. Can&apos;t find what you&apos;re looking for? Reach out to our team — we&apos;re happy to help.</p>
          </Reveal>
          <FAQ showSeeAll />
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

      {merchandise.length > 0 && (
        <section className="pm-section" id="merchandise">
          <div className="container">
            <Reveal className="pm-section-header">
              <div>
                <h2 className="pm-section-title">Gear That Pairs Well</h2>
                <p className="pm-section-subtitle">
                  Curated accessories our community actually uses alongside their MacBook
                  {merchandiseCountryName ? `, available in ${merchandiseCountryName}.` : '.'}
                </p>
              </div>
              <a href="/shop" className="pm-section-link">
                Visit the shop <Icon id="chevron-right" size={16} className="arrow" />
              </a>
            </Reveal>
            <ProductCarousel items={merchandise} />
          </div>
        </section>
      )}

      {latestPosts.length > 0 && (
        <section className="section blog-section" id="blog">
          <div className="container">
            <Reveal className="blog-header">
              <div className="blog-header-left">
                <h2 className="text-h2">From the Blog</h2>
                <p className="text-body">Tips, tutorials, and updates from the MacCove team to help you get the most out of your automation.</p>
              </div>
              <a href="/blog" className="blog-link">
                View all articles
                <Icon id="chevron-right" size={16} className="arrow" />
              </a>
            </Reveal>
            <div className="blog-grid stagger-children">
              {latestPosts.map((post) => (
                <a key={post.id} href={`/blog/${post.slug}`} className="blog-card glass">
                  <div className="blog-image-wrap">
                    {post.featuredImage && (
                      <img
                        className="blog-image"
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        loading="lazy"
                      />
                    )}
                    {post.tag && (
                      <div className="blog-image-overlay">
                        <span className="blog-tag">{post.tag}</span>
                      </div>
                    )}
                  </div>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span>{formatBlogDate(post.date)}</span>
                    </div>
                    <h3 className="blog-title">{post.title}</h3>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <span className="blog-readmore">Read more <Icon id="chevron-right" size={12} /></span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </>
  )
}
