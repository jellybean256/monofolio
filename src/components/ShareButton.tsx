import { useState } from 'react';
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

    // Copy URL to clipboard
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Ignored
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={handleShare}
        type="button"
        aria-label="Share portfolio"
        title="Share portfolio or copy link"
        className="group inline-flex items-center gap-1.5 h-7 px-2 rounded-md text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100/80 dark:hover:bg-zinc-800/60 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 cursor-pointer"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-emerald-600 dark:text-emerald-400 text-xs">Copied</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors shrink-0" />
            <span>Share</span>
          </>
        )}
      </button>

      {/* Floating feedback toast */}
      {copied && (
        <div
          role="status"
          aria-live="polite"
          className="absolute right-0 top-full mt-1.5 z-50 px-2.5 py-1 text-xs font-medium rounded-md bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 shadow-md whitespace-nowrap animate-in fade-in slide-in-from-top-1 duration-150 flex items-center gap-1.5 border border-zinc-800 dark:border-zinc-200"
        >
          <Copy className="w-3 h-3 text-emerald-400 dark:text-emerald-600" />
          <span>Link copied to clipboard</span>
        </div>
      )}
    </div>
  );
}
