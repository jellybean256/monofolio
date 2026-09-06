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

      {/* Pure Tree Branch (No Icons, Continuous Vertical Line from Top) */}
      <div className="relative flex flex-col pt-1">
        {workHistory.map((job, idx) => {
          const isLast = idx === workHistory.length - 1;

          return (
            <div
              key={job.id}
              className="relative flex items-center justify-between gap-2 pl-8 py-1.5 px-1.5 -mx-1.5 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group"
            >
              {/* Vertical trunk line (runs from top to center) */}
              <span className="absolute left-3.5 top-0 w-px h-1/2 bg-zinc-200" />

              {/* Vertical trunk line continuing downward (stops at center for last item) */}
              {!isLast && (
                <span className="absolute left-3.5 top-1/2 w-px h-1/2 bg-zinc-200" />
              )}

              {/* Horizontal branch line connecting from trunk directly to text */}
              <span className="absolute left-3.5 top-1/2 w-4 h-px bg-zinc-200 group-hover:bg-zinc-400 transition-colors" />

              {/* Text: Company + Role (No Icons) */}
              <div className="flex items-center gap-1.5 min-w-0">
                {job.companyUrl ? (
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2 flex items-center gap-0.5 truncate"
                  >
                    <span>{job.company}</span>
                    <ArrowUpRight className="w-2.5 h-2.5 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-zinc-900 truncate">
                    {job.company}
                  </span>
                )}
                <span className="text-zinc-300 text-xs shrink-0">•</span>
                <span className="text-xs text-zinc-600 truncate">
                  {job.role}
                </span>
              </div>

              {/* Right: Period */}
              <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                {job.period}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
