import { useState, useEffect } from 'react';
import { Monitor, Smartphone, Lock, ExternalLink } from 'lucide-react';

export default function VisualProof({ initialMode = 'desktop' }: { initialMode?: 'desktop' | 'mobile' }) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>(initialMode);

  useEffect(() => {
    if (window.location.search.includes('view=mobile')) {
      setViewMode('mobile');
    }
  }, []);

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 flex flex-col items-center">
      {/* Visual Proof Window Frame */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          viewMode === 'desktop' ? 'max-w-5xl' : 'max-w-[420px]'
        }`}
      >
        {/* Window Top Chrome */}
        <div className="w-full bg-zinc-100/95 border border-zinc-200/90 border-b-0 rounded-t-xl px-3.5 py-2 flex items-center justify-between gap-2 shadow-xs">
          {/* Left: 3 Window Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          </div>

          {/* Center: Fake Address Bar */}
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono text-zinc-500 shadow-2xs min-w-0 max-w-[220px] truncate">
            <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="truncate">mono.folio/julian-vance</span>
            <a
              href="/preview"
              target="_blank"
              rel="noreferrer"
              title="Buka preview di tab baru"
              className="ml-0.5 text-zinc-400 hover:text-zinc-700 inline-flex items-center shrink-0"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right: Viewport Toggle Switcher */}
          <div className="flex items-center bg-zinc-200/70 p-0.5 rounded-lg shrink-0">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Tampilan Desktop (Single Screen)"
            >
              <Monitor className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Tampilan Mobile (Responsive Phone)"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden sm:inline">Mobile</span>
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
            src="/preview"
            title="Portfolio Live Preview"
            className="w-full h-full border-0 bg-[#fcfcfc]"
            loading="eager"
          />
        </div>
      </div>

      {/* Proof Subtitle */}
      <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Live interactive preview — coba klik tombol atau scroll di dalam portofolio</span>
      </div>
    </section>
  );
}
