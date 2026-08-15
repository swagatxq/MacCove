'use client';
import { Fragment, useEffect, useRef, useState } from 'react';
import DownloadTrigger from './DownloadTrigger';

const SHORTCUTS = [
  { keys: ['Alt', 'E', 'S', 'V'], title: 'Paste Special', desc: 'Paste values, formulas, or formatting only — without carrying over the rest of the copied cell.' },
  { keys: ['Alt', 'E', 'S', 'T'], title: 'Paste Special (Formats)', desc: 'Paste only the formatting from the copied cell, leaving its values and formulas behind.' },
  { keys: ['Alt', '='], title: 'AutoSum', desc: 'Insert a SUM formula for the selected cells without typing it out.' },
  { keys: ['Alt', 'W', 'F', 'F'], title: 'Freeze Panes', desc: 'Lock header rows or columns in place while scrolling through thousands of rows of data.' },
  { keys: ['Alt', 'H', 'O', 'I'], title: 'AutoFit Column Width', desc: 'Resize the selected columns to fit their contents automatically.' },
];

const KEY_STEP_MS = 500;
const CARD_HOLD_MS = 1000;

// Steps through each card's key sequence one key at a time (Alt, then E, then S...) once the
// grid scrolls into view, so visitors see how a shortcut is actually pressed rather than a static combo.
export default function ShortcutKeysDemo() {
  const containerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [cardIndex, setCardIndex] = useState(0);
  const [keyIndex, setKeyIndex] = useState(-1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let cancelled = false;
    let timer;

    const runStep = (card, key) => {
      if (cancelled) return;
      setCardIndex(card);
      setKeyIndex(key);
      const keys = SHORTCUTS[card].keys;
      if (key < keys.length - 1) {
        timer = setTimeout(() => runStep(card, key + 1), KEY_STEP_MS);
      } else {
        timer = setTimeout(() => runStep((card + 1) % SHORTCUTS.length, 0), CARD_HOLD_MS);
      }
    };

    timer = setTimeout(() => runStep(0, 0), 400);
    return () => { cancelled = true; clearTimeout(timer); };
  }, [started]);

  return (
    <div className="shortcuts-grid stagger-children" ref={containerRef}>
      {SHORTCUTS.map((shortcut, i) => (
        <DownloadTrigger
          key={shortcut.title}
          className={`shortcut-card${started && i === cardIndex ? ' active-demo' : ''}`}
        >
          <div className="shortcut-keys">
            {shortcut.keys.map((k, ki) => (
              <Fragment key={ki}>
                {ki > 0 && <span>+</span>}
                <kbd className={started && i === cardIndex && ki === keyIndex ? 'active' : ''}>{k}</kbd>
              </Fragment>
            ))}
          </div>
          <div className="shortcut-card-title">{shortcut.title}</div>
          <div className="shortcut-card-desc">{shortcut.desc}</div>
        </DownloadTrigger>
      ))}
    </div>
  );
}
