'use client';
import { useEffect, useState } from 'react';
import Icon from './Icon';
import InlineVideo from './InlineVideo';
import { getYoutubeVideoId } from '../lib/format';

const SLIDE_DURATION = 7000;

export default function ShopHeroCarousel({ items }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || items.length <= 1) return;
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % items.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, items.length]);

  if (items.length === 0) return null;

  return (
    <div
      className="shop-hero-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {items.map((item, i) => {
        const videoId = getYoutubeVideoId(item.videoUrl);
        const isActive = i === active;
        return (
          <div key={item.id} className={`shop-hero-slide ${isActive ? 'is-active' : ''}`}>
            <InlineVideo videoId={videoId} active={isActive} title={item.title} className="shop-hero-slide-video" />
            <div className="shop-hero-slide-scrim" />
          </div>
        );
      })}

      <div className="shop-hero-carousel-content">
        <div className="shop-hero-eyebrow">Curated for your MacBook</div>
        <h1 className="shop-hero-headline">The MacCove Shop</h1>
        <p className="shop-hero-tagline">{items[active].marketingTitle || items[active].title}</p>
        <a href={`/shop/${items[active].slug}`} className="shop-hero-cta">
          Shop this pick <Icon id="chevron-right" size={16} />
        </a>
      </div>

      {items.length > 1 && (
        <div className="shop-hero-dots">
          {items.map((item, i) => (
            <button
              key={item.id}
              className={`shop-hero-dot ${i === active ? 'is-active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Show ${item.title}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
