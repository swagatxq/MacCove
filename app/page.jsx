import Image from 'next/image'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import Counter from '../components/Counter'
import FAQ from '../components/FAQ'
import Reveal from '../components/Reveal'
import Icon from '../components/Icon'
import { getAllBlogPosts } from '../lib/datocms'
import { formatBlogDate } from '../lib/format'

export const revalidate = 60

export const metadata = {
  alternates: { canonical: '/' },
}

export default async function Home() {
  const latestPosts = await getAllBlogPosts({ first: 3 })

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
            <h1 className="text-hero">Mac Excel<br/>Shortcuts</h1>
            <p className="hero-subtitle">Run Windows excel shortcuts on Mac, and get native Windows experience on Mac. Get your work done fast.</p>
            <div className="hero-ctas">
              <a href="/download" className="btn btn-primary">
                <Icon id="download" size={20} /> Download .dmg for Mac
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
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="ticker-strip" id="features">
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
            {/* <div className="ticker-item">
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
            </div> */}
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="how-to-use">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">How It Works</h2>
            <p className="text-body">Get started with Mac Excel Shortcuts in four simple steps. From download to full automation in under 1 minute.</p>
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
              <div className="how-to-step-title">Provide permissions</div>
              <div className="how-to-step-desc">We need two permissions, Accessibility to access Excel, and Input Monitoring to connect your keyboard to Excel.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="zap" size={24} />
              </div>
              <div className="how-to-step-title">Open Excel and start using</div>
              <div className="how-to-step-desc">Open excel and start using your shortcuts.</div>
            </div>
            {/* <div className="how-to-step glass">
              <div className="how-to-step-number">4</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="cloud" size={24} />
              </div>
              <div className="how-to-step-title">Sync Everywhere</div>
              <div className="how-to-step-desc">Your shortcuts sync across Mac, iPhone, and iPad via iCloud. Pick up exactly where you left off on any device.</div>
            </div> */}
          </div>
        </div>
      </section>

      <section className="section shortcuts-section" id="shortcuts">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">Top 5 Excel Shortcuts</h2>
            <p className="text-body">The Windows Excel shortcuts you already know, now working natively on your Mac.</p>
          </Reveal>
          <div className="security-grid stagger-children">
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>V</kbd>
              </div>
              <div className="security-card-title">Paste Special</div>
              <div className="security-card-desc">Paste values, formulas, or formatting only — without carrying over the rest of the copied cell.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>E</kbd><span>+</span><kbd>S</kbd><span>+</span><kbd>T</kbd>
              </div>
              <div className="security-card-title">Paste Special (Formats)</div>
              <div className="security-card-desc">Paste only the formatting from the copied cell, leaving its values and formulas behind.</div>
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
                <kbd>Alt</kbd><span>+</span><kbd>Enter</kbd>
              </div>
              <div className="security-card-title">New Line in Cell</div>
              <div className="security-card-desc">Start a new line within the same cell instead of moving to the next one.</div>
            </div>
            <div className="security-card glass">
              <div className="shortcut-keys">
                <kbd>Alt</kbd><span>+</span><kbd>H</kbd><span>+</span><kbd>O</kbd><span>+</span><kbd>I</kbd>
              </div>
              <div className="security-card-title">AutoFit Column Width</div>
              <div className="security-card-desc">Resize the selected columns to fit their contents automatically.</div>
            </div>
          </div>
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
              <div className="security-card-desc">Every MacCove release is scanned and notarized by Apple. No malware, no tampering, no unsigned code ever reaches your Mac.</div>
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

      <section className="section faq-section" id="faq">
        <div className="container">
          <Reveal className="faq-header">
            <h2 className="text-h2">Questions &amp; Answers</h2>
            <p className="text-body">Everything you need to know about Mac Excel Shortcuts. Can&apos;t find what you&apos;re looking for? Reach out to our team — we&apos;re happy to help.</p>
          </Reveal>
          <FAQ />
        </div>
      </section>

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
