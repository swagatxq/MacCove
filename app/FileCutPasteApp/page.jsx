import Image from 'next/image'
import Icon from '../../components/Icon'
import Reveal from '../../components/Reveal'
import FileCutPasteNav, { APP_STORE_URL } from '../../components/FileCutPasteNav'
import FileCutPasteFooter from '../../components/FileCutPasteFooter'
import { getAllFileCutPasteBlogs } from '../../lib/datocms'
import { formatBlogDate } from '../../lib/format'

export const metadata = {
  title: 'FileCutPaste — Cut & Paste Files on Mac',
  description:
    'Bring Windows-style ⌘X / ⌘V cut & paste to Finder on your Mac. Cut a file, navigate anywhere, paste it in its new home — instantly, and entirely on-device.',
  alternates: { canonical: '/FileCutPasteApp' },
  openGraph: {
    title: 'FileCutPaste — Cut & Paste Files on Mac',
    description:
      'Bring Windows-style ⌘X / ⌘V cut & paste to Finder on your Mac. Cut a file, navigate anywhere, paste it in its new home — instantly, and entirely on-device.',
    url: '/FileCutPasteApp',
  },
}

export const revalidate = 60

export default async function FileCutPasteAppPage() {
  const latestPosts = await getAllFileCutPasteBlogs({ first: 3 })

  const softwareAppJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'FileCutPaste',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'macOS',
    url: 'https://maccove.com/FileCutPasteApp',
    downloadUrl: APP_STORE_URL,
    description: 'Cut and paste files in Finder on Mac using ⌘X / ⌘V, exactly like Windows.',
    offers: [
      { '@type': 'Offer', name: 'Free forever', price: '0', priceCurrency: 'USD', description: 'Free forever with 5 cuts per day.' },
      { '@type': 'Offer', name: 'Monthly subscription', price: '1.99', priceCurrency: 'USD' },
      { '@type': 'Offer', name: 'Yearly subscription', price: '9.99', priceCurrency: 'USD' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd) }} />

      <FileCutPasteNav />

      <section className="hero hero-home" id="hero">
        <div className="container hero-split">
          <div className="hero-left">
            <div className="hero-badge">
              <div className="dot"></div>
              Available on the App Store
            </div>
            <h1 className="text-hero">Cut &amp; Paste Files,<br />Instantly on Mac</h1>
            <p className="hero-subtitle">
              Finally, a working <strong>⌘X</strong> for Finder. Cut a file, navigate anywhere, then <strong>⌘V</strong> to
              drop it in its new home — the muscle memory you already have from Windows, native to macOS.
            </p>
            <div className="hero-ctas">
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <Icon id="download" size={20} /> Get it on the App Store
              </a>
            </div>
          </div>

          <div className="hero-right">
            <Reveal className="filecutpaste-hero-image">
              <Image
                src="/FileCutPaste-AppStore-Hero.png"
                alt="FileCutPaste app showing ⌘X to cut and ⌘V to paste files on Mac"
                width={2880}
                height={1800}
                style={{ width: '100%', height: 'auto', display: 'block' }}
                priority
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="how-it-works">
        <div className="container">
          <Reveal className="how-to-header">
            <h2 className="text-h2">How It Works</h2>
            <p className="text-body">Three steps, and you never have to relearn how to move a file on Mac again.</p>
          </Reveal>
          <div className="how-to-steps stagger-children">
            <div className="how-to-step">
              <div className="how-to-step-number">1</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="copy" size={24} />
              </div>
              <div className="how-to-step-title">Select &amp; Cut</div>
              <div className="how-to-step-desc">Select any file in Finder and press ⌘X, just like you would on Windows.</div>
            </div>
            <div className="how-to-step">
              <div className="how-to-step-number">2</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="search" size={24} />
              </div>
              <div className="how-to-step-title">Navigate Anywhere</div>
              <div className="how-to-step-desc">Browse to any folder, drive, or window — the cut stays queued in the background.</div>
            </div>
            <div className="how-to-step">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="zap" size={24} />
              </div>
              <div className="how-to-step-title">Paste to Move</div>
              <div className="how-to-step-desc">Press ⌘V. Finder does the actual move — the file lands in its new home instantly.</div>
            </div>
          </div>
          <div className="section-cta">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Icon id="download" size={20} /> Download FileCutPaste
            </a>
          </div>
        </div>
      </section>

      <section className="section security-section" id="security">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Security &amp; Privacy</h2>
            <p className="text-body">Your files never leave your Mac.</p>
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
              <div className="security-card-desc">We don&apos;t read your files or upload them anywhere. FileCutPaste only tells Finder what to move.</div>
            </div>
            <div className="security-card glass">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-green)' }}>
                <Icon id="monitor" size={24} />
              </div>
              <div className="security-card-title">Finder Does the Move</div>
              <div className="security-card-desc">FileCutPaste never touches your file contents — it drives Finder&apos;s own move operation, on-device, every time.</div>
            </div>
            <div className="security-card glass-tinted-blue">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-cyan)' }}>
                <Icon id="check-circle" size={24} />
              </div>
              <div className="security-card-title">Apple Notarized</div>
              <div className="security-card-desc">Every FileCutPaste release is scanned and notarized by Apple. No malware, no tampering, no unsigned code.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section whyus-section" id="pricing">
        <div className="container">
          <Reveal className="security-header">
            <h2 className="text-h2">Free Forever, or Go Unlimited</h2>
            <p className="text-body">5 cuts per day, free forever. Need more? Go unlimited for $1.99/month or $9.99/year, managed entirely through the App Store.</p>
          </Reveal>
          <Reveal className="callout-banner">
            <Icon id="zap" size={22} />
            <div><strong>No trial period to worry about.</strong> Use your 5 free cuts every day for as long as you like — subscribe only when you&apos;re ready for unlimited.</div>
          </Reveal>
        </div>
      </section>

      {latestPosts.length > 0 && (
        <section className="section blog-section" id="blog">
          <div className="container">
            <Reveal className="blog-header">
              <div className="blog-header-left">
                <h2 className="text-h2">From the Blog</h2>
                <p className="text-body">Guides and tips for moving files on your Mac the way you did on Windows.</p>
              </div>
              <a href="/FileCutPasteApp/blog" className="blog-link">
                View all articles
                <Icon id="chevron-right" size={16} className="arrow" />
              </a>
            </Reveal>
            <div className="blog-grid stagger-children">
              {latestPosts.map((post) => (
                <a key={post.id} href={`/FileCutPasteApp/blog/${post.slug}`} className="blog-card glass">
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

      <section className="section founder-section" id="support">
        <div className="container">
          <Reveal className="founder-inner">
            <div className="founder-avatar" style={{ background: 'var(--apple-blue)' }}>
              <Icon id="mail" size={22} />
            </div>
            <p className="founder-quote">Have a question, a bug to report, or feedback on FileCutPaste? We read every email.</p>
            <a href="mailto:support@maccove.com" className="btn btn-primary" style={{ marginTop: 'var(--space-6)' }}>
              <Icon id="mail" size={18} /> support@maccove.com
            </a>
          </Reveal>
        </div>
      </section>

      <FileCutPasteFooter />
    </>
  )
}
