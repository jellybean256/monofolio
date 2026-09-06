import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { writingArticles } from '../data/portfolioData';

export default function WritingArea() {
  const [expanded, setExpanded] = useState(false);

  const displayedPosts = expanded ? writingArticles : writingArticles.slice(0, 2);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Writing
        </span>
      </div>

      {/* Articles List matching user's reference image 1 exactly */}
      <div className="flex flex-col pt-1 divide-y divide-zinc-100/60">
        {displayedPosts.map((article) => (
          <a
            key={article.id}
            href={article.url}
            className="group block py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-all duration-150 no-underline"
          >
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2">
                {article.title}
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                {article.date}
              </span>
            </div>
            <p className="text-xs text-zinc-500 leading-relaxed mt-0.5">
              {article.description}
            </p>
          </a>
        ))}
      </div>

      {/* Solution C Inline Toggle Action */}
      {writingArticles.length > 2 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start mt-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-900 transition-colors flex items-center gap-1 cursor-pointer pt-0.5"
        >
          {expanded ? (
            <>
              <span>- show fewer</span>
              <ChevronUp className="w-3 h-3" />
            </>
          ) : (
            <>
              <span>+ {writingArticles.length - 2} more essays</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
