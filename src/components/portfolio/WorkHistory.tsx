import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { ExperienceItem } from '../../data/portfolioData';

interface WorkHistoryProps {
  experiences: ExperienceItem[];
  mode?: 'desktop' | 'tablet' | 'mobile';
}

export default function WorkHistory({ experiences, mode }: WorkHistoryProps) {
  const [expanded, setExpanded] = useState(false);

  if (!experiences || experiences.length === 0) return null;

  const displayedWork = expanded ? experiences : experiences.slice(0, 4);

  const isWide = mode === 'desktop' || mode === 'tablet';
  const isMobile = mode === 'mobile';

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
              className={`relative py-1.5 px-1.5 -mx-1.5 rounded-md hover:bg-zinc-100/70 transition-all duration-150 group ${
                isWide
                  ? 'flex flex-row items-center justify-between gap-2 pl-8'
                  : isMobile
                  ? 'flex flex-col gap-0.5 pl-7'
                  : 'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2 pl-7 sm:pl-8'
              }`}
            >
              {/* Vertical trunk line (runs from top to branch point) */}
              <span
                className={`absolute left-3 sm:left-3.5 top-0 w-px bg-zinc-200 ${
                  isWide ? 'h-1/2' : isMobile ? 'h-3.5' : 'h-3.5 sm:h-1/2'
                }`}
              />

              {/* Vertical trunk line continuing downward */}
              {!isLast && (
                <span
                  className={`absolute left-3 sm:left-3.5 bottom-0 w-px bg-zinc-200 ${
                    isWide ? 'top-1/2' : isMobile ? 'top-3.5' : 'top-3.5 sm:top-1/2'
                  }`}
                />
              )}

              {/* Horizontal branch line connecting from trunk directly to company */}
              <span
                className={`absolute left-3 sm:left-3.5 h-px bg-zinc-200 group-hover:bg-zinc-400 transition-colors ${
                  isWide ? 'top-1/2 w-4' : isMobile ? 'top-3.5 w-3.5' : 'top-3.5 sm:top-1/2 w-3.5 sm:w-4'
                }`}
              />

              {/* Company & Role */}
              <div
                className={`min-w-0 ${
                  isWide
                    ? 'flex flex-row items-center gap-1.5'
                    : isMobile
                    ? 'flex flex-col gap-0.5'
                    : 'flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1.5'
                }`}
              >
                <div
                  className={`flex items-center gap-2 ${
                    isWide ? 'justify-start' : isMobile ? 'justify-between' : 'justify-between sm:justify-start'
                  }`}
                >
                  <span className="text-xs font-semibold text-zinc-900">
                    {job.company}
                  </span>
                  {/* Period on mobile aligns to the right */}
                  <span
                    className={`text-[11px] font-mono text-zinc-400 shrink-0 ${
                      isWide ? 'hidden' : isMobile ? 'inline' : 'sm:hidden'
                    }`}
                  >
                    {job.period}
                  </span>
                </div>
                <span
                  className={`text-zinc-300 text-xs shrink-0 ${
                    isWide ? 'inline' : isMobile ? 'hidden' : 'hidden sm:inline'
                  }`}
                >
                  •
                </span>
                <span
                  className={`text-zinc-500 sm:text-zinc-600 truncate ${
                    isWide
                      ? 'text-xs'
                      : isMobile
                      ? 'text-[11.5px]'
                      : 'text-[11.5px] sm:text-xs'
                  }`}
                >
                  {job.role}
                </span>
              </div>

              {/* Right: Period on desktop/tablet */}
              <span
                className={`text-[11px] font-mono text-zinc-400 shrink-0 ${
                  isWide ? 'inline' : isMobile ? 'hidden' : 'hidden sm:inline'
                }`}
              >
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
