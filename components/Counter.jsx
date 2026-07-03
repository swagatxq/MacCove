'use client';
import { useEffect, useRef, useState } from 'react';

function AnimatedNumber({ target, duration = 2000 }) {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const startTime = performance.now();
          const step = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * eased);
            setValue(current);
            if (progress < 1) requestAnimationFrame(step);
            else setValue(target);
          };
          requestAnimationFrame(step);
          observer.disconnect();
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

export default function Counter({ target, duration }) {
  return <AnimatedNumber target={target} duration={duration} />;
}
