import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import Reveal from '../../components/Reveal';
import Icon from '../../components/Icon';
import { getBrandAffiliates } from '../../lib/datocms';
import { getBrandPrimaryLink } from '../../lib/format';

export const metadata = {
  title: 'Brand Affiliates',
  description: 'Brands we partner with and recommend to the MacCove community.',
  alternates: { canonical: '/brand-affiliates' },
};

export const revalidate = 60;

export default async function BrandAffiliatesPage() {
  const brands = await getBrandAffiliates();

  return (
    <>
      <NavBar />
      <section className="section brand-section" id="brand-affiliates">
        <div className="container">
          <Reveal className="brand-header">
            <div className="brand-header-left">
              <h1 className="text-h1">Brand Affiliates</h1>
              <p className="text-body">Brands we partner with and recommend to the MacCove community.</p>
            </div>
          </Reveal>
          <div className="brand-grid stagger-children">
            {brands.map((brand) => {
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
      <Footer />
    </>
  );
}
