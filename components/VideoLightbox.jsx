'use client';
import { useEffect } from 'react';
import Icon from './Icon';

export default function VideoLightbox({ videoId, title, onClose }) {
  useEffect(() => {
    if (!videoId) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  const close = (e) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="video-lightbox" onClick={close} role="dialog" aria-modal="true" aria-label={title || 'Video'}>
      <button className="video-lightbox-close" onClick={close} aria-label="Close video">
        <Icon id="x" size={22} />
      </button>
      <div className="video-lightbox-frame" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title || 'Product video'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  );
}
