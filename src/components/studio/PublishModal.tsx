import { useState, useRef } from 'react';
import type { FullPortfolioData } from '../../data/portfolioData';
import { X, Copy, Check, ExternalLink, Download, Upload, Globe, Share2 } from 'lucide-react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: FullPortfolioData;
  onImportData: (data: FullPortfolioData) => void;
}

export default function PublishModal({ isOpen, onClose, data, onImportData }: PublishModalProps) {
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Generate shareable link
  const generateShareUrl = () => {
    if (typeof window === 'undefined') return '';
    try {
      const jsonStr = JSON.stringify(data);
      const encoded = btoa(encodeURIComponent(jsonStr));
      return `${window.location.origin}/preview?data=${encoded}`;
    } catch (e) {
      return `${window.location.origin}/preview`;
    }
  };

  const shareUrl = generateShareUrl();

  const handleCopy = () => {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.profile.name.toLowerCase().replace(/\s+/g, '-')}-portfolio.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.profile || !parsed.projects) {
          throw new Error('Invalid portfolio JSON format');
        }
        onImportData(parsed);
        onClose();
      } catch (err) {
        setImportError('Failed to import file. Make sure it is a valid mono.folio JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="w-full max-w-lg bg-white border border-zinc-200/90 rounded-2xl shadow-2xl shadow-zinc-950/20 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-800">
              <Share2 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-900">Publish & Share Folio</h2>
              <p className="text-[11px] font-mono text-zinc-400">Zero-friction instant sharing</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Shareable Link Box */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Permanent Live Share Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 text-xs font-mono text-zinc-700 bg-zinc-50 border border-zinc-200 rounded-lg outline-none truncate select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium transition-all shrink-0 cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-2xs'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Link'}</span>
              </button>
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              This link embeds your exact portfolio state. Anyone with this link can view your single-screen folio.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={shareUrl}
              target="_blank"
              rel="noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 text-xs font-medium text-zinc-800 transition-all cursor-pointer"
            >
              <Globe className="w-3.5 h-3.5 text-zinc-500" />
              <span>Open Live View</span>
              <ExternalLink className="w-3 h-3 text-zinc-400" />
            </a>
          </div>

          <hr className="border-zinc-100" />

          {/* Backup & Data Persistence */}
          <div className="space-y-2">
            <label className="block text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
              Data Backup & Portability
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-700 transition-all cursor-pointer shadow-2xs"
              >
                <Download className="w-3.5 h-3.5 text-zinc-500" />
                <span>Export JSON</span>
              </button>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 py-2 px-3 rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 text-xs font-medium text-zinc-700 transition-all cursor-pointer shadow-2xs"
              >
                <Upload className="w-3.5 h-3.5 text-zinc-500" />
                <span>Import JSON</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
            {importError && (
              <p className="text-[11px] font-mono text-red-500 mt-1">{importError}</p>
            )}
            <p className="text-[11px] font-mono text-zinc-400">
              Your edits are auto-saved to this browser's localStorage. You can also export the JSON backup file at any time.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-zinc-50/80 border-t border-zinc-100 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
