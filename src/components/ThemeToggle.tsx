import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored);
      applyTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initial = prefersDark ? 'dark' : 'light';
      setTheme(initial);
      applyTheme(initial);
    }
  }, []);

  const applyTheme = (nextTheme: 'light' | 'dark') => {
    const root = document.documentElement;
    if (nextTheme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  };

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={`Switch theme (currently ${theme})`}
      title="Toggle color theme"
      className="inline-flex items-center justify-center h-7 w-7 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
    >
      <Sun className="w-3.5 h-3.5 text-zinc-400 hover:text-amber-400 transition-colors hidden dark:block" />
      <Moon className="w-3.5 h-3.5 text-zinc-500 hover:text-indigo-600 transition-colors block dark:hidden" />
    </button>
  );
}
