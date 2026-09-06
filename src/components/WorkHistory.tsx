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

      {/* Clean Precision Timeline (No Awkward Ticks) */}
      <div className="relative pl-3.5 ml-1.5 border-l border-zinc-200 space-y-2 my-2">
        {workHistory.map((job) => {
          return (
            <div
              key={job.id}
              className="relative flex items-center justify-between gap-2 py-0.5 px-1.5 -mx-1.5 rounded hover:bg-zinc-100/60 transition-colors group"
            >
              {/* Node Bead sitting precisely on the vertical line */}
              <span
                className={`absolute -left-[18px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-[#fcfcfc] transition-all duration-150 ${
                  job.current
                    ? 'bg-emerald-500 ring-2 ring-emerald-500/20'
                    : 'bg-zinc-300 group-hover:bg-zinc-800'
                }`}
              />

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
