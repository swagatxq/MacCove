'use client';
import { useState } from 'react';
import Image from 'next/image';
import ImageLightbox from './ImageLightbox';

export default function ShopDetailGallery({ gallery, title }) {
  const [zoomedPhoto, setZoomedPhoto] = useState(null);

  if (!gallery?.length) return null;

  return (
    <div className="shop-detail-gallery">
      {gallery.map((photo, i) => (
        <button
          key={i}
          type="button"
          className="shop-detail-gallery-item"
          onClick={() => setZoomedPhoto(photo)}
          aria-label={`Enlarge ${title} photo ${i + 1}`}
        >
          <Image src={photo.url} alt={photo.alt || `${title} photo ${i + 1}`} fill sizes="(max-width: 640px) 50vw, 25vw" />
        </button>
      ))}
      <ImageLightbox image={zoomedPhoto} onClose={() => setZoomedPhoto(null)} />
    </div>
  );
}
