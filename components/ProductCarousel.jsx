'use client';
import { useRef } from 'react';
import Icon from './Icon';

export default function ProductCarousel({ items }) {
  const trackRef = useRef(null);

  const scrollByCard = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.pm-card');
    const amount = card ? card.getBoundingClientRect().width + 20 : 320;
    track.scrollBy({ left: direction * amount, behavior: 'smooth' });
  };

  return (
    <div className="pm-carousel">
      <div className="pm-carousel-track" ref={trackRef}>
        {items.map((item) => (
          <a key={item.id} href={`/shop/${item.slug}`} className="pm-card">
            <div className="pm-card-image-wrap">
              {item.photo && (
                <img className="pm-card-image" src={item.photo.url} alt={item.photo.alt || item.title} loading="lazy" />
              )}
              {item.category && <span className="pm-card-category">{item.category}</span>}
            </div>
            <div className="pm-card-content">
              {item.customerRating && (
                <div className="pm-card-stars" aria-label={`${item.customerRating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon key={i} id="star" size={13} className={i < item.customerRating ? 'star-filled' : 'star-empty'} />
                  ))}
                </div>
              )}
              <h3 className="pm-card-title">{item.marketingTitle || item.title}</h3>
              {item.marketingTitle && <p className="pm-card-subtitle">{item.title}</p>}
              <span className="pm-card-link">
                Shop now <Icon id="chevron-right" size={13} />
              </span>
            </div>
          </a>
        ))}
      </div>
      {items.length > 1 && (
        <div className="pm-carousel-controls">
          <button className="pm-carousel-btn" onClick={() => scrollByCard(-1)} aria-label="Previous">
            <Icon id="chevron-right" size={18} className="pm-carousel-btn-icon-prev" />
          </button>
          <button className="pm-carousel-btn" onClick={() => scrollByCard(1)} aria-label="Next">
            <Icon id="chevron-right" size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
