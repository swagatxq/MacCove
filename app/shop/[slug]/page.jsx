import { notFound } from 'next/navigation';
import NavBar from '../../../components/NavBar';
import Footer from '../../../components/Footer';
import Icon from '../../../components/Icon';
import ShopDetailMedia from '../../../components/ShopDetailMedia';
import ShopDetailGallery from '../../../components/ShopDetailGallery';
import AmazonBuyButton from '../../../components/AmazonBuyButton';
import ShopListings from '../../../components/ShopListings';
import { getAllMerchandiseSlugs, getMerchandiseBySlug, getMerchandisePage } from '../../../lib/datocms';
import { getCountryFlag, getCountryName } from '../../../lib/countries';
import { renderRichText, plainText } from '../../../lib/richtext';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getAllMerchandiseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const item = await getMerchandiseBySlug(params.slug);
  if (!item) return {};
  const description = plainText(item.description);
  const pageTitle = item.marketingTitle ? `${item.marketingTitle} — ${item.title}` : item.title;
  return {
    title: pageTitle,
    description,
    alternates: { canonical: `/shop/${item.slug}` },
    openGraph: {
      title: `${pageTitle} — MacCove Shop`,
      description,
      url: `/shop/${item.slug}`,
      type: 'website',
      images: item.photo ? [{ url: item.photo.url, width: item.photo.width, height: item.photo.height, alt: item.photo.alt || item.title }] : undefined,
    },
  };
}

const RELATED_PAGE_SIZE = 6;

export default async function ShopDetailPage({ params }) {
  const [item, relatedPage] = await Promise.all([
    getMerchandiseBySlug(params.slug),
    getMerchandisePage({ first: RELATED_PAGE_SIZE, skip: 0, excludeSlug: params.slug }),
  ]);
  if (!item) notFound();

  const narrativeHtml = renderRichText(item.whyMacUsers);

  return (
    <>
      <NavBar />
      <section className="shop-page shop-detail-page">
        <div className="container shop-detail">
          <a href="/shop" className="shop-detail-back">
            <Icon id="chevron-right" size={14} className="shop-detail-back-arrow" /> Back to the Shop
          </a>

          <div className="shop-detail-header">
            <div className="shop-detail-header-meta">
              {item.category && <span className="shop-listing-category shop-detail-category">{item.category}</span>}
              {item.country && (
                <span className="shop-detail-country">{getCountryFlag(item.country)} {getCountryName(item.country)}</span>
              )}
            </div>
            <h1 className="shop-detail-title">{item.marketingTitle || item.title}</h1>
            {item.marketingTitle && <p className="shop-detail-subtitle">{item.title}</p>}
            {item.customerRating && (
              <div className="shop-listing-stars" aria-label={`${item.customerRating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Icon key={i} id="star" size={18} className={i < item.customerRating ? 'star-filled' : 'star-empty'} />
                ))}
              </div>
            )}
          </div>

          <div className="shop-detail-quick-row">
            <div className="shop-detail-lede" dangerouslySetInnerHTML={{ __html: renderRichText(item.description) }} />
            <AmazonBuyButton affiliateLink={item.affiliateLink} title={item.title} className="shop-detail-buy" />
          </div>

          <ShopDetailMedia photo={item.photo} videoUrl={item.videoUrl} title={item.title} />

          <ShopDetailGallery gallery={item.gallery} title={item.title} />

          <div className="shop-detail-article">
            {narrativeHtml && (
              <div className="shop-detail-narrative">
                <h2>Why Mac users love this</h2>
                <div dangerouslySetInnerHTML={{ __html: narrativeHtml }} />
              </div>
            )}

            {item.customerReview && (
              <blockquote
                className="shop-listing-review shop-detail-review"
                dangerouslySetInnerHTML={{ __html: renderRichText(item.customerReview) }}
              />
            )}
          </div>
        </div>

        {relatedPage.items.length > 0 && (
          <div className="container shop-detail-related">
            <h2 className="shop-detail-related-title">You might also like</h2>
            <ShopListings
              initialItems={relatedPage.items}
              initialTotal={relatedPage.total}
              excludeSlug={item.slug}
              hideControls
            />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
