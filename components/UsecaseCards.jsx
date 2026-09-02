'use client';
import { useEffect, useRef, useState } from 'react';
import DownloadTrigger from './DownloadTrigger';

const CARDS = [
  {
    word: 'Jump',
    pos: 1,
    grad: 'linear-gradient(120deg, #0A84FF, #5E5CE6)',
    cont: 'across huge reporting workbooks, filter and drill into pivot tables mid-conversation, and review live dashboards at the same speed you had on Windows —',
    emph: 'without ever reaching for the mouse.',
    hrs: '~7 hrs/month saved',
  },
  {
    word: 'Toggle',
    pos: 2,
    grad: 'linear-gradient(120deg, #FF375F, #FF9F0A)',
    cont: 'between relative and absolute references without breaking flow, audit formulas and trace precedents in seconds, then reformat an entire statement',
    emph: 'minutes before the deadline.',
    hrs: '~9 hrs/month saved',
  },
  {
    word: 'Clean',
    pos: 3,
    grad: 'linear-gradient(120deg, #30D158, #64D2FF)',
    cont: 'up a messy handoff workbook in seconds, apply consistent number and currency formats across a whole sheet, and copy formatting only —',
    emph: 'no slow ribbon crawl.',
    hrs: '~5 hrs/month saved',
  },
  {
    word: 'Reuse',
    pos: 4,
    grad: 'linear-gradient(120deg, #BF5AF2, #0A84FF)',
    cont: 'the muscle memory you built on Windows — no retraining your hands, no second-guessing a keystroke, every saved second compounding',
    emph: 'across your whole working day.',
    hrs: '~7 hrs/month saved',
  },
];

export default function UsecaseCards() {
  const [active, setActive] = useState(0);
  const refs = useRef([]);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setActive(-1); // -1 → CSS treats every card as active
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio >= 0.55) {
            const idx = refs.current.indexOf(e.target);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { threshold: [0.55, 0.8] }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className={`usecase-list ${active === -1 ? 'uc-all-active' : ''}`}>
      {CARDS.map((c, i) => (
        <div
          key={c.word}
          ref={(el) => (refs.current[i] = el)}
          className={`usecase-row uc-pos-${c.pos} ${active === i ? 'is-active' : ''}`}
        >
          <DownloadTrigger className="usecase-card-hit">
            <span className="usecase-word" style={{ '--uc-grad': c.grad }}>{c.word}</span>
            <p className="usecase-cont">{c.cont}</p>
            <p className="usecase-emph">{c.emph}</p>
            <span className="usecase-time-badge">{c.hrs}</span>
          </DownloadTrigger>
        </div>
      ))}
    </div>
  );
}
