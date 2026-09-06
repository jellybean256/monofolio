import { useState, useEffect } from 'react';

export interface ThemeOption {
  id: string;
  name: string;
  tag: string;
  accent: string;
  bgHex: string;
  desc: string;
}

export const THEME_OPTIONS: ThemeOption[] = [
  {
    id: 'dark',
    name: 'Onyx Dark',
    tag: 'Onyx',
    accent: '#10b981',
    bgHex: '#09090b',
    desc: 'Deep zinc & emerald (Original)',
  },
  {
    id: 'light',
    name: 'Pure Light',
    tag: 'Light',
    accent: '#059669',
    bgHex: '#fafafa',
    desc: 'Minimal crisp paper light mode',
  },
  {
    id: 'midnight',
    name: 'Midnight Navy',
    tag: 'Navy',
    accent: '#38bdf8',
    bgHex: '#070b14',
    desc: 'Deep oceanic slate & cyan',
  },
  {
    id: 'emerald',
    name: 'Matrix Cyber',
    tag: 'Cyber',
    accent: '#34d399',
    bgHex: '#040d08',
    desc: 'High-contrast hacker emerald',
  },
  {
    id: 'amber',
    name: 'Warm Amber',
    tag: 'Amber',
    accent: '#f59e0b',
    bgHex: '#0d0a07',
    desc: 'Espresso dusk & honey amber',
  },
];

export default function ThemeSlider() {
  const [currentIndex, setCurrentIndex] = useState(0); // 0-based: 0 to 4

  useEffect(() => {
    const stored = localStorage.getItem('theme_preset') || 'dark';
    const foundIdx = THEME_OPTIONS.findIndex((t) => t.id === stored);
    if (foundIdx !== -1) {
      setCurrentIndex(foundIdx);
      applyTheme(stored);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (themeId: string) => {
    const root = document.documentElement;
    root.setAttribute('data-theme', themeId);
    if (themeId === 'light') {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    } else {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    }
    localStorage.setItem('theme_preset', themeId);
  };

  const handleSelect = (idx: number) => {
    setCurrentIndex(idx);
    applyTheme(THEME_OPTIONS[idx].id);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const idx = parseInt(e.target.value, 10) - 1;
    handleSelect(idx);
  };

  const activeTheme = THEME_OPTIONS[currentIndex] || THEME_OPTIONS[0];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center">
      {/* Floating Theme Bar */}
      <div className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl border border-zinc-200/80 dark:border-zinc-800/60 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-md shadow-xl transition-colors duration-300">
        {/* Header: Title and Active Theme Badge */}
        <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-200/60 dark:border-zinc-800/40">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-xs font-mono font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Theme Slider
            </span>
            <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
              ({currentIndex + 1}/5)
            </span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-800">
            <span
              className="w-2 h-2 rounded-full shrink-0 shadow-xs transition-colors"
              style={{ backgroundColor: activeTheme.accent }}
            />
            <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200">
              {activeTheme.name}
            </span>
          </div>
        </div>

        {/* 5 Segmented Buttons */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-2.5">
          {THEME_OPTIONS.map((theme, idx) => {
            const isSelected = currentIndex === idx;
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => handleSelect(idx)}
                aria-label={`Switch to ${theme.name}`}
                className={`relative flex flex-col items-center justify-center py-1.5 sm:py-2 px-1 rounded-xl border text-center transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-zinc-400 dark:border-zinc-600 bg-zinc-100 dark:bg-zinc-800/90 shadow-xs'
                    : 'border-zinc-200/70 dark:border-zinc-800/50 bg-zinc-50/50 dark:bg-zinc-900/40 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40 hover:border-zinc-300 dark:hover:border-zinc-700'
                }`}
              >
                {/* Dot */}
                <div className="flex items-center justify-center mb-1">
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/10 dark:border-white/20 shadow-xs transition-transform group-hover:scale-110"
                    style={{ backgroundColor: theme.accent }}
                  />
                </div>

                {/* Clean non-truncated tag */}
                <span
                  className={`text-[10px] sm:text-xs font-mono font-medium transition-colors ${
                    isSelected
                      ? 'text-zinc-900 dark:text-zinc-100 font-semibold'
                      : 'text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-800 dark:group-hover:text-zinc-200'
                  }`}
                >
                  {idx + 1}. {theme.tag}
                </span>
              </button>
            );
          })}
        </div>

        {/* Real Interactive Range Slider */}
        <div className="relative w-full flex items-center px-1">
          <input
            type="range"
            min="1"
            max="5"
            step="1"
            value={currentIndex + 1}
            onChange={handleSliderChange}
            aria-label="Theme slider 1 to 5"
            className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer transition-colors"
            style={{ accentColor: activeTheme.accent }}
          />
        </div>

        {/* Description caption */}
        <div className="mt-2 text-center">
          <span className="text-[10px] sm:text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
            {activeTheme.desc} — geser slider atau klik 1–5
          </span>
        </div>
      </div>
    </div>
  );
}
