'use client';
import { useState, useEffect } from 'react';
import Icon from './Icon';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDark(theme === 'dark');
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('glass-theme', theme); } catch(e) {}
  };

  return (
    <button className="theme-toggle" onClick={toggle} title="Toggle dark mode">
      <Icon id={isDark ? 'sun' : 'moon'} size={20} />
    </button>
  );
}
