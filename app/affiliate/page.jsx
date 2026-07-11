import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';
import Reveal from '../../components/Reveal';

export const metadata = {
  title: 'Affiliate Program — Earn Commission Promoting MacCove',
  description:
    'Join the MacCove affiliate program and earn uncapped commission promoting Mac Excel Shortcuts and future MacCove apps. Get a custom promo code, give your audience up to 50% off, and get paid monthly.',
  alternates: { canonical: '/affiliate' },
  openGraph: {
    title: 'MacCove Affiliate Program — Earn Commission Promoting Mac Productivity Apps',
    description:
      'Get a custom promo code, give your audience up to 50% off, and earn uncapped commission on every sale as a MacCove affiliate.',
    url: '/affiliate',
  },
};

export default function AffiliatePage() {
  return (
    <>
      <NavBar />

      <section className="affiliate-hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <div className="dot"></div>
              Affiliate Program &middot; Applications Open
            </div>
            <h1 className="text-hero">Earn With Every<br />Mac You Help Upgrade</h1>
            <p className="hero-subtitle">
              Become a MacCove affiliate and earn uncapped commission promoting Mac Excel Shortcuts
              and the productivity apps we&apos;re building next. Get your own promo code, hand your
              audience a real discount, and get paid every month.
            </p>
            <br></br>
            <div className="hero-ctas">
              <a href="#apply" className="btn btn-primary">
                <Icon id="user" size={20} /> Apply to Become an Affiliate
              </a>
              <a href="#how-it-works" className="btn btn-secondary">
                How It Works
              </a>
            </div>
          </div>

          <div className="affiliate-stats">
            <div className="affiliate-stat">
              <div className="affiliate-stat-value">50%</div>
              <div className="affiliate-stat-label">Max discount for your audience</div>
            </div>
            <div className="affiliate-stat">
              <div className="affiliate-stat-value">No cap</div>
              <div className="affiliate-stat-label">On commission you can earn</div>
            </div>
            <div className="affiliate-stat">
              <div className="affiliate-stat-value">Monthly</div>
              <div className="affiliate-stat-label">Payouts, moving to 15 days</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about-maccove">
        <div className="container">
          <Reveal className="affiliate-section-header">
            <span className="affiliate-section-eyebrow">What is MacCove?</span>
            <h2 className="text-h2">Productivity Apps, Built for the Mac</h2>
            <p className="text-body">
              MacCove is where productivity apps for MacBook get built. Our flagship product,
              Mac Excel Shortcuts, lets Microsoft Excel users run the Windows Excel shortcuts they
              already know natively on their Mac &mdash; no relearning required. MacCove.com is evolving
              into a single destination for everything work-related on a MacBook, with a growing
              product lineup for our users and affiliates to promote.
            </p>
          </Reveal>

          <div className="product-lineup-grid stagger-children">
            <div className="glass product-lineup-card">
              <div className="product-lineup-icon">
                <Icon id="command" size={28} />
              </div>
              <div>
                <div className="product-lineup-title">
                  Mac Excel Shortcuts
                  <span className="product-lineup-badge">Live</span>
                </div>
                <p className="product-lineup-desc">
                  Run the Windows Excel shortcuts you already know, natively on your Mac. Our flagship product, available today.
                </p>
              </div>
            </div>
            <div className="glass product-lineup-card is-upcoming">
              <div className="product-lineup-icon">
                <Icon id="zap" size={28} />
              </div>
              <div>
                <div className="product-lineup-title">
                  New MacCove Products
                  <span className="product-lineup-badge is-soon">Coming Soon</span>
                </div>
                <p className="product-lineup-desc">
                  More productivity apps for the MacBook are in our pipeline &mdash; more products for you to promote and earn from.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="how-it-works">
        <div className="container">
          <Reveal className="affiliate-section-header">
            <span className="affiliate-section-eyebrow">The Affiliate Program</span>
            <h2 className="text-h2">How the MacCove Affiliate Program Works</h2>
            <p className="text-body">
              A simple, transparent partnership: you bring the audience, we bring the product and the payout.
            </p>
          </Reveal>

          <div className="security-grid stagger-children">
            <div className="security-card glass">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-blue)' }}>
                <Icon id="hash" size={24} />
              </div>
              <div className="security-card-title">Your Own Promo Code</div>
              <div className="security-card-desc">
                Every affiliate gets a unique promo code to share with their community or customers, unlocking an instant
                discount of up to 50% on available plans.
              </div>
            </div>
            <div className="security-card glass-tinted-blue">
              <div className="security-icon-wrap" style={{ background: 'var(--accent-violet)' }}>
                <Icon id="trending-up" size={24} />
              </div>
              <div className="security-card-title">Uncapped Commission</div>
              <div className="security-card-desc">
                Earn commission on every payment your promo code generates for MacCove products. There is no ceiling on
                how much you can earn.
              </div>
            </div>
            <div className="security-card glass-tinted-violet">
              <div className="security-icon-wrap" style={{ background: 'var(--apple-green)' }}>
                <Icon id="globe" size={24} />
              </div>
              <div className="security-card-title">Free Traffic, As a Listed Partner</div>
              <div className="security-card-desc">
                Approved affiliates are listed as MacCove partners, sending qualified traffic your way in addition to
                the customers you already bring.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="partners">
        <div className="container">
          <Reveal className="affiliate-section-header">
            <span className="affiliate-section-eyebrow">Brand Partners</span>
            <h2 className="text-h2">Get Featured Across MacCove</h2>
            <p className="text-body">
              Affiliates promoting MacCove.com get showcased right here &mdash; on Twitter, YouTube, or your own
              website. Here&apos;s what a partner listing looks like.
            </p>
          </Reveal>

          <div className="partner-grid stagger-children">
            <div className="glass partner-card">
              <div className="partner-card-media">
                <div className="partner-card-platform"><Icon id="x" size={14} /> Twitter</div>
                <Icon id="user" size={40} className="partner-card-play" />
              </div>
              <div className="partner-card-body">
                <div className="partner-card-name">@YourHandle</div>
                <p className="partner-card-desc">
                  A screenshot or post promoting MacCove.com, with your redirect link, name, and a short description of your content.
                </p>
                <span className="partner-card-link">Visit profile <Icon id="chevron-right" size={12} /></span>
              </div>
            </div>
            <div className="glass partner-card">
              <div className="partner-card-media">
                <div className="partner-card-platform"><Icon id="play" size={14} /> YouTube</div>
                <Icon id="play" size={40} className="partner-card-play" />
              </div>
              <div className="partner-card-body">
                <div className="partner-card-name">Your Channel Name</div>
                <p className="partner-card-desc">
                  A video thumbnail linking to your review or tutorial featuring MacCove.com, with your redirect link and description.
                </p>
                <span className="partner-card-link">Watch video <Icon id="chevron-right" size={12} /></span>
              </div>
            </div>
            <div className="glass partner-card">
              <div className="partner-card-media">
                <div className="partner-card-platform"><Icon id="globe" size={14} /> Website</div>
                <Icon id="monitor" size={40} className="partner-card-play" />
              </div>
              <div className="partner-card-body">
                <div className="partner-card-name">yourwebsite.com</div>
                <p className="partner-card-desc">
                  A screenshot of your site featuring MacCove.com, with your redirect link, name, and description.
                </p>
                <span className="partner-card-link">Visit site <Icon id="chevron-right" size={12} /></span>
              </div>
            </div>
          </div>

          <div className="affiliate-callout">
            <div className="affiliate-callout-icon">
              <Icon id="award" size={20} />
            </div>
            <div>
              <div className="affiliate-callout-title">This could be your listing</div>
              <div className="affiliate-callout-desc">
                Apply below and once approved, send us your screenshot or video thumbnail, redirect link, name, and
                description &mdash; we&apos;ll feature you as a MacCove partner.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section how-to-section" id="signup">
        <div className="container">
          <Reveal className="affiliate-section-header">
            <span className="affiliate-section-eyebrow">Getting Started</span>
            <h2 className="text-h2">How to Sign Up</h2>
            <p className="text-body">From application to your first payout in three simple steps.</p>
          </Reveal>
          <div className="how-to-steps stagger-children">
            <div className="how-to-step glass">
              <div className="how-to-step-number">1</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="file-text" size={24} />
              </div>
              <div className="how-to-step-title">Apply</div>
              <div className="how-to-step-desc">Use the form below to tell us about yourself and where you&apos;ll be promoting MacCove.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">2</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="hash" size={24} />
              </div>
              <div className="how-to-step-title">Get Your Code</div>
              <div className="how-to-step-desc">Our team will get back to you with your commission structure and your unique promo code.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">3</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="trending-up" size={24} />
              </div>
              <div className="how-to-step-title">Start Earning</div>
              <div className="how-to-step-desc">Promote our products to your audience and start earning revenue on every sale.</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="payouts">
        <div className="container">
          <Reveal className="affiliate-section-header">
            <span className="affiliate-section-eyebrow">Getting Paid</span>
            <h2 className="text-h2">When Do You Get Paid?</h2>
            <p className="text-body">A predictable, transparent payout cycle every month.</p>
          </Reveal>
          <div className="how-to-steps stagger-children" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            <div className="how-to-step glass">
              <div className="how-to-step-number">1</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="bar-chart" size={24} />
              </div>
              <div className="how-to-step-title">Monthly Statement</div>
              <div className="how-to-step-desc">Our team shares a detailed earnings file with you at the end of every month.</div>
            </div>
            <div className="how-to-step glass">
              <div className="how-to-step-number">2</div>
              <div className="how-to-step-icon-wrap">
                <Icon id="check-circle" size={24} />
              </div>
              <div className="how-to-step-title">Fast Payout</div>
              <div className="how-to-step-desc">If there are no deviations, your payout is processed by the 7th of every month.</div>
            </div>
          </div>

          <div className="affiliate-callout">
            <div className="affiliate-callout-icon">
              <Icon id="zap" size={20} />
            </div>
            <div>
              <div className="affiliate-callout-title">We&apos;re getting faster</div>
              <div className="affiliate-callout-desc">
                We&apos;re working hard to get to 15-day payout cycles for our affiliates &mdash; so you get paid sooner
                for the customers you bring in.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="apply">
        <div className="container">
          <Reveal>
            <iframe
                src="https://app.youform.com/forms/ajz7gvid"
                title="MacCove Affiliate Application Form"
                className="affiliate-form-embed"
                loading="lazy"
              />
          </Reveal>
        </div>
      </section>

      <section className="affiliate-cta-section">
        <div className="container">
          <h2 className="text-h2">Ready to start earning?</h2>
          <p className="text-body">Join the MacCove affiliate program today and turn your audience into revenue.</p>
          <a href="#apply" className="btn btn-primary">
            <Icon id="user" size={20} /> Sign Up as an Affiliate Now
          </a>
        </div>
      </section>

      <Footer />
    </>
  );
}
