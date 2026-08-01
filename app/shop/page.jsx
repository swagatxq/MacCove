import NavBar from '../../components/NavBar';
import Footer from '../../components/Footer';
import ShopHeroCarousel from '../../components/ShopHeroCarousel';
import ShopListings from '../../components/ShopListings';
import { getMerchandiseWithVideo, getMerchandiseFacets, getMerchandisePage } from '../../lib/datocms';

export const metadata = {
  title: 'Shop',
  description: 'Curated physical products that pair perfectly with your MacBook — hand-picked and reviewed by the MacCove community.',
  alternates: { canonical: '/shop' },
};

export const revalidate = 60;

const INITIAL_PAGE_SIZE = 6;

export default async function ShopPage() {
  const [heroItems, { categories }, firstPage] = await Promise.all([
    getMerchandiseWithVideo({ first: 5 }),
    getMerchandiseFacets(),
    getMerchandisePage({ skip: 0, first: INITIAL_PAGE_SIZE }),
  ]);

  return (
    <>
      <NavBar />
      <section className="shop-page">
        <ShopHeroCarousel items={heroItems.length > 0 ? heroItems : firstPage.items.slice(0, 5)} />
        <div className="container shop-main">
          <div className="shop-main-header">
            <h2 className="shop-main-title">Gear worth carrying</h2>
            <p className="shop-main-subtitle">
              Every product here is hand-picked and reviewed by the MacCove community — tap play to see it in action.
            </p>
          </div>
          <ShopListings
            initialItems={firstPage.items}
            initialTotal={firstPage.total}
            categories={categories}
          />
        </div>
      </section>
      <Footer />
    </>
  );
}
