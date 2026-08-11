import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Icon from '../../components/Icon';
import Reveal from '../../components/Reveal';
import FAQ from '../../components/FAQ';
import { faqCategories, faqs } from '../../lib/faqs';

export const metadata = {
  title: 'Frequently Asked Questions',
  description: 'Everything you need to know about Mac Excel Shortcuts — installation, pricing, licensing, privacy, and support.',
  alternates: { canonical: '/faq' },
};

export default function FAQPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <NavBar />
      <section className="section faq-page-section">
        <div className="container">
          <div className="legal-content faq-page-content">
            <h1 className="text-h1">Frequently Asked Questions</h1>
            <p className="faq-page-intro">
              Everything you need to know about Mac Excel Shortcuts — installation, pricing, licensing, privacy, and
              support. Can&apos;t find what you&apos;re looking for?{' '}
              <a href="mailto:support@maccove.com">Email us</a>.
            </p>
          </div>
          {faqCategories.map((group) => (
            <div className="faq-category" key={group.category}>
              <Reveal>
                <h2 className="text-h3 faq-category-title">{group.category}</h2>
              </Reveal>
              <FAQ items={group.items} />
            </div>
          ))}
          <div className="faq-page-footer-cta">
            <Icon id="mail" size={20} />
            <span>Still have questions? <a href="mailto:support@maccove.com">support@maccove.com</a></span>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
