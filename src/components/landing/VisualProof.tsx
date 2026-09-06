import { useState } from 'react';
import { defaultPortfolioData } from '../../data/portfolioData';
import PortfolioView from '../portfolio/PortfolioView';
import { Monitor, Smartphone, Lock } from 'lucide-react';

export default function VisualProof() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 pb-16 flex flex-col items-center">
      {/* Visual Proof Window Frame */}
      <div
        className={`w-full transition-all duration-300 ease-in-out ${
          viewMode === 'desktop' ? 'max-w-5xl' : 'max-w-[420px]'
        }`}
      >
        {/* Window Top Chrome */}
        <div className="w-full bg-zinc-100/90 border border-zinc-200/90 border-b-0 rounded-t-xl px-4 py-2.5 flex items-center justify-between gap-3 shadow-xs">
          {/* Left: 3 Window Dots */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />
          </div>

          {/* Center: Fake Address Bar */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono text-zinc-500 shadow-2xs max-w-xs truncate">
            <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
            <span className="truncate">mono.folio/julian-vance</span>
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
              title="Tampilan Desktop"
            >
              <Monitor className="w-3 h-3" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
              title="Tampilan Mobile"
            >
              <Smartphone className="w-3 h-3" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
        </div>

        {/* Window Content: Live Embedded Portfolio */}
        <div
          className={`w-full bg-[#fcfcfc] border border-zinc-200/90 rounded-b-xl shadow-lg shadow-zinc-200/40 overflow-hidden transition-all duration-300 ${
            viewMode === 'desktop' ? 'h-[620px] sm:h-[650px]' : 'h-[640px]'
          }`}
        >
          <div className="w-full h-full overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#d4d4d8_transparent]">
            <PortfolioView data={defaultPortfolioData} isEmbed={true} />
          </div>
        </div>
      </div>

      {/* Proof Subtitle */}
      <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-400">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Live interactive preview — coba klik tombol di dalam portofolio di atas</span>
      </div>
    </section>
  );
}
