import { ArrowUpRight } from 'lucide-react';
import { workHistory } from '../data/portfolioData';

export default function WorkHistory() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Work Experience
        </span>
        <span className="text-[11px] font-mono text-zinc-400">
          9+ yrs
        </span>
      </div>

      {/* Compact Tree / Timeline (No Description) */}
      <div className="relative pl-3.5 border-l border-zinc-200/80 space-y-1.5 ml-2 mt-2">
        {workHistory.map((job) => {
          const content = (
            <div className="relative flex items-center justify-between gap-2 py-1 px-1.5 -mx-1.5 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group">
              {/* Branch Connector Line */}
              <span className="absolute -left-[14px] top-1/2 -translate-y-1/2 w-2.5 h-px bg-zinc-200 group-hover:bg-zinc-400 transition-colors" />

              <div className="flex items-center gap-1.5 min-w-0">
                <span className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2 flex items-center gap-0.5 truncate">
                  {job.company}
                  {job.companyUrl && (
                    <ArrowUpRight className="w-2.5 h-2.5 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  )}
                </span>
                <span className="text-zinc-300 text-xs shrink-0">•</span>
                <span className="text-xs text-zinc-600 truncate">
                  {job.role}
                </span>
                {job.current && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 animate-pulse ml-0.5" title="Current role" />
                )}
              </div>

              <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                {job.period}
              </span>
            </div>
          );

          return job.companyUrl ? (
            <a
              key={job.id}
              href={job.companyUrl}
              target="_blank"
              rel="noreferrer"
              className="block no-underline"
            >
              {content}
            </a>
          ) : (
            <div key={job.id} className="block">
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}
