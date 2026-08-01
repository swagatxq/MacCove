'use client';
import { useEffect } from 'react';
import Icon from './Icon';

export default function ImageLightbox({ image, onClose }) {
  useEffect(() => {
    if (!image) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [image, onClose]);

  if (!image) return null;

  const close = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="image-lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={image.alt || 'Photo'}>
      <button className="video-lightbox-close" onClick={close} aria-label="Close photo">
        <Icon id="x" size={22} />
      </button>
      <img className="image-lightbox-img" src={image.url} alt={image.alt || ''} onClick={(e) => e.stopPropagation()} />
    </div>
  );
}
