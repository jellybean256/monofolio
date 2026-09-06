import { useState, useEffect, useRef } from 'react';
import { Monitor, Tablet, Smartphone, Lock, ExternalLink } from 'lucide-react';

export default function VisualProof({ initialMode = 'desktop' }: { initialMode?: 'desktop' | 'tablet' | 'mobile' }) {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>(initialMode);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Read URL query or detect mobile viewport on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const v = params.get('view') as 'desktop' | 'tablet' | 'mobile' | null;
      if (v === 'desktop' || v === 'tablet' || v === 'mobile') {
        setViewMode(v);
      } else if (window.innerWidth < 640) {
        setViewMode('mobile');
      }
    }
  }, []);

  // Send message to iframe to change view mode smoothly without reload
  const handleModeChange = (newMode: 'desktop' | 'tablet' | 'mobile') => {
    setViewMode(newMode);
    try {
      iframeRef.current?.contentWindow?.postMessage({ type: 'SET_VIEW_MODE', mode: newMode }, '*');
    } catch (e) {}
  };

  // Sync mode once iframe finishes loading
  const handleIframeLoad = () => {
    try {
      iframeRef.current?.contentWindow?.postMessage({ type: 'SET_VIEW_MODE', mode: viewMode }, '*');
    } catch (e) {}
  };

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

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 pb-16 flex flex-col items-center">
      {/* Visual Proof Window Frame with smooth width animation */}
      <div className={`w-full transition-all duration-300 ease-in-out ${getContainerMaxWidth()}`}>
        {/* Window Top Chrome */}
        <div className="w-full bg-zinc-100/95 border border-zinc-200/90 border-b-0 rounded-t-xl px-3.5 py-2 flex items-center gap-2.5 sm:gap-3.5 shadow-xs">
          {/* Left: 3 macOS Traffic Light Dots */}
          <div className="flex items-center gap-2 shrink-0" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57] border border-[#e0443e]/40 shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e] border border-[#dea123]/40 shadow-2xs" />
            <span className="w-3 h-3 rounded-full bg-[#28c840] border border-[#1aab29]/40 shadow-2xs" />
          </div>

          {/* Flexible Address Bar: Stretches gracefully adjacent to traffic lights and adapts across Desktop, Tablet, and Mobile */}
          <div className="flex-1 min-w-0 flex items-center">
            <a
              href="/preview"
              target="_blank"
              rel="noreferrer"
              title="Open preview in new tab (mono.folio/julian-vance)"
              aria-label="Open preview in new tab (mono.folio/julian-vance)"
              className="w-full flex items-center justify-between gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-white border border-zinc-200/80 text-[11px] font-mono text-zinc-600 shadow-2xs hover:border-zinc-300 hover:text-zinc-900 transition-colors group cursor-pointer"
            >
              <div className="flex items-center gap-1.5 min-w-0 truncate">
                <Lock className="w-3 h-3 text-zinc-500 group-hover:text-zinc-700 shrink-0 transition-colors" aria-hidden="true" />
                <span className="truncate">mono.folio/julian-vance</span>
              </div>
              <ExternalLink className="w-3 h-3 text-zinc-500 group-hover:text-zinc-900 inline-flex items-center shrink-0 ml-1 transition-colors" aria-hidden="true" />
            </a>
          </div>

          {/* Right: 3-Way Viewport Toggle Switcher */}
          <div className="flex items-center bg-zinc-200/70 p-0.5 rounded-lg shrink-0" role="group" aria-label="Viewport preview mode switcher">
            <button
              type="button"
              onClick={() => handleModeChange('desktop')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'desktop'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
              title="Desktop View (Single-Screen 2 Columns)"
              aria-label="Desktop view"
            >
              <Monitor className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Desktop</span>}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('tablet')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'tablet'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
              title="Tablet View (Stacked 768px)"
              aria-label="Tablet view"
            >
              <Tablet className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Tablet</span>}
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('mobile')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                viewMode === 'mobile'
                  ? 'bg-white text-zinc-900 shadow-2xs font-medium'
                  : 'text-zinc-600 hover:text-zinc-900'
              }`}
              title="Mobile View (Compact Phone)"
              aria-label="Mobile view"
            >
              <Smartphone className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              {viewMode !== 'mobile' && <span className="hidden sm:inline">Mobile</span>}
            </button>
          </div>
        </div>

        {/* Window Content: Single Persistent Iframe without unmounting/reloading */}
        <div
          className={`w-full bg-[#fcfcfc] border border-zinc-200/90 rounded-b-xl shadow-lg shadow-zinc-200/40 overflow-hidden transition-all duration-300 ${
            viewMode === 'desktop' ? 'h-[640px] sm:h-[680px]' : 'h-[680px]'
          }`}
        >
          <iframe
            ref={iframeRef}
            src="/preview"
            onLoad={handleIframeLoad}
            title="mono.folio interactive portfolio preview"
            aria-label="mono.folio interactive portfolio preview"
            className="w-full h-full border-0 bg-[#fcfcfc]"
            loading="lazy"
          />
        </div>
      </div>

      {/* Proof Subtitle */}
      <div className="flex items-center gap-2 mt-4 text-xs font-mono text-zinc-600">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" aria-hidden="true" />
        <span>Live interactive preview — click buttons or scroll inside the portfolio</span>
      </div>
    </section>
  );
}
