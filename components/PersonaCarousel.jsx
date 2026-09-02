'use client';
import { useRef } from 'react';
import Image from 'next/image';
import DownloadTrigger from './DownloadTrigger';

// Manual-movement carousel of the product's ICPs. Each card is viewport-tall,
// ~30vw wide, and scroll-snaps. Sequence is deliberate: Consultants → Founders
// → Analysts → Small Business Owners.
// Photos are Unsplash — the Unsplash License grants free commercial use with no
// attribution required, so no credit line is shown.
const PERSONAS = [
  {
    name: 'Consultants',
    desc: 'The shapeshifters who walk into any client’s office and make their numbers make sense — same keys on every machine, zero relearning.',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    focus: '50% 22%',
    keys: [
      { combo: ['Alt', 'W', 'A'], label: 'Arrange All' },
      { combo: ['Alt', 'H', 'O', 'I'], label: 'AutoFit Column Width' },
    ],
  },
  {
    name: 'Founders',
    desc: 'The one-person finance teams — building the model, the deck and the roadmap before lunch, every keystroke earned.',
    img: 'https://images.unsplash.com/photo-1627729085140-e0912b70e79e?auto=format&fit=crop&w=900&q=80',
    focus: '50% 18%',
    keys: [
      { combo: ['Alt', '='], label: 'AutoSum' },
      { combo: ['Alt', 'H', 'K'], label: 'Currency format' },
    ],
  },
  {
    name: 'Analysts',
    desc: 'The warriors who turn raw rows in Excel into the insights everyone else builds their decisions on.',
    img: 'https://images.unsplash.com/photo-1597752441702-7ccbf6932e38?auto=format&fit=crop&w=900&q=80',
    focus: '50% 20%',
    keys: [
      { combo: ['Alt', 'E', 'S', 'V'], label: 'Paste Special — values' },
      { combo: ['Alt', 'W', 'F', 'F'], label: 'Freeze Panes' },
    ],
  },
  {
    name: 'Small Business Owners',
    desc: 'The operators running invoicing, inventory and payroll solo — Excel stays fast, so the business keeps moving.',
    img: 'https://images.unsplash.com/photo-1753351052363-53ce102830eb?auto=format&fit=crop&w=900&q=80',
    focus: '50% 28%',
    keys: [
      { combo: ['Ctrl', 'D'], label: 'Fill Down' },
      { combo: ['Alt', 'E', 'S', 'T'], label: 'Paste Formats' },
    ],
  },
];

export default function PersonaCarousel() {
  const trackRef = useRef(null);

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector('.persona-card');
    const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.8;
    const max = track.scrollWidth - track.clientWidth;
    const target = Math.max(0, Math.min(max, track.scrollLeft + dir * step));
    const start = track.scrollLeft;
    const t0 = performance.now();
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / 320);
      const eased = 1 - Math.pow(1 - k, 3);
      track.scrollLeft = start + (target - start) * eased;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <div className="persona-carousel">
      <div className="persona-carousel-track" ref={trackRef}>
        {PERSONAS.map((p) => (
          <DownloadTrigger key={p.name} className="persona-card">
            <div className="persona-card-photo">
              <Image src={p.img} alt={p.name} fill sizes="(max-width: 640px) 82vw, 30vw" style={{ objectFit: 'cover', objectPosition: p.focus || '50% 20%' }} />
            </div>
            <div className="persona-card-body">
              <h3 className="persona-card-title">{p.name}</h3>
              <p className="persona-card-desc">{p.desc}</p>
              <div className="persona-card-keys">
                <span className="persona-card-keys-label">Most-used ribbon keys</span>
                {p.keys.map((k) => (
                  <div className="persona-card-key" key={k.label}>
                    <span className="persona-card-key-combo">
                      {k.combo.map((key, i) => (
                        <span key={i}>
                          <kbd>{key}</kbd>
                          {i < k.combo.length - 1 && <span className="persona-card-key-plus">+</span>}
                        </span>
                      ))}
                    </span>
                    <span className="persona-card-key-label">{k.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </DownloadTrigger>
        ))}
      </div>
      <div className="persona-carousel-nav">
        <button type="button" aria-label="Previous" onClick={() => scrollBy(-1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <button type="button" aria-label="Next" onClick={() => scrollBy(1)}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>
    </div>
  );
}
