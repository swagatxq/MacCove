'use client';
import Icon from './Icon';

export default function AmazonBuyButton({ affiliateLink, title, className = '' }) {
  if (!affiliateLink) return null;

  const params = new URLSearchParams({ to: affiliateLink });
  if (title) params.set('title', title);
  const href = `/buy?${params.toString()}`;

  return (
    <div className={`amazon-buy ${className}`} onClick={(e) => e.stopPropagation()}>
      <a href={href} target="_blank" rel="noopener noreferrer" className="shop-buy-btn">
        Buy on Amazon <Icon id="chevron-right" size={16} />
      </a>
    </div>
  );
}
