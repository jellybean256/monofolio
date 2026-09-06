import { useState, useEffect } from 'react';
import { Monitor, Tablet, Smartphone, Lock, ExternalLink } from 'lucide-react';

export default function VisualProof({ initialMode = 'desktop' }: { initialMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>(initialMode);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view') as 'desktop' | 'tablet' | 'mobile' | null;
      if (v === 'desktop' || v === 'tablet' || v === 'mobile') {
        setViewMode(v);
      }
    }
  }, []);

  const getContainerMaxWidth = () => {
    switch (viewMode) {
      case 'desktop':
        return 'max-w-6xl';
      case 'tablet':
        return 'max-w-[768px]';
      case 'mobile':
        return 'max-w-[400px]';
    }
  };

  const iframeSrc = `/preview?view=${viewMode}`;

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex flex-col items-center">
      {/* Visual Proof Window Frame */}
      <div className={`w-full transition-all duration-300 ease-in-out ${getContainerMaxWidth()}`}>
        {/* Window Top Chrome */}
        <div className="w-full bg-zinc-100/95 border border-zinc-200/90 border-b-0 rounded-t-xl px-3.5 py-2 flex items-center justify-between gap-2 shadow-xs">
          {/* Left: 3 macOS Traffic Light Dots */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123]/40 shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-2xs" />
          </div>

          {/* Center: Fake Address Bar */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono text-zinc-500 shadow-2xs min-w-0 max-w-[220px] truncate">
            <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="truncate">mono.folio/julian-vance</span>
            <a
              href={iframeSrc}
              target="_blank"
              rel="noreferrer"
              title="Open preview in new tab"
              className="ml-0.5 text-zinc-400 hover:text-zinc-700 inline-flex items-center shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right: 3-Way Viewport Toggle Switcher */}
          <div className="flex items-center bg-zinc-200/70 p-0.5 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Desktop View (Single-Screen 2 Columns)"
            >
              <Monitor className="w-3.5 h-3.5 shrink-0" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Desktop</span>}
            </button>
            <button
              onClick={() => setViewMode('tablet')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'tablet'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Tablet View (Stacked 768px)"
            >
              <Tablet className="w-3.5 h-3.5 shrink-0" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Tablet</span>}
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Mobile View (Compact Phone)"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Mobile</span>}
            </button>
          </div>
        </div>

        {/* Window Content: Live Embedded Portfolio via isolated iframe */}
        <div
          className={`w-full bg-[#fcfcfc] border border-zinc-200/90 rounded-b-xl shadow-lg shadow-zinc-200/40 overflow-hidden transition-all duration-300 ${
            viewMode === 'desktop' ? 'h-[640px] sm:h-[680px]' : 'h-[680px]'
          }`}
        >
          <iframe
            key={iframeSrc}
            src={iframeSrc}
            title="Portfolio Live Preview"
            className="w-full h-full border-0 bg-[#fcfcfc]"
            loading="eager"
          />
        </div>
      </div>

      {/* Proof Subtitle */}
      <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Live interactive preview — click buttons or scroll inside the portfolio</span>
      </div>
    </section>
  );
}
