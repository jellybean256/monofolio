import { useState } from 'react';
import { ChevronDown, ChevronUp, ArrowUpRight } from 'lucide-react';
import type { WritingItem } from '../../data/portfolioData';

interface WritingAreaProps {
  writings: WritingItem[];
}

export default function WritingArea({ writings }: WritingAreaProps) {
  const [expanded, setExpanded] = useState(false);

  if (!writings || writings.length === 0) return null;

  const displayedPosts = expanded ? writings : writings.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Writing
        </span>
      </div>

      {/* Articles List */}
      <div className="flex flex-col pt-1 divide-y divide-zinc-100/60">
        {displayedPosts.map((article) => {
          const content = (
            <>
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-1 min-w-0">
                  <h3 className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2 truncate">
                    {article.title}
                  </h3>
                  {article.url && (
                    <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  )}
                </div>
                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {article.date}
                </span>
              </div>
              {article.description && (
                <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">
                  {article.description}
                </p>
              )}
            </>
          );

          return article.url ? (
            <a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noreferrer"
              className="group block py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-colors duration-150 no-underline"
            >
              {content}
            </a>
          ) : (
            <div
              key={article.id}
              className="group block py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-colors duration-150"
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Solution C Inline Toggle Action */}
      {writings.length > 2 && (
        <button
          type="button"
          onClick={(e) => {
            e.currentTarget.blur();
            setExpanded(!expanded);
          }}
          className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
        >
          {expanded ? (
            <>
              <span>- show fewer</span>
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>+ {writings.length - 2} more essays</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
