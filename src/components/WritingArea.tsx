import { PenLine, ArrowUpRight } from 'lucide-react';
import { writingArticles } from '../data/portfolioData';

export default function WritingArea() {
  return (
    <div className="flex flex-col">
      {/* Section Header */}
      <div className="pb-2.5 flex items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-2">
          <PenLine className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
            Writing
          </span>
        </div>
        <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
          {writingArticles.length} posts
        </span>
      </div>

      {/* Writing Articles List */}
      <div className="flex flex-col gap-2.5">
        {writingArticles.map((article) => (
          <a
            key={article.id}
            href={article.url}
            className="theme-card group block p-3.5 sm:p-4 rounded-lg border border-zinc-200/60 dark:border-zinc-800/50 bg-white/40 dark:bg-zinc-900/30 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-all duration-200"
          >
            {/* Title & Date */}
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors flex items-center gap-1.5">
                <span>{article.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-150 shrink-0" />
              </h3>
              <span className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 shrink-0 whitespace-nowrap">
                {article.date}
              </span>
            </div>

            {/* Excerpt */}
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed mt-1.5 line-clamp-2">
              {article.description}
            </p>

            {/* Read Time & Tag Pill */}
            <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-zinc-100/70 dark:border-zinc-800/40">
              <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
                {article.readTime}
              </span>
              {article.tag && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700 text-[10px]">•</span>
                  <span className="theme-pill px-1.5 py-0.5 rounded text-[10px] font-mono text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-800/40">
                    {article.tag}
                  </span>
                </>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
