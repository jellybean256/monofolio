import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ExperienceItem } from '../../data/portfolioData';

interface WorkHistoryProps {
  experiences: ExperienceItem[];
}

export default function WorkHistory({ experiences }: WorkHistoryProps) {
  const [expanded, setExpanded] = useState(false);

  if (!experiences || experiences.length === 0) return null;

  const displayedWork = expanded ? experiences : experiences.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="pb-1.5 flex items-center justify-between gap-3 shrink-0 border-b border-zinc-200/50">
        <span className="text-xs font-semibold text-zinc-900 tracking-tight">
          Work Experience
        </span>
      </div>

      {/* Pure Tree Branch (No Icons, No Links, Continuous Vertical Line from Top) */}
      <div className="relative flex flex-col pt-1">
        {displayedWork.map((job, idx) => {
          const isLast = idx === displayedWork.length - 1;

          return (
            <div
              key={job.id}
              className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 pl-7 sm:pl-8 py-1.5 px-1.5 -mx-1.5 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group"
            >
              {/* Vertical trunk line (runs from top to branch point) */}
              <span className="absolute left-3 sm:left-3.5 top-0 w-px h-3.5 sm:h-1/2 bg-zinc-200" />

              {/* Vertical trunk line continuing downward */}
              {!isLast && (
                <span className="absolute left-3 sm:left-3.5 top-3.5 sm:top-1/2 bottom-0 w-px bg-zinc-200" />
              )}

              {/* Horizontal branch line connecting from trunk directly to company */}
              <span className="absolute left-3 sm:left-3.5 top-3.5 sm:top-1/2 w-3.5 sm:w-4 h-px bg-zinc-200 group-hover:bg-zinc-400 transition-colors" />

              {/* Company & Role: on mobile stacks cleanly, on desktop stays 1 line */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5 min-w-0">
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <span className="text-xs font-semibold text-zinc-900">
                    {job.company}
                  </span>
                  {/* Period on mobile aligns to the right */}
                  <span className="sm:hidden text-[11px] font-mono text-zinc-400 shrink-0">
                    {job.period}
                  </span>
                </div>
                <span className="hidden sm:inline text-zinc-300 text-xs shrink-0">•</span>
                <span className="text-[11.5px] sm:text-xs text-zinc-500 sm:text-zinc-600 sm:truncate">
                  {job.role}
                </span>
              </div>

              {/* Right: Period on desktop */}
              <span className="hidden sm:inline text-[11px] font-mono text-zinc-400 shrink-0">
                {job.period}
              </span>
            </div>
          );
        })}
      </div>

      {/* Solution C Inline Toggle Action */}
      {experiences.length > 4 && (
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
              <span>+ {experiences.length - 4} earlier roles</span>
              <ChevronDown className="w-3 h-3" />
            </>
          )}
        </button>
      )}
    </div>
  );
}
