import React, { useState } from 'react';
import { Share2, Check, Copy } from 'lucide-react';

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'Julian Vance — Staff Systems Engineer',
      text: 'Check out Julian Vance\'s developer profile and portfolio.',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err: any) {
        if (err.name === 'AbortError') return;
      }
    }

    // Fallback: Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback fallback
      const dummy = document.createElement('input');
      document.body.appendChild(dummy);
      dummy.value = window.location.href;
      dummy.select();
      document.execCommand('copy');
      document.body.removeChild(dummy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={handleShare}
        type="button"
        aria-label="Share developer portfolio"
        title="Share portfolio or copy link"
        className="group inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-slate-100 dark:hover:bg-zinc-800 text-slate-700 dark:text-zinc-300 text-xs font-medium transition-colors shadow-2xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-zinc-400 group-hover:text-slate-800 dark:group-hover:text-zinc-200 transition-colors" />
            <span>Share</span>
          </>
        )}
      </button>

      {/* Floating feedback toast */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute right-0 top-full mt-1.5 z-50 px-2.5 py-1 text-2xs font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-150 flex items-center gap-1"
        >
          <Copy className="w-3 h-3" />
          <span>Profile link copied to clipboard</span>
        </div>
      )}
    </div>
  );
}
