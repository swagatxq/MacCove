'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import ShopListingMedia from './ShopListingMedia';
import AmazonBuyButton from './AmazonBuyButton';
import { renderRichText } from '../lib/richtext';

const ALL = 'all';
const PAGE_SIZE = 6;

export default function ShopListings({ initialItems, initialTotal, categories = [], excludeSlug, hideControls = false }) {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [total, setTotal] = useState(initialTotal);
  const [category, setCategory] = useState(ALL);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);
  const sentinelRef = useRef(null);

  // Debounce the search box before it hits the API.
  useEffect(() => {
    const t = setTimeout(() => setSearch(searchInput.trim()), 350);
    return () => clearTimeout(t);
  }, [searchInput]);

  const fetchPage = useCallback(async (skip, { replace }) => {
    const myRequest = ++requestId.current;
    setLoading(true);
    const params = new URLSearchParams({ skip: String(skip), first: String(PAGE_SIZE) });
    if (category !== ALL) params.set('category', category);
    if (search) params.set('q', search);
    if (excludeSlug) params.set('exclude', excludeSlug);

    try {
      const res = await fetch(`/api/shop?${params.toString()}`);
      const data = await res.json();
      if (myRequest !== requestId.current) return; // a newer filter/search superseded this request
      setItems((prev) => (replace ? data.items : [...prev, ...data.items]));
      setTotal(data.total);
    } finally {
      if (myRequest === requestId.current) setLoading(false);
    }
  }, [category, search, excludeSlug]);

  // Filters or search changed — reset and refetch page 1 from the server so the
  // whole catalog is searchable, not just whatever's been scrolled into memory.
  useEffect(() => {
    fetchPage(0, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, search]);

  const hasMore = items.length < total;

  useEffect(() => {
    if (!sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchPage(items.length, { replace: false });
        }
      },
      { rootMargin: '600px 0px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [fetchPage, hasMore, loading, items.length]);

  return (
    <>
      {!hideControls && (
        <>
          <div className="shop-search">
            <span className="shop-search-icon"><Icon id="search" size={18} /></span>
            <input
              type="text"
              className="shop-search-input"
              placeholder="Search products…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>

          <div className="shop-filters">
            <div className="shop-filter-group">
              <span className="shop-filter-label"><Icon id="filter" size={13} /> Category</span>
              <div className="shop-filter-pills">
                <button className={`shop-pill ${category === ALL ? 'active' : ''}`} onClick={() => setCategory(ALL)}>All</button>
                {categories.map((c) => (
                  <button key={c} className={`shop-pill ${category === c ? 'active' : ''}`} onClick={() => setCategory(c)}>{c}</button>
                ))}
              </div>
            </div>
          </div>

          {total > 0 && <p className="shop-catalog-count">{total} product{total === 1 ? '' : 's'}</p>}
        </>
      )}

      {items.length === 0 && !loading ? (
        <div className="shop-empty">No products match those filters yet — try another combination.</div>
      ) : (
        <div className="shop-listings">
          {items.map((item, i) => (
            <div
              key={item.id}
              className={`shop-listing shop-listing-clickable ${i % 2 === 1 ? 'reverse' : ''}`}
              onClick={() => item.slug && router.push(`/shop/${item.slug}`)}
            >
              <ShopListingMedia item={item} />
              <div className="shop-listing-content">
                {item.customerRating && (
                  <div className="shop-listing-stars" aria-label={`${item.customerRating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Icon key={si} id="star" size={16} className={si < item.customerRating ? 'star-filled' : 'star-empty'} />
                    ))}
                  </div>
                )}
                <h2 className="shop-listing-title">{item.marketingTitle || item.title}</h2>
                {item.marketingTitle && <p className="shop-listing-subtitle">{item.title}</p>}
                <div className="shop-listing-desc" dangerouslySetInnerHTML={{ __html: renderRichText(item.description) }} />
                {item.customerReview && (
                  <div className="shop-listing-review" dangerouslySetInnerHTML={{ __html: renderRichText(item.customerReview) }} />
                )}
                <div className="shop-listing-actions">
                  <AmazonBuyButton affiliateLink={item.affiliateLink} title={item.title} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && <div className="shop-loading-more">Loading more…</div>}
      <div ref={sentinelRef} className="shop-load-sentinel" />
    </>
  );
}
