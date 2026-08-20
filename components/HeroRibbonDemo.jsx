'use client';
import { useEffect, useRef, useState } from 'react';

const SHORTCUTS = [
  { keys: ['Alt', 'E', 'S', 'V'], label: 'Paste Special', mouse: 8, fast: 1 },
  { keys: ['Alt', 'H', 'M', 'C'], label: 'Merge & Center', mouse: 6, fast: 1 },
  { keys: ['Alt', 'A', 'S', 'A'], label: 'Sort A → Z', mouse: 7, fast: 1 },
  { keys: ['Alt', 'W', 'F', 'F'], label: 'Freeze Panes', mouse: 9, fast: 1 },
  { keys: ['Alt', '='], label: 'AutoSum', mouse: 5, fast: 1 },
];
const N = SHORTCUTS.length;

const VB_W = 620;
const TOP_PAD = 96;
const STAGE_H = 104;
const BOTTOM_PAD = 36;
const KEY_Y = 16;
const KEY_H = 40;
const KEY_GAP = 10;
const ROW_X = 20;
const PILL_W = 128;
const PILL_H = 40;
const RIGHT_PAD = 20;
const KEY_CENTER_Y = KEY_Y + KEY_H / 2;

const KEY_STEP_MS = 380;
const ROW_HOLD_MS = 1000;
const SCROLL_MS = 550;

function keyWidth(text) {
  return text.length > 1 ? 68 : 42;
}

function keyPositions(keys) {
  let x = 0;
  return keys.map((k) => {
    const w = keyWidth(k);
    const pos = { key: k, x, w };
    x += w + KEY_GAP;
    return pos;
  });
}

export default function HeroRibbonDemo() {
  const containerRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [filmIndex, setFilmIndex] = useState(0);
  const [transitionOn, setTransitionOn] = useState(false);
  const [keyIndex, setKeyIndex] = useState(-1);
  const [pillRevealed, setPillRevealed] = useState(false);

  const activeRow = filmIndex % N;

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
    let raf1, raf2;

    const animateRow = (j) => {
      if (cancelled) return;
      setKeyIndex(-1);
      setPillRevealed(false);
      const keys = SHORTCUTS[j].keys;
      let k = 0;
      const stepKey = () => {
        if (cancelled) return;
        setKeyIndex(k);
        if (k < keys.length - 1) {
          k += 1;
          timer = setTimeout(stepKey, KEY_STEP_MS);
        } else {
          timer = setTimeout(() => {
            if (cancelled) return;
            setPillRevealed(true);
            timer = setTimeout(() => scrollTo(j + 1), ROW_HOLD_MS);
          }, KEY_STEP_MS);
        }
      };
      timer = setTimeout(stepKey, 250);
    };

    const scrollTo = (next) => {
      if (cancelled) return;
      setTransitionOn(true);
      setFilmIndex(next);
      timer = setTimeout(() => {
        if (cancelled) return;
        if (next === N) {
          setTransitionOn(false);
          setFilmIndex(0);
          raf1 = requestAnimationFrame(() => {
            raf2 = requestAnimationFrame(() => {
              if (cancelled) return;
              setTransitionOn(true);
              animateRow(0);
            });
          });
        } else {
          animateRow(next);
        }
      }, SCROLL_MS);
    };

    timer = setTimeout(() => animateRow(0), 500);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      if (raf1) cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [started]);

  const vbHeight = TOP_PAD + STAGE_H + BOTTOM_PAD;
  const stripRows = [...SHORTCUTS, SHORTCUTS[0]];
  const dotsY = TOP_PAD + STAGE_H + 20;
  const dotGap = 20;
  const dotsStartX = (VB_W - (N - 1) * dotGap) / 2;

  return (
    <div className="hero-ribbon-card glass-heavy" ref={containerRef}>
      <svg
        className="hero-ribbon-svg"
        viewBox={`0 0 ${VB_W} ${vbHeight}`}
        role="img"
        aria-label="Make Excel Ribbon Shortcuts Work on Mac — Windows Excel shortcuts and the time each one saves versus using the mouse"
      >
        <title>Make Excel Ribbon Shortcuts Work on Mac</title>
        <defs>
          <clipPath id="ribbonStageClip">
            <rect x="0" y={TOP_PAD} width={VB_W} height={STAGE_H} />
          </clipPath>
        </defs>

        <text x={ROW_X} y="40" className="ribbon-title">Make Excel Ribbon Shortcuts Work on Mac</text>
        <text x={ROW_X} y="66" className="ribbon-subtitle">Same Windows shortcuts. Same speed.</text>

        <rect className="ribbon-stage-bg" x="0" y={TOP_PAD} width={VB_W} height={STAGE_H} rx="18" />

        <g clipPath="url(#ribbonStageClip)">
          <g
            className="ribbon-filmstrip"
            style={{
              transform: `translateY(${TOP_PAD - filmIndex * STAGE_H}px)`,
              transition: transitionOn ? `transform ${SCROLL_MS}ms var(--ease-standard)` : 'none',
            }}
          >
            {stripRows.map((shortcut, i) => {
              const isCurrent = i === filmIndex;
              const positions = keyPositions(shortcut.keys);
              const keysWidth = positions.length
                ? positions[positions.length - 1].x + positions[positions.length - 1].w
                : 0;
              const arrowX = keysWidth + 18;
              const labelX = arrowX + 26;
              const pillX = VB_W - RIGHT_PAD - PILL_W - ROW_X;
              const saved = shortcut.mouse - shortcut.fast;

              return (
                <g key={`${shortcut.label}-${i}`} transform={`translate(${ROW_X}, ${i * STAGE_H})`}>
                  {positions.map((pos, ki) => {
                    const isActiveKey = isCurrent && ki === keyIndex;
                    return (
                      <g key={ki}>
                        <rect
                          className={`ribbon-key${isActiveKey ? ' active' : ''}`}
                          x={pos.x}
                          y={KEY_Y}
                          width={pos.w}
                          height={KEY_H}
                          rx="9"
                        />
                        <text
                          className={`ribbon-key-text${isActiveKey ? ' active' : ''}`}
                          x={pos.x + pos.w / 2}
                          y={KEY_CENTER_Y}
                        >
                          {pos.key}
                        </text>
                      </g>
                    );
                  })}

                  <text className="ribbon-arrow" x={arrowX} y={KEY_CENTER_Y}>→</text>
                  <text className="ribbon-label" x={labelX} y={KEY_CENTER_Y}>{shortcut.label}</text>
                  <text className="ribbon-caption" x={0} y={KEY_Y + KEY_H + 26}>
                    Mouse {shortcut.mouse}s → Shortcut {shortcut.fast}s
                  </text>

                  <rect
                    className={`ribbon-pill${isCurrent && pillRevealed ? ' active' : ''}`}
                    x={pillX}
                    y={(STAGE_H - PILL_H) / 2}
                    width={PILL_W}
                    height={PILL_H}
                    rx="20"
                  />
                  <text
                    className={`ribbon-pill-text${isCurrent && pillRevealed ? ' active' : ''}`}
                    x={pillX + PILL_W / 2}
                    y={(STAGE_H - PILL_H) / 2 + PILL_H / 2}
                  >
                    Saves {saved}s
                  </text>
                </g>
              );
            })}
          </g>
        </g>

        {SHORTCUTS.map((_, i) => (
          <circle
            key={i}
            className={`ribbon-dot${i === activeRow ? ' active' : ''}`}
            cx={dotsStartX + i * dotGap}
            cy={dotsY}
            r="4"
          />
        ))}
      </svg>
    </div>
  );
}
