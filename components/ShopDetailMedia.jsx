'use client';
import { useState } from 'react';
import Icon from './Icon';
import VideoLightbox from './VideoLightbox';
import ImageLightbox from './ImageLightbox';
import { getYoutubeVideoId } from '../lib/format';

export default function ShopDetailMedia({ photo, videoUrl, title }) {
  const [playing, setPlaying] = useState(false);
  const [zoomedPhoto, setZoomedPhoto] = useState(null);
  const videoId = getYoutubeVideoId(videoUrl);

  return (
    <div className="shop-detail-media">
      {photo && (
        <img
          className="shop-detail-image"
          src={photo.url}
          alt={photo.alt || title}
          onClick={() => setZoomedPhoto(photo)}
        />
      )}
      {videoId && (
        <button className="shop-listing-play play-btn" onClick={() => setPlaying(true)} aria-label={`Play video for ${title}`}>
          <Icon id="play" size={26} />
        </button>
      )}
      <VideoLightbox videoId={playing ? videoId : null} title={title} onClose={() => setPlaying(false)} />
      <ImageLightbox image={zoomedPhoto} onClose={() => setZoomedPhoto(null)} />
    </div>
  );
}
