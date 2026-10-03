'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    const savedTheme = sessionStorage.getItem('mba-lab-theme');
    const startDark = savedTheme !== 'light';
    document.documentElement.classList.toggle('dark', startDark);
    document.documentElement.dataset.theme = startDark ? 'dark' : 'light';
    setIsDark(startDark);

    return () => {
      document.documentElement.classList.add('dark');
      document.documentElement.dataset.theme = 'dark';
    };
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains('dark');
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    sessionStorage.setItem('mba-lab-theme', next ? 'dark' : 'light');
    setIsDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to day mode' : 'Switch to night mode'}
      title={isDark ? 'Switch to day mode' : 'Switch to night mode'}
      className="reader-theme-toggle flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink/70 transition hover:border-gold hover:text-gold dark:border-dark-rule dark:text-dark-soft dark:hover:border-gold dark:hover:text-gold-bright"
    >
      {isDark === null ? null : isDark ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="12" cy="12" r="4.5" />
          <path d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.5 14.7A8.5 8.5 0 0 1 9.3 3.5a.6.6 0 0 0-.75-.78A10 10 0 1 0 21.28 15.45a.6.6 0 0 0-.78-.75Z" />
        </svg>
      )}
    </button>
  );
}
