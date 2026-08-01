'use client';
import { useState } from 'react';
import Icon from './Icon';
import VideoLightbox from './VideoLightbox';
import { getCountryFlag, getCountryName } from '../lib/countries';
import { getYoutubeVideoId } from '../lib/format';

export default function ShopListingMedia({ item }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYoutubeVideoId(item.videoUrl);

  return (
    <div className="shop-listing-media">
      {item.photo && (
        <img
          className="shop-listing-image"
          src={item.photo.url}
          alt={item.photo.alt || item.title}
          loading="lazy"
        />
      )}
      {item.category && <span className="shop-listing-category">{item.category}</span>}
      {item.country && (
        <span className="shop-listing-flag" title={getCountryName(item.country)}>{getCountryFlag(item.country)}</span>
      )}
      {videoId && (
        <button
          className="shop-listing-play play-btn"
          onClick={(e) => { e.stopPropagation(); setPlaying(true); }}
          aria-label={`Play video for ${item.title}`}
        >
          <Icon id="play" size={22} />
        </button>
      )}
      <VideoLightbox videoId={playing ? videoId : null} title={item.title} onClose={() => setPlaying(false)} />
    </div>
  );
}
