'use client';

// Mounts a muted, looping, autoplaying YouTube embed. Only renders when `active` —
// re-mounting on activation is the most reliable way to trigger autoplay across browsers,
// versus toggling visibility on an iframe that's already sitting in the DOM.
export default function InlineVideo({ videoId, active, title, className }) {
  if (!active || !videoId) return null;

  return (
    <iframe
      className={className}
      src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&modestbranding=1&rel=0&playsinline=1`}
      title={title}
      allow="autoplay; encrypted-media"
      tabIndex={-1}
    />
  );
}
