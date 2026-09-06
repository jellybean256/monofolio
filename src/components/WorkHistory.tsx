import { ArrowUpRight } from 'lucide-react';
import { workHistory } from '../data/portfolioData';

export default function WorkHistory() {
  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-2 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Work Experience
        </span>
        <span className="text-[11px] font-mono text-zinc-400">
          9+ yrs
        </span>
      </div>

      {/* Minimalist Editorial Work Rows */}
      <div className="flex flex-col pt-1 divide-y divide-zinc-100/60">
        {workHistory.map((job) => {
          const content = (
            <div className="py-1.5 px-2 -mx-2 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group">
              <div className="flex items-baseline justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="text-xs font-semibold text-zinc-900 group-hover:underline underline-offset-2 flex items-center gap-0.5 truncate">
                    {job.company}
                    {job.companyUrl && (
                      <ArrowUpRight className="w-3 h-3 text-zinc-400 group-hover:text-zinc-900 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
                    )}
                  </span>
                  <span className="text-zinc-300 text-xs shrink-0">•</span>
                  <span className="text-xs text-zinc-600 truncate">
                    {job.role}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-zinc-400 shrink-0">
                  {job.period}
                </span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed truncate mt-0.5">
                {job.description}
              </p>
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
